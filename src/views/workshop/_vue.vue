<script setup lang="ts">
import { inject } from 'vue';
import type { CatalogItem } from '@/stores/catalog';

defineProps<{
    isActive: number,
    catalog: CatalogItem[],
}>();

const emit = defineEmits(['update:isActive']);

// 點擊時更新 active
const toggle = (val: number) => {
    emit('update:isActive', val)
}
</script>

<template>
    <div class="text-group">
        <h2 v-text="catalog[0].title"></h2>
        <div class="text-accordin is-error">
            <div class="accordin-item" :class="isActive==1001 ? 'is-active' : ''">
                <div class="accordin-title" @click="toggle(1001)">
                    <p>Uncaught (in promise) Maximum recursive updates exceeded in component. This means you have a reactive effect that is mutating its own dependencies and thus recursively triggering itself. Possible sources include component template, render function, updated hook or watcher source function.</p>
                </div>
                <div class="accordin-content">
                    <p>這個問題通常發生於使用 <em>reverse()</em> 方法後，導致數據的重新排列，而重新排列可能觸發更新，從而導致遞歸更新。這可能會在 <em>computed</em> 或 <em>watch</em> 中引起問題，因為它們會跟蹤數據的變化並重新計算結果。</p>
                    <p>解決這個問題的方法之一是在 <em>computed</em> 屬性中使用函數，而不是在它們的直接返回值上進行數據操作。這樣做可以防止不必要的更新。此外，也可以考慮在 <em>computed</em> 中使用 <em>watch</em> 來觀察數據的變化，以避免不必要的更新。</p>
                    <p>以下是可能導致渲染出錯的寫法案例：</p>
                    <prism-highlight>
                        <div class="text-code" v-pre>
                            <pre><code class="language-html">&lt;li v-for="item in lists.reverse().slice(0, 12)" :key="item.id"&gt;&lt;li&gt;</code></pre>
                        </div>
                    </prism-highlight>
                    <p>解決方式是將 <em>reverse()</em> 方法轉移到 <em>computed</em> 屬性：</p>
                    <prism-highlight>
                        <div class="text-code" v-pre>
                            <pre><code class="language-javascript">const filteredData = computed(() => {
    return lists.value.slice().reverse().slice(0, 12);
});</code></pre>
                        </div>
                    </prism-highlight>
                    <p>然後在模版中使用 <em>filteredData</em> ：</p>
                    <prism-highlight>
                        <div class="text-code" v-pre>
                            <pre><code class="language-html">&lt;li v-for="item in filteredData" :key="item.id"&gt;&lt;li&gt;</code></pre>
                        </div>
                    </prism-highlight>
                </div>
                <button class="accordin-close" @click="toggle(0)"></button>
            </div>
            <div class="accordin-item" :class="isActive==1002 ? 'is-active' : ''">
                <div class="accordin-title" @click="toggle(1002);">
                    <p>"getActivePinia()" was called but there was no active Pinia. Are you trying to use a store before calling "app.use(pinia)"?</p>
                </div>
                <div class="accordin-content">
                    <p>這個錯誤通常發生在你試圖在 Vue 應用程式中使用 Pinia store 之前，忘記了將 Pinia 實例掛載到 Vue 應用程式上，而且必須確保 <em>app.use(pinia)</em> 必須在組件掛載（<em>app.mount</em>）之前先執行。</p>
                    <p>如果使用 Vite 框架，設定通常在 <b>main.js</b> 或 <b>main.ts</b> 文件：</p>
                    <prism-highlight>
                        <div class="text-code" v-pre>
                            <pre><code class="language-javascript">import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'

const app = createApp(App);
const pinia = createPinia();

app.use(pinia);
app.mount('#app');</code></pre>
                        </div>
                    </prism-highlight>
                    <p>如果 <em>app.mount</em> 比 <em>app.use</em> 還要早執行便會發生錯誤：</p>
                    <prism-highlight>
                        <div class="text-code" v-pre>
                            <pre><code class="language-javascript">app.mount('#app');
