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
                    <p>error: Your local changes to the following files would be overwritten by checkout:...Please commit your changes or stash them before you switch branches.</p>
                </div>
                <div class="accordin-content">
                    <p>這個錯誤信息表示你在嘗試切換到 master 分支時，Git 發現你當前工作目錄中的一些文件有未提交的變更，而這些變更會在切換分支的過程中被覆蓋。為了保護你的未提交變更，Git 阻止了這次分支切換操作。以下有三種處理方案：</p>
                    <h5>1. 提交變更：</h5>
                    <p>如果你希望保留並提交這些變更，你可以將它們添加到暫存區並進行提交。</p>
                    <prism-highlight>
                        <div class="text-code" v-pre>
                            <pre><code class="language-git">git add .
git commit -m "版本名稱"</code></pre>
                        </div>
                    </prism-highlight>
                    <p>提交後就可以藉由 <em>git checkout master</em> 切換到主分支或其他分支。</p>
                    <p><br></p>
                    <h5>2. 暫存（stash）變更：</h5>
                    <p>如果你不想現在提交這些變更，但希望保留它們以便稍後使用，你可以使用 <em>git stash</em> 將它們存起來。</p>
                    <prism-highlight>
                        <div class="text-code" v-pre>
                            <pre><code class="language-git">git stash</code></pre>
                        </div>
                    </prism-highlight>
                    <p>這會保存你的工作目錄中的變更並允許你切換到 master 分支或其他分支。</p>
                    <p>後續當你想應用剛剛存起來的變更，可以在任何需要的分支上使用：</p>
                    <prism-highlight>
                        <div class="text-code" v-pre>
                            <pre><code class="language-git">git stash apply</code></pre>
                        </div>
                    </prism-highlight>
                    <p><br></p>
                    <h5>3. 放棄變更：</h5>
                    <p>如果你確定這些變更不需要保存，可以使用以下命令放棄它們：</p>
                    <prism-highlight>
                        <div class="text-code" v-pre>
                            <pre><code class="language-git">git reset --hard</code></pre>
                        </div>
                    </prism-highlight>
                    <p>這樣會放棄所有未提交的變更，然後你就可以切換到 master 或其他分支。</p>
                </div>
                <button class="accordin-close" @click="toggle(0)"></button>
            </div>
            <div class="accordin-item" :class="isActive==1002 ? 'is-active' : ''">
                <div class="accordin-title" @click="toggle(1002)">
                    <p>warning: redirecting to https://xxx.git/ fatal: MyBranchName cannot be resolved to branch</p>
                </div>
                <div class="accordin-content">
                    <p>這個錯誤提示表示 Git 無法找到你指定的分支 MyBranchName，通常比較多的可能是自己輸入了錯誤的分支名稱，請檢察是否輸入正確。另外一種可能則是本地要推送的分支沒有被設置與遠端的 <em>origin</em> 同步，這時我們可以添加 <em>-u</em> 指令來讓本地分支與遠端分支關聯。例如：</p>
                    <prism-highlight>
                        <div class="text-code" v-pre>
                            <pre><code class="language-git">git push -u origin MyBranchName</code></pre>
                        </div>
                    </prism-highlight>
                    <p><br></p>
                    <p>除了上述兩種因素，還有一種可能原因是我們本地連結的遠端（Remote）已經換了網址，導致推送的過程無法匹配到遠端儲存庫，這時我們可以先透過 <em>remote -v</em> 查看目前遠端網址是否正確，倘若不正確的話，則使用下述指令來重新定義新的網址：</p>
                    <prism-highlight>
                        <div class="text-code" v-pre>
                            <pre><code class="language-git">git remote set-url origin 新的遠端網址</code></pre>
                        </div>
                    </prism-highlight>
                </div>
                <button class="accordin-close" @click="toggle(0)"></button>
            </div>
            <div class="accordin-item" :class="isActive==1003 ? 'is-active' : ''">
                <div class="accordin-title" @click="toggle(1003)">
                    <p>Updates were rejected because the tip of your current branch is behind</p>
                </div>
                <div class="accordin-content">
                    <p>當執行 <em>git push</em> 時出現 <b>error: failed to push some refs to 'url.git'</b> 錯誤，並有以下提示：</p>
                    <blockquote class="is-warning">
                        <p>hint: Updates were rejected because the tip of your current branch is behind</p>
                        <br>
                        <p>hint: its remote counterpart. If you want to integrate the remote changes,</p>
                        <br>
                        <p>hint: use 'git pull' before pushing again.</p>
                    </blockquote>
                    <prism-highlight>
                        <div class="text-code" v-pre>
                            <pre><code class="language-git">git push -u origin MyBranchName</code></pre>
                        </div>
                    </prism-highlight>
                    <p>這個錯誤訊息表示我們本地的指定分支比對應的遠端分支還要落後，因此 Git 無法直接將本地的更改推送到遠端。若要解決這個問題，我們只需要 <em>pull</em> 拉取且合併本地的分支即可。</p>
                    <p>如果遇到合併衝突，試著解除衝突後再執行 <em>add</em> 和 <em>commit</em> 的動作，重新 <em>push</em> 至遠端。</p>
                    <p>但假設你不想合併遠端的更改，並且很確定本地的內容可以覆蓋遠端的變更，則可以使用強制推送的方法：</p>
                    <prism-highlight>
                        <div class="text-code" v-pre>
                            <pre><code class="language-git">git push origin test --force</code></pre>
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
                    <p>如何捨棄本地 master 分支的更改，並強制更新成遠端 master 分支的最新版本？</p>
                </div>
                <div class="accordin-content">
                    <h6>1. 確保目前在 master 分支上：</h6>
                    <prism-highlight>
                        <div class="text-code" v-pre>
                            <pre><code class="language-git">git checkout master</code></pre>
                        </div>
                    </prism-highlight>
                    <h6>2. 從遠端獲取最新的分支訊息：</h6>
                    <prism-highlight>
                        <div class="text-code" v-pre>
                            <pre><code class="language-git">git fetch origin</code></pre>
                        </div>
                    </prism-highlight>
                    <h6>3. 重置本地 master 分支到遠端 master 分支：</h6>
                    <prism-highlight>
                        <div class="text-code" v-pre>
                            <pre><code class="language-git">git reset --hard origin/master</code></pre>
                        </div>
                    </prism-highlight>
                    <p>重置本地 master 分支，使其與遠端 master 分支完全一致，捨棄所有本地的更改。</p>
                </div>
                <button class="accordin-close" @click="toggle(0)"></button>
            </div>
            <div class="accordin-item" :class="isActive==3002 ? 'is-active' : ''">
                <div class="accordin-title" @click="toggle(3002)">
                    <p>如何修改最近一次 Commit 提交的訊息文字？</p>
                </div>
                <div class="accordin-content">
                    <prism-highlight>
                        <div class="text-code" v-pre>
                            <pre><code class="language-git">git commit --amend -m "新的提交訊息名稱"</code></pre>
                        </div>
                    </prism-highlight>
                </div>
                <button class="accordin-close" @click="toggle(0)"></button>
            </div>
            <div class="accordin-item" :class="isActive==3003 ? 'is-active' : ''">
                <div class="accordin-title" @click="toggle(3003)">
                    <p>如何 merge 兩個不同的分支？</p>
                </div>
                <div class="accordin-content">
                    <p>假設目前有兩個分支，分別叫做 <em>cat</em> 與 <em>dog</em>，而現在我們希望將 <em>cat</em> 合併到 <em>dog</em> 分支裡，執行步驟如下：</p>
                    <h6>1. 切換到 <em>dog</em> 分支：</h6>
                    <prism-highlight>
                        <div class="text-code" v-pre>
                            <pre><code class="language-git">git branch dog</code></pre>
                        </div>
                    </prism-highlight>
                    <h6>2. 合併 <em>cat</em> 分支給 <em>dog</em>：</h6>
                    <prism-highlight>
                        <div class="text-code" v-pre>
                            <pre><code class="language-git">git merge cat</code></pre>
                        </div>
                    </prism-highlight>
                    <p>如果合併的過程發生衝突，Git 會提示哪些檔案存在衝突，我們必須手動編輯該檔案，將衝突解決後再重新將這些檔案 <em>add</em> 並執行 <em>commit</em>，然後就會完成合併。</p>
                    <p>最後再將分支推送到遠端儲存庫即可：</p>
                    <prism-highlight>
                        <div class="text-code" v-pre>
                            <pre><code class="language-git">git push origin dog</code></pre>
                        </div>
                    </prism-highlight>
                </div>
                <button class="accordin-close" @click="toggle(0)"></button>
            </div>
            <div class="accordin-item" :class="isActive==3004 ? 'is-active' : ''">
                <div class="accordin-title" @click="toggle(3004)">
                    <p>如何下載遠端儲存庫指定的分支？</p>
                </div>
                <div class="accordin-content">
                    <p>在本機端還沒有該專案的前提下，我們可以透過 <em>git clone</em> 直接克隆特定的分支：</p>
                    <prism-highlight>
                        <div class="text-code" v-pre>
                            <pre><code class="language-git">git clone -b 分支名稱 遠端儲存庫url</code></pre>
                        </div>
                    </prism-highlight>
                    <p><br></p>
                    <p>如果本機端已存在該專案，只是缺少該分支，可以依循以下步驟：</p>
                    <h6>1. 檢查遠端儲存庫：</h6>
                    <prism-highlight>
                        <div class="text-code" v-pre>
                            <pre><code class="language-git">git fetch origin</code></pre>
                        </div>
                    </prism-highlight>
                    <h6>2. 檢出特定分支：</h6>
                    <prism-highlight>
                        <div class="text-code" v-pre>
                            <pre><code class="language-git">git checkout -b 分支名稱 origin/分支名稱</code></pre>
                        </div>
                    </prism-highlight>
                    <h6>3. 拉取最新的更改：</h6>
                    <prism-highlight>
                        <div class="text-code" v-pre>
                            <pre><code class="language-git">git pull origin 分支名稱</code></pre>
                        </div>
                    </prism-highlight>
                    <p>通常而言第二步驟理應已經下載遠端分支最新的內容，但如果不是很確定自己是否拉取的是最新版本的分支資料，就可以接著執行第三步驟的更新。</p>
                </div>
                <button class="accordin-close" @click="toggle(0)"></button>
            </div>
            <div class="accordin-item" :class="isActive==3005 ? 'is-active' : ''">
                <div class="accordin-title" @click="toggle(3005)">
                    <p>忘記另開分支就在 master 分支上修改了檔案，還來的及將檔案提交給新的分支嗎？</p>
                </div>
                <div class="accordin-content">
                    <p>答案是可以的，在開始下 Git 指令之前，先確保編輯檔案都已經儲存。</p>
                    <h6>1. 新建並切換到新分支：</h6>
                    <prism-highlight>
                        <div class="text-code" v-pre>
                            <pre><code class="language-git">git checkout -b branchName</code></pre>
                        </div>
                    </prism-highlight>
                    <h6>2. 提交更改：</h6>
                    <prism-highlight>
                        <div class="text-code" v-pre>
                            <pre><code class="language-git">git add .
