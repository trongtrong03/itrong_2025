<script setup lang="ts">
import { reactive } from "vue";
import type { CatalogItem } from '@/stores/catalog';

// 引用組件
import BaseTextContent from '@/components/Common/BaseTextContent.vue';
import Title from "@/components/Common/BaseTextTitle.vue";
import PrismHighlight from '@/components/Common/PrismHighlight.vue';

// 目錄
const catalog = reactive<CatalogItem[]>([
    { id: 0, title: '序、前言' },
    { id: 1, title: '一、Alpha 透明度（alpha）' },
    { id: 2, title: '二、亮度（lightness）' },
    { id: 3, title: '三、加深（darken）/減輕（lighten）' },
    { id: 4, title: '四、顏色反轉（invert）' },
    { id: 5, title: '五、加總（sum）' },
    { id: 6, title: '六、平均值（avg）' },
    { id: 7, title: '七、取得影像尺寸（image-size）' },
    { id: 8, title: '八、嵌入連結（embedurl）' },
    { id: 9, title: '四、參考資料' },
]);
</script>

<template>
    <BaseTextContent>
        <Title :propValue="17" fileType="learnList" />
<!-- start -->
<div class="text-content">
    <div class="text-catalog">
        <ul>
            <li v-for="item in catalog" :key="item.id">
                <a :href="'#act' + item.id" v-text="item.title"></a>
            </li>
        </ul>
    </div>
    <div class="text-block" :id="'act' + catalog[0].id">
        <h2 v-text="catalog[0].title"></h2>
        <p>Stylus 有內建很多函式提供給開發者使用，因為功能實在太多了所以就不一一介紹，只列舉幾項個人比較常使用到的。其餘功能可自行點擊<a href="https://stylus-lang.com/docs/bifs.html" target="_blank">列表連結</a>瀏覽察看。</p>
    </div>
    <div class="text-block" :id="'act' + catalog[1].id">
        <h2 v-text="catalog[1].title"></h2>
        <p><em>alpha</em> 函式通常用於顏色相關的透明度設定，其函式結構為：</p>
        <prism-highlight>
            <div class="text-code" v-pre>
                <pre><code class="language-stylus">selector
    property alpha(color, value)</code></pre>
            </div>
        </prism-highlight>
        <p>例如：</p>
        <prism-highlight>
            <div class="text-code" v-pre>
                <pre><code class="language-stylus">div
    background-color alpha(#fff, 0.5)</code></pre>
            </div>
        </prism-highlight>
        <p>編譯結果：</p>
        <prism-highlight>
            <div class="text-code" v-pre>
                <pre><code class="language-css">div {
    background-color: rgba(255,255,255,0.5);
}</code></pre>
            </div>
        </prism-highlight>
        <p><br></p>
        <p>以下列舉一些比較不妥當的寫法：</p>
        <prism-highlight>
            <div class="text-code" v-pre>
                <pre><code class="language-stylus">alpha(#fff)
// 輸出結果為 1

alpha(rgba(0,0,0,0.4))
// 輸出結果為 0.4</code></pre>
            </div>
        </prism-highlight>
        <p>由此可知 <em>alpha</em> 函式必須填入 <em>value</em> 值。此外，<em>value</em> 值也可以使用百分比表示，例如 <em>50%</em>。</p>
    </div>
    <div class="text-block" :id="'act' + catalog[2].id">
        <h2 v-text="catalog[2].title"></h2>
        <p><em>lightness</em> 用來調整有關顏色屬性的色碼亮度，其函式結構為：</p>
        <prism-highlight>
            <div class="text-code" v-pre>
                <pre><code class="language-stylus">selector
    property lightness(color, value)</code></pre>
            </div>
        </prism-highlight>
        <p>例如：</p>
        <prism-highlight>
            <div class="text-code" v-pre>
                <pre><code class="language-stylus">div
    background-color lightness(#f00, 0%)</code></pre>
            </div>
        </prism-highlight>
        <p>編譯結果：</p>
        <prism-highlight>
            <div class="text-code" v-pre>
                <pre><code class="language-css">div {
    background-color: #000;
}</code></pre>
            </div>
        </prism-highlight>
        <p>因為亮度設定為 <em>0%</em>，所以輸出結果為黑色。順便一提，<em>value</em> 裡的百分比符號（<em>%</em>）可以省略。</p>
    </div>
    <div class="text-block" :id="'act' + catalog[3].id">
        <h2 v-text="catalog[3].title"></h2>
        <p>這兩者分別可以使顏色加深或減輕，函式結構為：</p>
        <prism-highlight>
            <div class="text-code" v-pre>
                <pre><code class="language-stylus">selector
    property darken(color, value)
    property lighten(color, value)</code></pre>
            </div>
        </prism-highlight>
        <p>例如：</p>
        <prism-highlight>
            <div class="text-code" v-pre>
                <pre><code class="language-stylus">div
    background-color darken(#F00, 50%)
    color lighten(#F00, 50%)</code></pre>
            </div>
        </prism-highlight>
        <p>編譯結果：</p>
        <prism-highlight>
            <div class="text-code" v-pre>
                <pre><code class="language-css">div {
    background-color: #800000;
    color: #ff8080;
}</code></pre>
            </div>
        </prism-highlight>
    </div>
    <div class="text-block" :id="'act' + catalog[4].id">
        <h2 v-text="catalog[4].title"></h2>
        <p>這個函式可把顏色屬性的色碼倒置，例如把白色（<em>#FFF</em>）反轉為黑色（<em>#000</em>）。其函式結構為：</p>
        <prism-highlight>
            <div class="text-code" v-pre>
                <pre><code class="language-stylus">selector
    property invert(color)</code></pre>
            </div>
        </prism-highlight>
        <p>例如：</p>
        <prism-highlight>
            <div class="text-code" v-pre>
                <pre><code class="language-stylus">div
    background-color invert(#FFF)</code></pre>
            </div>
        </prism-highlight>
        <p>編譯結果：</p>
        <prism-highlight>
            <div class="text-code" v-pre>
                <pre><code class="language-css">div {
    background-color: #000;
}</code></pre>
            </div>
        </prism-highlight>
    </div>
    <div class="text-block" :id="'act' + catalog[5].id">
        <h2 v-text="catalog[5].title"></h2>
        <p>前面幾個都是與顏色有關的函式（事實上內建函式大多也確實與顏色有關），這裡介紹運算型的「加總」函式，可將函式內的數值通通加起來。它的函式結構為：</p>
        <prism-highlight>
            <div class="text-code" v-pre>
                <pre><code class="language-stylus">selector
    property sum(value)</code></pre>
            </div>
        </prism-highlight>
        <p>例如：</p>
        <prism-highlight>
            <div class="text-code" v-pre>
                <pre><code class="language-stylus">div
    width sum(10px 20px 30px 40px)</code></pre>
            </div>
        </prism-highlight>
        <p>編譯結果：</p>
        <prism-highlight>
            <div class="text-code" v-pre>
                <pre><code class="language-css">div {
    width: 100px;
}</code></pre>
            </div>
        </prism-highlight>
        <p>有些人也許會想：「我直接在屬性後方寫運算式加加減減不就好了嗎？」...嗯，是的。</p>
    </div>
    <div class="text-block" :id="'act' + catalog[6].id">
        <h2 v-text="catalog[6].title"></h2>
        <p>相比加總（sum），平均值的實用性就比較高了，我們只要把要平均的數字通通丟進平均值函式裡，它就會自動幫我們輸出加總平均後的結果。</p>
        <prism-highlight>
            <div class="text-code" v-pre>
                <pre><code class="language-stylus">selector
    property avg(value)</code></pre>
            </div>
        </prism-highlight>
        <p>例如：</p>
        <prism-highlight>
            <div class="text-code" v-pre>
                <pre><code class="language-stylus">div
    width avg(10px 20px 30px 40px)</code></pre>
            </div>
        </prism-highlight>
        <p>編譯結果：</p>
        <prism-highlight>
            <div class="text-code" v-pre>
                <pre><code class="language-css">div {
    width: 25px;
}</code></pre>
            </div>
        </prism-highlight>
    </div>
    <div class="text-block" :id="'act' + catalog[7].id">
        <h2 v-text="catalog[7].title"></h2>
        <p>這是個頗實用的功能函式，我們可以透過此函式直接取得指定影像的尺寸，代入到寬度與高度，節省查詢影像尺寸的動作。其函式結構為：</p>
        <prism-highlight>
            <div class="text-code" v-pre>
                <pre><code class="language-stylus">selector
    property image-size(path)</code></pre>
            </div>
        </prism-highlight>
        <p>例如：</p>
        <prism-highlight>
            <div class="text-code" v-pre>
                <pre><code class="language-stylus">div
    width image-size('logo.png')[0]
    height image-size('logo.png')[1]</code></pre>
            </div>
        </prism-highlight>
        <p>編譯結果：</p>
        <prism-highlight>
            <div class="text-code" v-pre>
                <pre><code class="language-css">div {
    width: 200px;
    height: 50px;
}</code></pre>
            </div>
        </prism-highlight>
        <p><em>image-size</em> 後方的陣列位置 <em>[0]</em> 代表影像的寬度值，<em>[1]</em> 則是影像高度的值。單位為像素（<em>px</em>）。</p>
    </div>
    <div class="text-block" :id="'act' + catalog[8].id">
        <h2 v-text="catalog[8].title"></h2>
        <p><em>embedurl</em> 可以把影像編碼化，函式語法為：</p>
        <prism-highlight>
            <div class="text-code" v-pre>
                <pre><code class="language-stylus">selector
    property embedurl(path)</code></pre>
            </div>
        </prism-highlight>
        <p>例如：</p>
        <prism-highlight>
            <div class="text-code" v-pre>
                <pre><code class="language-stylus">div
    background-image embedurl('logo.jpg')</code></pre>
            </div>
        </prism-highlight>
        <p>編譯結果：</p>
        <prism-highlight>
            <div class="text-code" v-pre>
                <pre><code class="language-css">div {
    background-image: url("data:image/jpeg;base64,77+977+977+977+9ABBKRklGAAEBAQEsASwAAO+/ve+...(略)...Q==");
}</code></pre>
            </div>
        </prism-highlight>
        <p>預設編碼格式為 <em>base64</em>，如果要採用 <em>utf8</em>，則僅需在路徑的後方加上 <em>utf8</em> 即可。譬如：</p>
        <prism-highlight>
            <div class="text-code" v-pre>
                <pre><code class="language-stylus">div
    background-image embedurl('logo.jpg', 'utf8')</code></pre>
            </div>
        </prism-highlight>
        <p>此函式好處是即便有一天影像毀損或遺失了，因為已經將該影像編碼化，故不影響 CSS 顯示其內容。然而，取而代之的壞處就是程式碼的暴增，尤其當影像很複雜的時候，輸出的編碼更是令人瞠目結舌。</p>
    </div>
    <div class="text-block" :id="'act' + catalog[9].id">
        <h2 v-text="catalog[9].title"></h2>
        <dl>
            <dd><a href="https://stylus-lang.com/" target="_blank">stylus</a></dd>
        </dl>
    </div>
</div>
<!-- end -->
    </BaseTextContent>
</template>