app.use(pinia);</code></pre>
                        </div>
                    </prism-highlight>
                    <p>像這樣就不行。</p>
                </div>
                <button class="accordin-close" @click="toggle(0)"></button>
            </div>
            <div class="accordin-item" :class="isActive==1003 ? 'is-active' : ''">
                <div class="accordin-title" @click="toggle(1003)">
                    <p>Uncaught (in promise) TypeError: Cannot read properties of undefined (reading 'query')</p>
                </div>
                <div class="accordin-content">
                    <p>這個錯誤通常是因為 <em>route</em> 物件沒有正確定義或傳遞。為了修復這個問題，可以嘗試以下方法：</p>
                    <prism-highlight>
                        <div class="text-code" v-pre>
                            <pre><code class="language-javascript">import { useRoute } from 'vue-router'</code></pre>
                        </div>
                    </prism-highlight>
                </div>
                <button class="accordin-close" @click="toggle(0)"></button>
            </div>
            <div class="accordin-item" :class="isActive==1004 ? 'is-active' : ''">
                <div class="accordin-title" @click="toggle(1004)">
                    <p>[@vue/compiler-sfc] defineProps is a compiler macro and no longer needs to be imported.</p>
                </div>
                <div class="accordin-content">
                    <p>這個警告訊息意思是不需要再手動 <em>import { defineProps } from 'vue'</em>，因為在 <b>&lt;script setup&gt;</b> 中 <em>defineProps()</em> 是 Vue 提供的編譯器巨集 (compiler macro)，它是自動提供的，不應該引用。</p>
                </div>
                <button class="accordin-close" @click="toggle(0)"></button>
            </div>
        </div>
    </div>
    <div class="text-group">
        <h2 v-text="catalog[1].title"></h2>
        <div class="text-accordin is-warning">
        </div>
    </div>
    <div class="text-group">
        <h2 v-text="catalog[2].title"></h2>
        <div class="text-accordin is-others">
            <div class="accordin-item" :class="isActive==3001 ? 'is-active' : ''">
                <div class="accordin-title" @click="toggle(3001)">
                    <p>[Vue3]如何修改範圍（Scoped）外的 CSS 樣式？</p>
                </div>
                <div class="accordin-content">
                    <p>可以使用 <em>:deep(＜inner-selector＞)</em> 語法，括號裡面指定要修改的選擇器。例如：</p>
                    <prism-highlight>
                        <div class="text-code" v-pre>
                            <pre><code class="language-css">:deep(.demo-wrap){
    /* CSS 樣式 */
}</code></pre>
                        </div>
                    </prism-highlight>
                </div>
                <button class="accordin-close" @click="toggle(0)"></button>
            </div>
            <div class="accordin-item" :class="isActive==3002 ? 'is-active' : ''">
                <div class="accordin-title" @click="toggle(3002)">
                    <p>[Vue3]返回上一個路由頁面的語法</p>
                </div>
                <div class="accordin-content">
                    <p>Vue 語法的部分（使用 TypeScript）：</p>
                    <prism-highlight>
                        <div class="text-code" v-pre>
                            <pre><code class="language-html">&lt;script setup lang="ts"&gt;
    import { useRoute, useRouter } from 'vue-router';

    const route = useRoute();
    const router = useRouter();

    const goBackClick = () => {
        const pathSegments = route.path.split('/');
        if (pathSegments.length > 2) {
            // 移除最後一個路徑段
            pathSegments.pop();
            const parentPath = pathSegments.join('/');
            router.push(parentPath);
        } else {
            router.push('/');
        }
    }
&lt;/script&gt;</code></pre>
                        </div>
                    </prism-highlight>
                    <p>於模板指定元素中添加 <em>goBackClick</em> 觸發事件：</p>
                    <prism-highlight>
                        <div class="text-code" v-pre>
                            <pre><code class="language-html">&lt;button @click="goBackClick"&gt;BACK&lt;/button&gt;</code></pre>
                        </div>
                    </prism-highlight>
                    <p><br></p>
                    <p>補充：如果只是單純要返回上一個路由動作，可以使用 <em>router.go(-1);</em> 即可。</p>
                </div>
                <button class="accordin-close" @click="toggle(0)"></button>
            </div>
            <div class="accordin-item" :class="isActive==3003 ? 'is-active' : ''">
                <div class="accordin-title" @click="toggle(3003)">
                    <p>[Vue3]單一路由組件動態載入外部 JS 檔案的方法</p>
                </div>
                <div class="accordin-content">
                    <p>Vue 語法的部分（使用 TypeScript）：</p>
                    <prism-highlight>
                        <div class="text-code" v-pre>
                            <pre><code class="language-javascript">import { onMounted } from "vue";

