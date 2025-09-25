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
                    <p>Third-party cookie will be blocked. Learn more in the Issues tab.</p>
                </div>
                <div class="accordin-content">
                    <p>這個錯誤通常是指你的瀏覽器正在阻止來自第三方域的 cookie。這種行為通常是出於隱私和安全考量，現代瀏覽器越來越多地限制或完全禁止第三方 cookie。這可能會影響某些網站或服務的正常運行，特別是那些依賴於第三方 cookie 來進行認證、跟蹤或廣告服務的網站。</p>
                    <p>如果你的應用或網站依賴於第三方 cookie，有幾種解決方案可以考慮：</p>
                    <h4>1. 使用同源策略：</h4>
                    <p>確保所有 cookie 都是由與當前網站相同的域設置的，即所謂的「第一方 cookie」。</p>
                    <h4>2. 更新後端設置：</h4>
                    <p>設置後端服務，使其通過第一方 cookie 或其他認證方式進行交互。</p>
                    <h4>3. 使用其他存儲方式：</h4>
                    <p>例如使用 localStorage 或 sessionStorage 來替代 cookie，儘管這些方法在跨域場景中有一定限制。</p>
                    <h4>4. Content Security Policy（CSP）：</h4>
                    <p>配置 CSP 標頭來明確允許哪些來源的資源可以被加載，以提高安全性。</p>
                    <h4>5. 前端設置：</h4>
                    <p>在前端程式碼中，確保設置 cookie 時使用適當的 <em>SameSite</em> 屬性，例如 <em>SameSite=Lax</em> 或 <em>SameSite=Strict</em>。</p>
                    <p>假設你在前端設置 cookie，可以使用如下程式碼來設置 <em>SameSite</em> 屬性：：</p>
                    <pre
                        class="line-numbers"
                        data-prismjs-copy="Copy"
                        data-prismjs-copy-success="Copied"
                        data-prismjs-copy-error="Error!"
                        data-prismjs-copy-timeout="2000"
                        data-toolbar-order="copy-to-clipboard" 
                    >
                        <code class="language-javascript" v-prism>
                            document.cookie = "name=value; SameSite=Lax";
                        </code>
                    </pre>
                    <p>或者，如果你使用的是某個第三方服務，請確保這些服務配置了適當的 <em>SameSite</em> 屬性：</p>
                    <pre
                        class="line-numbers"
                        data-prismjs-copy="Copy"
                        data-prismjs-copy-success="Copied"
                        data-prismjs-copy-error="Error!"
                        data-prismjs-copy-timeout="2000"
                        data-toolbar-order="copy-to-clipboard" 
                    >
                        <code class="language-python" v-prism>
                            # 假設你使用 Flask 框架在後端設置 cookie
                            from flask import make_response

                            response = make_response("Setting a cookie")
                            response.set_cookie('name', 'value', samesite='Lax')
                            return response
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
                    <p>設定 img 元素的預設圖</p>
                </div>
                <div class="accordin-content">
                    <pre
                        class="line-numbers"
                        data-prismjs-copy="Copy"
                        data-prismjs-copy-success="Copied"
                        data-prismjs-copy-error="Error!"
                        data-prismjs-copy-timeout="2000"
                        data-toolbar-order="copy-to-clipboard" 
                    >
                        <code class="language-html" v-prism>
                            &lt;img src="影像路徑" onerror="this.src='images/default.jpg'"&gt;
                        </code>
                    </pre>
                </div>
                <button class="accordin-close" @click="toggle(0)"></button>
            </div>
            <div class="accordin-item" :class="isActive==3002 ? 'is-active' : ''">
                <div class="accordin-title" @click="toggle(3002)">
                    <p>設定 input 元素的預設選項</p>
                </div>
                <div class="accordin-content">
                    <pre
                        class="line-numbers"
                        data-prismjs-copy="Copy"
                        data-prismjs-copy-success="Copied"
                        data-prismjs-copy-error="Error!"
                        data-prismjs-copy-timeout="2000"
                        data-toolbar-order="copy-to-clipboard" 
                    >
                        <code class="language-html" v-prism>
                            &lt;input list="listName" /&gt;
                            &lt;datalist id="listName"&gt;
                                &lt;option value="項目1"&gt;
                                &lt;option value="項目2"&gt;
                                &lt;option value="項目3"&gt;
                            &lt;/datalist&gt;
                        </code>
                    </pre>
                </div>
                <button class="accordin-close" @click="toggle(0)"></button>
            </div>
            <div class="accordin-item" :class="isActive==3003 ? 'is-active' : ''">
                <div class="accordin-title" @click="toggle(3003)">
                    <p>將連結文字轉為下載型態，並將檔名更改為自行命名的檔案名稱</p>
                </div>
                <div class="accordin-content">
                    <pre
                        class="line-numbers"
                        data-prismjs-copy="Copy"
                        data-prismjs-copy-success="Copied"
                        data-prismjs-copy-error="Error!"
                        data-prismjs-copy-timeout="2000"
                        data-toolbar-order="copy-to-clipboard" 
                    >
                        <code class="language-html" v-prism>
                            &lt;a href="/filePath" download="fileName"&gt;超連結訊息&lt;/a&gt;
                        </code>
                    </pre>
                </div>
                <button class="accordin-close" @click="toggle(0)"></button>
            </div>
            <div class="accordin-item" :class="isActive==3004 ? 'is-active' : ''">
                <div class="accordin-title" @click="toggle(3004)">
                    <p>元素點擊開啟指定路徑連結的方法</p>
                </div>
                <div class="accordin-content">
                    <pre
                        class="line-numbers"
                        data-prismjs-copy="Copy"
                        data-prismjs-copy-success="Copied"
                        data-prismjs-copy-error="Error!"
                        data-prismjs-copy-timeout="2000"
                        data-toolbar-order="copy-to-clipboard" 
                    >
                        <code class="language-html" v-prism>
                            &lt;button onClick="window.location.href='https://www.google.com.tw/'"&gt;Click&lt;/button&gt;
                        </code>
                    </pre>
                </div>
                <button class="accordin-close" @click="toggle(0)"></button>
            </div>
        </div>
    </div>
</template>