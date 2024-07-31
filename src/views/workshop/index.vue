<script setup lang="ts">
import { ref, reactive } from "vue";
import type { CatalogItem } from '@/stores/catalog';

// 引用組件
import Banner from "@/components/Common/Banner.vue";
import useBodyClass from "@/hooks/useBodyClass";
import PrismHighlight from '@/components/Common/PrismHighlight.vue';

// 傳 class name 給 body
useBodyClass("is-workshop");

/* workshop */
const btnSelected = ref('javascript');
const isActive = ref(0);
const changeTab = (e) => {
    btnSelected.value = e;
    isActive.value = 0;

    // 頁面移動至頂部
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

const catalog = reactive<CatalogItem[]>([
    { id: 1, title: '錯誤訊息' },
    { id: 2, title: '警告提示' },
    { id: 3, title: '疑難雜症' },
]);
</script>

<template>
    <section class="pages-wrap">
        <Banner />
        <div class="main-center">
            <div class="main-head">
                <h1>Workshop</h1>
            </div>
            <div class="list-wrap">
                <div class="list-tools">
                    <div class="list-overflow">
                        <button class="list-btnicon icon icon-javascript" :class="btnSelected == 'javascript' ? 'is-active' : ''" @click="changeTab('javascript')"></button>
                        <button class="list-btnicon icon icon-jquery" :class="btnSelected == 'jquery' ? 'is-active' : ''" @click="changeTab('jquery')"></button>
                        <button class="list-btnicon icon icon-vue" :class="btnSelected == 'vue' ? 'is-active' : ''" @click="changeTab('vue')"></button>
                        <button class="list-btnicon icon icon-vite" :class="btnSelected == 'vite' ? 'is-active' : ''" @click="changeTab('vite')"></button>
                        <button class="list-btnicon icon icon-nuxt" :class="btnSelected == 'nuxt' ? 'is-active' : ''" @click="changeTab('nuxt')"></button>
                        <button class="list-btnicon icon icon-typescript" :class="btnSelected == 'typescript' ? 'is-active' : ''" @click="changeTab('typescript')"></button>
                        <button class="list-btnicon icon icon-nodejs" :class="btnSelected == 'nodejs' ? 'is-active' : ''" @click="changeTab('nodejs')"></button>
                        <button class="list-btnicon icon icon-yarn" :class="btnSelected == 'yarn' ? 'is-active' : ''" @click="changeTab('yarn')"></button>
                        <button class="list-btnicon icon icon-git" :class="btnSelected == 'git' ? 'is-active' : ''" @click="changeTab('git')"></button>
                        <button class="list-btnicon icon icon-css3" :class="btnSelected == 'css' ? 'is-active' : ''" @click="changeTab('css')"></button>
                        <button class="list-btnicon icon icon-html5" :class="btnSelected == 'html' ? 'is-active' : ''" @click="changeTab('html')"></button>
                    </div>
                </div>
                <div class="pages-title">
                    <h2 style="text-transform: capitalize;">{{ btnSelected }}</h2>
                </div>
                <div class="text-content">
                    <!-- javascript -->
                    <template v-if="btnSelected == 'javascript'">
                        <div class="text-group">
                            <h2 v-text="catalog[0].title"></h2>
                            <div class="text-accordin is-error">
                                <div class="accordin-item" :class="isActive==1001 ? 'is-active' : ''">
                                    <div class="accordin-title" @click="isActive = 1001;">
                                        <p>Uncaught ReferenceError: dog is not defined.</p>
                                    </div>
                                    <div class="accordin-content">
                                        <p>意思是變數 <em>dog</em> 沒有經過定義（宣告），檢查回傳錯誤的程式所呼叫的作用域內是否有宣告 <em>dog</em> 變數。</p>
                                    </div>
                                    <button class="accordin-close" @click="isActive = 0;"></button>
                                </div>
                                <div class="accordin-item" :class="isActive==1002 ? 'is-active' : ''">
                                    <div class="accordin-title" @click="isActive = 1002;">
                                        <p>Uncaught ReferenceError: Cannot access 'dog' before initialization.</p>
                                    </div>
                                    <div class="accordin-content">
                                        <p>這個問題通常發生在我們使用 <em>let</em>、<em>const</em> 宣告變數，但在該變數（例如 <em>dog</em>）宣告前我們就嘗試透過程式引用它，因而發生錯誤。</p>
                                        <p>錯誤範例：</p>
                                        <prism-highlight>
                                            <div class="text-code" v-pre>
                                                <pre><code class="language-javascript">console.log(dog);
    let dog = "阿比";</code></pre>
                                            </div>
                                        </prism-highlight>
                                        <p>正確範例：</p>
                                        <prism-highlight>
                                            <div class="text-code" v-pre>
                                                <pre><code class="language-javascript">let dog = "阿比";
    console.log(dog);</code></pre>
                                            </div>
                                        </prism-highlight>
                                    </div>
                                    <button class="accordin-close" @click="isActive = 0;"></button>
                                </div>
                                <div class="accordin-item" :class="isActive==1003 ? 'is-active' : ''">
                                    <div class="accordin-title" @click="isActive = 1003;">
                                        <p>Uncaught SyntaxError: Identifier 'dog' has already been declared.</p>
                                    </div>
                                    <div class="accordin-content">
                                        <p>意思是變數 <em>dog</em> 已經在相同作用域內被宣告過了，而現在又重複宣告了它。這項錯誤主要發生在我們用 <em>let</em>、<em>const</em> 關鍵字於同一個作用域範圍內宣告重複名稱的變數而產生。</p>
                                        <p>錯誤範例：</p>
                                        <prism-highlight>
                                            <div class="text-code" v-pre>
                                                <pre><code class="language-javascript">function Animal() {
        let dog = "阿比";
        // ...其他程式
        let dog = "咪咪";    // &lt;-- 重複宣告相同的變數名而發生錯誤
    }</code></pre>
                                            </div>
                                        </prism-highlight>
                                    </div>
                                    <button class="accordin-close" @click="isActive = 0;"></button>
                                </div>
                                <div class="accordin-item" :class="isActive==1004 ? 'is-active' : ''">
                                    <div class="accordin-title" @click="isActive = 1004;">
                                        <p>Missing initializer in const declaration.</p>
                                    </div>
                                    <div class="accordin-content">
                                        <p>這個錯誤警示是在說宣告關鍵字 <em>const</em> 在宣告時缺少初始化程序，通常是當我們使用的 <em>const</em> 只有宣告變數名稱，而沒有賦值給它的情況產生的錯誤，因為 <em>const</em> 宣告的同時就必須指定它的值。</p>
                                        <p>錯誤範例：</p>
                                        <prism-highlight>
                                            <div class="text-code" v-pre>
                                                <pre><code class="language-javascript">const dog;</code></pre>
                                            </div>
                                        </prism-highlight>
                                        <p>正確範例：</p>
                                        <prism-highlight>
                                            <div class="text-code" v-pre>
                                                <pre><code class="language-javascript">const dog = "阿比";</code></pre>
                                            </div>
                                        </prism-highlight>
                                    </div>
                                    <button class="accordin-close" @click="isActive = 0;"></button>
                                </div>
                                <div class="accordin-item" :class="isActive==1005 ? 'is-active' : ''">
                                    <div class="accordin-title" @click="isActive = 1005;">
                                        <p>Uncaught TypeError: Assignment to constant variable.</p>
                                    </div>
                                    <div class="accordin-content">
                                        <p>意思是我們嘗試對一個透過 <em>const</em> 宣告的變數（<em>dog</em>）重新賦值給它，經由 <em>const</em> 宣告的變數又稱為常數，常數不能被重新賦值。</p>
                                        <p>錯誤範例：</p>
                                        <prism-highlight>
                                            <div class="text-code" v-pre>
                                                <pre><code class="language-javascript">const dog = "阿比";
    dog = "咪咪";    // &lt;-- 發生錯誤</code></pre>
                                            </div>
                                        </prism-highlight>
                                    </div>
                                    <button class="accordin-close" @click="isActive = 0;"></button>
                                </div>
                                <div class="accordin-item" :class="isActive==1006 ? 'is-active' : ''">
                                    <div class="accordin-title" @click="isActive = 1006;">
                                        <p>Uncaught SyntaxError: Unexpected token 'var'.</p>
                                    </div>
                                    <div class="accordin-content">
                                        <p>此錯誤訊息是在告知我們在不允許的位置使用了 <em>var</em> 這個關鍵字。不只是 <em>var</em>，任何 JavaScript 存在的關鍵字（例如 <em>if</em>、<em>for</em>、<em>function</em>...）如果在不合乎規則的地方被使用，就會產生這個錯誤。</p>
                                        <p>錯誤範例：</p>
                                        <prism-highlight>
                                            <div class="text-code" v-pre>
                                                <pre><code class="language-javascript">var var = "阿比";</code></pre>
                                            </div>
                                        </prism-highlight>
                                    </div>
                                    <button class="accordin-close" @click="isActive = 0;"></button>
                                </div>
                                <div class="accordin-item" :class="isActive==1007 ? 'is-active' : ''">
                                    <div class="accordin-title" @click="isActive = 1007;">
                                        <p>Uncaught SyntaxError: Unexpected number.</p>
                                    </div>
                                    <div class="accordin-content">
                                        <p>此錯誤訊息通常發生在我們使用數字當作變數宣告命名的開頭。</p>
                                        <p>錯誤範例：</p>
                                        <prism-highlight>
                                            <div class="text-code" v-pre>
                                                <pre><code class="language-javascript">var 9547 = "阿比";</code></pre>
                                            </div>
                                        </prism-highlight>
                                    </div>
                                    <button class="accordin-close" @click="isActive = 0;"></button>
                                </div>
                                <div class="accordin-item" :class="isActive==1008 ? 'is-active' : ''">
                                    <div class="accordin-title" @click="isActive = 1008;">
                                        <p>Uncaught SyntaxError: Invalid or unexpected token.</p>
                                    </div>
                                    <div class="accordin-content">
                                        <p>這類錯誤訊息通常都是在說宣告的變數名稱中，包含不允許的字符或特殊符號。</p>
                                        <p>錯誤範例：</p>
                                        <prism-highlight>
                                            <div class="text-code" v-pre>
                                                <pre><code class="language-javascript">var &dog = "阿比";    // Uncaught SyntaxError: Unexpected token '&'
    var do@g = "阿比";    // Uncaught SyntaxError: Unexpected token 'do'
    var dog# = "阿比";    // Uncaught SyntaxError: Invalid or unexpected token
    var do.g = "阿比";    // Uncaught SyntaxError: Unexpected token 'do'
    var d+o+g = "阿比";    // Uncaught SyntaxError: Unexpected token '+'</code></pre>
                                            </div>
                                        </prism-highlight>
                                    </div>
                                    <button class="accordin-close" @click="isActive = 0;"></button>
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
                                    <div class="accordin-title" @click="isActive = 3001;">
                                        <p>介紹一些專有名詞以及其繁體、簡體中文的對應翻譯說法</p>
                                    </div>
                                    <div class="accordin-content">
                                        <div class="text-flex">
                                            <div class="f-width">
                                                <div class="f-head">
                                                    <div class="f-f1">原詞</div>
                                                    <div class="f-f1">繁中</div>
                                                    <div class="f-f1">簡中</div>
                                                    <div class="f-f3">說明</div>
                                                </div>
                                                <div class="f-row">
                                                    <div class="f-f1">Scope</div>
                                                    <div class="f-f1">作用域</div>
                                                    <div class="f-f1">作用域 / 范围</div>
                                                    <div class="f-f3">
                                                        <p>變數在程式中可以被存取的範圍，可分為區域變數，全域變數。</p>
                                                    </div>
                                                </div>
                                                <div class="f-row">
                                                    <div class="f-f1">Object</div>
                                                    <div class="f-f1">物件</div>
                                                    <div class="f-f1">对象</div>
                                                    <div class="f-f3">
                                                        <p>物件是構成 Javascript 的基本要素之一，除了原始型別（數字、布林值、字串），其餘東西都是物件。</p>
                                                    </div>
                                                </div>
                                                <div class="f-row">
                                                    <div class="f-f1">Function</div>
                                                    <div class="f-f1">函數 / 函式</div>
                                                    <div class="f-f1">函数</div>
                                                    <div class="f-f3">
                                                        <p>函式是構成 Javascript 的基本要素之一，它將一系列的敘述句組合起來，以執行一項特定的工作。</p>
                                                    </div>
                                                </div>
                                                <div class="f-row">
                                                    <div class="f-f1">Invoke / Call</div>
                                                    <div class="f-f1">呼叫</div>
                                                    <div class="f-f1">调用</div>
                                                    <div class="f-f3">
                                                        <p>表示我們想「使用」函式時的一種動詞行為。</p>
                                                    </div>
                                                </div>
                                                <div class="f-row">
                                                    <div class="f-f1">Callback</div>
                                                    <div class="f-f1">回調函數 / 回調函式</div>
                                                    <div class="f-f1">回调</div>
                                                    <div class="f-f3">
                                                        <p>通常指的是一個函式，該函式作為參數傳遞給另一個函式，並且在某個特定事件發生或異步操作完成時被調用。</p>
                                                    </div>
                                                </div>
                                                <div class="f-row">
                                                    <div class="f-f1">Closure</div>
                                                    <div class="f-f1">閉包</div>
                                                    <div class="f-f1">闭包</div>
                                                    <div class="f-f3">
                                                        <p>指的是捕捉外部函式變數（或使之繼續存活）的函式，它包含了一個函式，以及函式被建立時所在的環境。</p>
                                                    </div>
                                                </div>
                                                <div class="f-row">
                                                    <div class="f-f1">Data</div>
                                                    <div class="f-f1">資料</div>
                                                    <div class="f-f1">数据</div>
                                                    <div class="f-f3">
                                                        <p>通常是變數，指的是各種型別的資訊或資訊的集合，包含數字、字串、布林值、物件、陣列...等等。</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <button class="accordin-close" @click="isActive = 0;"></button>
                                </div>
                                <div class="accordin-item" :class="isActive==3002 ? 'is-active' : ''">
                                    <div class="accordin-title" @click="isActive = 3002;">
                                        <p>注意日期的格式</p>
                                    </div>
                                    <div class="accordin-content">
                                        <p>如果不是直接使用 JavaScript 內建的時間格式，而是自行建立的時間物件，格式最好遵循 ISO 8601 格式，也就是 YYYY-MM-DD，盡量不要是其他寫法例如 YYYY.MM.DD 或 YYYY/MM/DD 之類的，因為這可能導致不同瀏覽器或裝置設備無法正確地作出解析，唯有 ISO 8601 是跨平台公認的標準格式。</p>
                                    </div>
                                    <button class="accordin-close" @click="isActive = 0;"></button>
                                </div>
                                <div class="accordin-item" :class="isActive==3003 ? 'is-active' : ''">
                                    <div class="accordin-title" @click="isActive = 3003;">
                                        <p>動態計算可視畫面高度使其在行動裝置瀏覽器中滿版（扣除工具列）</p>
                                    </div>
                                    <div class="accordin-content">
                                        <prism-highlight>
                                            <div class="text-code" v-pre>
                                                <pre><code class="language-javascript">function setFullHeight() {
    const fullHeightElements = document.querySelectorAll('.full-height');
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
    fullHeightElements.forEach(el => {
        el.style.height = `calc(var(--vh, 1vh) * 100)`;
    });
}

window.addEventListener('resize', setFullHeight);
window.addEventListener('orientationchange', setFullHeight);
setFullHeight();</code></pre>
                                            </div>
                                        </prism-highlight>
                                    </div>
                                    <button class="accordin-close" @click="isActive = 0;"></button>
                                </div>
                                <div class="accordin-item" :class="isActive==3004 ? 'is-active' : ''">
                                    <div class="accordin-title" @click="isActive = 3004;">
                                        <p>用 Math.max 返回零或多個數值中的最大值</p>
                                    </div>
                                    <div class="accordin-content">
                                        <p><em>Math.max</em> 是 JavaScript 中的函數，用於傳回零個或多個數值中的最大值。當你傳遞兩個或更多數值給 <em>Math.max</em> 時，它會計算並傳回其中最大的那個數值。</p>
                                        <p>例如：</p>
                                        <prism-highlight>
                                            <div class="text-code" v-pre>
                                                <pre><code class="language-javascript">var result = Math.max(0, 5000 - 9000);
console.log(result);    // 0</code></pre>
                                            </div>
                                        </prism-highlight>
                                        <ul>
                                            <li>5000 - 9000 首先被计算，结果是 -4000</li>
                                            <li>Math.max(0, -4000) 接着被计算。由于 0 大于 -4000，所以 Math.max 返回 0</li>
                                            <li>console.log(result) 输出 0</li>
                                        </ul>
                                        <p>除此之外，還有以下幾種應用方式：</p>
                                        <h4>1. 單一參數：</h4>
                                        <prism-highlight>
                                            <div class="text-code" v-pre>
                                                <pre><code class="language-javascript">console.log(Math.max(5));    // 5</code></pre>
                                            </div>
                                        </prism-highlight>
                                        <h4>2. 多個參數：</h4>
                                        <prism-highlight>
                                            <div class="text-code" v-pre>
                                                <pre><code class="language-javascript">console.log(Math.max(1, 10, 100, 1000));    // 1000</code></pre>
                                            </div>
                                        </prism-highlight>
                                        <h4>3. 使用擴充運算子傳遞數組：</h4>
                                        <prism-highlight>
                                            <div class="text-code" v-pre>
                                                <pre><code class="language-javascript">const numbers = [1, 2, 3, 4, 5];
console.log(Math.max(...numbers));    // 5</code></pre>
                                            </div>
                                        </prism-highlight>
                                    </div>
                                    <button class="accordin-close" @click="isActive = 0;"></button>
                                </div>
                            </div>
                        </div>
                    </template>
                    <!-- jquery -->
                    <template v-else-if="btnSelected == 'jquery'">
                        <div class="text-group">
                            <h2 v-text="catalog[0].title"></h2>
                            <div class="text-accordin is-error">
                                <div class="accordin-item" :class="isActive==1001 ? 'is-active' : ''">
                                    <div class="accordin-title" @click="isActive = 1001;">
                                        <p>Uncaught ReferenceError: $ is not defined.</p>
                                    </div>
                                    <div class="accordin-content">
                                        <p>語法中「$」這個符號並未被定義，當瀏覽器 Console 出現這個錯誤訊息，通常可能原因是 jQuery 官方的腳本文件並未引用至該頁面當中，請確認是否有將該檔案放在網站路徑資料夾內並正確地引用它，或是也可以透過 CDN 的方式，例如：</p>
                                        <prism-highlight>
                                            <div class="text-code" v-pre>
                                                <pre><code class="language-html">&lt;script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.7.1/jquery.min.js"&gt;&lt;/script&gt;</code></pre>
                                            </div>
                                        </prism-highlight>
                                        <p>假如已引用官方腳本文件，並且確認路徑可正確被讀取的情況下仍出現此錯誤訊息，另一種比較常見的可能是自定義的 jQuery 程式碼片段編寫於官方腳本文件被瀏覽器讀取之前，正確的順序應該是要先載入官方文件，然後接著才是自己寫的程式碼。例如：</p>
                                        <prism-highlight>
                                            <div class="text-code" v-pre>
                                                <pre><code class="language-html">&lt;script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.7.1/jquery.min.js"&gt;&lt;/script&gt;
&lt;script&gt;
    $(function () {
        $("button").click(function () {
            $("p").addClass("is-active");
        });
    });
&lt;/script&gt;</code></pre>
                                            </div>
                                        </prism-highlight>
                                    </div>
                                    <button class="accordin-close" @click="isActive = 0;"></button>
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
                                    <div class="accordin-title" @click="isActive = 3001;">
                                        <p>$ 是什麼？</p>
                                    </div>
                                    <div class="accordin-content">
                                        <p><em>$</em> 這個符號在 jQuery 函式庫中其實就是 <em>jQuery</em> 的替代別稱，藉以省略每一次調用 jQuery 語法時都必須多打好幾個單字的麻煩。</p>
                                    </div>
                                    <button class="accordin-close" @click="isActive = 0;"></button>
                                </div>
                                <div class="accordin-item" :class="isActive==3002 ? 'is-active' : ''">
                                    <div class="accordin-title" @click="isActive = 3002;">
                                        <p>使用 $document ready 與 $funcion 的迷思？</p>
                                    </div>
                                    <div class="accordin-content">
                                        <p>我們習慣將 jQuery 自定義的語法包在 <em>$document ready</em> 裡面，例如：</p>
                                        <prism-highlight>
                                            <div class="text-code" v-pre>
                                                <pre><code class="language-javascript">$(document).ready(function() {
    $("button").click(function () {
        $("p").addClass("is-active");
    });
});</code></pre>
                                            </div>
                                        </prism-highlight>
                                        <p>此舉意義是確保 jQuery 程式碼必須在瀏覽器完全載入（load）完 HTML 後，才開始執行其程式內容，以避免 jQuery 搶在 HTML 完全載入之前就先被執行，結果找不到 DOM 進而發生錯誤的狀況。其實 JavaScript 也是相同道理，在純 JavaScript 語法中，會使用 <em>window.onload</em> 發法確認 HTML 裡的所有元素、資源都載入到瀏覽器後才執行函式內容。</p>
                                        <p>至於 <em>$funcion</em> 寫法其實是一種簡寫方式，以下這兩種寫法皆等同 <em>$document ready</em>：</p>
                                        <prism-highlight>
                                            <div class="text-code" v-pre>
                                                <pre><code class="language-javascript">// 寫法一：
$(function(){
    ...
});

// 寫法二：
$().ready(function(){
    ...
});</code></pre>
                                            </div>
                                        </prism-highlight>
                                        <p>但通常以第一種寫法最為常見。</p>
                                    </div>
                                    <button class="accordin-close" @click="isActive = 0;"></button>
                                </div>
                                <div class="accordin-item" :class="isActive==3003 ? 'is-active' : ''">
                                    <div class="accordin-title" @click="isActive = 3003;">
                                        <p>盡量使用鏈結操作來下指令</p>
                                    </div>
                                    <div class="accordin-content">
                                        <p>jQuery 函式庫中有一種特別的用法，叫做「Chaining」，顧名思義是一種鏈結的概念，可以將我們於同一選擇器對像下達的複數指令一條接著一條串接起來，這麼做的好處在於可以減少重複調用 <em>$()</em> 對象時反覆消耗的瀏覽器資源。</p>
                                        <p>舉例來說，在使用 jQuery Chaining 之前，我們對相同選擇器對象的複數指令操作可能長這樣：</p>
                                        <prism-highlight>
                                            <div class="text-code" v-pre>
                                                <pre><code class="language-javascript">$(function(){
    $("p").css("color","red");
    $("p").slideUp(2000);
    $("p").slideDown(2000);
});</code></pre>
                                            </div>
                                        </prism-highlight>
                                        <p>使用 jQuery Chaining 後的改寫：</p>
                                        <prism-highlight>
                                            <div class="text-code" v-pre>
                                                <pre><code class="language-javascript">$(function(){
    $("p").css("color","red").slideUp(2000).slideDown(2000);
});</code></pre>
                                            </div>
                                        </prism-highlight>
                                        <p>如果覺得鏈結使得程式碼變得很長一串導致不好閱讀，也可以適時進行換行和縮排，jQuery 在瀏覽器解析時會自動忽略多餘的空格、換行，以及縮排。例如：</p>
                                        <prism-highlight>
                                            <div class="text-code" v-pre>
                                                <pre><code class="language-javascript">$(function(){
    $("p").css("color","red")
        .slideUp(2000)
        .slideDown(2000);
});</code></pre>
                                            </div>
                                        </prism-highlight>
                                    </div>
                                    <button class="accordin-close" @click="isActive = 0;"></button>
                                </div>
                                <div class="accordin-item" :class="isActive==3004 ? 'is-active' : ''">
                                    <div class="accordin-title" @click="isActive = 3004;">
                                        <p>同一對象需要透過 .css() 添加複數的屬性應該怎麼寫？</p>
                                    </div>
                                    <div class="accordin-content">
                                        <p>jQuery 函式庫有提供一個名叫 <em>css()</em> 的方法，可以讓指定選擇器對象在 HTML 裡添加 inline-style CSS 屬性，例如：</p>
                                        <prism-highlight>
                                            <div class="text-code" v-pre>
                                                <pre><code class="language-javascript">$(function(){
    $("p").css("color","red");
});</code></pre>
                                            </div>
                                        </prism-highlight>
                                        <p>但假如要添加的 CSS 屬性不止一個，那麼該如何正確地下達指令？有些人或許會這樣寫：</p>
                                        <prism-highlight>
                                            <div class="text-code" v-pre>
                                                <pre><code class="language-javascript">$(function(){
    $("p").css("color","red").css("background-color","blue").css("font-size","24px");
});</code></pre>
                                            </div>
                                        </prism-highlight>
                                        <p>這樣的寫法並不算錯，因為實際上是可以正確地執行出結果，不過有更簡潔、易讀的替換方式：</p>
                                        <prism-highlight>
                                            <div class="text-code" v-pre>
                                                <pre><code class="language-javascript">$(function(){
    $("p").css("{
        'color': 'red',
        'background-color': 'blue',
        'font-size': '24px'
    });
});</code></pre>
                                            </div>
                                        </prism-highlight>
                                        <p>當然要濃縮成一行也不成問題，全看個人或團隊的習慣。</p>
                                    </div>
                                    <button class="accordin-close" @click="isActive = 0;"></button>
                                </div>
                                <div class="accordin-item" :class="isActive==3005 ? 'is-active' : ''">
                                    <div class="accordin-title" @click="isActive = 3005;">
                                        <p>優先使用 DOM 本身的屬性和方法</p>
                                    </div>
                                    <div class="accordin-content">
                                        <p>包含我在內，許多學習網頁前端的工程師，起初接觸 JavaScript 未必是原生的 JavaScript，而是從相對比較容易上手的 jQuery 開始學習，因此對於比較原生、基礎語法的認識相對薄弱，往往過於依賴 jQuery 函式庫提供的方法，卻忽略了其實原生 JavaScript 就存在更直接、簡便的方法可以運用，透過 jQuery 反而多繞道了一圈的感覺。</p>
                                        <p><em>this</em> 的使用便是其中一個例子，譬如以下這段程式碼：</p>
                                        <prism-highlight>
                                            <div class="text-code" v-pre>
                                                <pre><code class="language-javascript">$(function(){
    $("img").click(function () {
        $(this).attr("src");
    });
});</code></pre>
                                            </div>
                                        </prism-highlight>
                                        <p>在範例中，我們使用了 <em>$(this)</em> 來獲取 <em>click</em> 事件中綁定的元素 <em>img</em>，並透過 <em>attr()</em> 方法來取得它的 <em>src</em> 屬性。程式碼這樣寫固然可行，可是單就獲取屬性這個需求而言，其實直接透過 DOM 去獲取便綽綽有餘：</p>
                                        <prism-highlight>
                                            <div class="text-code" v-pre>
                                                <pre><code class="language-javascript">$(function(){
    $("img").click(function () {
        this.src;
    });
});</code></pre>
                                            </div>
                                        </prism-highlight>
                                        <p>如此一來，程式碼不僅變得更短、更好讀，同時也讓程式碼執行變得更快速。</p>
                                    </div>
                                    <button class="accordin-close" @click="isActive = 0;"></button>
                                </div>
                                <div class="accordin-item" :class="isActive==3006 ? 'is-active' : ''">
                                    <div class="accordin-title" @click="isActive = 3006;">
                                        <p>善用 Callback（回調）函式，處理動畫事件後的其他方法</p>
                                    </div>
                                    <div class="accordin-content">
                                        <p>在 CSS3 推出並廣泛被瀏覽器支援之前，jQuery 的動畫功能一直是許多網頁基本動畫呈現的實現主流方法來源之一。假設我們現在要實現一個功能：當點擊按鈕 <em>button</em> 後，指定元素對象會慢慢淡出（FadeOut），然後被 DOM 給移除（Remove）掉。或許我們直覺會這樣寫：</p>
                                        <prism-highlight>
                                            <div class="text-code" v-pre>
                                                <pre><code class="language-javascript">$(function(){
    $("button").click(function(e) {
        $(".box").fadeOut("slow").remove();
    });
});</code></pre>
                                            </div>
                                        </prism-highlight>
                                        <p>然而，實際執行後會發現，在 <em>.box</em> 淡出動畫還沒執行完之前，<em>remove()</em> 方法便同時執行，導致該看到的動畫效果沒看到，元素便直接從 DOM 裡頭消失。要解決這個問題，我們必須透過 Callback 函式，將移除方法放在裡面，如此一來該方法只會在淡出動畫執行結束後才會開始執行。具體程式碼為下：</p>
                                        <prism-highlight>
                                            <div class="text-code" v-pre>
                                                <pre><code class="language-javascript">$(function(){
    $("button").click(function(e){
        $(".box").fadeOut("slow", function(){
            $(this).remove();
        });
    });
});</code></pre>
                                            </div>
                                        </prism-highlight>
                                    </div>
                                    <button class="accordin-close" @click="isActive = 0;"></button>
                                </div>
                                <div class="accordin-item" :class="isActive==3007 ? 'is-active' : ''">
                                    <div class="accordin-title" @click="isActive = 3007;">
                                        <p>如何改變動畫方法中的元素 display: block 預設值？</p>
                                    </div>
                                    <div class="accordin-content">
                                        <p>jQuery 提供的數種動畫方法：<em>slideDown()</em>、<em>fadeIn()</em>、<em>show()</em> 等，可以使指定元素（元素的 <em>display</em> 值為 <em>none</em>）產生漸變動畫顯示在網頁上，這些方法最終會透過 HTML 的 inline-style 賦予該元素的 <em>display</em> 值為 <em>block</em>。</p>
                                        <p>例如：</p>
                                        <prism-highlight>
                                            <div class="text-code" v-pre>
                                                <pre><code class="language-javascript">$(function(){
    $("button").click(function(){
        $(".box").fadeIn();
    });
});</code></pre>
                                            </div>
                                        </prism-highlight>
                                        <p>點擊後查看 DOM 裡的變化：</p>
                                        <figure>
                                            <img src="/images/learn/js/jq-faq-1.jpg">
                                        </figure>
                                        <p>然而，我們可能會因為排板需求，會希望將動畫指定元素在顯示後的 <em>display</em> 模型設定為 <em>flex</em> 或 <em>grid</em> 之類的參數，若依照 jQuery 預設設定將會影響到元素裡面的子元件佈局。如果想要解決這個需求，我們可以在動畫方法中添加 <em>start</em> 的 Callback 函式：</p>
                                        <prism-highlight>
                                            <div class="text-code" v-pre>
                                                <pre><code class="language-javascript">$(function(){
    $("button").click(function(){
        $(".box").fadeIn({
            start: function () {
                $(this).css({
                    display: "flex"
                })
            }
        });
    });
});</code></pre>
                                            </div>
                                        </prism-highlight>
                                        <p>實測結果：</p>
                                        <figure>
                                            <img src="/images/learn/js/jq-faq-2.jpg">
                                        </figure>

                                    </div>
                                    <button class="accordin-close" @click="isActive = 0;"></button>
                                </div>
                                <div class="accordin-item" :class="isActive==3008 ? 'is-active' : ''">
                                    <div class="accordin-title" @click="isActive = 3008;">
                                        <p>如何讓動態生成的元素能在 jQuery 事件中順利運作？</p>
                                    </div>
                                    <div class="accordin-content">
                                        <p>所謂的動態元素（Dynamic Elements）指的是一種透過程式碼在 HTML 上生成的元素，這種技術通常用於改變網頁的外觀和行為，以回應用戶的互動或其他事件，而無需重新載入整個網頁。在 jQuery 中，常見的動態元素生成方式有 <em>append()</em> 或 <em>clone()</em> 等方法，我們可以透過點擊之類的觸發事件，令 DOM 在指定元素後方產生新的元素。</p>
                                        <p>然而，如果你生成的動態元素有要用來執行其他的 jQuery 事件，例如：</p>
                                        <prism-highlight>
                                            <div class="text-code" v-pre>
                                                <pre><code class="language-javascript">$(function(){
    $("button.btn-add").click(function(){
        $(".content").append("&lt;button class='btn-close'&gt;close&lt;/button&gt;");
    });

    $("button.btn-close").click(function(){
        $(this).hide();
    });
});</code></pre>
                                            </div>
                                        </prism-highlight>
                                        <p>實際測試的時候你會發現 <em>.btn-close</em> Button 確實是產生了，但不管怎麼點擊它都沒有作用，這是因為 jQuery 無法直接為動態生成的元素綁定事件。假如要解決這個問題，我們可以透過 <em>on()</em> 或 <em>delegate()</em> 方法來解決這個問題：</p>
                                        <prism-highlight>
                                            <div class="text-code" v-pre>
                                                <pre><code class="language-javascript">$(function(){
    $("button.btn-add").click(function(){
        $(".content").append("&lt;button class='btn-close'&gt;close&lt;/button&gt;");
    });

    $(document).on("click","button.btn-close", function(){
        $(this).hide();
    });
});</code></pre>
                                            </div>
                                        </prism-highlight>
                                    </div>
                                    <button class="accordin-close" @click="isActive = 0;"></button>
                                </div>
                                <div class="accordin-item" :class="isActive==3009 ? 'is-active' : ''">
                                    <div class="accordin-title" @click="isActive = 3009;">
                                        <p>如何限制 input checkbox 的勾選數量？</p>
                                    </div>
                                    <div class="accordin-content">
                                        <p>假設在某個複選問題裡有十個選項，但我們只能允許使用者勾選其中三個項目，實務上應該怎麼呈現？</p>
                                        <p>HTML：</p>
                                        <prism-highlight>
                                            <div class="text-code" v-pre>
                                                <pre><code class="language-html">&lt;ul class="list"&gt;
    &lt;li&gt;&lt;input type="checkbox" name="group"&gt;&lt;label&gt;01&lt;/label&gt;&lt;/li&gt;
    &lt;li&gt;&lt;input type="checkbox" name="group"&gt;&lt;label&gt;02&lt;/label&gt;&lt;/li&gt;
    &lt;li&gt;&lt;input type="checkbox" name="group"&gt;&lt;label&gt;03&lt;/label&gt;&lt;/li&gt;
    ...
    &lt;li&gt;&lt;input type="checkbox" name="group"&gt;&lt;label&gt;10&lt;/label&gt;&lt;/li&gt;
