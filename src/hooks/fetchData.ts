import type { Ref } from 'vue';

const getJsonPath = (jsonFileName: string) => {
    switch (jsonFileName) {
        case 'mountainsList':
            return import.meta.env.VITE_MTLIST_JSON_PATH;
        case 'mountainsLogs':
            return import.meta.env.VITE_MTLOGS_JSON_PATH;
        case 'mountainsLinks':
            return import.meta.env.VITE_MTLINKS_JSON_PATH;
        case 'routesList':
            return import.meta.env.VITE_MTROUTES_JSON_PATH;
        case 'galleryList':
            return import.meta.env.VITE_MTGALLERY_JSON_PATH;
        case 'resourcesList':
            return import.meta.env.VITE_RESOURCES_JSON_PATH;
        case 'learnList':
            return import.meta.env.VITE_LEARN_JSON_PATH;
        case 'worksList':
            return import.meta.env.VITE_WORKS_JSON_PATH;
        case 'workshopList':
            return import.meta.env.VITE_WORKSHOP_JSON_PATH;
        default:
            throw new Error(`Unknown jsonFileName: ${jsonFileName}`);
    }
}

const fetchData = async (jsonData: Ref<any>, jsonFileName: string, filterFn?: (item: any) => boolean, shouldReverse: boolean = false) => {
    try {
        const jsonPath = getJsonPath(jsonFileName);
        const response = await fetch(jsonPath);
        const data = await response.json();
        const filteredData = filterFn ? data.filter(filterFn) : data;
        jsonData.value = shouldReverse ? filteredData.reverse() : filteredData;
    } catch (error) {
        console.error('Error:', error);
    }
};

export default fetchData;
