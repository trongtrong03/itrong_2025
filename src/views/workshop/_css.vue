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
                    <p>水平延伸式的滾軸選單</p>
                </div>
                <div class="accordin-content">
                    <prism-highlight>
                        <div class="text-code" v-pre>
                            <pre><code class="language-css">ul {
    white-space: nowrap;
    overflow-x: auto;
}

ul li {
    display: inline-block;
    vertical-align: top;
}</code></pre>
                        </div>
                    </prism-highlight>
                </div>
                <button class="accordin-close" @click="toggle(0)"></button>
            </div>
            <div class="accordin-item" :class="isActive==3002 ? 'is-active' : ''">
                <div class="accordin-title" @click="toggle(3002)">
                    <p>把英文文字轉換為小型大寫字母</p>
                </div>
                <div class="accordin-content">
                    <prism-highlight>
                        <div class="text-code" v-pre>
                            <pre><code class="language-css">p {
    font-variant: small-caps;
}</code></pre>
                        </div>
                    </prism-highlight>
                </div>
                <button class="accordin-close" @click="toggle(0)"></button>
            </div>
            <div class="accordin-item" :class="isActive==3003 ? 'is-active' : ''">
                <div class="accordin-title" @click="toggle(3003)">
                    <p>iOS 行動裝置 iframe 無法向下滾動的解決方法</p>
                </div>
                <div class="accordin-content">
                    <prism-highlight>
                        <div class="text-code" v-pre>
                            <pre><code class="language-css">div {
    overflow: auto;
    -webkit-overflow-scrolling: touch;
}

