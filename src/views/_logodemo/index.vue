<script setup lang="ts">
import { ref, computed, onMounted } from "vue";

// 資料型別
type LogoItem = {
  id: number;
  viewport: string[];
  style: string[];
  layout: string[];
  inspiration: string[];
  typography: string[];
};

type FilterKey = "viewport" | "shape" | "layout" | "inspiration" | "typography";

// 狀態
const data = ref<LogoItem[]>([]);
const loading = ref(false);
const error = ref<string | null>(null);

// 目前選中的篩選（空字串代表該分類「未篩選」）
const selected = ref<Record<FilterKey, string>>({
  viewport: "",
  shape: "",
  layout: "",
  inspiration: "",
  typography: "",
});

// 取得 JSON
const fetchLogos = async () => {
  loading.value = true;
  try {
    const res = await fetch("/js/data/_logo.json", { cache: "no-cache" });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const json = (await res.json()) as LogoItem[];
    data.value = json.sort((a, b) => a.id - b.id);
  } catch (e: any) {
    error.value = e?.message ?? String(e);
  } finally {
    loading.value = false;
  }
};
onMounted(fetchLogos);

// 各分類的可選項（由資料動態彙整）
const options = computed<Record<FilterKey, string[]>>(() => {
  const keys: FilterKey[] = ["viewport", "shape", "layout", "inspiration", "typography"];
  const result = {} as Record<FilterKey, string[]>;
  for (const k of keys) {
    const set = new Set<string>();
    for (const item of data.value) for (const v of item[k]) set.add(v);
    result[k] = Array.from(set);
  }
  return result;
});

// 過濾第一筆資料
const listWithoutFirst = computed(() => data.value.slice(1))

// 篩選後的清單（AND 條件：各分類若有選值需同時成立）
const filteredList = computed(() =>
  listWithoutFirst.value.filter((item) =>
    (!selected.value.viewport || item.viewport.includes(selected.value.viewport)) &&
    (!selected.value.shape || item.shape.includes(selected.value.shape)) &&
    (!selected.value.layout || item.layout.includes(selected.value.layout)) &&
    (!selected.value.inspiration || item.inspiration.includes(selected.value.inspiration)) &&
    (!selected.value.typography || item.typography.includes(selected.value.typography))
  )
)

// 操作
const isActive = (k: FilterKey, val: string) => selected.value[k] === val;
const toggle = (k: FilterKey, val: string) => {
  selected.value[k] = selected.value[k] === val ? "" : val; // 再點一次取消
};

// 是否有選中任一篩選
const hasActive = computed(() => Object.values(selected.value).some(Boolean))

// 重置所有篩選
const resetFilters = () => {
  (Object.keys(selected.value) as FilterKey[]).forEach(k => (selected.value[k] = ""))
}
</script>