git commit -m "提交訊息"</code></pre>
                        </div>
                    </prism-highlight>
                    <p>這樣修改後的檔案所提交的 Git Commit 會存在於新建立的分支上，而非 master。</p>
                    <h3>如果已經在 master 上提交了更改？</h3>
                    <p>假如是這個情況，就需要使用 <em>git cherry-pick</em> 指令，具體方法如下：</p>
                    <h6>1. 從 log 紀錄中查詢要移動到新分支的 commit HASH 值：</h6>
                    <prism-highlight>
                        <div class="text-code" v-pre>
                            <pre><code class="language-git">git log --oneline</code></pre>
                        </div>
                    </prism-highlight>
                    <p>假設要移動的 Commit HASH 值為 abc123。</p>
                    <h6>2. 新建並切換到新分支：</h6>
                    <prism-highlight>
                        <div class="text-code" v-pre>
                            <pre><code class="language-git">git checkout -b branchName</code></pre>
                        </div>
                    </prism-highlight>
                    <h6>3. 提交更改：</h6>
                    <prism-highlight>
                        <div class="text-code" v-pre>
                            <pre><code class="language-git">git cherry-pick abc123</code></pre>
                        </div>
                    </prism-highlight>
                    <p>假如有多個 Commit 要移動，則分別記錄下它們的 HASH 值，在建立好新分支後逐一 <em>cherry-pick</em> 即可。例如：</p>
                    <prism-highlight>
                        <div class="text-code" v-pre>
                            <pre><code class="language-git">git cherry-pick abc123
