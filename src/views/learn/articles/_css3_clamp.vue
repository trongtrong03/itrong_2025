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
        { id: 3, title: '三、min() 與 max()' },
        { id: 4, title: '六、參考資料' },
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
                    <div class="f-f2">草案階段，可公開評論與修改</div>
                </div>
                <div class="f-row">
                    <div class="f-f1">Candidate Recommendation</div>
                    <div class="f-f2">候選推薦階段，表示已接近穩定，鼓勵實作</div>
                </div>
                <div class="f-row">
                    <div class="f-f1">Recommendation</div>
                    <div class="f-f2">正式標準，穩定可用</div>
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
        <p><em>clamp()</em> 是用來設定指定屬性的範圍函式，其規則如下：</p>
        <pre
            class="line-numbers"
            data-prismjs-copy="Copy"
            data-prismjs-copy-success="Copied"
            data-prismjs-copy-error="Error!"
            data-prismjs-copy-timeout="2000"
            data-toolbar-order="copy-to-clipboard" 
        >
            <code class="language-css" v-prism>
                clamp(MIN, PREFERRED, MAX)
            </code>
        </pre>
        <p>括號內的參數分別代表最小值、偏好值與最大值，最小值表示縮到再小也不能低於這個值，最大值則表示放大到再大也不能超過這個值，至於偏好值就如同字面意思，為該屬性在網頁排版中最理想的呈現數值，該值通常會使用 <em>vw</em> 或其他動態單位。</p>
        <p>舉例來說：</p>
        <pre
            class="line-numbers"
            data-prismjs-copy="Copy"
            data-prismjs-copy-success="Copied"
            data-prismjs-copy-error="Error!"
            data-prismjs-copy-timeout="2000"
            data-toolbar-order="copy-to-clipboard" 
        >
            <code class="language-css" v-prism>
                .title {
                    font-size: clamp(16px, 10vw, 32px);
                }
            </code>
        </pre>
        <p>透過這個範例可以看到，我們編寫了 <em>.title</em> 這個 class 的元素以限縮字級的範圍，在理想情境下我們期望使用該 class 樣式的元素字型大小是隨著畫面可視範圍寬度縮放的 10%。然而根據以往實務操作經驗，按照過去直接指定單位數值的寫法，多少會遇到單一設定動態單位在大畫面過分巨大，抑或者在小畫面太過渺小的狀況。當有了最小值與最大值的加入，我們得以進一步將 <em>10vw</em> 控制在 <em>16px</em> 到 <em>32px</em> 之間，充分避免上述提到的問題。</p>
        <figure>
            <img src="/images/learn/css/clamp-1.jpg">
            <figcaption>設定單一動態單位與 Clamp 函式差異之示意圖</figcaption>
        </figure>
        <blockquote>
            <p>我們可以想像為 <em>clamp</em> 的結果等於 PREFERRED，但會被 MIN 與 MAX 夾住。</p>
        </blockquote>
        <p><br></p>
        <p>或許你會說：我也可以用 Media Queries 解決字級在某些可視範圍過大或過小的問題呀？譬如前面的例子可以這樣寫：</p>
        <pre
            class="line-numbers"
            data-prismjs-copy="Copy"
            data-prismjs-copy-success="Copied"
            data-prismjs-copy-error="Error!"
            data-prismjs-copy-timeout="2000"
            data-toolbar-order="copy-to-clipboard" 
        >
            <code class="language-css" v-prism>
                .title {
                    font-size: 10vw;
                }

                @media (min-width: 1600px) {
                    .title {
                        font-size: 32px;
                    }
                }

                @media (max-width: 480px) {
                    .title {
                        font-size: 16px;
                    }
                }
            </code>
        </pre>
        <p>確實，但一樣解決問題需求的方式，<em>clamp()</em> 只需要一行就能解決，不僅快速便捷，也有利於程式碼的易讀性以及方便維護。當然，這也不意味著 <em>clamp()</em> 從此完美取代 Media Queries 的地位，總有些那麼特殊狀況是 <em>clamp()</em> 無法實現最理想的排版需求，此時就可以搭配 Media Queries 一起使用，達到相輔相成的效果。</p>
        <p><br></p>
        <h3>結合 Calc：</h3>
        <p>既然本篇文章主要介紹 Clamp 這些 Values and Units Level 4 新入世的函式，那就不得不也提提他們的大前輩──Calc，在先前其他文章曾經介紹過 <em>calc()</em> 的用途，簡單來說，它讓 CSS 得以不藉由 JavaScript 之手就能逕自進行基本的數學運算。</p>
        <p>那麼問題來啦，如果我們在某個屬性已經使用了 <em>calc()</em> 函式執行計算，是否還能再兼容 <em>clamp()</em>？答案是可以的，而且兩者結合使用能令網頁排版更具靈活及彈性。用法和語法規則相同，直接定義於某一個參數值即可：</p>
        <pre
            class="line-numbers"
            data-prismjs-copy="Copy"
            data-prismjs-copy-success="Copied"
            data-prismjs-copy-error="Error!"
            data-prismjs-copy-timeout="2000"
            data-toolbar-order="copy-to-clipboard" 
        >
            <code class="language-css" v-prism>
                .title {
                    font-size: clamp(1rem, calc(2vw + 0.5rem), 4rem);
                }
            </code>
        </pre>
        <p><br></p>
        <h3>常見的運用方式：</h3>
        <p>前面的範例我們都是用字級作示範，除了活用於字型大小的區間範圍判斷外，還有以下這些常見的使用情境：</p>
        <h4>1. 響應式容器寬度：</h4>
        <p>範例：</p>
        <pre
            class="line-numbers"
            data-prismjs-copy="Copy"
            data-prismjs-copy-success="Copied"
            data-prismjs-copy-error="Error!"
            data-prismjs-copy-timeout="2000"
            data-toolbar-order="copy-to-clipboard" 
        >
            <code class="language-css" v-prism>
                .container {
                    width: clamp(300px, 80vw, 1200px);
                }
            </code>
        </pre>
        <p>表示 <em>.container</em> 元素的寬度範圍會介於 <em>300px</em> 與 <em>1200px</em> 之間，填滿整個可視畫面範圍寬度的 <em>80%</em>。</p>
        <p><br></p>
        <h4>2. 響應式內、外距：</h4>
        <p>範例：</p>
        <pre
            class="line-numbers"
            data-prismjs-copy="Copy"
            data-prismjs-copy-success="Copied"
            data-prismjs-copy-error="Error!"
            data-prismjs-copy-timeout="2000"
            data-toolbar-order="copy-to-clipboard" 
        >
            <code class="language-css" v-prism>
                .section {
                    padding: clamp(1rem, 3vw, 5rem);
                }
            </code>
        </pre>
        <p>根據填入不同數量的值，表示的是 <em>padding</em> 不同方向的內距時，而不管是單一全域內推，還是兩個值代表水平與垂直方向，又或者四個值各自設定不同方向的內距值，通通都可以用 <em>clamp()</em> 來設定，外距（<em>margin</em>）也同理。</p>
        <p><br></p>
        <h4>3. 響應式 Gap：</h4>
        <p>範例：</p>
        <pre
            class="line-numbers"
            data-prismjs-copy="Copy"
            data-prismjs-copy-success="Copied"
            data-prismjs-copy-error="Error!"
            data-prismjs-copy-timeout="2000"
            data-toolbar-order="copy-to-clipboard" 
        >
            <code class="language-css" v-prism>
                .grid {
                    display: grid;
                    gap: clamp(8px, 1.5vw, 32px);
                }
            </code>
        </pre>
        <p>CSS Grid 屬性可用來實現網頁的欄位布局模式，而 <em>gap</em> 這個屬性值主要用於設定 Grid 或 Flexbox 彼此欄位之間的間距值，我們可以套用 <em>clamp()</em> 來規範間距的作用範圍。</p>
        <p><br></p>
        <h4>4. 響應式導圓角：</h4>
        <p>範例：</p>
        <pre
            class="line-numbers"
            data-prismjs-copy="Copy"
            data-prismjs-copy-success="Copied"
            data-prismjs-copy-error="Error!"
            data-prismjs-copy-timeout="2000"
            data-toolbar-order="copy-to-clipboard" 
        >
            <code class="language-css" v-prism>
                .card {
                    border-radius: clamp(4px, 1vw, 16px);
                }
            </code>
        </pre>
        <p>如果有需要，像是 <em>border-radius</em> 或 <em>backgrounnd-size</em> 這些可以設定數值單位的屬性，我們都可以藉由 <em>clamp()</em> 函式去細部設定指定元素在不同視圖裡最佳的樣貌。</p>
    </div>
    <div class="text-block" :id="'act' + catalog[3].id">
        <h2 v-text="catalog[3].title"></h2>
        <p>儘管 Values and Units Level 4 版本由 <em>clamp()</em> 函式大放異彩，但除了它之外，同版本還釋出另外兩種有關的函式，分別是 <em>min()</em> 和 <em>max()</em>。這兩個函式分別代表最大與最小的相關設定，語法規則為：</p>
        <pre
            class="line-numbers"
            data-prismjs-copy="Copy"
            data-prismjs-copy-success="Copied"
            data-prismjs-copy-error="Error!"
            data-prismjs-copy-timeout="2000"
            data-toolbar-order="copy-to-clipboard" 
        >
            <code class="language-css" v-prism>
                min(val1, val2, ...)
                max(val1, val2, ...)
            </code>
        </pre>
        <p>從規則中可以理解函式裡面的數值不侷限於一、兩個而已，他們可分別回傳函式裡多個值中最小或最大的那個值。</p>
        <p>例如：</p>
        <pre
            class="line-numbers"
            data-prismjs-copy="Copy"
            data-prismjs-copy-success="Copied"
            data-prismjs-copy-error="Error!"
            data-prismjs-copy-timeout="2000"
            data-toolbar-order="copy-to-clipboard" 
        >
            <code class="language-css" v-prism>
                .container {
                    width: min(100%, 600px);
                }
            </code>
        </pre>
        <p>這個函式的定義是在述說當 <em>.container</em> 於螢幕可視畫面範圍小於 <em>600px</em> 的時候，其寬度將會是 <em>100%</em>，當畫面大於 <em>600px</em> 以上，則元素的寬度也不會超過 <em>600px</em>。這乍看是不是有些似曾相識？其實這樣的寫法就相當於 <em>width</em> 與 <em>max-width</em> 的結合，同樣的需求，我們用傳統的寫法其實會是這樣寫：</p>
        <pre
            class="line-numbers"
            data-prismjs-copy="Copy"
            data-prismjs-copy-success="Copied"
            data-prismjs-copy-error="Error!"
            data-prismjs-copy-timeout="2000"
            data-toolbar-order="copy-to-clipboard" 
        >
            <code class="language-css" v-prism>
                .container {
                    width: 100%;
                    max-width: 600px;
                }
            </code>
        </pre>
        <p>如果要考量瀏覽器新舊版本的兼容性，選擇傳統的寫法或許是比較穩當的選擇，否則現代化的 <em>min()</em> 函式語法會來得更為精簡，而且也不是所有屬性都有 <em>max-</em> 語法，再像是針對 <em>font-size</em> 或 <em>background-size</em>、<em>border-radius</em>...等定義元素樣式尺寸相關的屬性，使用　<em>min()</em> 函式會方便許多。</p>
        <p>上述的說明同樣也適用於 <em>max()</em>身上，前面的範例我們用 <em>width</em> 屬性來對照函式與傳統寫法，那既然 <em>width: min()</em> 是 <em>width</em> 與 <em>max-width</em> 的結合，那 <em>max()</em> 便是反過來 <em>width</em> 加上 <em>min-width</em> 的綜合體。</p>
        <p>例如：</p>
        <pre
            class="line-numbers"
            data-prismjs-copy="Copy"
            data-prismjs-copy-success="Copied"
            data-prismjs-copy-error="Error!"
            data-prismjs-copy-timeout="2000"
            data-toolbar-order="copy-to-clipboard" 
        >
            <code class="language-css" v-prism>
                .container {
                    width: max(100%, 600px);
                }
            </code>
        </pre>
        <p>這樣就表示 <em>.container</em> 於可視範圍中從 <em>100%</em> 和 <em>600px</em> 之間挑選最大的那個值。若你不假思索或許會想，最大的值不是 <em>100%</em> 嗎？非也，如果可視範圍只有 <em>500px</em> 的時候，那麼 <em>100%</em> 等同於 <em>500px</em>，實際上是比另一個值 <em>600px</em> 來的小，所以該元素的寬度值將會是 <em>600px</em>，將溢出可視區域範圍之外。</p>
        <p>倘若有需要，我們可以在 <em>min()</em> 和 <em>max()</em> 函式中設定很多個值，讓瀏覽器自適應挑選符合當下條件的數值。例如：</p>
        <pre
            class="line-numbers"
            data-prismjs-copy="Copy"
            data-prismjs-copy-success="Copied"
            data-prismjs-copy-error="Error!"
            data-prismjs-copy-timeout="2000"
            data-toolbar-order="copy-to-clipboard" 
        >
            <code class="language-css" v-prism>
                .content {
                    width: max(300px, 50%, 20vw);
                }
            </code>
        </pre>
        <p><br></p>
        <h3>進階的巢狀表達式：</h3>
        <p>前一段曾提過 <em>min()</em> 與 <em>max()</em> 函式使傳統的寫法可以更加簡潔之外，許多用來設定度量衡的屬性都可以透過函式來指定其最大或最小範圍，然其靈活度還不僅如此，更甚者，我們可以同時將兩者結合在一塊兒使用，成為「巢狀」語法。舉例來說：</p>
        <pre
            class="line-numbers"
            data-prismjs-copy="Copy"
            data-prismjs-copy-success="Copied"
            data-prismjs-copy-error="Error!"
            data-prismjs-copy-timeout="2000"
            data-toolbar-order="copy-to-clipboard" 
        >
            <code class="language-css" v-prism>
                .content {
                    width: min(100%, max(300px, 50vw));
                }
            </code>
        </pre>
        <p>這條表達式的整體邏輯是：設定一個寬度，這個寬度是在 <em>100%</em> 之內的「最大值」，而這個最大值則是從 <em>300px</em> 和 <em>50vw</em> 之中挑出來的最大者。以下一一進行步驟拆解：</p>
        <h6>1. 先處理 max(300px, 50vw)</h6>
        <p>首先會選出當下畫面可視範圍中符合條件的最大數值，假設目前可視區域的寬度為 <em>800px</em>，<em>50vw</em> 為其一半，也就是 <em>400px</em>，這大於另一個值 <em>300px</em>，所以此刻 <em>max()</em> 挑出來的數值為 <em>50vw</em>。</p>
        <h6>2. 將 max(...) 結果與 100% 比較</h6>
        <p>接著會將 <em>max()</em> 篩出來的結果進入上一層包裹的 <em>min()</em> 函式繼續比較，假設 <em>.content</em> 元素在畫面中的 <em>100%</em> 寬度只有 <em>600px</em>（受到更父層的元素影響或其他因素），那麼此時 <em>min()</em> 裡頭數值便代換成 <em>min(600px, 800px)</em>，取其中最小者，最終得出 <em>600px</em> 之結果，也就是 <em>100%</em>。</p>
        <p><br></p>
        <p>一言以蔽之，整句表達式的行為等同在說「該元素想要一個寬度，最小值是 300px、彈性是畫面一半，但不能超過父容器寬度（100%）」。</p>
        <p><br></p>
        <h3>與 Clamp 結合：</h3>
        <p>上個章節我們已經理解 <em>clamp()</em> 函式語法是由最小值、偏好值、最大值三個數值構成，有些人會以為這之中的最小值與最大值分別呼應 <em>min()</em> 與 <em>max()</em>，然而這其實是天大的誤解，<em>clamp()</em> 裡的最小值與最大值屬於「數值參數」，並非獨立函式。</p>
        <p>儘管如此，我們依然可以在 <em>clamp()</em> 函式中導入 <em>min()</em> 以及 <em>max()</em> 來設定元素的限縮範圍。</p>
        <p>例如：</p>
        <pre
            class="line-numbers"
            data-prismjs-copy="Copy"
            data-prismjs-copy-success="Copied"
            data-prismjs-copy-error="Error!"
            data-prismjs-copy-timeout="2000"
            data-toolbar-order="copy-to-clipboard" 
        >
            <code class="language-css" v-prism>
                .title {
                    font-size: clamp(min(14px, 2vw), 3vw, max(18px, 5vw));
                }
            </code>
        </pre>
        <p>要做到如此精細的設定是沒問題的，但這麼寫僅僅是表示我們在 <em>clamp()</em> 函式裡使用其他函式作為參數值，並不代表該函式是由 <em>min()</em> 和 <em>max()</em> 所構成。</p>
    </div>
    <div class="text-block" :id="'act' + catalog[4].id">
        <h2 v-text="catalog[4].title"></h2>
        <dl>
            <dd><a href="https://www.w3.org/TR/css-values-3/" target="_blank">W3C──CSS Values and Units Module Level 3</a></dd>
            <dd><a href="https://www.w3.org/TR/css-values-4/" target="_blank">W3C──CSS Values and Units Module Level 4</a></dd>
            <dd><a href="https://www.oxxostudio.tw/articles/202011/css-max-min-clamp-calc.html" target="_blank">深入理解 CSS 的 max、min、clamp、calc</a></dd>
            <dd><a href="https://www.cadch.com.tw/modules/news/article.php?storyid=277" target="_blank">自適應網頁設計使用夾鉗參數讓網站更美觀clamp()使用介紹！</a></dd>
        </dl>
    </div>
</div>
<!-- end -->
    </BaseTextContent>
</template>