&lt;/ul&gt;</code></pre>
                                            </div>
                                        </prism-highlight>
                                        <p>jQuery：</p>
                                        <prism-highlight>
                                            <div class="text-code" v-pre>
                                                <pre><code class="language-javascript">var limit = 3;
$("input:checkbox").on("change", function(evt) {
if($(this).siblings(":checked").length >= limit) {
    this.checked = false;
}
});</code></pre>
                                            </div>
                                        </prism-highlight>
                                    </div>
                                    <button class="accordin-close" @click="isActive = 0;"></button>
                                </div>
                            </div>
                        </div>
                    </template>
                    <!-- vue -->
                    <template v-else-if="btnSelected == 'vue'">
                        <div class="text-group">
                            <h2 v-text="catalog[0].title"></h2>
                            <div class="text-accordin is-error">
                                <div class="accordin-item" :class="isActive==1001 ? 'is-active' : ''">
                                    <div class="accordin-title" @click="isActive = 1001;">
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
                                    <button class="accordin-close" @click="isActive = 0;"></button>
                                </div>
                                <div class="accordin-item" :class="isActive==1002 ? 'is-active' : ''">
                                    <div class="accordin-title" @click="isActive = 1002;">
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
                                    <button class="accordin-close" @click="isActive = 0;"></button>
                                </div>
                                <div class="accordin-item" :class="isActive==1003 ? 'is-active' : ''">
                                    <div class="accordin-title" @click="isActive = 1003;">
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
                                    <button class="accordin-close" @click="isActive = 0;"></button>
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
                                    <div class="accordin-title" @click="isActive = 3001;">
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
                                    <button class="accordin-close" @click="isActive = 0;"></button>
                                </div>
                                <div class="accordin-item" :class="isActive==3002 ? 'is-active' : ''">
                                    <div class="accordin-title" @click="isActive = 3002;">
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
                                    <button class="accordin-close" @click="isActive = 0;"></button>
                                </div>
                                <div class="accordin-item" :class="isActive==3003 ? 'is-active' : ''">
                                    <div class="accordin-title" @click="isActive = 3003;">
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
                                    <button class="accordin-close" @click="isActive = 0;"></button>
                                </div>
                            </div>
                        </div>
                    </template>
                    <!-- vite -->
                    <template v-else-if="btnSelected == 'vite'">
                        <div class="text-group">
                            <h2 v-text="catalog[0].title"></h2>
                            <div class="text-accordin is-error">
                                <div class="accordin-item" :class="isActive==1001 ? 'is-active' : ''">
                                    <div class="accordin-title" @click="isActive = 1001;">
                                        <p>Vite TS npm run build 發生一堆錯誤警告</p>
                                    </div>
                                    <div class="accordin-content">
                                        <p>假設 Vite 專案採用 TypeScript 開發模式，但並沒有很嚴謹遵守 TypeScript 的相關規範，在最後打包（npm run build）階段很容易會噴出一堆錯誤警告導致專案無法順利打包，如下圖所示：</p>
                                        <figure>
                                            <img src="/images/learn/js/vite-faq-1.jpg">
                                        </figure>
                                        <p>其實許多警告項目也不完全是會影響網頁運行的錯誤，但動輒幾十甚至上百的警告，要一條條處理其實也要花不少時間，如果想要跳過 TypeScript 嚴格規則並快速進行打包，可以找到專案內的 <b>package.json</b> 檔案，找到這一段程式碼：</p>
                                        <prism-highlight>
                                            <div class="text-code" v-pre>
                                                <pre><code class="language-javascript">"scripts": {
    "dev": "vite",
    "build": "run-p type-check \"build-only {@}\" --",
    "preview": "vite preview",
    "build-only": "vite build",
    "type-check": "vue-tsc --build --force"
},</code></pre>
                                            </div>
                                        </prism-highlight>
                                        <p>將 <em>type-check</em> 相關的項目移除即可：</p>
                                        <prism-highlight>
                                            <div class="text-code" v-pre>
                                                <pre><code class="language-javascript">"scripts": {
    "dev": "vite",
    "build": "run-p \"build-only {@}\" --",
    "preview": "vite preview",
    "build-only": "vite build"
},</code></pre>
                                            </div>
                                        </prism-highlight>
                                    </div>
                                    <button class="accordin-close" @click="isActive = 0;"></button>
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
                                    <div class="accordin-title" @click="isActive = 3001;">
                                        <p>如何改變 Vite 的 port？</p>
                                    </div>
                                    <div class="accordin-content">
                                        <p>執行 Vite 的 <em>npm run dev</em> 指令時，預設的本機端伺服器網址為 <b>http://localhost:5173/</b>，若因為一些因素想修改它初始 port 值，可從 <b>vite.config</b> 文件著手進行變更：</p>
                                        <prism-highlight>
                                            <div class="text-code" v-pre>
                                                <pre><code class="language-javascript">export default defineConfig({
    server: {
        port: 3006,
    },

    // 其他設定
})</code></pre>
                                            </div>
                                        </prism-highlight>
                                        <p>範例中我們將 port 設定為 3006，那麼下次執行 <em>npm run dev</em> 後，網址就將會是 <b>http://localhost:3006/</b> 了。</p>
                                    </div>
                                    <button class="accordin-close" @click="isActive = 0;"></button>
                                </div>
                                <div class="accordin-item" :class="isActive==3002 ? 'is-active' : ''">
                                    <div class="accordin-title" @click="isActive = 3002;">
                                        <p>為什麼將打包好的檔案上傳到伺服器端後，頁面重整就會顯示 404 Not Found？</p>
                                    </div>
                                    <div class="accordin-content">
                                        <p>這個問題通常是因為使用 Vite 建立的單一頁面應用程式（SPA）在重新載入頁面時，伺服器不知道如何處理非根路徑的請求。預設情況下，Vite 的開發伺服器只能處理根路徑（例如 /），而對於嵌套路由（例如 /about/info），在刷新時，伺服器不知道該如何處理這些請求，從而導致 404 錯誤。</p>
                                        <p>要解決這個問題，我們需要設定伺服器來正確處理所有的路由請求，並將它們指向我們 SPA 的入口檔案（例如 index.html）。以下是解決方案：</p>
                                        <h4>如果伺服器是 Nginx：</h4>
                                        <h6>1. 建立一個檔案並命名為 <b>your_domain.conf</b></h6>
                                        <h6>2. 於文件中添加以下程式碼：</h6>
                                        <prism-highlight>
                                            <div class="text-code" v-pre>
                                                <pre><code class="language-bash">server {
    listen 80;
    server_name your_domain.com;

    root /path/to/your/dist;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    # 其他配置...
}</code></pre>
                                            </div>
                                        </prism-highlight>
                                        <h6>3. 上傳該檔案或通知伺服器管理員，將檔案提供給他們協助進行配置。</h6>
                                        <p><br></p>
                                        <h4>如果伺服器是 Apache：</h4>
                                        <h6>1. 建立一個檔案並命名為 <b>.htaccess</b></h6>
                                        <h6>2. 於文件中添加以下程式碼：</h6>
                                        <prism-highlight>
                                            <div class="text-code" v-pre>
                                                <pre><code class="language-bash">&lt;IfModule mod_rewrite.c&gt;
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
&lt;/IfModule&gt;
</code></pre>
                                            </div>
                                        </prism-highlight>
                                        <h6>3. 將該檔案上傳至伺服器端，於入口文件（例如 index.html）放在同一個階層。</h6>
                                    </div>
                                    <button class="accordin-close" @click="isActive = 0;"></button>
                                </div>
                                <div class="accordin-item" :class="isActive==3003 ? 'is-active' : ''">
                                    <div class="accordin-title" @click="isActive = 3003;">
                                        <p>組件路由切換時畫面自動移動到最頂部</p>
                                    </div>
                                    <div class="accordin-content">
                                        <p>在路由設定檔（例如 <b>router/index.ts</b>）中添加：</p>
                                        <prism-highlight>
                                            <div class="text-code" v-pre>
                                                <pre><code class="language-javascript">const router = createRouter({
    scrollBehavior(to, from, savedPosition){
        return { top: 0 }
    },
});</code></pre>
                                            </div>
                                        </prism-highlight>
                                    </div>
                                    <button class="accordin-close" @click="isActive = 0;"></button>
                                </div>
                            </div>
                        </div>
                    </template>
                    <!-- nuxt -->
                    <template v-else-if="btnSelected == 'nuxt'">
                        <div class="text-group">
                            <h2 v-text="catalog[0].title"></h2>
                            <div class="text-accordin is-error">
                                <div class="accordin-item" :class="isActive==1001 ? 'is-active' : ''">
                                    <div class="accordin-title" @click="isActive = 1001;">
                                        <p>ERROR Exiting due to prerender errors.</p>
                                    </div>
                                    <div class="accordin-content">
                                        <p>這個問題通常發生在我們使用 <em>npm run generate</em> 打包並生成專案時，它表示在預渲染（prerender）過程中發生了錯誤，導致無法順利完成預渲染。可能原因有很多，如果已檢查過 Vue 組件及其他程式碼都不存在渲染錯誤，那或許是 Nitro 的問題，Nitro 是 Nuxt3 採用的伺服器引擎讓開發者更方便處理跨域問題。總而言之，你可以嘗試在 <b>nuxt.config.ts</b> 設定檔中添加以下程式碼：</p>
                                        <prism-highlight>
                                            <div class="text-code" v-pre>
                                                <pre><code class="language-javascript">export default defineNuxtConfig({
    nitro: {
        prerender: {
        // Workaround for "Error: [404] Page not found: /manifest.json"
        failOnError: false
        }
    }
});</code></pre>
                                            </div>
                                        </prism-highlight>
                                        <p>它的作用是告訴預渲染過程中遇到錯誤時是否要立即停止。當設置為 <em>false</em> 時，表示當遇到錯誤時不立即停止，而是繼續執行預渲染過程。這樣可以避免一些輕微的錯誤中斷整個預渲染過程，但同時也可能導致一些錯誤情況被忽略或延遲處理。</p>
                                    </div>
                                    <button class="accordin-close" @click="isActive = 0;"></button>
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
                            </div>
                        </div>
                    </template>
                    <!-- typescript -->
                    <template v-else-if="btnSelected == 'typescript'">
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
                            </div>
                        </div>
                    </template>
                    <!-- nodejs -->
                    <template v-else-if="btnSelected == 'nodejs'">
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
                                    <div class="accordin-title" @click="isActive = 3001;">
                                        <p>如何切換 Node 之間的版本？</p>
                                    </div>
                                    <div class="accordin-content">
                                        <p>Node.js 迄今已進入 v20.x 版本，倘若我們時常將本機的 Node 更新到最新版本，有些早期開發的專案可能會因此無法順利執行編譯，假如我們希望電腦能兼容不同的全域版本，讓專案依據各自當時開發環境所使用的版本順利運行，我們可以使用一套名為「NVM」（Node Version Manager）的工具。NVM 是一個用來管理 Node.js 版本的指令工具，我們可以透過它安裝指定版本的 Node.js，並進行切換等管理行為。以下列出安裝及使用步驟：</p>
                                        <h6>1. 下載 NVM 安裝程式並執行安裝：</h6>
                                        <p>NVM（Windows）網址：<a href="https://github.com/coreybutler/nvm-windows" target="_blank">https://github.com/coreybutler/nvm-windows</a></p>
                                        <p>在 README.md 中找到 NVM for Windows 裡面的 <a href="https://github.com/coreybutler/nvm-windows/releases" target="_blank">Download Now</a> 連結，點擊開啟，下載想要安裝的方式（例如 nvm-setup.exe ）並執行安裝。</p>
                                        <p><br></p>
                                        <h6>2. 開啟命令提示字元</h6>
                                        <p>打開電腦的命令提示字元，輸入指令 <em>nvm -v</em> 確認 NVM 是否已成功安裝在電腦內。</p>
                                        <p><br></p>
                                        <h6>3. 安裝需要的 Node.js 版本</h6>
                                        <p>我們可以透過 NVM 去安裝想要的 Node.js 版本，例如想要安裝 16.x 的版本，則輸入以下指令：</p>
                                        <prism-highlight>
                                            <div class="text-code" v-pre>
                                                <pre><code class="language-bash">nvm install 16</code></pre>
                                            </div>
                                        </prism-highlight>
                                        <p><br></p>
                                        <h6>4. 切換指定的 Node.js 版本</h6>
                                        <p>承襲上一步驟，安裝完 16.x 的 Node.js 版本後，我們可以透過下方指令進行版本上的切換：</p>
                                        <prism-highlight>
                                            <div class="text-code" v-pre>
                                                <pre><code class="language-bash">nvm use 16</code></pre>
                                            </div>
                                        </prism-highlight>
                                        <p>如此便會將目前作業系統裡的 Node.js 運行版本指定為 16.x 的版本，而我們也可以透過 <em>nvm list</em> 來查看目前電腦總共安裝了多少版本。</p>
                                        <figure>
                                            <img src="/images/learn/js/nodejs-faq-1.jpg">
                                        </figure>
                                        <p>例如我的電腦目前已經安裝 12、16、17、18 等版本，而由於稍早已將版本切換為 16，所以可以看到截圖裡 NVM 告知目前電腦使用的版本為 16。</p>
                                        <p>或是我們也可以直接用 <em>node -v</em> 來確認電腦目前 Node.js 版本為多少。</p>
                                    </div>
                                    <button class="accordin-close" @click="isActive = 0;"></button>
                                </div>
                            </div>
                        </div>
                    </template>
                    <!-- yarn -->
                    <template v-else-if="btnSelected == 'yarn'">
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
                                    <div class="accordin-title" @click="isActive = 3001;">
                                        <p>yarn : 因為這個系統上已停用指令碼執行，所以無法載入 Path...\AppData\Roaming\npm\yarn.ps1 檔案。如需詳細資訊，請參閱 about_Execution_Policies，網址為 https:/go.microsoft.com/fwlink/?LinkID=135170。 位於 線路:1 字元:1</p>
                                    </div>
                                    <div class="accordin-content">
                                        <p>這個錯誤訊息表示你的作業系統禁用了執行 PowerShell 指令碼，而 Yarn 則必須透過 PowerShell 指令碼來執行。要解決這個問題，可以按照以下步驟來調整你的 PowerShell 執行原則：</p>
                                        <h6>1. 在「開始」選單中找到「PowerShell」應用程式，在右鍵快捷選單裡選擇「以系統管理員身份運行」。或是透過搜尋功能找到「PowerShell」，同樣選擇「以系統管理員身份運行」。</h6>
                                        <figure>
                                            <img src="/images/learn/js/yarn-1.jpg">
                                        </figure>
                                        <p><br></p>
                                        <h6>2. 在開啟的「PowerShell」應用程式視窗裡輸入以下指令：</h6>
                                        <prism-highlight>
                                            <div class="text-code" v-pre>
                                                <pre><code class="language-powershell">Get-ExecutionPolicy</code></pre>
                                            </div>
                                        </prism-highlight>
                                        <p>這個指令會顯示目前 PowerShell 的執行原則設定，假如你執行 <em>yarn</em> 遭遇到這則錯誤訊息，通常執行這個指令後回傳的結果會是 <em>Restricted</em>，也就是受限制的狀態。</p>
                                        <p><br></p>
                                        <h6>3. 輸入以下指令將執行原則修改為 <em>RemoteSigned</em>：</h6>
                                        <prism-highlight>
                                            <div class="text-code" v-pre>
                                                <pre><code class="language-powershell">Set-ExecutionPolicy RemoteSigned</code></pre>
                                            </div>
                                        </prism-highlight>
                                        <p>指令送出後系統會詢問是否確認要變更執行原則，輸入「Y」進行變更，之後再次執行 <em>yarn</em> 指令，應該就能順利執行動作了。</p>
                                        <figure>
                                            <img src="/images/learn/js/yarn-2.jpg">
                                            <figcaption>PowerShell 變更執行原則完整指令操作流程。</figcaption>
                                        </figure>
                                        <p><br></p>
                                        <blockquote class="is-warning">
                                            <p>修改執行原則可能對系統安全性產生影響，因此請謹慎操作。</p>
                                        </blockquote>
                                    </div>
                                    <button class="accordin-close" @click="isActive = 0;"></button>
                                </div>
                            </div>
                        </div>
                    </template>
                    <!-- git -->
                    <template v-else-if="btnSelected == 'git'">
                        <div class="text-group">
                            <h2 v-text="catalog[0].title"></h2>
                            <div class="text-accordin is-error">
                                <div class="accordin-item" :class="isActive==1001 ? 'is-active' : ''">
                                    <div class="accordin-title" @click="isActive = 1001;">
                                        <p>error: Your local changes to the following files would be overwritten by checkout:...Please commit your changes or stash them before you switch branches.</p>
                                    </div>
                                    <div class="accordin-content">
                                        <p>這個錯誤信息表示你在嘗試切換到 master 分支時，Git 發現你當前工作目錄中的一些文件有未提交的變更，而這些變更會在切換分支的過程中被覆蓋。為了保護你的未提交變更，Git 阻止了這次分支切換操作。以下有三種處理方案：</p>
                                        <h5>1. 提交變更：</h5>
                                        <p>如果你希望保留並提交這些變更，你可以將它們添加到暫存區並進行提交。</p>
                                        <prism-highlight>
                                            <div class="text-code" v-pre>
                                                <pre><code class="language-powershell">git add .