git cherry-pick xyz456
git cherry-pick mon789</code></pre>
                        </div>
                    </prism-highlight>
                </div>
                <button class="accordin-close" @click="toggle(0)"></button>
            </div>
            <div class="accordin-item" :class="isActive==3006 ? 'is-active' : ''">
                <div class="accordin-title" @click="toggle(3006)">
                    <p>git fetch 與 git pull 使用上有什麼差異？</p>
                </div>
                <div class="accordin-content">
                    <p>如果我們要取得遠端版本庫分支的最新資料（例如 <em>master</em>），比較穩妥的作法是先使用 <em>git fetch</em> 將遠端分支下載到本地端的「遠程追蹤分支」（例如 <em>origin/master</em>），它的作用是同步與反映遠端分支的最新狀態，並不影響目前本地端的 <em>master</em> 分支資料，換句話說，我們可以將遠程追蹤分支視為遠端分支的「鏡像」。</p>
                    <prism-highlight>
                        <div class="text-code" v-pre>
                            <pre><code class="language-git">git fetch</code></pre>
                        </div>
                    </prism-highlight>
                    <p>再來我們要透過 <em>git merge</em> 來將遠程追蹤分支合併到本機的分支，指令為：</p>
                    <prism-highlight>
                        <div class="text-code" v-pre>
                            <pre><code class="language-git">git merge origin/master</code></pre>
                        </div>
                    </prism-highlight>
                    <p>需要注意的是，因為我們要合併的是遠程追蹤分支，所以 merge 合併的對象就會是 <em>origin/master</em>，而非直接下 <em>master</em>，因為後者會被判斷成是本地的 <em>master</em> 分支。</p>
                    <p><br></p>
                    <p>至於 <em>git pull</em> 其實就是 <em>git fetch</em> 與 <em>git merge</em> 兩個操作的結合：</p>
                    <prism-highlight>
                        <div class="text-code" v-pre>
                            <pre><code class="language-git">git fetch
