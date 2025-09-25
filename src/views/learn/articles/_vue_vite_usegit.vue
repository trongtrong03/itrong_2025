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
    { id: 1, title: '一、建立流程' },
    { id: 2, title: '二、錯誤處理' },
]);
</script>

<template>
    <BaseTextContent>
        <Title :propValue="83" fileType="learnList" />
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
        <p>沒事為什麼要把自家專案 Git 的 Commit 記錄打在網頁前端畫面上？確實要有這樣的需求幾乎也不存在，而之所以會有這個想法，主要是我在進行某個內部工具開發的時候，突發奇想如果將該工具專案的 Git 版本庫裡頭的 Commit 撈出來，充作更新日誌，這樣一來就不需要另外註記每一次的更新，團隊其他同事可以直接透過打印出來的 Commit 名稱，知道該工具近期更新了些什麼東西。聽起來似乎頗方便，但實務上可行嗎？</p>
        <p>突然想到，像 Gitlab 這類 Git 版控網站都能在網頁上詳細列出每一筆 HASH 訊息，它們撈取的應該也是專案目錄中 Git 記錄的資料，所以我要在自己的專案內顯示相同的資訊，原理應該是一樣的。歷經一番查詢和請教強大的ＡＩ大神，果不其然可以做到，這篇文章主要就是用來記錄實現這個功能的過程。</p>
    </div>
    <div class="text-block" :id="'act' + catalog[1].id">
        <h2 v-text="catalog[1].title"></h2>
        <h6>1. 建立 JavaScript 腳本文件：</h6>
        <p>找到 Vite 專案目錄中的 <b>script</b> 資料夾，建立一個 JavaScript 的 <em>.js</em> 文件，撰寫內容如下：</p>
        <pre
            class="line-numbers"
            data-prismjs-copy="Copy"
            data-prismjs-copy-success="Copied"
            data-prismjs-copy-error="Error!"
            data-prismjs-copy-timeout="2000"
            data-toolbar-order="copy-to-clipboard" 
        >
            <code class="language-javascript" v-prism>
                // scripts/gen-commits.js
                import { execSync } from 'child_process'
                import { writeFileSync } from 'fs'
                import { fileURLToPath } from 'url'
                import { dirname, resolve } from 'path'

                // 取得目前檔案所在目錄
                const __filename = fileURLToPath(import.meta.url)
                const __dirname = dirname(__filename)

                try {
                    // 執行 git log 並解析每一筆 commit
                    const raw = execSync('git log --pretty=format:"%h | %an | %ad | %s" --date=short')
                        .toString()
                        .split('\n')
                        .map((line) => {
                            const [hash, author, date, ...messageParts] = line.split(' | ')
                            return {
                                hash,
                                author,
                                date,
                                message: messageParts.join(' | ')
                            }
                        })

                    // 輸出為 JSON 檔案
                    const outputPath = resolve(__dirname, '../src/data/commits.json')
                    writeFileSync(outputPath, JSON.stringify(raw, null, 2))

                    console.log('✔ Commit list generated successfully!')
                } catch (err) {
                    console.error('✖ Failed to generate commit list:', err)
                }
            </code>
        </pre>
        <p>其中 <em>'../src/data/commits.json'</em> 可自行替換腳本執行後所輸出 JSON 檔案的存放路徑位置。</p>
        <p><br></p>
        <h6>2. 於 package.json 中新增內容：</h6>
        <p>打開 <b>package.json</b> 文件，在 <em>scripts</em> 程式碼區塊新增：</p>
        <pre
            class="line-numbers"
            data-prismjs-copy="Copy"
            data-prismjs-copy-success="Copied"
            data-prismjs-copy-error="Error!"
            data-prismjs-copy-timeout="2000"
            data-toolbar-order="copy-to-clipboard" 
        >
            <code class="language-javascript" v-prism>
                "scripts": {
                    "generate:commits": "node scripts/gen-commits.js"
                }
            </code>
        </pre>
        <p>這個目的是讓每一次執行編譯指令時都會自動產生 <b>commits</b> 檔案。</p>
        <p><br></p>
        <h6>3. 指定組件引用 commits JSON 文件：</h6>
        <p>在要顯示 commit 記錄的 <b>.vue</b> 組件裡建立相關程式碼，首先我們要引入編譯指令輸出後的產生的 JSON 檔案：</p>
        <pre
            class="line-numbers"
            data-prismjs-copy="Copy"
            data-prismjs-copy-success="Copied"
            data-prismjs-copy-error="Error!"
            data-prismjs-copy-timeout="2000"
            data-toolbar-order="copy-to-clipboard" 
        >
            <code class="language-html" v-prism>
                &lt;script setup&gt;
                    import commits from '@/assets/commits.json'
                &lt;/script&gt;
            </code>
        </pre>
        <p>接著透過 HTML 把資料渲染出來，例如：</p>
        <pre
            class="line-numbers"
            data-prismjs-copy="Copy"
            data-prismjs-copy-success="Copied"
            data-prismjs-copy-error="Error!"
            data-prismjs-copy-timeout="2000"
            data-toolbar-order="copy-to-clipboard" 
        >
            <code class="language-html" v-prism>
                &lt;ul&gt;
                    &lt;li v-for="(commit, index) in commits" :key="index"&gt;
                        &lt;p&gt;HASH：&#123;&#123; commit.hash &#125;&#125;&lt;/p&gt;
                        &lt;p&gt;作者：&#123;&#123; commit.author &#125;&#125;&lt;/p&gt;
                        &lt;p&gt;日期：&#123;&#123; commit.date &#125;&#125;&lt;/p&gt;
                        &lt;p&gt;提交名稱：&#123;&#123; commit.message &#125;&#125;&lt;/p&gt;
                    &lt;/li&gt;
                &lt;/ul&gt;
            </code>
        </pre>
        <p></p>
        <p><br></p>
        <h6>4. 執行編譯指令：</h6>
        <p>做完前面三個步驟，我們已經將 Vite 專案所需的設定和要顯示的排版方式都準備就緒，最後要做的就是執行編譯指令，讓 Node 協助打撈該專案 Git 版控裡的 commit 記錄。</p>
        <p>指令：</p>
        <pre
            class="line-numbers"
            data-prismjs-copy="Copy"
            data-prismjs-copy-success="Copied"
            data-prismjs-copy-error="Error!"
            data-prismjs-copy-timeout="2000"
            data-toolbar-order="copy-to-clipboard" 
        >
            <code class="language-bash" v-prism>
                npm run generate:commits
            </code>
        </pre>
        <p>以下是執行成功的回傳結果：</p>
        <pre
            class="line-numbers"
            data-prismjs-copy="Copy"
            data-prismjs-copy-success="Copied"
            data-prismjs-copy-error="Error!"
            data-prismjs-copy-timeout="2000"
            data-toolbar-order="copy-to-clipboard" 
        >
            <code class="language-bash" v-prism>
                npm run generate:commits

                > project@0.0.0 generate:commits
                > node scripts/gen-commits.js   

                ✔ Commit list generated successfully!
            </code>
        </pre>
        <p><br></p>
        <p>重新整理網頁，就可以看到 Git commit 記錄顯示在網頁前端畫面上了。</p>
        <p>範例：</p>
        <pre
            class="line-numbers"
            data-prismjs-copy="Copy"
            data-prismjs-copy-success="Copied"
            data-prismjs-copy-error="Error!"
            data-prismjs-copy-timeout="2000"
            data-toolbar-order="copy-to-clipboard" 
        >
            <code class="language-html" v-prism>
                HASH：92d8891
                作者：iTrong
                日期：2024-05-27
                提交名稱：0527需求修改

                HASH：93f88cd
                作者：iTrong
                日期：2024-05-25
                提交名稱：0525需求修改

                HASH：6640790
                作者：iTrong
                日期：2024-05-23
                提交名稱：first commit
            </code>
        </pre>
    </div>
    <div class="text-block" :id="'act' + catalog[2].id">
        <h2 v-text="catalog[2].title"></h2>
        <p>若執行編譯指令失敗，系統回報以下錯誤：</p>
        <blockquote class="is-error">
            <p>ReferenceError: require is not defined in ES module scope, you can use import instead