git commit -m "版本名稱"</code></pre>
                                            </div>
                                        </prism-highlight>
                                        <p>提交後就可以藉由 <em>git checkout master</em> 切換到主分支或其他分支。</p>
                                        <p><br></p>
                                        <h5>2. 暫存（stash）變更：</h5>
                                        <p>如果你不想現在提交這些變更，但希望保留它們以便稍後使用，你可以使用 <em>git stash</em> 將它們存起來。</p>
                                        <prism-highlight>
                                            <div class="text-code" v-pre>
                                                <pre><code class="language-powershell">git stash</code></pre>
                                            </div>
                                        </prism-highlight>
                                        <p>這會保存你的工作目錄中的變更並允許你切換到 master 分支或其他分支。</p>
                                        <p>後續當你想應用剛剛存起來的變更，可以在任何需要的分支上使用：</p>
                                        <prism-highlight>
                                            <div class="text-code" v-pre>
                                                <pre><code class="language-powershell">git stash apply</code></pre>
                                            </div>
                                        </prism-highlight>
                                        <p><br></p>
                                        <h5>3. 放棄變更：</h5>
                                        <p>如果你確定這些變更不需要保存，可以使用以下命令放棄它們：</p>
                                        <prism-highlight>
                                            <div class="text-code" v-pre>
                                                <pre><code class="language-powershell">git reset --hard</code></pre>
                                            </div>
                                        </prism-highlight>
                                        <p>這樣會放棄所有未提交的變更，然後你就可以切換到 master 或其他分支。</p>
                                    </div>
                                    <button class="accordin-close" @click="isActive = 0;"></button>
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
                                    <div class="accordin-title" @click="isActive = 3001;">
                                        <p>如何捨棄本地 master 分支的更改，並強制更新成遠端 master 分支的最新版本？</p>
                                    </div>
                                    <div class="accordin-content">
                                        <h6>1. 確保目前在 master 分支上：</h6>
                                        <prism-highlight>
                                            <div class="text-code" v-pre>
                                                <pre><code class="language-powershell">git checkout master</code></pre>
                                            </div>
                                        </prism-highlight>
                                        <h6>2. 從遠端獲取最新的分支訊息：</h6>
                                        <prism-highlight>
                                            <div class="text-code" v-pre>
                                                <pre><code class="language-powershell">git fetch origin</code></pre>
                                            </div>
                                        </prism-highlight>
                                        <h6>3. 重置本地 master 分支到遠端 master 分支：</h6>
                                        <prism-highlight>
                                            <div class="text-code" v-pre>
                                                <pre><code class="language-powershell">git reset --hard origin/master</code></pre>
                                            </div>
                                        </prism-highlight>
                                        <p>重置本地 master 分支，使其與遠端 master 分支完全一致，捨棄所有本地的更改。</p>
                                    </div>
                                    <button class="accordin-close" @click="isActive = 0;"></button>
                                </div>
                                <div class="accordin-item" :class="isActive==3002 ? 'is-active' : ''">
                                    <div class="accordin-title" @click="isActive = 3002;">
                                        <p>如何修改最近一次 Commit 提交的訊息文字？</p>
                                    </div>
                                    <div class="accordin-content">
                                        <prism-highlight>
                                            <div class="text-code" v-pre>
                                                <pre><code class="language-powershell">git commit --amend -m "新的提交訊息名稱"</code></pre>
                                            </div>
                                        </prism-highlight>
                                    </div>
                                    <button class="accordin-close" @click="isActive = 0;"></button>
                                </div>
                                <div class="accordin-item" :class="isActive==3003 ? 'is-active' : ''">
                                    <div class="accordin-title" @click="isActive = 3003;">
                                        <p>如何 merge 兩個不同的分支？</p>
                                    </div>
                                    <div class="accordin-content">
                                        <p>假設目前有兩個分支，分別叫做 <em>cat</em> 與 <em>dog</em>，而現在我們希望將 <em>cat</em> 合併到 <em>dog</em> 分支裡，執行步驟如下：</p>
                                        <h6>1. 切換到 <em>dog</em> 分支：</h6>
                                        <prism-highlight>
                                            <div class="text-code" v-pre>
                                                <pre><code class="language-powershell">git branch dog</code></pre>
                                            </div>
                                        </prism-highlight>
                                        <h6>2. 合併 <em>cat</em> 分支給 <em>dog</em>：</h6>
                                        <prism-highlight>
                                            <div class="text-code" v-pre>
                                                <pre><code class="language-powershell">git merge cat</code></pre>
                                            </div>
                                        </prism-highlight>
                                        <p>如果合併的過程發生衝突，Git 會提示哪些檔案存在衝突，我們必須手動編輯該檔案，將衝突解決後再重新將這些檔案 <em>add</em> 並執行 <em>commit</em>，然後就會完成合併。</p>
                                        <p>最後再將分支推送到遠端儲存庫即可：</p>
                                        <prism-highlight>
                                            <div class="text-code" v-pre>
                                                <pre><code class="language-powershell">git push origin dog</code></pre>
                                            </div>
                                        </prism-highlight>
                                    </div>
                                    <button class="accordin-close" @click="isActive = 0;"></button>
                                </div>
                                <div class="accordin-item" :class="isActive==3004 ? 'is-active' : ''">
                                    <div class="accordin-title" @click="isActive = 3004;">
                                        <p>如何下載遠端儲存庫指定的分支？</p>
                                    </div>
                                    <div class="accordin-content">
                                        <p>在本機端還沒有該專案的前提下，我們可以透過 <em>git clone</em> 直接克隆特定的分支：</p>
                                        <prism-highlight>
                                            <div class="text-code" v-pre>
                                                <pre><code class="language-powershell">git clone -b 分支名稱 遠端儲存庫url</code></pre>
                                            </div>
                                        </prism-highlight>
                                        <p><br></p>
                                        <p>如果本機端已存在該專案，只是缺少該分支，可以依循以下步驟：</p>
                                        <h6>1. 檢查遠端儲存庫：</h6>
                                        <prism-highlight>
                                            <div class="text-code" v-pre>
                                                <pre><code class="language-powershell">git fetch origin</code></pre>
                                            </div>
                                        </prism-highlight>
                                        <h6>2. 檢出特定分支：</h6>
                                        <prism-highlight>
                                            <div class="text-code" v-pre>
                                                <pre><code class="language-powershell">git checkout -b 分支名稱 origin/分支名稱</code></pre>
                                            </div>
                                        </prism-highlight>
                                        <h6>3. 拉取最新的更改：</h6>
                                        <prism-highlight>
                                            <div class="text-code" v-pre>
                                                <pre><code class="language-powershell">git pull origin 分支名稱</code></pre>
                                            </div>
                                        </prism-highlight>
                                        <p>通常而言第二步驟理應已經下載遠端分支最新的內容，但如果不是很確定自己是否拉取的是最新版本的分支資料，就可以接著執行第三步驟的更新。</p>
                                    </div>
                                    <button class="accordin-close" @click="isActive = 0;"></button>
                                </div>
                                <div class="accordin-item" :class="isActive==3005 ? 'is-active' : ''">
                                    <div class="accordin-title" @click="isActive = 3005;">
                                        <p>忘記另開分支就在 master 分支上修改了檔案，還來的及將檔案提交給新的分支嗎？</p>
                                    </div>
                                    <div class="accordin-content">
                                        <p>答案是可以的，在開始下 Git 指令之前，先確保編輯檔案都已經儲存。</p>
                                        <h6>1. 新建並切換到新分支：</h6>
                                        <prism-highlight>
                                            <div class="text-code" v-pre>
                                                <pre><code class="language-powershell">git checkout -b branchName</code></pre>
                                            </div>
                                        </prism-highlight>
                                        <h6>2. 提交更改：</h6>
                                        <prism-highlight>
                                            <div class="text-code" v-pre>
                                                <pre><code class="language-powershell">git add .