div iframe {
    width: 100%;
    height: 100%;
}</code></pre>
                        </div>
                    </prism-highlight>
                    <p>此外，HTML 中的 <em>iframe</em> 元素也要添加 <em>scrolling="yes"</em> 屬性。</p>
                </div>
                <button class="accordin-close" @click="toggle(0)"></button>
            </div>
            <div class="accordin-item" :class="isActive==3004 ? 'is-active' : ''">
                <div class="accordin-title" @click="toggle(3004)">
                    <p>讓 iPad 或 iPhone 的捲軸更順暢</p>
                </div>
                <div class="accordin-content">
                    <prism-highlight>
                        <div class="text-code" v-pre>
                            <pre><code class="language-css">body {
    -webkit-overflow-scrolling: touch;
}</code></pre>
                        </div>
                    </prism-highlight>
                    <p>手指移開觸碰螢幕，滾動仍會持續一小段回彈效果。</p>
                </div>
                <button class="accordin-close" @click="toggle(0)"></button>
            </div>
            <div class="accordin-item" :class="isActive==3005 ? 'is-active' : ''">
                <div class="accordin-title" @click="toggle(3005)">
                    <p>文字色彩漸層</p>
                </div>
                <div class="accordin-content">
                    <prism-highlight>
                        <div class="text-code" v-pre>
                            <pre><code class="language-css">h1 {
    background-image: gradient(參數);
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
}</code></pre>
                        </div>
                    </prism-highlight>
                </div>
                <button class="accordin-close" @click="toggle(0)"></button>
            </div>
            <div class="accordin-item" :class="isActive==3006 ? 'is-active' : ''">
                <div class="accordin-title" @click="toggle(3006)">
                    <p>垂直文字</p>
                </div>
                <div class="accordin-content">
                    <h4>由左至右：</h4>
                    <prism-highlight>
                        <div class="text-code" v-pre>
                            <pre><code class="language-css">p {
    -webkit-writing-mode: vertical-lr;
    writing-mode: vertical-lr;
}</code></pre>
                        </div>
                    </prism-highlight>
                    <h4>由右至左：</h4>
                    <prism-highlight>
                        <div class="text-code" v-pre>
                            <pre><code class="language-css">p {
    -webkit-writing-mode: vertical-rl;
    writing-mode: vertical-rl;
}</code></pre>
                        </div>
                    </prism-highlight>
                </div>
                <button class="accordin-close" @click="toggle(0)"></button>
            </div>
            <div class="accordin-item" :class="isActive==3007 ? 'is-active' : ''">
                <div class="accordin-title" @click="toggle(3007)">
                    <p>控制網頁內容是否可以被選取</p>
                </div>
                <div class="accordin-content">
                    <prism-highlight>
                        <div class="text-code" v-pre>
                            <pre><code class="language-css">body {
    user-select: none;
}</code></pre>
                        </div>
                    </prism-highlight>
                    <p>此外還有 <em>text</em> 屬性值表示僅能選擇元素內的文字，以及 <em>element</em> 屬性值表示僅能選擇元素範圍內的內容。</p>
                </div>
                <button class="accordin-close" @click="toggle(0)"></button>
            </div>
            <div class="accordin-item" :class="isActive==3008 ? 'is-active' : ''">
                <div class="accordin-title" @click="toggle(3008)">
                    <p>input 的提示訊息（placeholder）</p>
                </div>
                <div class="accordin-content">
                    <prism-highlight>
                        <div class="text-code" v-pre>
                            <pre><code class="language-css">input::-webkit-input-placeholder {
    /* css */
}
input::-moz-placeholder {
    /* css */
}
input:-ms-input-placeholder {
    /* css */
}
input:-moz-placeholder {
    /* css */
}</code></pre>
                        </div>
                    </prism-highlight>
                </div>
                <button class="accordin-close" @click="toggle(0)"></button>
            </div>
            <div class="accordin-item" :class="isActive==3009 ? 'is-active' : ''">
                <div class="accordin-title" @click="toggle(3009)">
                    <p>設定反白的樣式（selection）</p>
                </div>
                <div class="accordin-content">
                    <prism-highlight>
                        <div class="text-code" v-pre>
                            <pre><code class="language-css">body::selection { 
    background: 顏色;
    color: 顏色;
    text-shadow: 格式;
}</code></pre>
                        </div>
                    </prism-highlight>
                </div>
                <button class="accordin-close" @click="toggle(0)"></button>
            </div>
            <div class="accordin-item" :class="isActive==3010 ? 'is-active' : ''">
                <div class="accordin-title" @click="toggle(3010)">
                    <p>行內單字滿行時強制斷句並換行</p>
                </div>
                <div class="accordin-content">
                    <prism-highlight>
                        <div class="text-code" v-pre>
                            <pre><code class="language-css">p {
    word-wrap: break-word;
    word-break: break-all;
}</code></pre>
                        </div>
                    </prism-highlight>
                </div>
                <button class="accordin-close" @click="toggle(0)"></button>
            </div>
            <div class="accordin-item" :class="isActive==3011 ? 'is-active' : ''">
                <div class="accordin-title" @click="toggle(3011)">
                    <p>段落字首的樣式</p>
                </div>
                <div class="accordin-content">
                    <prism-highlight>
                        <div class="text-code" v-pre>
                            <pre><code class="language-css">p::first-letter {
    /* CSS */
}</code></pre>
                        </div>
                    </prism-highlight>
                </div>
                <button class="accordin-close" @click="toggle(0)"></button>
            </div>
            <div class="accordin-item" :class="isActive==3012 ? 'is-active' : ''">
                <div class="accordin-title" @click="toggle(3012)">
                    <p>英文字母的大小寫轉換</p>
                </div>
                <div class="accordin-content">
                    <h4>均為大寫：</h4>
                    <prism-highlight>
                        <div class="text-code" v-pre>
                            <pre><code class="language-css">p {
    text-transform: uppercase;
}</code></pre>
                        </div>
                    </prism-highlight>
                    <h4>均為小寫：</h4>
                    <prism-highlight>
                        <div class="text-code" v-pre>
                            <pre><code class="language-css">p {
    text-transform: lowercase;
}</code></pre>
                        </div>
                    </prism-highlight>
                    <h4>首字大寫：</h4>
                    <prism-highlight>
                        <div class="text-code" v-pre>
                            <pre><code class="language-css">p {
    text-transform: capitalize;
}</code></pre>
                        </div>
                    </prism-highlight>
                </div>
                <button class="accordin-close" @click="toggle(0)"></button>
            </div>
            <div class="accordin-item" :class="isActive==3013 ? 'is-active' : ''">
                <div class="accordin-title" @click="toggle(3013)">
                    <p>inherit 和 initial屬性有什麼差別？</p>
                </div>
                <div class="accordin-content">
                    <h4>inherit：</h4>
                    <p><em>inherit</em> 指的是繼承父元素的相同屬性的值。換句話說，當我們將某個 CSS 屬性設為 <em>inherit</em> 時，該屬性將會繼承父元素的對應屬性值。</p>
                    <prism-highlight>
                        <div class="text-code" v-pre>
                            <pre><code class="language-css">div {
    color: red;
}