const loadScripts = () => {
    return new Promise((resolve, reject) => {
        const jsName = document.createElement('script');
        jsName.src = "/js/fileName.js";
        jsName.onload = () => {
            resolve(true);
        };
        jsName.onerror = () => {
            reject(new Error("Failed to load fileName.js"));
        };
        document.head.appendChild(jsName);
    });
};

onMounted(async () => {
    try {
        await loadScripts();
    } catch (error) {
        console.error(error);
    }
});</code></pre>
                        </div>
                    </prism-highlight>
                </div>
                <button class="accordin-close" @click="toggle(0)"></button>
            </div>
            <div class="accordin-item" :class="isActive==3004 ? 'is-active' : ''">
                <div class="accordin-title" @click="toggle(3004)">
                    <p>[Vue3]如何在 v-for 迭代資料前先篩選要顯示的資料？</p>
                </div>
                <div class="accordin-content">
                    <p>假設我們現在手上有一份 JSON 檔案需要透過 <em>v-for</em> 將裡面的資料迭代顯示在畫面上，但並非全部都要顯示，而是只渲染出符合指定條件的資料，例如資料中 <em>status</em> 屬性值為 <em>true</em> 的項目。聰明的你可能會直覺優先想到使用 <em>v-if</em>，但偏偏 <em>v-if</em> 不能與 <em>v-for</em> 共存，那該怎麼辦？其實有以下兩種方式可以實現我們的需求。</p>
                    <h4>1. 使用 filter 方法：</h4>
                    <p>我們可以直接在 <em>v-for</em> 語法中的後方添加 <em>filter</em> 來實現需求。例如：</p>
                    <prism-highlight>
                        <div class="text-code" v-pre>
                            <pre><code class="language-html">&lt;ul&gt;
    &lt;li v-for="item in displayedItems.filter(item =&gt; item.status)" :key="item.id"&gt;
        &lt;h2 v-text="item.title"&gt;&lt;/h2&gt;
    &lt;/li&gt;
&lt;/ul&gt;
</code></pre>
                        </div>
                    </prism-highlight>
                    <p><br></p>
                    <h4>2. 使用 computed 屬性：</h4>
                    <p>例如：</p>
                    <prism-highlight>
                        <div class="text-code" v-pre>
                            <pre><code class="language-javascript">const displayedItems = computed(() => {
    // 過濾 status 為 true 的條件
    const filteredData = jsonData.value.filter((b) => {
        return (
            b.status === true;
        );
    });
});</code></pre>
                        </div>
                    </prism-highlight>
                    <prism-highlight>
                        <div class="text-code" v-pre>
                            <pre><code class="language-html">&lt;ul&gt;
    &lt;li v-for="item in displayedItems" :key="item.id"&gt;
        &lt;h2 v-text="item.title"&gt;&lt;/h2&gt;
    &lt;/li&gt;
&lt;/ul&gt;
</code></pre>
                        </div>
                    </prism-highlight>
                    <p>這兩種方法以後者會比前者更加推薦，因為性能上較優，且可讀性也比直接寫在組件 HTML 裡來得更好。</p>
                </div>
                <button class="accordin-close" @click="toggle(0)"></button>
            </div>
            <div class="accordin-item" :class="isActive==3005 ? 'is-active' : ''">
                <div class="accordin-title" @click="toggle(3005)">
                    <p>[Vue3]如何插入 HTML 元素的內容到組件裡？</p>
                </div>
                <div class="accordin-content">
                    <p>首先在 <em>script</em> 元素中定義好要引入的 HTML 元素標籤與內容。例如：</p>
                    <prism-highlight>
                        <div class="text-code" v-pre>
                            <pre><code class="language-html">import { ref } from 'vue'

const htmlContent = ref('&lt;h1&gt;Hello! World!&lt;/h1&gt;')</code></pre>
                        </div>
                    </prism-highlight>
                    <p>然後在 <em>template</em> 模板中利用 <em>v-html</em> 屬性載入它：</p>
                    <prism-highlight>
                        <div class="text-code" v-pre>
                            <pre><code class="language-html">&lt;template&gt;
    &lt;div v-html="htmlContent"&gt;&lt;/div&gt;