git commit -m "提交訊息"</code></pre>
                                            </div>
                                        </prism-highlight>
                                        <p>這樣修改後的檔案所提交的 Git Commit 會存在於新建立的分支上，而非 master。</p>
                                        <h3>如果已經在 master 上提交了更改？</h3>
                                        <p>假如是這個情況，就需要使用 <em>git cherry-pick</em> 指令，具體方法如下：</p>
                                        <h6>1. 從 log 紀錄中查詢要移動到新分支的 commit HASH 值：</h6>
                                        <prism-highlight>
                                            <div class="text-code" v-pre>
                                                <pre><code class="language-powershell">git log --oneline</code></pre>
                                            </div>
                                        </prism-highlight>
                                        <p>假設要移動的 Commit HASH 值為 abc123。</p>
                                        <h6>2. 新建並切換到新分支：</h6>
                                        <prism-highlight>
                                            <div class="text-code" v-pre>
                                                <pre><code class="language-powershell">git checkout -b branchName</code></pre>
                                            </div>
                                        </prism-highlight>
                                        <h6>3. 提交更改：</h6>
                                        <prism-highlight>
                                            <div class="text-code" v-pre>
                                                <pre><code class="language-powershell">git cherry-pick abc123</code></pre>
                                            </div>
                                        </prism-highlight>
                                        <p>假如有多個 Commit 要移動，則分別記錄下它們的 HASH 值，在建立好新分支後逐一 <em>cherry-pick</em> 即可。例如：</p>
                                        <prism-highlight>
                                            <div class="text-code" v-pre>
                                                <pre><code class="language-powershell">git cherry-pick abc123
