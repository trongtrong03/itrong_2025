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
    { id: 1, title: '一、fetch' },
    { id: 2, title: '二、pull' },
    { id: 3, title: '三、clone' },
    { id: 4, title: '四、參考資料' },
]);
</script>

<template>
    <BaseTextContent>
        <Title :propValue="31" fileType="learnList" />
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
        <p>先前已經介紹過如何將本機端版控專案推送到遠端儲存庫上，本篇則是要說明如何將遠端儲存庫最新的資料同步到本機端，在 Git 操作中主要有以下這些作法：<em>fetch</em>、<em>pull</em> 與 <em>clone</em>。其中，<em>fetch</em> 與 <em>pull</em> 作用相似，如果與本機端專案連接的遠端儲存庫有較新的版本，透過這兩種指令可以將較新的版本拉取下來。但如果今天工作電腦本身沒有該遠端儲存庫的專案時，我們則要使用 <em>clone</em> 指令，以下我們一一來觀看。</p>
    </div>
    <div class="text-block" :id="'act' + catalog[1].id">
        <h2 v-text="catalog[1].title"></h2>
        <p>無論是推還是拉的動作，都會很頻繁地在專案 Git 版控過程中被使用到，尤其是在多人維護的大型專案中，接手維護的人員第一件要做的事情就是確認自己本機端裡的檔案是否與遠端儲存庫的版本相同。</p>
        <figure>
            <img src="/images/learn/dev/git-pull-1.jpg">
            <figcaption>用 <em>log</em> 指令查詢本機端檔案的版控提交記錄。</figcaption>
        </figure>
        <figure>
            <img src="/images/learn/dev/git-pull-2.jpg">
            <figcaption>GitHub 遠端儲存庫上的版本記錄。</figcaption>
        </figure>
        <p>經過比對可以看出遠端儲存庫的版本較新，因此當我們需要對專案執行維護之前，需先將遠端儲存庫較新的版本更新下來，此刻先展示的指令是 <em>fetch</em>，Git 指令為：</p>
        <prism-highlight>
            <div class="text-code" v-pre>
                <pre><code class="language-git">$git fetch origin master</code></pre>
            </div>
        </prism-highlight>
        <p>如果沒有特別指名分支的話，省略只打 <em>git fetch</em> 也可以，為求完整性，練習時仍明確輸入遠端對象的主機及其主分支名稱。</p>
        <p>當 Git 確定本機端當前舊版本檔案與遠端對應版本資料一致，就會自動將較新的版本同步至使用的工作電腦內。假如舊版本的檔案與遠端對應版本的資料比對有出入，則系統視窗會返回相關的錯誤提示訊息，導致無法執行同步工作，此為「衝突」情況，有關衝突的解決方法後面再提。</p>
        <figure>
            <img src="/images/learn/dev/git-pull-3.jpg">
        </figure>
        <p><em>fetch</em> 完成後，你可能會發現本機端檔案似乎沒有任何變化，利用 <b>log</b> 指令去查詢，返回的結果也沒有較新的 <b>c5</b> 版本...</p>
        <figure>
            <img src="/images/learn/dev/git-pull-4.jpg">
            <figcaption>本機端的版控記錄仍停留在 c4。</figcaption>
        </figure>
        <p>這是因為 <em>fetch</em> 指令會先與本機端版本庫記錄比對後，將較新的提交版本暫存在 <b>.git/FETCH_HEAD</b> 檔案中，而不會直接馬上與本機端儲存庫進行合併（Merge），畢竟有些開發者可能只是要確認遠端儲存庫的內容，並不是真的要將較新版本的資料同步更新到本機端儲存庫內。</p>
        <prism-highlight>
            <div class="text-code" v-pre>
                <pre><code class="language-git">$git log -p master..origin/master</code></pre>
            </div>
        </prism-highlight>
        <p>我們可以用這個指令，去比對新舊版本之間變更的地方：</p>
        <figure>
            <img src="/images/learn/dev/git-pull-5.jpg">
            <figcaption>在 c5 版本中，1.txt 加入了「**test**」這行文字。</figcaption>
        </figure>
        <p><br></p>
        <p>我們使用 <em>merge</em> 指令，將較新版本的資料與本機端主分支進行「合併」：</p>
        <prism-highlight>
            <div class="text-code" v-pre>
                <pre><code class="language-git">$git merge origin/master</code></pre>
            </div>
        </prism-highlight>
        <p>合併完成並用 <em>log</em> 查看版本記錄日誌：</p>
        <figure>
            <img src="/images/learn/dev/git-pull-6.jpg">
            <figcaption>本機端的版控日誌已更新至 c5。</figcaption>
        </figure>
    </div>
    <div class="text-block" :id="'act' + catalog[2].id">
        <h2 v-text="catalog[2].title"></h2>
        <p>再來看看 <em>pull</em> 的用法，這次 GitHub 遠端儲存庫上最新的提交版控記錄為 <b>c6</b>，而本機端則是 <b>c5</b>。</p>
        <figure>
            <img src="/images/learn/dev/git-pull-7.jpg">
        </figure>
        <figure>
            <img src="/images/learn/dev/git-pull-8.jpg">
        </figure>
        <p><br></p>
        <p>Git 指令的語法和 <em>fetch</em> 基本上一樣，只是 <em>fetch</em> 改成 <em>pull</em>：</p>
        <prism-highlight>
            <div class="text-code" v-pre>
                <pre><code class="language-git">$git pull origin master</code></pre>
            </div>
        </prism-highlight>
        <p>實際執行畫面：</p>
        <figure>
            <img src="/images/learn/dev/git-pull-9.jpg">
        </figure>
        <p><br></p>
        <p>和 <em>fetch</em> 不同的是，<em>pull</em> 這個指令會直接將遠端儲存庫較新的版本直接合併到本機端的主支中，我們透過 <em>log</em> 指令便一目了然：</p>
        <figure>
            <img src="/images/learn/dev/git-pull-10.jpg">
        </figure>
        <p>由此可知 <em>pull</em> 同時執行了 <em>fetch</em> 與 <em>merge</em> 的動作，而多數使用者在拉取遠端儲存庫檔案時，使用 <em>pull</em> 的頻率更甚於透過 <em>fetch</em> 指令。</p>
    </div>
    <div class="text-block" :id="'act' + catalog[3].id">
        <h2 v-text="catalog[3].title"></h2>
        <p>同樣是向遠端儲存庫拉取檔案，<em>fetch</em> 與 <em>pull</em> 與其說是下載，不如說更趨近於本機端專案更新檔案的行為。倘若工作電腦不存在該專案，就無法用 <em>fetch</em>、<em>pull</em> 指令取得檔案，此時正確的執行指令為 <em>clone</em>。</p>
        <prism-highlight>
            <div class="text-code" v-pre>
                <pre><code class="language-git">$git clone [REPO].git</code></pre>
            </div>
        </prism-highlight>
        <p>例如：</p>
        <prism-highlight>
            <div class="text-code" v-pre>
                <pre><code class="language-git">$git clone https://github.com/trongtrong03/GitDemo.git</code></pre>
            </div>
        </prism-highlight>
        <p>實際操作結果：</p>
        <figure>
            <img src="/images/learn/dev/git-pull-11.jpg">
        </figure>
    </div>
    <div class="text-block" :id="'act' + catalog[4].id">
        <h2 v-text="catalog[4].title"></h2>
        <dl>
            <dd><a href="https://git-scm.com/" target="_blank">Git</a></dd>
        </dl>
    </div>
</div>
<!-- end -->
    </BaseTextContent>
</template>