<template>
  <div class="logodemo-wrap">
    <div class="logodemo-center">
      <div class="logodemo-tags">
        <section>
          <hgroup><h2>視點：</h2></hgroup>
          <ul>
            <li v-for="opt in options.viewport" :key="'vp-' + opt">
              <button type="button" :class="{ active: isActive('viewport', opt) }" @click="toggle('viewport', opt)">
                {{ opt }}
              </button>
            </li>
          </ul>
        </section>
        <section>
          <hgroup><h2>形狀：</h2></hgroup>
          <ul>
            <li v-for="opt in options.shape" :key="'st-' + opt">
              <button type="button" :class="{ active: isActive('shape', opt) }" @click="toggle('shape', opt)">
                {{ opt }}
              </button>
            </li>
          </ul>
        </section>
        <section>
          <hgroup><h2>排版：</h2></hgroup>
          <ul>
            <li v-for="opt in options.layout" :key="'ly-' + opt">
              <button type="button" :class="{ active: isActive('layout', opt) }" @click="toggle('layout', opt)">
                {{ opt }}
              </button>
            </li>
          </ul>
        </section>
        <section>
          <hgroup><h2>靈感：</h2></hgroup>
          <ul>
            <li v-for="opt in options.inspiration" :key="'in-' + opt">
              <button type="button" :class="{ active: isActive('inspiration', opt) }" @click="toggle('inspiration', opt)">
                {{ opt }}
              </button>
            </li>
          </ul>
        </section>
        <section>
          <hgroup><h2>文字：</h2></hgroup>
          <ul>
            <li v-for="opt in options.typography" :key="'ty-' + opt">
              <button type="button" :class="{ active: isActive('typography', opt) }" @click="toggle('typography', opt)">
                {{ opt }}
              </button>
            </li>
          </ul>
        </section>
        <section class="logodemo-clear">
          <button type="button" class="reset-btn" :disabled="!hasActive" @click="resetFilters">Reset</button>
        </section>
      </div>
      <div class="logodemo-list">
        <template v-if="error">
          <p>載入失敗：{{ error }}</p>
        </template>
        <template v-else-if="loading">
          <p>載入中…</p>
        </template>
        <template v-else>
          <ul v-if="filteredList.length">
            <li v-for="item in filteredList" :key="item.id">
              <img :src="`/images/_demologo/${item.id}.jpg`" :alt="`logo ${item.id}`" />
              <span>{{ item.id }}</span>
            </li>
          </ul>
          <p v-else>沒有符合條件的結果</p>
        </template>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  :global(.main-inside) {
    padding: 0 !important;
  }

  .logodemo-wrap {
    padding: 2rem;
    @media only screen and (max-width: 768px) {
      padding: 2rem 0.5rem;
    }
  }

  .logodemo-center {
    display: flex;
    align-items: flex-start;
    max-width: 60rem;
    gap: 1rem;
    margin: 0 auto;
    @media only screen and (max-width: 480px) {
      gap: .5rem;
    }
  }

  .logodemo-tags {
    flex: 0 0 15rem;
    position: sticky;
    top: 1rem;
    left: 0;
    min-width: 0;
    max-height: calc(95vh - 2rem);
    background: #F7F7F7;
    padding: 1rem;
    overflow-y: auto;
    section {
      margin-bottom: 2rem;
    }
    h2 {
      font-size: 1rem;
      font-weight: bold;
      margin-bottom: 0.5rem;
    }
    ul {
      display: flex;
      flex-wrap: wrap;
      gap: .5rem;
    }
    li {
      flex: 0 0 auto;
      button {
        display: block;            
        min-width: 5rem;
        height: 2rem;
        text-align: center;
        font-size: .875rem;
        background: #EEE;
        border-radius: 99px;
        padding: 0 1rem;
        &.active {
          background: var(--c1);
        }
      }
    }
    @media only screen and (max-width: 768px) {
      flex: 0 0 5rem;
      padding-right: 0.5rem;
      li {
        button {
          min-width: 0;
        }
      }
    }
  }

  .logodemo-list {
    flex: 1;
    min-width: 0;
    ul {
        display: grid;
        grid-template-columns: repeat(4, minmax(0, 1fr));
        gap: .5rem;
    }
    li {
      position: relative;
      border: 1px solid #CCC;
      img {
        display: block;
        width: 100%;
      }
      span {
        position: absolute;
        top: 0;
        left: 0;
        z-index: 1;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 2rem;
        height: 2rem;
        color: #FFF;
        background: #000;
      }
    }
    p {
      text-align: center;
      padding: 2rem;
    }
    @media only screen and (max-width: 768px) {
      ul {
        grid-template-columns: repeat(3, minmax(0, 1fr));
      }
    }
    @media only screen and (max-width: 480px) {
      ul {
        grid-template-columns: repeat(2, minmax(0, 1fr));
      }
    }
    @media only screen and (max-width: 375px) {
      ul {
        grid-template-columns: repeat(1, minmax(0, 1fr));
      }
    }
  }

  .logodemo-clear {
    margin-bottom: 0 !important;
    padding-top: 1rem;
    button {
      display: block;
      width: 100%;
      height: 2rem;
      font-size: 0.875rem;
      text-align: center;
      color: #FFF;
      background: var(--c2);
      border-radius: .5rem;
      &:disabled {
        opacity: 0.5;
      }
    }
  }
</style>