git cherry-pick xyz456
git cherry-pick mon789</code></pre>
                                            </div>
                                        </prism-highlight>

                                    </div>
                                    <button class="accordin-close" @click="isActive = 0;"></button>
                                </div>
                            </div>
                        </div>
                    </template>
                    <!-- css -->
                    <template v-else-if="btnSelected == 'css'">
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
                                    <div class="accordin-title" @click="isActive = 3001;">
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
                                    <button class="accordin-close" @click="isActive = 0;"></button>
                                </div>
                                <div class="accordin-item" :class="isActive==3002 ? 'is-active' : ''">
                                    <div class="accordin-title" @click="isActive = 3002;">
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
                                    <button class="accordin-close" @click="isActive = 0;"></button>
                                </div>
                                <div class="accordin-item" :class="isActive==3003 ? 'is-active' : ''">
                                    <div class="accordin-title" @click="isActive = 3003;">
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
                                    <button class="accordin-close" @click="isActive = 0;"></button>
                                </div>
                                <div class="accordin-item" :class="isActive==3004 ? 'is-active' : ''">
                                    <div class="accordin-title" @click="isActive = 3004;">
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
                                    <button class="accordin-close" @click="isActive = 0;"></button>
                                </div>
                                <div class="accordin-item" :class="isActive==3005 ? 'is-active' : ''">
                                    <div class="accordin-title" @click="isActive = 3005;">
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
                                    <button class="accordin-close" @click="isActive = 0;"></button>
                                </div>
                                <div class="accordin-item" :class="isActive==3006 ? 'is-active' : ''">
                                    <div class="accordin-title" @click="isActive = 3006;">
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
                                    <button class="accordin-close" @click="isActive = 0;"></button>
                                </div>
                                <div class="accordin-item" :class="isActive==3007 ? 'is-active' : ''">
                                    <div class="accordin-title" @click="isActive = 3007;">
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
                                    <button class="accordin-close" @click="isActive = 0;"></button>
                                </div>
                                <div class="accordin-item" :class="isActive==3008 ? 'is-active' : ''">
                                    <div class="accordin-title" @click="isActive = 3008;">
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
                                    <button class="accordin-close" @click="isActive = 0;"></button>
                                </div>
                                <div class="accordin-item" :class="isActive==3009 ? 'is-active' : ''">
                                    <div class="accordin-title" @click="isActive = 3009;">
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
                                    <button class="accordin-close" @click="isActive = 0;"></button>
                                </div>
                                <div class="accordin-item" :class="isActive==3010 ? 'is-active' : ''">
                                    <div class="accordin-title" @click="isActive = 3010;">
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
                                    <button class="accordin-close" @click="isActive = 0;"></button>
                                </div>
                                <div class="accordin-item" :class="isActive==3011 ? 'is-active' : ''">
                                    <div class="accordin-title" @click="isActive = 3011;">
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
                                    <button class="accordin-close" @click="isActive = 0;"></button>
                                </div>
                                <div class="accordin-item" :class="isActive==3012 ? 'is-active' : ''">
                                    <div class="accordin-title" @click="isActive = 3012;">
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
                                    <button class="accordin-close" @click="isActive = 0;"></button>
                                </div>
                            </div>
                        </div>
                    </template>
                    <!-- html -->
                    <template v-else-if="btnSelected == 'html'">
                        <div class="text-group">
                            <h2 v-text="catalog[0].title"></h2>
                            <div class="text-accordin is-error">
                                <div class="accordin-item" :class="isActive==3001 ? 'is-active' : ''">
                                    <div class="accordin-title" @click="isActive = 3001;">
                                        <p>Third-party cookie will be blocked. Learn more in the Issues tab.</p>
                                    </div>
                                    <div class="accordin-content">
                                        <p>這個錯誤通常是指你的瀏覽器正在阻止來自第三方域的 cookie。這種行為通常是出於隱私和安全考量，現代瀏覽器越來越多地限制或完全禁止第三方 cookie。這可能會影響某些網站或服務的正常運行，特別是那些依賴於第三方 cookie 來進行認證、跟蹤或廣告服務的網站。</p>
                                        <p>如果你的應用或網站依賴於第三方 cookie，有幾種解決方案可以考慮：</p>
                                        <h4>1. 使用同源策略：</h4>
                                        <p>確保所有 cookie 都是由與當前網站相同的域設置的，即所謂的「第一方 cookie」。</p>
                                        <h4>2. 更新後端設置：</h4>
                                        <p>設置後端服務，使其通過第一方 cookie 或其他認證方式進行交互。</p>
                                        <h4>3. 使用其他存儲方式：</h4>
                                        <p>例如使用 localStorage 或 sessionStorage 來替代 cookie，儘管這些方法在跨域場景中有一定限制。</p>
                                        <h4>4. Content Security Policy（CSP）：</h4>
                                        <p>配置 CSP 標頭來明確允許哪些來源的資源可以被加載，以提高安全性。</p>
                                        <h4>5. 前端設置：</h4>
                                        <p>在前端程式碼中，確保設置 cookie 時使用適當的 <em>SameSite</em> 屬性，例如 <em>SameSite=Lax</em> 或 <em>SameSite=Strict</em>。</p>
                                        <p>假設你在前端設置 cookie，可以使用如下程式碼來設置 <em>SameSite</em> 屬性：：</p>
                                        <prism-highlight>
                                            <div class="text-code" v-pre>
                                                <pre><code class="language-javascript">document.cookie = "name=value; SameSite=Lax";</code></pre>
                                            </div>
                                        </prism-highlight>
                                        <p>或者，如果你使用的是某個第三方服務，請確保這些服務配置了適當的 <em>SameSite</em> 屬性：</p>
                                        <prism-highlight>
                                            <div class="text-code" v-pre>
                                                <pre><code class="language-python"># 假設你使用 Flask 框架在後端設置 cookie