p {
    color: inherit;    /* red */
}</code></pre>
                        </div>
                    </prism-highlight>
                    <p><br></p>
                    <h4>initial：</h4>
                    <p><em>initial</em> 指的是將 CSS 屬性重設為該屬性的初始值（即瀏覽器預設值）。它不依賴父元素的樣式，而是將屬性設定為標準的初始狀態。</p>
                    <prism-highlight>
                        <div class="text-code" v-pre>
                            <pre><code class="language-css">div {
    color: red;
}

p {
    color: initial;    /* 瀏覽器預設的顏色 */
}</code></pre>
                        </div>
                    </prism-highlight>
                </div>
                <button class="accordin-close" @click="toggle(0)"></button>
            </div>
            <div class="accordin-item" :class="isActive==3014 ? 'is-active' : ''">
                <div class="accordin-title" @click="toggle(3014)">
                    <p>使用 aspect-ratio 設定元素的寬高比</p>
                </div>
                <div class="accordin-content">
                    <p><em>aspect-ratio</em> 屬性用於設定元素的寬高比（寬度與高度的比例），不需要明確指定 <em>width</em> 或 <em>height</em>，讓元素根據該比例自動調整尺寸。例如：</p>
                    <prism-highlight>
                        <div class="text-code" v-pre>
                            <pre><code class="language-css">div {
    aspect-ratio: 16 / 9; /* 設定為 16:9 比例 */
}</code></pre>
                    </div>
                    </prism-highlight>
                    <p>若將比例設定為 <em>1 / 1</em> 即可製作出正方形比例的元素。</p>
                    <p>也可以將此屬性設定於 <em>img</em> 元素以避免圖片載入前的畫面跳動，例如：</p>
                    <prism-highlight>
                        <div class="text-code" v-pre>
                            <pre><code class="language-css">img {
    width: 100%;
    aspect-ratio: 4 / 3;
    object-fit: cover;
}</code></pre>
                        </div>
                    </prism-highlight>
                </div>
                <button class="accordin-close" @click="toggle(0)"></button>
            </div>
            <div class="accordin-item" :class="isActive==3015 ? 'is-active' : ''">
                <div class="accordin-title" @click="toggle(3015)">
                    <p>設定 img 元素中的圖片定位</p>
                </div>
                <div class="accordin-content">
                    <p>需要同時使用兩個屬性，分別是 <em>object-fit</em> 和 <em>object-position</em>。假設我們要讓 <em>img</em> 引用的影像能保持填滿且內容居中，語法可以這樣寫：</p>
                    <prism-highlight>
                        <div class="text-code" v-pre>
                            <pre><code class="language-css">img {
        object-fit: cover; /* 保持比例填滿容器，可能會裁切 */
        object-position: center; /* 圖片內容對齊中間 */
    }</code></pre>
                        </div>
                    </prism-highlight>
                    <p>上面的寫法雖然可以確保圖片裡的內容完全填滿，卻也有可能為了填滿不足的寬度或高度，造成圖片過度拉申導致失真。若不希望圖片被拉申，我們可以修改 <em>object-fit</em> 的值。例如：</p>
                    <p>也可以將此屬性設定於 <em>img</em> 元素以避免圖片載入前的畫面跳動，例如：</p>
                    <prism-highlight>
                        <div class="text-code" v-pre>
                            <pre><code class="language-css">img {
        object-fit: contain; /* 保持原始比例不拉申 */
        object-position: center;
    }</code></pre>
                        </div>
                    </prism-highlight>
                </div>
                <button class="accordin-close" @click="toggle(0)"></button>
            </div>
        </div>
    </div>
</template>