This file is being treated as an ES module because it has a '.js' file extension and 'X:\project\package.json' contains "type": "module". To treat it as a CommonJS script, rename it to use the '.cjs' file extension.</p>
        </blockquote>
        <p>這個錯誤訊息主要是說 Vite 專案 <b>package.json</b> 裡有設定 <em>"type": "module"</em>，這會讓所有 <b>.js</b> 文件都被視為 ESM 模組，倘若我們腳本中有使用 <em>require()</em> 方法，就會產生錯誤。</p>
        <p>舉例來說，如果我們的 <b>gen-commits.js</b> 是這樣寫：</p>
        <pre
            class="line-numbers"
            data-prismjs-copy="Copy"
            data-prismjs-copy-success="Copied"
            data-prismjs-copy-error="Error!"
            data-prismjs-copy-timeout="2000"
            data-toolbar-order="copy-to-clipboard" 
        >
            <code class="language-javascript" v-prism>
                // scripts/gen-commits.js
                const { execSync } = require('child_process');
                const fs = require('fs');
                const path = require('path');

                // 取得 commit 訊息
                const commits = execSync('git log --pretty=format:"%h - %s"')
                    .toString()
                    .split('\n');

                // 儲存為 JSON 檔案
                const outputPath = path.resolve(__dirname, '../src/data/commits.json');
                fs.writeFileSync(outputPath, JSON.stringify(commits, null, 2));

                console.log(`✔ Commit list generated to ${outputPath}`);
            </code>
        </pre>
        <p>當執行打包或開發指令時，系統就會噴出錯誤導致無法順利運行。</p>
        <p>要解決這個問題，主要方法有兩種：</p>
        <p><br></p>
        <h4>1. 將檔案副檔名格式更改為 .cjs：</h4>
        <p>這是最直接快速的方法，我們直接將 <b>gen-commits.js</b> 的 <b>.js</b> 副檔名更改為 <b>.cjs</b> 格式，同時更新一下 <b>package.json</b>：</p>
        <pre
            class="line-numbers"
            data-prismjs-copy="Copy"
            data-prismjs-copy-success="Copied"
            data-prismjs-copy-error="Error!"
            data-prismjs-copy-timeout="2000"
            data-toolbar-order="copy-to-clipboard" 
        >
            <code class="language-javascript" v-prism>
                "scripts": {
                    "generate:commits": "node scripts/gen-commits.cjs"
                }
            </code>
        </pre>
        <p>這樣就不需要改寫 <em>require</em>，簡單又穩定。</p>
        <p><br></p>
        <h4>2. 改用 ES Module 語法：</h4>
        <p>不想將 <b>.js</b> 更改為 <b>.cjs</b> 也不是不行，只是比起第一個方法會稍嫌麻煩一點，主要就是把所有使用到 <em>require()</em> 的方法通通改成 <em>import</em>，而本篇文章腳本撰寫的方法就是採用此種方式。</p>
    </div>
</div>
<!-- end -->
    </BaseTextContent>
</template>