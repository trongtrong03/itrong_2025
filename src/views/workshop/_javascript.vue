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
                    <p>Uncaught ReferenceError: dog is not defined.</p>
                </div>
                <div class="accordin-content">
                    <p>意思是變數 <em>dog</em> 沒有經過定義（宣告），檢查回傳錯誤的程式所呼叫的作用域內是否有宣告 <em>dog</em> 變數。</p>
                </div>
                <button class="accordin-close" @click="toggle(0)"></button>
            </div>
            <div class="accordin-item" :class="isActive==1002 ? 'is-active' : ''">
                <div class="accordin-title" @click="toggle(1002)">
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
                <button class="accordin-close" @click="toggle(0)"></button>
            </div>
            <div class="accordin-item" :class="isActive==1003 ? 'is-active' : ''">
                <div class="accordin-title" @click="toggle(1003)">
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
                <button class="accordin-close" @click="toggle(0)"></button>
            </div>
            <div class="accordin-item" :class="isActive==1004 ? 'is-active' : ''">
                <div class="accordin-title" @click="toggle(1004)">
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
                <button class="accordin-close" @click="toggle(0)"></button>
            </div>
            <div class="accordin-item" :class="isActive==1005 ? 'is-active' : ''">
                <div class="accordin-title" @click="toggle(1005)">
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
                <button class="accordin-close" @click="toggle(0)"></button>
            </div>
            <div class="accordin-item" :class="isActive==1006 ? 'is-active' : ''">
                <div class="accordin-title" @click="toggle(1006)">
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
                <button class="accordin-close" @click="toggle(0)"></button>
            </div>
            <div class="accordin-item" :class="isActive==1007 ? 'is-active' : ''">
                <div class="accordin-title" @click="toggle(1007)">
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
                <button class="accordin-close" @click="toggle(0)"></button>
            </div>
            <div class="accordin-item" :class="isActive==1008 ? 'is-active' : ''">
                <div class="accordin-title" @click="toggle(1008)">
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
                <button class="accordin-close" @click="toggle(0)"></button>
            </div>
            <div class="accordin-item" :class="isActive==3002 ? 'is-active' : ''">
                <div class="accordin-title" @click="toggle(3002)">
                    <p>注意日期的格式</p>
                </div>
                <div class="accordin-content">
                    <p>如果不是直接使用 JavaScript 內建的時間格式，而是自行建立的時間物件，格式最好遵循 ISO 8601 格式，也就是 YYYY-MM-DD，盡量不要是其他寫法例如 YYYY.MM.DD 或 YYYY/MM/DD 之類的，因為這可能導致不同瀏覽器或裝置設備無法正確地作出解析，唯有 ISO 8601 是跨平台公認的標準格式。</p>
                </div>
                <button class="accordin-close" @click="toggle(0)"></button>
            </div>
            <div class="accordin-item" :class="isActive==3003 ? 'is-active' : ''">
                <div class="accordin-title" @click="toggle(3003)">
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
                <button class="accordin-close" @click="toggle(0)"></button>
            </div>
            <div class="accordin-item" :class="isActive==3004 ? 'is-active' : ''">
                <div class="accordin-title" @click="toggle(3004)">
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
                <button class="accordin-close" @click="toggle(0)"></button>
            </div>
            <div class="accordin-item" :class="isActive==3005 ? 'is-active' : ''">
                <div class="accordin-title" @click="toggle(3005)">
                    <p>setTimeout V.S setInterval</p>
                </div>
                <div class="accordin-content">
                    <p><em>setTimeout</em> 與 <em>setInterval</em> 都是 JavaScript 中用來控制定時任務的兩個非常常見的方法，兩者最主要的區別是前者只會到達指定時間後執行一次函式內容，而後者則是會反覆執行函式內容直到被清除或關閉頁面為止。</p>
                    <h4>setTimeout：</h4>
                    <p>用於設置一個定時器，當定時器到達指定時間後，執行一次指定的回調函數。</p>
                    <p>例如：</p>
                    <prism-highlight>
                        <div class="text-code" v-pre>
                            <pre><code class="language-javascript">setTimeout(() => {
    console.log('Hello World!');
}, 2000);</code></pre>
                        </div>
                    </prism-highlight>
                    <p>上面這個程式片段執行後會在兩秒後打印出「Hello World!」的 Console 訊息。</p>
                    <p><br></p>
                    <h4>setInterval：</h4>
                    <p>用於設置一個定時器，當定時器到達指定時間後，會反覆執行指定的回調函數，直到清除這個定時器或關閉頁面為止。</p>
                    <p>例如：</p>
                    <prism-highlight>
                        <div class="text-code" v-pre>
                            <pre><code class="language-javascript">setInterval(() => {
    console.log('Hello World!');
}, 1000);</code></pre>
                        </div>
                    </prism-highlight>
                    <p>上面這個程式片段執行後會每秒打印一次「Hello World!」的 Console 訊息，並且會一直持續下去，直到我們手動清除這個定時器或關閉頁面。</p>
                    <br>
                    <p>如果要清除定時器的狀態，可以分別使用 <em>clearTimeout</em> 以及 <em>clearInterval</em>。舉個例子：</p>
                    <prism-highlight>
                        <div class="text-code" v-pre>
                            <pre><code class="language-javascript">const timeoutId = setTimeout(() => {
    console.log('這條消息本來會顯示出來，但它不會因為定時器被清除');
}, 5000);

clearTimeout(timeoutId); // 這會取消上面的 setTimeout

const intervalId = setInterval(() => {
    console.log('這個消息每秒鐘會打印一次，但只會打印三次');
}, 1000);

setTimeout(() => {
    clearInterval(intervalId); // 三秒後清除這個定時器
}, 3000);</code></pre>
                        </div>
                    </prism-highlight>
                </div>
                <button class="accordin-close" @click="toggle(0)"></button>
            </div>
        </div>
    </div>
</template>