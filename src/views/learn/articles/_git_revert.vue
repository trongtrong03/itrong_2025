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
        <p><em>git revert</em> 是一個 Git 中用來撤銷某次提交（commit）修改的指令。與 <em>git reset</em> 不同，<em>git revert</em>不會直接修改歷史提交，而是創建一個新的 commit，用來抵消指定 commit 所做的更改。這樣的操作不會破壞歷史紀錄，也能保持 Git 的提交歷史連續性，適合在多人合作的項目中使用。</p>
        <p><br></p>
        <h3>revert 的主要功能：</h3>
        <h4>1. 撤銷某個提交的更改：</h4>
        <p>撤銷某個提交的更改，而不刪除這個提交，以保持提交歷史的完整性。</p>
        <h4>2. 創建一個新的提交：</h4>
        <p>這個提交是將指定提交的修改反向應用，相當於「抵消」該次提交的效果。</p>
        <h4>3. 不會重寫歷史：</h4>
        <p>不同於 <em>git reset</em>，<em>git revert</em> 不會改動 commit 歷史，因此對於公開分支（例如 <em>main</em> 或 <em>master</em>）更為安全。</p>
        <p><br></p>
        <h3>revert 的基本流程：</h3>
        <h6>1. 查找提交記錄：</h6>
        <p>首先可以使用 <em>git log</em> 或者 <em>git log --oneline</em> 指令，來查看專案儲存庫提交歷史，找到我們想要撤銷的提交版本所對應的哈希值（commit hash）。</p>
        <pre
            class="line-numbers"
            data-prismjs-copy="Copy"
            data-prismjs-copy-success="Copied"
            data-prismjs-copy-error="Error!"
            data-prismjs-copy-timeout="2000"
            data-toolbar-order="copy-to-clipboard" 
        >
            <code class="language-git" v-prism>
                $git log --oneline
            </code>
        </pre>
        <p>例如在某個專案中，我們查詢的日誌歷史為下：</p>
        <pre
            class="line-numbers"
            data-prismjs-copy="Copy"
            data-prismjs-copy-success="Copied"
            data-prismjs-copy-error="Error!"
            data-prismjs-copy-timeout="2000"
            data-toolbar-order="copy-to-clipboard" 
        >
            <code class="language-git" v-prism>
                f4cb6e9 (HEAD -> master) C3
                e39824f C2
                a60510b C1
            </code>
        </pre>
        <p>假設想撤銷 <em>C2</em> 這筆 commit，那麼此刻我們需要記下該提交的哈希值 <em>e39824f</em>。</p>
        <p><br></p>
        <h6>2. 執行 git revert：</h6>
        <p>例如：</p>
        <pre
            class="line-numbers"
            data-prismjs-copy="Copy"
            data-prismjs-copy-success="Copied"
            data-prismjs-copy-error="Error!"
            data-prismjs-copy-timeout="2000"
            data-toolbar-order="copy-to-clipboard" 
        >
            <code class="language-git" v-prism>
                $git revert e39824f
            </code>
        </pre>
        <p>這樣會生成一個新的 commit，該 commit 的作用是將提交 <em>e39824f</em> 的更改反向操作。</p>
        <p><br></p>
        <h6>3. 處理衝突：</h6>
        <p>有時候可能 <em>git revert</em> 指令下達出去後會遇到合併衝突，這時需要手動解決衝突才能繼續完成 revert 操作。在解決完衝突或完成修改後，Git 會自動提交一個「撤銷提交」的 commit。例如：</p>
        <pre
            class="line-numbers"
            data-prismjs-copy="Copy"
            data-prismjs-copy-success="Copied"
            data-prismjs-copy-error="Error!"
            data-prismjs-copy-timeout="2000"
            data-toolbar-order="copy-to-clipboard" 
        >
            <code class="language-git" v-prism>
                ff10266 (HEAD -> master) Revert "C2"
                f4cb6e9 C3
                e39824f C2
                a60510b C1
            </code>
        </pre>
        <p>在這個情況下，雖然我們撤銷了提交 <em>e39824f</em> 的變更，但歷史記錄依然保留，不會被刪除或修改。</p>
        <p><br></p>
        <h3>什麼時候適合使用 revert？</h3>
        <ul>
            <li>我們想撤銷某次提交的影響，但不想影響已經存在的提交歷史。</li>
            <li>當我們發現某次提交有問題，希望撤銷它，但已經有其他團隊成員基於此提交進行了進一步的開發。</li>
        </ul>
        <p><br></p>
        <h3>我可以把 revert 的版本再次引入回來嗎？</h3>
        <p>答案是可以的，當我們已經使用 <em>git revert</em> 撤銷了某個 commit（例如 <em>e39824f</em>），我們仍然可以將這個 commit 的內容重新引入到最新的 commit。這種操作可以通過 <em>cherry-pick</em> 或手動合併來實現。</p>
        <p>指令：</p>
        <pre
            class="line-numbers"
            data-prismjs-copy="Copy"
            data-prismjs-copy-success="Copied"
            data-prismjs-copy-error="Error!"
            data-prismjs-copy-timeout="2000"
            data-toolbar-order="copy-to-clipboard" 
        >
            <code class="language-git" v-prism>
                $git cherry-pick e39824f
            </code>
        </pre>
        <p>如此哈希值 <em>e39824f</em> 所代表的 C2 提交版本的內容就會重新引入到最新的 commit 上了，我們可以透過 <em>git log --oneline</em> 來確認歷史記錄：</p>
        <pre
            class="line-numbers"
            data-prismjs-copy="Copy"
            data-prismjs-copy-success="Copied"
            data-prismjs-copy-error="Error!"
            data-prismjs-copy-timeout="2000"
            data-toolbar-order="copy-to-clipboard" 
        >
            <code class="language-git" v-prism>
                decdfa7 (HEAD -> master) C2
                ff10266 Revert "C2"
                f4cb6e9 C3
                e39824f C2
                a60510b C1
            </code>
        </pre>
    </div>
    <div class="text-block" :id="'act' + catalog[2].id">
        <h2 v-text="catalog[2].title"></h2>
        <p><em>git reset</em> 是 Git 中一個功能強大的指令，用來更改當前分支的 <em>HEAD</em> 指向，並根據指定的方式來影響分支的提交歷史和工作區的狀態。<em>git reset</em> 有多種模式，主要有以下三種：</p>
        <ol>
            <li>
                <p><strong><em>--soft</em></strong>：</p>
                <p>只改變 <em>HEAD</em> 的位置，不影響索引區（staging area）和工作區（working directory）。</p>
            </li>
            <li>
                <p><strong><em>--mixed</em></strong>：</p>
                <p>改變 <em>HEAD</em> 且重置索引區，但不影響工作區，此為預設模式。</p>
            </li>
            <li>
                <p><strong><em>--hard</em></strong>：</p>
                <p>改變 <em>HEAD</em>，重置索引區並強制更新工作區（刪除未提交的修改）。</p>
            </li>
        </ol>
        <p><br></p>
        <h3>reset 的主要功能：</h3>
        <h4>1. 撤銷提交：</h4>
        <p>將分支的歷史回退到指定的提交。</p>
        <h4>2. 修改索引區（staging area）狀態：</h4>
        <p>根據不同模式將更改反映在索引區或工作區。</p>
        <h4>3. 重置工作區：</h4>
        <p>強制恢復文件至指定版本的狀態（使用 <em>--hard</em> 模式）。</p>
        <p><br></p>
        <h3>--soft 模式：</h3>
        <p>此模式只會重置 <em>HEAD</em> 的指向到指定的 commit，但不會更改索引區和工作區的內容。這意味著，回退的提交內容會保留在索引區，準備再次提交。通常用於想要回退某些提交，但保留改動，方便重新提交或做其他處理的場合。</p>
        <p>例如這是我們專案的日誌歷史提交記錄的哈希值：</p>
        <pre
            class="line-numbers"
            data-prismjs-copy="Copy"
            data-prismjs-copy-success="Copied"
            data-prismjs-copy-error="Error!"
            data-prismjs-copy-timeout="2000"
            data-toolbar-order="copy-to-clipboard" 
        >
            <code class="language-git" v-prism>
                f4cb6e9 (HEAD -> master) C3
                e39824f C2
                a60510b C1
            </code>
        </pre>
        <p>我們決定恢復 C2 提交版本，下達指令為：</p>
        <pre
            class="line-numbers"
            data-prismjs-copy="Copy"
            data-prismjs-copy-success="Copied"
            data-prismjs-copy-error="Error!"
            data-prismjs-copy-timeout="2000"
            data-toolbar-order="copy-to-clipboard" 
        >
            <code class="language-git" v-prism>
                $git reset --soft e39824f
            </code>
        </pre>
        <p>再 <em>git log</em> 查詢一次，會發現記錄變成：</p>
        <pre
            class="line-numbers"
            data-prismjs-copy="Copy"
            data-prismjs-copy-success="Copied"
            data-prismjs-copy-error="Error!"
            data-prismjs-copy-timeout="2000"
            data-toolbar-order="copy-to-clipboard" 
        >
            <code class="language-git" v-prism>
                e39824f (HEAD -> master) C2
                a60510b C1
            </code>
        </pre>
        <p><em>HEAD</em> 會指向 <em>e39824f</em>，但先前 C3（<em>f4cb6e9</em>）對應的資料變更並非就這樣消失了，它們只是回退到索引區等待再次提交或執行其他動作。若我們再次提交，那麼該提交將會是一個全新的版本，我們可以透過哈希值得到證明：</p>
        <pre
            class="line-numbers"
            data-prismjs-copy="Copy"
            data-prismjs-copy-success="Copied"
            data-prismjs-copy-error="Error!"
            data-prismjs-copy-timeout="2000"
            data-toolbar-order="copy-to-clipboard" 
        >
            <code class="language-git" v-prism>
                95a98d0 (HEAD -> master) C3:new
                e39824f C2
                a60510b C1
            </code>
        </pre>
        <p><br></p>
        <h3>--mixed 模式：</h3>
        <p><em>--mixed</em> 是 <em>git reset</em> 的預設模式，會將 <em>HEAD</em> 重置到指定的 commit，並將索引區中的改動回退至這個 commit，但不會影響工作區。</p>
        <pre
            class="line-numbers"
            data-prismjs-copy="Copy"
            data-prismjs-copy-success="Copied"
            data-prismjs-copy-error="Error!"
            data-prismjs-copy-timeout="2000"
            data-toolbar-order="copy-to-clipboard" 
        >
            <code class="language-git" v-prism>
                $git reset --mixed e39824f
            </code>
        </pre>
        <p>查詢日誌歷史記錄：</p>
        <pre
            class="line-numbers"
            data-prismjs-copy="Copy"
            data-prismjs-copy-success="Copied"
            data-prismjs-copy-error="Error!"
            data-prismjs-copy-timeout="2000"
            data-toolbar-order="copy-to-clipboard" 
        >
            <code class="language-git" v-prism>
                e39824f (HEAD -> master) C2
                a60510b C1
            </code>
        </pre>
        <p>會發現與 <em>--soft</em> 模式似乎沒什麼不同？但兩者最大的差別在於 <em>--mixed</em> 模式會將回退某提交版本之後的變更，從索引區移除，保留在工作區階段裡。也就是說，如果我們想要將這些工作區變更的檔案內容再次提交，必須再走一遍 <em>add</em> 的流程。</p>
        <p><br></p>
        <h3>--hard 模式：</h3>
        <p>這個模式會將 <em>HEAD</em>、索引區和工作區都重置到指定的 commit。這會刪除未提交的更改，並使得你的工作區與指定的 commit 完全一致。當我們想完全捨棄之後的提交和任何工作區的更改時，<em>--hard</em> 模式最適合。儘管 <em>--hard</em> 模式可以一刀斬亂麻掉指定版本之後的所有更改，但卻也難以挽救回來，使用前最好審慎評估後再執行。</p>
        <pre
            class="line-numbers"
            data-prismjs-copy="Copy"
            data-prismjs-copy-success="Copied"
            data-prismjs-copy-error="Error!"
            data-prismjs-copy-timeout="2000"
            data-toolbar-order="copy-to-clipboard" 
        >
            <code class="language-git" v-prism>
                $git reset --hard e39824f
            </code>
        </pre>
        <p>使用 <em>git status</em> 查看當前專案狀態：</p>
        <pre
            class="line-numbers"
            data-prismjs-copy="Copy"
            data-prismjs-copy-success="Copied"
            data-prismjs-copy-error="Error!"
            data-prismjs-copy-timeout="2000"
            data-toolbar-order="copy-to-clipboard" 
        >
            <code class="language-git" v-prism>
                On branch master
                nothing to commit, working tree clean
            </code>
        </pre>
        <p>會發現原本 C3 版本變更的檔案既不在索引區也不在工作區裡了，已完全被捨棄。當然也不能斬釘截鐵地說那些被捨棄的變更記錄再也無法挽回，只是得透過更複雜的手段才能挽救並恢復。</p>
        <p><br></p>
        <h3>如何挽回被 reset 後的版本？</h3>
        <p>雖然 <em>git reset</em> 會將 HEAD 移動到指定的提交，而不會刪除任何 commit。這些操作會影響索引區或工作區的狀態，但提交歷史並未丟失，這意味著如果我們真的想恢復那些被「刪除」的版本，其實依然有跡可循。其關鍵指令為 <em>git reflog</em>。</p>
        <pre
            class="line-numbers"
            data-prismjs-copy="Copy"
            data-prismjs-copy-success="Copied"
            data-prismjs-copy-error="Error!"
            data-prismjs-copy-timeout="2000"
            data-toolbar-order="copy-to-clipboard" 
        >
            <code class="language-git" v-prism>
                $git reflog
            </code>
        </pre>
        <p>將會看到以下這些輸出：</p>
        <pre
            class="line-numbers"
            data-prismjs-copy="Copy"
            data-prismjs-copy-success="Copied"
            data-prismjs-copy-error="Error!"
            data-prismjs-copy-timeout="2000"
            data-toolbar-order="copy-to-clipboard" 
        >
            <code class="language-git" v-prism>
                f4cb6e9 (HEAD) HEAD@{0}: checkout: moving from master to f4cb6e9
                e39824f (master) HEAD@{1}: reset: moving to e39824f
                05bbe98 HEAD@{2}: commit: C3:new
                e39824f (master) HEAD@{3}: reset: moving to e39824f
                95a98d0 HEAD@{4}: commit: C3:new
                e39824f (master) HEAD@{5}: reset: moving to e39824f
                decdfa7 HEAD@{6}: cherry-pick: C2
                ff10266 HEAD@{7}: revert: Revert "C2"
                f4cb6e9 (HEAD) HEAD@{8}: commit: C3
                e39824f (master) HEAD@{9}: commit: C2
                a60510b HEAD@{10}: commit (initial): C1
            </code>
        </pre>
        <p>這些包含了前面我們練習各種 reset 模式所累積的提交記錄，假設我們想恢復 <em>f4cb6e9</em> 這個最初的 C3 版本，我們可以透過以下兩種指令去實現：</p>
        <pre
            class="line-numbers"
            data-prismjs-copy="Copy"
            data-prismjs-copy-success="Copied"
            data-prismjs-copy-error="Error!"
            data-prismjs-copy-timeout="2000"
            data-toolbar-order="copy-to-clipboard" 
        >
            <code class="language-git" v-prism>
                $git reset --hard f4cb6e9
            </code>
        </pre>
        <p>或</p>
        <pre
            class="line-numbers"
            data-prismjs-copy="Copy"
            data-prismjs-copy-success="Copied"
            data-prismjs-copy-error="Error!"
            data-prismjs-copy-timeout="2000"
            data-toolbar-order="copy-to-clipboard" 
        >
            <code class="language-git" v-prism>
                $git checkout f4cb6e9
            </code>
        </pre>
        <p>接著使用 <em>git log --oneline</em> 查看日誌歷史記錄：</p>
        <pre
            class="line-numbers"
            data-prismjs-copy="Copy"
            data-prismjs-copy-success="Copied"
            data-prismjs-copy-error="Error!"
            data-prismjs-copy-timeout="2000"
            data-toolbar-order="copy-to-clipboard" 
        >
            <code class="language-git" v-prism>
                f4cb6e9 (HEAD) C3
                e39824f (master) C2
                a60510b C1
            </code>
        </pre>
        <p>雖然看起來是恢復了，然而可以看到記錄中的 <em>master</em> 並沒有和 <em>HEAD</em> 同步在最新版本節點上，如果這時下達 <em>git branch</em> 指令，會發現經由 reflog 查詢並恢復指定版本之後，我們的 <em>HEAD</em> 被另外創建到別的分支上：</p>
        <pre
            class="line-numbers"
            data-prismjs-copy="Copy"
            data-prismjs-copy-success="Copied"
            data-prismjs-copy-error="Error!"
            data-prismjs-copy-timeout="2000"
            data-toolbar-order="copy-to-clipboard" 
        >
            <code class="language-git" v-prism>
                $git branch
                * (HEAD detached from f4cb6e9)
                master
            </code>
        </pre>
        <p>倘若我們要將 <em>master</em> 與 <em>HEAD</em> 合併，則執行流程如下：</p>
        <h6>1. 建立具名分支：</h6>
        <p>由於目前狀態下我們只是處於 <em>(HEAD detached from f4cb6e9)</em> 此一特定的 commit 狀態，並非位於一個具名分支，所以我們需要創建一個實體具名的分支名稱，始可繼續進行後續的操作。例如：</p>
        <pre
            class="line-numbers"
            data-prismjs-copy="Copy"
            data-prismjs-copy-success="Copied"
            data-prismjs-copy-error="Error!"
            data-prismjs-copy-timeout="2000"
            data-toolbar-order="copy-to-clipboard" 
        >
            <code class="language-git" v-prism>
                $git checkout -b "test"
            </code>
        </pre>
        <p>如果不建立具名分支就直接切回 <em>master</em>，那原本恢復的 commit 就又會消失不見。建立好具名分支 <em>test</em> 之後，我們可以藉由 <em>git log --oneline</em> 來確認該分支的日誌歷史記錄：</p>
        <pre
            class="line-numbers"
            data-prismjs-copy="Copy"
            data-prismjs-copy-success="Copied"
            data-prismjs-copy-error="Error!"
            data-prismjs-copy-timeout="2000"
            data-toolbar-order="copy-to-clipboard" 
        >
            <code class="language-git" v-prism>
                b3cffb6 (HEAD -> test) C4
                f4cb6e9 C3
                e39824f (master) C2
                a60510b C1
            </code>
        </pre>
        <p>C4 是基於 C3 恢復後繼續進行編輯後的最新提交版本。</p>
        <p><br></p>
        <h6>2. 切回 master 並進行合併：</h6>
        <p>接下來的步驟就是標準的分支合併流程，透過 <em>checkout</em> 將目前分支切換為 <em>master</em>，然後用 <em>merge</em> 去合併 <em>test</em> 分支：</p>
        <pre
            class="line-numbers"
            data-prismjs-copy="Copy"
            data-prismjs-copy-success="Copied"
            data-prismjs-copy-error="Error!"
            data-prismjs-copy-timeout="2000"
            data-toolbar-order="copy-to-clipboard" 
        >
            <code class="language-git" v-prism>
                $git checkout master
                $git merge test
            </code>
        </pre>
        <p>合併完後一樣透過 <em>git log</em> 來查詢提交記錄：</p>
        <pre
            class="line-numbers"
            data-prismjs-copy="Copy"
            data-prismjs-copy-success="Copied"
            data-prismjs-copy-error="Error!"
            data-prismjs-copy-timeout="2000"
            data-toolbar-order="copy-to-clipboard" 
        >
            <code class="language-git" v-prism>
                b3cffb6 (HEAD -> master, test) C4
                f4cb6e9 C3
                e39824f C2
                a60510b C1
            </code>
        </pre>
        <p>可以看見主分支 <em>master</em> 成功與 <em>HEAD</em> 同步了，而合併完成後的 <em>test</em> 分支已功臣身退隨時可以移除。</p>
    </div>
    <div class="text-block" :id="'act' + catalog[3].id">
        <h2 v-text="catalog[3].title"></h2>
        <div class="text-flex">
            <div class="f-width">
                <div class="f-head">
                    <div class="f-f0">功能</div>
                    <div class="f-f1">reset</div>
                    <div class="f-f1">revert</div>
                </div>
                <div class="f-row">
                    <div class="f-f0">操作方式</div>
                    <div class="f-f1">修改 <em>HEAD</em> 並影響提交歷史</div>
                    <div class="f-f1">創建一個新的提交來反轉指定的提交</div>
                </div>
                <div class="f-row">
                    <div class="f-f0">影響歷史</div>
                    <div class="f-f1">會改變提交歷史（本地）</div>
                    <div class="f-f1">不會改變提交歷史，歷史保持完整</div>
                </div>
                <div class="f-row">
                    <div class="f-f0">適用場景</div>
                    <div class="f-f1">回退本地提交、調整提交歷史、清除未暫存的變更</div>
                    <div class="f-f1">撤銷已推送的提交，保持提交歷史，公開分支的錯誤修正</div>
                </div>
                <div class="f-row">
                    <div class="f-f0">是否影響遠程倉庫</div>
                    <div class="f-f1">是，如果提交已推送則需要強制推送（不推薦）</div>
                    <div class="f-f1">否，<em>revert</em> 不改變歷史，可以安全推送到遠程</div>
                </div>
                <div class="f-row">
                    <div class="f-f0">保留變更</div>
                    <div class="f-f1"><em>--soft</em> 和 <em>--mixed</em> 模式下可以保留變更到索引或工作區</div>
                    <div class="f-f1">不保留原始變更，直接撤銷</div>
                </div>
            </div>
        </div>
        <p><br></p>
        <h3>什麼情況下使用哪種方式？</h3>
        <h4>reset：</h4>
        <ul>
            <li>想要回退本地尚未推送的提交。</li>
            <li>需要調整提交歷史並重組或清理分支。</li>
            <li>想要放棄工作區中的變更而不保留。</li>
        </ul>
        <p><br></p>
        <h4>revert：</h4>
        <ul>
            <li>需要撤銷已推送到遠端的提交，但不希望改變提交歷史。</li>
            <li>正在處理一個公共分支或多人協作的項目，不希望干擾他人的開發進度。</li>
            <li>希望安全地撤銷某個錯誤提交，並保留提交歷史的完整性。</li>
        </ul>
        <p><br></p>
        <p>總結來說，reset 適合用於本地開發時需要更改提交歷史或捨棄未提交變更的情況，而 revert 適合在已經推送到遠程倉庫的情況下用來撤銷指定提交的影響，並保持歷史的完整性。</p>
    </div>
</div>
<!-- end -->
    </BaseTextContent>
</template>