from flask import make_response

response = make_response("Setting a cookie")
response.set_cookie('name', 'value', samesite='Lax')
return response</code></pre>
                                            </div>
                                        </prism-highlight>
                                    </div>
                                    <button class="accordin-close" @click="isActive = 0;"></button>
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
                                    <div class="accordin-title" @click="isActive = 3001;">
                                        <p>設定 img 元素的預設圖</p>
                                    </div>
                                    <div class="accordin-content">
                                        <prism-highlight>
                                            <div class="text-code" v-pre>
                                                <pre><code class="language-html">&lt;img src="影像路徑" onerror="this.src='images/default.jpg'"&gt;</code></pre>
                                            </div>
                                        </prism-highlight>
                                    </div>
                                    <button class="accordin-close" @click="isActive = 0;"></button>
                                </div>
                                <div class="accordin-item" :class="isActive==3002 ? 'is-active' : ''">
                                    <div class="accordin-title" @click="isActive = 3002;">
                                        <p>設定 input 元素的預設選項</p>
                                    </div>
                                    <div class="accordin-content">
                                        <prism-highlight>
                                            <div class="text-code" v-pre>
                                                <pre><code class="language-html">&lt;input list="listName" /&gt;
&lt;datalist id="listName"&gt;
    &lt;option value="項目1"&gt;
    &lt;option value="項目2"&gt;
    &lt;option value="項目3"&gt;
