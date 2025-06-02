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
    { id: 1, title: '一、CSS Values and Units Level 4' },
    { id: 2, title: '二、clamp()' },
    { id: 3, title: '三、XXXX' },
    { id: 4, title: '四、XXXX' },
    { id: 5, title: '五、XXXX' },
    { id: 6, title: '六、參考資料' },
]);
</script>

<template>
    <BaseTextContent>
        <Title :propValue="82" fileType="learnList" />
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
        <p>雖然網際網路普及到今天也只不過短短三十年時間，但技術的更迭卻十分快速，早期我們在學網頁的時候，教學資源總說網頁（前端部分）主要由三者構成，分別是 HTML、CSS 與 JavaScript。其中 HTML 主掌基本架構，相當於網站的骨幹；而 CSS 決定了網頁的樣式，定義其外觀和形貌；至於 JavaScript 負責處理動作，賦予網頁靈魂，讓其與使用者之間進行互動，三者各司其職，達到完美相互搭配合作的效果。</p>
        <p>然而，這樣天衣無縫的配合，隨著瀏覽器技術的進步，三者各自鞏固、彼此井水不犯河水的藍圖逐漸發生變化，尤其是 CSS，自 CSS3 版本問世起，網頁動畫與互動已不再是 JavaScript 的專利，網頁前端工程師已可以輕易地透過一些 CSS3 語法塑造出豐富、多變的動畫效果，甚至觸發簡易的事件點擊回饋，完全不再需要依賴 JavaScript。</p>
        <p>儘管 CSS3 的誕生成為網頁設計巨大的轉捩點，但從２０１２年迄今也已過去十多年，就再也未曾聽聞 CSS4 的任何正式消息。其實這並非意味著 CSS 不再進行更新，恰恰相反地，W3C 在 CSS3 之後改變一往整體大版本的發布方式，採取獨立模組線性研發的模式，以 Level 表示該模組的版本推進，本篇介紹的要角 <em>clamp()</em> 便是其中一個版本。</p>
    </div>
    <div class="text-block" :id="'act' + catalog[1].id">
        <h2 v-text="catalog[1].title"></h2>
        <p>正式開始介紹語法之前，首先我們先來初步認識 CSS Values and Units Level 4。CSS Values and Units Level 4 是什麼？它其實是 W3C CSS 工作組制定的一份標準規範，全名為「CSS Values and Units Module Level 4」，言簡意賅地說，它定義了 CSS 中各種單位（像是 <em>px</em>、<em>em</em>、<em>vw</em>）以及函式（例如 <em>min()</em>、<em>max()</em> 還有本篇要介紹的主角 <em>clamp()</em>）的語法與行為規則。</p>
        <p>CSS Values and Units Level 4 這個名字的出現最早可追溯至 W3C 於２０１８年官方網站公布的草案當中，但那時技術尚不成熟，大多瀏覽器也都不支援所以並未廣泛運用在實務技術中。即便是今日，W3C 官方也依然將 CSS Values and Units Level 4 定調為尚未正式推出的「工作草案」（Working Draft）階段，意即還不是 W3C Recommendation 推薦標準，但其草案中的諸多語法已被主流瀏覽器採納並提供相容性支援。</p>
        <h3>CSS Values and Units Level 4 是 CSS4 嗎？</h3>
        <p>包含我在內，這大概是絕大多數前端工作者初次接觸 CSS Values and Units Level 4 時會產生的疑問，然而這個問題的答案是「否」。</p>
        <p>事實上，在 CSS3 推出之後，CSS 就再也沒有 CSS4、CSS5 這種大型版本的概念，或者說從 CSS3 開始，W3C 就已經捨棄整體大版本號的模式，而是改採「模組」的形式針對功能進行開發。例如我們耳熟能詳的 Flexbox、Grid、Media Queries、Units 等，每一個功能屬性都是獨立的模組運作，這種模組化的版本控制，可以讓各個功能獨立更新與標準化。</p>
        <p>同理，在 CSS Values and Units Module Level 4 之前的 CSS Values and Units Module Level 3，也不是 CSS3，而是 CSS 模組化後關於單位定義的第三個 Level 版本。值得一提的是，每一個模組發布的 Level 版本並非同步的，有些已臻完善的屬性或者還在開發階段的屬性可能會止步於某一個版本。舉例來說：</p>
        <div class="text-flex">
            <div class="f-width">
                <div class="f-head">
                    <div class="f-f1">模組名稱</div>
                    <div class="f-f1">最新版本</div>
                    <div class="f-f1">狀態</div>
                </div>
                <div class="f-row">
                    <div class="f-f1">CSS Flexbox</div>
                    <div class="f-f1">Level 1</div>
                    <div class="f-f1">已實作</div>
                </div>
                <div class="f-row">
                    <div class="f-f1">CSS Grid Layout</div>
                    <div class="f-f1">Level 2（草案中）</div>
                    <div class="f-f1">開發中</div>
                </div>
                <div class="f-row">
                    <div class="f-f1">CSS Media Queries</div>
                    <div class="f-f1">Level 5</div>
                    <div class="f-f1">穩定/部分實作中</div>
                </div>
                <div class="f-row">
                    <div class="f-f1">CSS Values and Units</div>
                    <div class="f-f1">Level 4</div>
                    <div class="f-f1">Working Draft（使用中）</div>
                </div>
                <div class="f-row">
                    <div class="f-f1">CSS Selectors</div>
                    <div class="f-f1">Level 4/Level 5</div>
                    <div class="f-f1">部分已支援</div>
                </div>
                <div class="f-row">
                    <div class="f-f1">CSS Transforms</div>
                    <div class="f-f1">Level 2</div>
                    <div class="f-f1">已支援大部分</div>
                </div>
            </div>
        </div>
        <p>或許我們一般仍然習慣用 CSS3 來稱呼近年所有 CSS 新出現的屬性，然模組化管理的方式，其實更有助於我們學習並追蹤某一個功能的使用方式與演進、完善的的過程。所以我們應該要有以下正確認知：</p>
        <blockquote class="is-error">
            <p>我想等 CSS4 再學新功能。</p>
        </blockquote>
        <blockquote class="is-current">
            <p>可以從 CSS 各模組（如 Flexbox、Grid）逐一學習。</p>
        </blockquote>
        <blockquote class="is-error">
            <p><em>clamp()</em> 是 CSS4 才有的語法？</p>
        </blockquote>
        <blockquote class="is-current">
            <p><em>clamp()</em> 是屬於 Values and Units Level 4 模組中的語法。</p>
        </blockquote>
        <blockquote class="is-error">
            <p>新瀏覽器支援 CSS4 了嗎？</p>
        </blockquote>
        <blockquote class="is-current">
            <p>新瀏覽器會逐步支援各模組的最新版規範，跟是不是 CSS4 無關。</p>
        </blockquote>
        <p><br></p>
        <p>總結來說，<strong>CSS 沒有 CSS4，只有各種「模組」和它們的「版本（Level）」。</strong>我們可以將 CSS 理解為一個語言平台，平台裡頭的每一個功能都是樂高玩具，一個一個模組堆疊組合起來的，本篇文章的主角 <em>clamp()</em> 則是其中一塊來自 Values and Units Level 4 的積木。</p>
        <p><br></p>
        <h3>W3C 標準流程小補充：</h3>
        <p>前面多次提到了 Values and Units Level 4 還止步於 Working Draft 草案階段，它是如何被歸類的呢？W3C 對於每一版的模組進程的規劃有哪些？以下透過一張簡表說明：</p>
        <div class="text-flex">
            <div class="f-width">
                <div class="f-head">
                    <div class="f-f1">階段</div>
                    <div class="f-f3">說明</div>
                </div>
                <div class="f-row">
                    <div class="f-f1">Working Draft</div>
                    <div class="f-f3">草案階段，可公開評論與修改</div>
                </div>
                <div class="f-row">
                    <div class="f-f1">Candidate Recommendation</div>
                    <div class="f-f3">候選推薦階段，表示已接近穩定，鼓勵實作</div>
                </div>
                <div class="f-row">
                    <div class="f-f1">Recommendation</div>
                    <div class="f-f3">正式標準，穩定可用</div>
                </div>
            </div>
        </div>
        <p>正常來說，版本達到 Recommendation 才比較適合大量運用在實務專案中，雖然 CSS Values and Units Level 4 還停留在草案階段，但由於其實作度與穩定度已經非常高，現今已被大多數開發者投入專案中作使用。</p>
        <p><br></p>
        <h3>與 Level 3 版本的差別？</h3>
        <p>既然 Values and Units 目前已經來到 Level 4 版本，那它加強或補足了前一個版本的哪些地方？首先我們先來說說它的前兩個 Level。Values and Units 的初版 Level 1 其實並沒有正式的模組定義，它主要整合舊 CSS1 與 CSS2 承襲下來的網頁基本單位，像是 <em>px</em>、<em>%</em> 等族繁不及備載。至於 Level 2 則完全被跳過，再見到有關單位的更新已經來到 Level 3 版本，這個版本主要活躍於２０１１～２０１６年之間，同時也是 CSS3 最輝煌的時期。</p>
        <p>有些人讀到這裡可能已經猜出這個版本的重點人物是誰了──沒錯，他就是 CSS3 的 <em>calc</em> 運算函式，直接讓開發者可以於 CSS 屬性中進行簡單的數學計算，不再需要依賴 JavaScript 輔助。此外還有新增一些相對基本單位，例如 view 系列的 <em>vw</em>、<em>vh</em>、<em>vmin</em>、<em>vmax</em> 等，還有極為常見的 <em>rem</em> 單位。這些單位與用法都是現今網頁前端切版基本款 RWD 響應式設計的核心，因此若要稱 Values and Units Level 3 為現在網頁技術紮下厚實的根盤也不為過。</p>
        <p>縱然 Level 3 已為網頁排版帶來相當大的靈活度，但仍無法滿足應對某些特定狀況，例如使用了 <em>vw</em>，就很難再將該元素控制在特定範圍內，我們可能必須借助很多 media query 去細細微調某些視覺區間的參數值來達到理想的排版效果。而 Level 4 版本的更新幾乎完美改善了這一點，以下是其相較於前一個版本所帶來的優化：</p>
        <ol>
            <li>支援更多、更完整的基本單位</li>
            <li>支援巢狀運算</li>
            <li>更靈活、彈性的運算函式</li>
            <li>使絕大多數的屬性都能支援運算函式</li>
        </ol>
    </div>




    <div class="text-block" :id="'act' + catalog[2].id">
        <h2 v-text="catalog[2].title"></h2>
        <p>一個 <b>media query</b> 是由一個可選的 <b>media types</b> 及不定數量的 <b>media features</b> 運算式構成。<b>media query</b> 本身具有邏輯的概念，若指定的 <b>media types</b> 與正在顯示的裝置內容相符，且 <b>media features</b> 運算式結果也為 <em>true</em> 時，回傳為 <em>true</em>（套用屬性樣式），否則為 <em>false</em>（不套用屬性樣式）。<br>假如設定的 <b>media types</b> 是未知的類型，則該 <b>media query</b> 將會永遠是 <em>false</em>。</p>
        <p>範例：</p>
        <prism-highlight>
            <div class="text-code" v-pre>
                <pre><code class="language-css">@media screen and (min-width: 640px) and (max-width: 1023px) {
    /* CSS */
}</code></pre>
            </div>
        </prism-highlight>
    </div>
    
    <div class="text-block" :id="'act' + catalog[6].id">
        <h2 v-text="catalog[6].title"></h2>
        <dl>
            <dd><a href="https://www.w3.org/TR/css-values-3/" target="_blank">W3C──CSS Values and Units Module Level 3</a></dd>
            <dd><a href="https://www.oxxostudio.tw/articles/202011/css-max-min-clamp-calc.html" target="_blank">深入理解 CSS 的 max、min、clamp、calc</a></dd>
            <dd><a href="https://www.cadch.com.tw/modules/news/article.php?storyid=277" target="_blank">自適應網頁設計使用夾鉗參數讓網站更美觀clamp()使用介紹！</a></dd>
        </dl>
    </div>
</div>
<!-- end -->
    </BaseTextContent>
</template>