git merge origin/master</code></pre>
                        </div>
                    </prism-highlight>
                    <p>相當於</p>
                    <prism-highlight>
                        <div class="text-code" v-pre>
                            <pre><code class="language-git">git pull</code></pre>
                        </div>
                    </prism-highlight>
                    <p><br></p>
                    <h3>什麼時候該用哪種方式？</h3>
                    <p>假如需要快速更新本地與遠端的分支資料，且也確認遠端上的分支不會影響到本地端分支的資料，那麼我們可以直接下 <em>git pull</em> 指令。</p>
                    <p>如果偏好謹慎操作，一步步檢查遠端分支更新的內容再決定是否合併，尤其是多人協作的專案，我們往往無法肯定遠端最新的分支狀態是否與我們本地的分支資料有所衝突，這時就會比較推薦先使用 <em>git fetch</em> 評估遠端分支的更新，爾後再決定是否要 <em>git merge</em> 到本地端分支。</p>
                </div>
                <button class="accordin-close" @click="toggle(0)"></button>
            </div>
            <div class="accordin-item" :class="isActive==3007 ? 'is-active' : ''">
                <div class="accordin-title" @click="toggle(3007)">
                    <p>如何下載遠端某一個分支？</p>
                </div>
                <div class="accordin-content">
                    <p>假設我們要下載遠端儲存庫非 <em>master</em> 之外的分支，例如 <em>test</em>，以下是操作流程：</p>
                    <h6>1. 檢查遠端分支：</h6>
                    <p>首先檢查遠端目前有哪些分支，是否存在我們想要下載的 <em>test</em> 分支。指令：</p>
                    <prism-highlight>
                        <div class="text-code" v-pre>
                            <pre><code class="language-git">git fetch
