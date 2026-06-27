import fs from 'node:fs/promises';

const MOUNTAINS_PATH = 'public/js/data/mountainsList.json';
const OSM_PATH = 'public/js/data/osmMountainsList.json';
const NOMINATIM_ENDPOINT = 'https://nominatim.openstreetmap.org/search';
const REQUEST_DELAY = 1100;

// Manual overrides for duplicate names or known OSM ambiguity.
const MANUAL_OVERRIDES = {
    '124': {
        lat: 24.811086,
        lng: 121.230679,
        osmName: '\u77f3\u9580\u5c71',
        displayName: '\u77f3\u9580\u5c71, \u9f8d\u6f6d\u5340, \u6843\u5712\u5e02, \u81fa\u7063',
        osmType: 'manual',
        osmId: '',
    },
    '135': {
        lat: 24.36975,
        lng: 120.72569,
        osmName: '\u706b\u708e\u5c71',
        displayName: '\u706b\u708e\u5c71, \u4e09\u7fa9\u9109, \u82d7\u6817\u7e23, \u81fa\u7063',
        osmType: 'manual',
        osmId: '',
    },
    '153': {
        lat: 23.6916901,
        lng: 120.8061779,
        osmName: '\u9cf3\u51f0\u5c71',
        displayName: '\u9cf3\u51f0\u5c71, \u9e7f\u8c37\u9109, \u5357\u6295\u7e23, 558, \u81fa\u7063',
        osmType: 'node',
        osmId: 2482530193,
    },
    '160': {
        lat: 23.4978586,
        lng: 120.7198932,
        osmName: '\u5927\u51cd\u5c71',
        displayName: '\u5927\u51cd\u5c71, \u963f\u91cc\u5c71\u9109, \u5609\u7fa9\u7e23, 605, \u81fa\u7063',
        osmType: 'node',
        osmId: 4462742356,
    },
    '163': {
        lat: 23.3113291,
        lng: 120.5226512,
        osmName: '\u5927\u51cd\u5c71',
        displayName: '\u5927\u51cd\u5c71, \u5927\u51cd\u5c71\u6b65\u9053, \u95dc\u5dba\u91cc, \u767d\u6cb3\u5340, \u81fa\u5357\u5e02, 732, \u81fa\u7063',
        osmType: 'node',
        osmId: 12468292154,
    },
};

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const normalizeText = (value = '') => String(value).trim();

const readJson = async (path, fallback = []) => {
    try {
        return JSON.parse(await fs.readFile(path, 'utf8'));
    } catch {
        return fallback;
    }
};

const writeJson = async (path, data) => {
    await fs.writeFile(path, `${JSON.stringify(data, null, 4)}\n`, 'utf8');
};

const uniqueById = (list) => {
    const seen = new Set();

    return list.filter(item => {
        const id = normalizeText(item.id);
        if (!id || seen.has(id)) return false;

        seen.add(id);
        return true;
    });
};

const createCacheMap = (list) => {
    return new Map(
        list
            .filter(item => item.id)
            .map(item => [normalizeText(item.id), item])
    );
};

const getCandidateNames = (result) => {
    const namedetails = result.namedetails ?? {};
    const names = [
        result.name,
        namedetails.name,
        namedetails['name:zh'],
        namedetails['name:zh-Hant'],
        namedetails['name:zh-TW'],
        namedetails.alt_name,
        namedetails.official_name,
    ];

    if (result.display_name) {
        names.push(result.display_name.split(',')[0]);
    }

    return names.map(normalizeText).filter(Boolean);
};

const isExactNameMatch = (targetName, result) => {
    return getCandidateNames(result).some(name => name === targetName);
};

const createSearchKeyword = (item) => {
    return [
        item.name,
        item.town,
        item.county,
        '\u53f0\u7063',
    ].map(normalizeText).filter(Boolean).join(', ');
};

const searchOsmByName = async (item) => {
    const params = new URLSearchParams({
        q: createSearchKeyword(item),
        format: 'jsonv2',
        addressdetails: '1',
        namedetails: '1',
        extratags: '1',
        limit: '5',
        countrycodes: 'tw',
        'accept-language': 'zh-TW',
    });

    const response = await fetch(`${NOMINATIM_ENDPOINT}?${params}`, {
        headers: {
            'User-Agent': 'itrong-hikingbook/1.0 local data maintenance',
        },
    });

    if (!response.ok) {
        throw new Error(`Nominatim request failed: ${response.status} ${response.statusText}`);
    }

    const results = await response.json();
    return results.find(result => isExactNameMatch(item.name, result)) ?? null;
};

const createEmptyRecord = (item) => ({
    id: item.id,
    name: item.name,
    lat: '',
    lng: '',
    osmName: '',
    displayName: '',
    osmType: '',
    osmId: '',
    match: false,
    checkedAt: new Date().toISOString(),
});

const createManualRecord = (item, override) => ({
    id: item.id,
    name: item.name,
    ...override,
    match: true,
    checkedAt: new Date().toISOString(),
});

const createMatchedRecord = (item, result) => ({
    id: item.id,
    name: item.name,
    lat: Number(result.lat),
    lng: Number(result.lon),
    osmName: getCandidateNames(result)[0] ?? item.name,
    displayName: result.display_name ?? '',
    osmType: result.osm_type ?? '',
    osmId: result.osm_id ?? '',
    match: true,
    checkedAt: new Date().toISOString(),
});

const main = async () => {
    const mountains = uniqueById(await readJson(MOUNTAINS_PATH));
    const existing = createCacheMap(await readJson(OSM_PATH));
    const output = [];

    for (const [index, item] of mountains.entries()) {
        const manualOverride = MANUAL_OVERRIDES[item.id];
        if (manualOverride) {
            output.push(createManualRecord(item, manualOverride));
            console.log(`[manual] ${index + 1}/${mountains.length} ${item.id} ${item.name}`);
            continue;
        }

        const cached = existing.get(item.id);

        if (cached?.checkedAt) {
            output.push({
                id: item.id,
                ...cached,
                name: item.name,
            });
            console.log(`[cache] ${index + 1}/${mountains.length} ${item.id} ${item.name}`);
            continue;
        }

        try {
            console.log(`[query] ${index + 1}/${mountains.length} ${item.id} ${item.name}`);
            const result = await searchOsmByName(item);
            output.push(result ? createMatchedRecord(item, result) : createEmptyRecord(item));
        } catch (error) {
            console.error(`[error] ${item.id} ${item.name}:`, error.message);
            output.push(createEmptyRecord(item));
        }

        await writeJson(OSM_PATH, output);
        await sleep(REQUEST_DELAY);
    }

    await writeJson(OSM_PATH, output);

    const matchedCount = output.filter(item => item.match).length;
    console.log(`Done. checked: ${output.length}, matched: ${matchedCount}, unmatched: ${output.length - matchedCount}`);
};

main();