&lt;/datalist&gt;</code></pre>
                                            </div>
                                        </prism-highlight>
                                    </div>
                                    <button class="accordin-close" @click="isActive = 0;"></button>
                                </div>
                                <div class="accordin-item" :class="isActive==3003 ? 'is-active' : ''">
                                    <div class="accordin-title" @click="isActive = 3003;">
                                        <p>將連結文字轉為下載型態，並將檔名更改為自行命名的檔案名稱</p>
                                    </div>
                                    <div class="accordin-content">
                                        <prism-highlight>
                                            <div class="text-code" v-pre>
                                                <pre><code class="language-html">&lt;a href="/filePath" download="fileName"&gt;超連結訊息&lt;/a&gt;</code></pre>
                                            </div>
                                        </prism-highlight>
                                    </div>
                                    <button class="accordin-close" @click="isActive = 0;"></button>
                                </div>
                                <div class="accordin-item" :class="isActive==3004 ? 'is-active' : ''">
                                    <div class="accordin-title" @click="isActive = 3004;">
                                        <p>元素點擊開啟指定路徑連結的方法</p>
                                    </div>
                                    <div class="accordin-content">
                                        <prism-highlight>
                                            <div class="text-code" v-pre>
                                                <pre><code class="language-html">&lt;button onClick="window.location.href='https://www.google.com.tw/'"&gt;Click&lt;/button&gt;</code></pre>
                                            </div>
                                        </prism-highlight>
                                    </div>
                                    <button class="accordin-close" @click="isActive = 0;"></button>
                                </div>
                            </div>
                        </div>
                    </template>
                </div>
            </div>
        </div>
    </section>
