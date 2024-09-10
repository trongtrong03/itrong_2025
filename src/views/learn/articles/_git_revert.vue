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
    { id: 1, title: '一、revert' },
    { id: 2, title: '二、reset' },
    { id: 3, title: '三、revert V.S. reset' },
    { id: 4, title: '四、參考資料' },
]);
</script>

<template>
    <BaseTextContent>
        <Title :propValue="80" fileType="learnList" />
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
        <p>在學習 Git 的過程中，我們總是會被灌輸一個觀念：只要檔案完成變更，都需要進行提交（Commit）的動作。如果是多人協作專案，還要記得把 Commit 「Push」推送到專案連結的遠端（Remote）儲存庫，以便記錄我們該次修改的版本內容。這個習慣對團隊來說尤為重要，畢竟單一專案通常不會只有一個人在維護，假如各自本機的專案檔案與遠端儲存庫無法保持一致，團隊成員們在推送與拉取時就很容易發生各種衝突，變成還要花時間處理衝突，徒增各成員的困擾。</p>
        <p>然而，不管是多人團隊協作也好、單一個人管理也罷，總會遇到提交出去的版本內容不盡人意，想要把該提交記錄「移除」的時候，Git 確實也提供了幾種將某筆指定提交從 Git 歷史中移除的方法，一般稱之為「撤銷」，本篇就要來談談具體實現撤銷的方式有哪些。</p>
    </div>
    <div class="text-block" :id="'act' + catalog[1].id">
        <h2 v-text="catalog[1].title"></h2>





        <p>如果想「撤銷」之前已提交的某次 Git 版本，主要指令有兩種：<em>reset</em> 與 <em>revert</em>，而後者則是相對比較安全的方式，因為它的用途是在 Git 歷史中建立一個新的提交，該提交會將指定的某個提交撤銷。也就是說，<em>revert</em> 會利用反向提交的方式，在不影響提交歷史的情況下再次提交新的版本來達到撤銷的效果。</p>
        <p>基礎用法：</p>
        <p>假設我們想撤銷 abc123 這筆提交記錄，可使用以下指令：</p>
        <prism-highlight>
            <div class="text-code" v-pre>
                <pre><code class="language-powershell">git revert abc123</code></pre>
            </div>
        </prism-highlight>
        <p><br></p>
        <h3>什麼時候該適合使用 <em>revert</em>？</h3>
        <ul>
            <li>你想撤銷某次提交的影響，但不想影響已經存在的提交歷史。</li>
            <li>當你發現某次提交有問題，希望撤銷它，但已經有其他團隊成員基於此提交進行了進一步的開發。</li>
        </ul>
        
        <prism-highlight>
            <div class="text-code" v-pre>
                <pre><code class="language-git">$git merge origin/master</code></pre>
            </div>
        </prism-highlight>
        <figure>
            <img src="/images/learn/dev/git-pull-6.jpg">
            <figcaption>本機端的版控日誌已更新至 c5。</figcaption>
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