git branch -r</code></pre>
                        </div>
                    </prism-highlight>
                    <h6>2. 切換到指定分支：</h6>
                    <p>如果確認有 <em>test</em> 分支，接下來可以切換到該分支。如果本地還沒有 <em>test</em> 分支，可以用下面的指令創建並切換到 <em>test</em> 分支：</p>
                    <prism-highlight>
                        <div class="text-code" v-pre>
                            <pre><code class="language-git">git checkout -b test origin/test</code></pre>
                        </div>
                    </prism-highlight>
                    <p>這個指令會從遠端的 <em>test</em> 分支拉取最新的內容，並在本地建立一個名為 <em>test</em> 的分支。</p>
                    <h6>3. 拉取最新變更：</h6>
                    <p> 切換到 <em>test</em> 分支後，可以用 <em>git pull</em> 來更新本地的分支與遠端同步：</p>
                    <prism-highlight>
                        <div class="text-code" v-pre>
                            <pre><code class="language-git">git pull origin test</code></pre>
                        </div>
                    </prism-highlight>
                    <p>如此就能將遠端 <em>test</em> 分支上的檔案拉取下來並在本地查看和使用了。</p>
                </div>
                <button class="accordin-close" @click="toggle(0)"></button>
            </div>
            <div class="accordin-item" :class="isActive==3008 ? 'is-active' : ''">
                <div class="accordin-title" @click="toggle(3008)">
                    <p>如何修改本地分支的名稱？</p>
                </div>
                <div class="accordin-content">
                    <p>大致上可分為以下三種情境：</p>
                    <h4>1. 重新命名目前所在的分支：</h4>
                    <prism-highlight>
                        <div class="text-code" v-pre>
                            <pre><code class="language-git">git branch -m 新分支名稱</code></pre>
                        </div>
                    </prism-highlight>
                    <p><br></p>
                    <h4>2. 重新命名其他分支：</h4>
                    <prism-highlight>
                        <div class="text-code" v-pre>
                            <pre><code class="language-git">git branch -m 舊分支名稱 新分支名稱</code></pre>
                        </div>
                    </prism-highlight>
                    <p><br></p>
                    <h4>3. 將重命名的分支推送到遠端後並刪除原先的遠端舊分支：</h4>
                    <prism-highlight>
                        <div class="text-code" v-pre>
                            <pre><code class="language-git">git push origin 新分支名稱
git push origin --delete 舊分支名稱</code></pre>
                        </div>
                    </prism-highlight>
                </div>
                <button class="accordin-close" @click="toggle(0)"></button>
            </div>
            <div class="accordin-item" :class="isActive==3009 ? 'is-active' : ''">
                <div class="accordin-title" @click="toggle(3009)">
                    <p>同時執行多個 Git 指令</p>
                </div>
                <div class="accordin-content">
                    <p>可利用 <em>&&</em> 串聯不同的指令，就可以令 Git 一次全部執行。例如：</p>
                    <prism-highlight>
                        <div class="text-code" v-pre>
                            <pre><code class="language-git">git add . && git commit -m "你的 commit 訊息" && git push origin master</code></pre>
                        </div>
                    </prism-highlight>
                </div>
                <button class="accordin-close" @click="toggle(0)"></button>
            </div>
        </div>
    </div>
</template>