&lt;/template&gt;</code></pre>
                        </div>
                    </prism-highlight>
                </div>
                <button class="accordin-close" @click="toggle(0)"></button>
            </div>
            <div class="accordin-item" :class="isActive==3006 ? 'is-active' : ''">
                <div class="accordin-title" @click="toggle(3006)">
                    <p>[Vue3]合併多組資料陣列的方法</p>
                </div>
                <div class="accordin-content">
                    <prism-highlight>
                        <div class="text-code" v-pre>
                            <pre><code class="language-javascript">const AllData = computed(() =>
    [...Data1, ...Data2, ...Dta3]
)</code></pre>
                        </div>
                    </prism-highlight>
                    <p>我們也可以加入 <em>.filter()</em> 或 <em>.slice()</em> 之類的方法進一步調整合併資料的其他需求。例如：</p>
                    <prism-highlight>
                        <div class="text-code" v-pre>
                            <pre><code class="language-javascript">const AllData = computed(() =>
    [...Data1, ...Data2, ...Dta3].filter(item => item.status !== false)
)</code></pre>
                        </div>
                    </prism-highlight>
                    <p>表示組合完的表單會再過濾掉 <em>status</em> 屬性值為 <em>false</em> 的資料。</p>
                </div>
                <button class="accordin-close" @click="toggle(0)"></button>
            </div>
            <div class="accordin-item" :class="isActive==3007 ? 'is-active' : ''">
                <div class="accordin-title" @click="toggle(3007)">
                    <p>[Vue3]使用陣列排除法簡化 v-if 的判斷條件</p>
                </div>
                <div class="accordin-content">
                    <p>假如有些內容不想在特定某幾個路由頁面渲染出來，普通直觀的方式可能會這樣寫：</p>
                    <prism-highlight>
                        <div class="text-code" v-pre>
                            <pre><code class="language-html">v-if="route.path !== '/contact' && route.path !== '/about'"</code></pre>
                        </div>
                    </prism-highlight>
                    <p>透過陣列排除法，可以將程式碼進一步簡化：</p>
                    <prism-highlight>
                        <div class="text-code" v-pre>
                            <pre><code class="language-html">v-if="!['/contact', '/about'].includes(route.path)"</code></pre>
                        </div>
                    </prism-highlight>
                </div>
                <button class="accordin-close" @click="toggle(0)"></button>
            </div>
            <div class="accordin-item" :class="isActive==3008 ? 'is-active' : ''">
                <div class="accordin-title" @click="toggle(3008)">
                    <p>[Vue3]替換原本的引用路徑</p>
                </div>
                <div class="accordin-content">
                    <p>在渲染引用的檔案時，受限於某些因素像是從 API 那邊獲取的資料，其檔案位置是一串完整的路徑，如果我們想要將其替換成其他路徑，則可以這樣做：</p>
                    <h4>1. 直接在 Template 做修改：</h4>
                    <prism-highlight>
                        <div class="text-code" v-pre>
                            <pre><code class="language-html">&lt;img :src="item.img.replace('/img/website/', '/img/footer/logos/')" /&gt;</code></pre>
                        </div>
                    </prism-highlight>
                    <h4>2. 在 Script 裡先處理好新的陣列：</h4>
                    <prism-highlight>
                        <div class="text-code" v-pre>
                            <pre><code class="language-javascript">const NewData = computed(() =>
    ApiData.map(item => ({
        ...item,
        img: item.img.replace('/img/website/', '/img/footer/logos/')
    }))
)</code></pre>
                        </div>
                    </prism-highlight>
                    <p>然後讓 <em>NewData</em> 取代掉原本 Template <em>v-for</em> 渲染來源的 <em>ApiData</em> 即可。</p>
                </div>
                <button class="accordin-close" @click="toggle(0)"></button>
            </div>
            <div class="accordin-item" :class="isActive==3009 ? 'is-active' : ''">
                <div class="accordin-title" @click="toggle(3009)">
                    <p>[Vue3]v-bind 多個 class 串聯的寫法</p>
                </div>
                <div class="accordin-content">
                    <p>在使用 v-bind 操作元素對象的 class，必須要設定兩個以上的條件時，如果直接重複寫 <em>:class</em>，像這樣：</p>
                    <prism-highlight>
                        <div class="text-code" v-pre>
                            <pre><code class="language-html">&lt;div
    class="app-wrap"
    :class="menu.length ? 'menu-style' : ''"
    :class="'theme-' + store.__currentTheme"
&gt;</code></pre>
                        </div>
                    </prism-highlight>
                    <p>這種寫法將會得到報錯的警告訊息，正確的寫法應為：</p>
                    <prism-highlight>
                        <div class="text-code" v-pre>
                            <pre><code class="language-javascript">&lt;div
    class="app-wrap"
    :class="{
        'menu-style': menu.length > 0,
        ['theme-' + store.__currentTheme]: true
    }"