</template>

<style lang="scss" scoped>
.text-group {
    animation-name: fadeUp;
    animation-duration: .5s;
    animation-fill-mode: both;
    > h2 {
        font-size: 1.25rem;
    }
}

.text-accordin {
    position: relative;
    margin-bottom: 2rem;
}

.accordin-item {
    position: relative;
    margin-bottom: 1rem;
}

.accordin-title {
    position: relative;
    padding: .5rem 1rem;
    cursor: pointer;
    &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        display: block;
        width: 100%;
        height: 100%;
        border-width: 2px;
        border-style: solid;
        opacity: 0;
        pointer-events: none;
        transition: all .1s;
    }
    p {
        margin-bottom: 0;
        &::before {
            position: relative;
            display: inline-block;
            vertical-align: middle;
            width: 1.25rem;
            height: 1.25rem;
            line-height: 1.5rem;
            font-family: "Dongle", sans-serif;
            font-weight: 400;
            font-size: 1.25rem;
            text-align: center;
            color: #FFF;
            border-radius: 100%;
            margin-right: .5rem;
        }
    }
    .is-error & {
        color: #ed6363;
        background-color: #ffebeb;
        &::before {
            border-color: #ed6363;
        }
        p {
            &::before {
                content: 'X';
                background-color: #ed6363;
            }
        }
    }
    .is-warning & {
        color: #000;
        background-color: #fff9db;
        &::before {
            border-color: #ffe066;
        }
        p {
            &::before {
                content: '!';
                background-color: #ffe066;
            }
        }
    }
    .is-others & {
        color: #000;
        background-color: #ebf8ff;
        &::before {
            border-color: #63b3ed;
        }
        p {
            &::before {
                content: 'i';
                background-color: #63b3ed;
            }
        }
    }
    &:hover,
    .is-active & {
        &::before {
            opacity: 1;
        }
    }
}

.accordin-content {
    position: relative;
    display: none;
    background-color: #fcfcfc;
    padding: 1rem 2rem 4rem;
    .is-active & {
        display: block;
    }
}

.accordin-close {
    position: absolute;
    bottom: 1rem;
    left: 50%;
    z-index: 20;
    display: none;
    width: auto;
    font-size: 0.875rem;
    color: #AAA;
    padding: 0 .5rem;
    transform: translateX(-50%);
    transition: color .2s;
    &::before {
        content: '[close]';
    }
    &:hover {
        color: var(--black);
    }
    .is-active & {
        display: block;
    }
}
</style>