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
                    <p>Vite TS npm run build 發生一堆錯誤警告</p>
                </div>
                <div class="accordin-content">
                    <p>假設 Vite 專案採用 TypeScript 開發模式，但並沒有很嚴謹遵守 TypeScript 的相關規範，在最後打包（npm run build）階段很容易會噴出一堆錯誤警告導致專案無法順利打包，如下圖所示：</p>
                    <figure>
                        <img src="/images/learn/js/vite-faq-1.jpg">
                    </figure>
                    <p>其實許多警告項目也不完全是會影響網頁運行的錯誤，但動輒幾十甚至上百的警告，要一條條處理其實也要花不少時間，如果想要跳過 TypeScript 嚴格規則並快速進行打包，可以找到專案內的 <b>package.json</b> 檔案，找到這一段程式碼：</p>
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
                                "dev": "vite",
                                "build": "run-p type-check \"build-only {@}\" --",
                                "preview": "vite preview",
                                "build-only": "vite build",
                                "type-check": "vue-tsc --build --force"
                            },
                        </code>
                    </pre>
                    <p>將 <em>type-check</em> 相關的項目移除即可：</p>
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
                                "dev": "vite",
                                "build": "run-p \"build-only {@}\" --",
                                "preview": "vite preview",
                                "build-only": "vite build"
                            },
                        </code>
                    </pre>
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
                    <p>如何改變 Vite 的 port？</p>
                </div>
                <div class="accordin-content">
                    <p>執行 Vite 的 <em>npm run dev</em> 指令時，預設的本機端伺服器網址為 <b>http://localhost:5173/</b>，若因為一些因素想修改它初始 port 值，可從 <b>vite.config</b> 文件著手進行變更：</p>
                    <pre
                        class="line-numbers"
                        data-prismjs-copy="Copy"
                        data-prismjs-copy-success="Copied"
                        data-prismjs-copy-error="Error!"
                        data-prismjs-copy-timeout="2000"
                        data-toolbar-order="copy-to-clipboard" 
                    >
                        <code class="language-javascript" v-prism>
                            export default defineConfig({
                                server: {
                                    port: 3006,
                                },

                                // 其他設定
                            })
                        </code>
                    </pre>
                    <p>範例中我們將 port 設定為 3006，那麼下次執行 <em>npm run dev</em> 後，網址就將會是 <b>http://localhost:3006/</b> 了。</p>
                </div>
                <button class="accordin-close" @click="toggle(0)"></button>
            </div>
            <div class="accordin-item" :class="isActive==3002 ? 'is-active' : ''">
                <div class="accordin-title" @click="toggle(3002)">
                    <p>為什麼將打包好的檔案上傳到伺服器端後，頁面重整就會顯示 404 Not Found？</p>
                </div>
                <div class="accordin-content">
                    <p>這個問題通常是因為使用 Vite 建立的單一頁面應用程式（SPA）在重新載入頁面時，伺服器不知道如何處理非根路徑的請求。預設情況下，Vite 的開發伺服器只能處理根路徑（例如 /），而對於嵌套路由（例如 /about/info），在刷新時，伺服器不知道該如何處理這些請求，從而導致 404 錯誤。</p>
                    <p>要解決這個問題，我們需要設定伺服器來正確處理所有的路由請求，並將它們指向我們 SPA 的入口檔案（例如 index.html）。以下是解決方案：</p>
                    <h4>如果伺服器是 Nginx：</h4>
                    <h6>1. 建立一個檔案並命名為 <b>your_domain.conf</b></h6>
                    <h6>2. 於文件中添加以下程式碼：</h6>
                    <pre
                        class="line-numbers"
                        data-prismjs-copy="Copy"
                        data-prismjs-copy-success="Copied"
                        data-prismjs-copy-error="Error!"
                        data-prismjs-copy-timeout="2000"
                        data-toolbar-order="copy-to-clipboard" 
                    >
                        <code class="language-bash" v-prism>
                            server {
                                listen 80;
                                server_name your_domain.com;

                                root /path/to/your/dist;
                                index index.html;

                                location / {
                                    try_files $uri $uri/ /index.html;
                                }

                                # 其他配置...
                            }
                        </code>
                    </pre>
                    <h6>3. 上傳該檔案或通知伺服器管理員，將檔案提供給他們協助進行配置。</h6>
                    <p><br></p>
                    <h4>如果伺服器是 Apache：</h4>
                    <h6>1. 建立一個檔案並命名為 <b>.htaccess</b></h6>
                    <h6>2. 於文件中添加以下程式碼：</h6>
                    <pre
                        class="line-numbers"
                        data-prismjs-copy="Copy"
                        data-prismjs-copy-success="Copied"
                        data-prismjs-copy-error="Error!"
                        data-prismjs-copy-timeout="2000"
                        data-toolbar-order="copy-to-clipboard" 
                    >
                        <code class="language-bash" v-prism>
                            &lt;IfModule mod_rewrite.c&gt;
                                RewriteEngine On
                                RewriteBase /
                                RewriteRule ^index\.html$ - [L]
                                RewriteCond %{REQUEST_FILENAME} !-f
                                RewriteCond %{REQUEST_FILENAME} !-d
                                RewriteRule . /index.html [L]
                            &lt;/IfModule&gt;
                        </code>
                    </pre>
                    <h6>3. 將該檔案上傳至伺服器端，於入口文件（例如 index.html）放在同一個階層。</h6>
                </div>
                <button class="accordin-close" @click="toggle(0)"></button>
            </div>
            <div class="accordin-item" :class="isActive==3003 ? 'is-active' : ''">
                <div class="accordin-title" @click="toggle(3003)">
                    <p>組件路由切換時畫面自動移動到最頂部</p>
                </div>
                <div class="accordin-content">
                    <p>在路由設定檔（例如 <b>router/index.ts</b>）中添加：</p>
                    <pre
                        class="line-numbers"
                        data-prismjs-copy="Copy"
                        data-prismjs-copy-success="Copied"
                        data-prismjs-copy-error="Error!"
                        data-prismjs-copy-timeout="2000"
                        data-toolbar-order="copy-to-clipboard" 
                    >
                        <code class="language-javascript" v-prism>
                            const router = createRouter({
                                scrollBehavior(to, from, savedPosition){
                                    return { top: 0 }
                                },
                            });
                        </code>
                    </pre>
                </div>
                <button class="accordin-close" @click="toggle(0)"></button>
            </div>
        </div>
    </div>
</template>