&gt;</code></pre>
                        </div>
                    </prism-highlight>
                    <p>用物件語法才不會報錯且可讀性更佳。</p>
                </div>
                <button class="accordin-close" @click="toggle(0)"></button>
            </div>
        </div>
    </div>
    <div class="text-group">
        <h2>動態效果</h2>
        <div class="text-accordin is-tips">
            <div class="accordin-item" :class="isActive==4001 ? 'is-active' : ''">
                <div class="accordin-title" @click="toggle(4001)">
                    <p>每秒刷新的當前時間</p>
                </div>
                <div class="accordin-content">
                    <p>Template：</p>
                    <prism-highlight>
                        <div class="text-code" v-pre>
                            <pre><code class="language-html">&lt;span&gt;{{ currentTime }}&lt;/span&gt;</code></pre>
                        </div>
                    </prism-highlight>
                    <p>JavaScrtipt（setup 格式）：</p>
                    <prism-highlight>
                        <div class="text-code" v-pre>
                            <pre><code class="language-javascript">const currentTime = ref(dayjs().format('YYYY-MM-DD HH:mm:ss'))

const updateCurrentTime = () => {
    currentTime.value = dayjs().format('YYYY-MM-DD HH:mm:ss')
}

const intervalId = setInterval(updateCurrentTime, 1000)

onUnmounted(() => {
    clearInterval(intervalId)
})</code></pre>
                        </div>
                    </prism-highlight>

                </div>
            </div>
            <div class="accordin-item" :class="isActive==4002 ? 'is-active' : ''">
                <div class="accordin-title" @click="toggle(4002)">
                    <p>滑鼠水平拖曳的區域效果</p>
                </div>
                <div class="accordin-content">
                    <p>Template：</p>
                    <prism-highlight>
                        <div class="text-code" v-pre>
                            <pre><code class="language-html">&lt;ul ref="draggableTabs" class="draggable-tabs"&gt;
    &lt;li&gt;項目一&lt;/li&gt;
    &lt;li&gt;項目二&lt;/li&gt;
    &lt;li&gt;...&lt;/li&gt;
&lt;/ul&gt;</code></pre>
                        </div>
                    </prism-highlight>
                    <p>CSS：</p>
                    <prism-highlight>
                        <div class="text-code" v-pre>
                            <pre><code class="language-css">.draggable-tabs {
    display: flex;
    gap: 10px;
    overflow-x: auto;
    cursor: grab;
    user-select: none;
    scroll-behavior: smooth;
}</code></pre>
                        </div>
                    </prism-highlight>
                    <p>JavaScrtipt（setup 格式）：</p>
                    <prism-highlight>
                        <div class="text-code" v-pre>
                            <pre><code class="language-javascript">const draggableTabs = ref(null)

onMounted(() => {
    const el = draggableTabs.value
    if (!el) return

    let isDown = false
    let startX
    let scrollLeft

    const mouseDown = (e) => {
        isDown = true
        el.classList.add('active')
        startX = e.pageX - el.offsetLeft
        scrollLeft = el.scrollLeft
    }

    const mouseLeave = () => {
        isDown = false
        el.classList.remove('active')
    }

    const mouseUp = () => {
        isDown = false
        el.classList.remove('active')
    }

    const mouseMove = (e) => {
        if (!isDown) return
        e.preventDefault()
        const x = e.pageX - el.offsetLeft
        const walk = (x - startX) * 1.5 // 拖曳速度係數
        el.scrollLeft = scrollLeft - walk
    }

    el.addEventListener('mousedown', mouseDown)
    el.addEventListener('mouseleave', mouseLeave)
    el.addEventListener('mouseup', mouseUp)
    el.addEventListener('mousemove', mouseMove)
})

onBeforeUnmount(() => {
    const el = draggableTabs.value
    if (!el) return
    el.removeEventListener('mousedown', mouseDown)
    el.removeEventListener('mouseleave', mouseLeave)
    el.removeEventListener('mouseup', mouseUp)
    el.removeEventListener('mousemove', mouseMove)
})</code></pre>
                        </div>
                    </prism-highlight>

                </div>
                <button class="accordin-close" @click="toggle(0)"></button>
            </div>
        </div>
    </div>
</template>