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
                    <p>yarn : 因為這個系統上已停用指令碼執行，所以無法載入 Path...\AppData\Roaming\npm\yarn.ps1 檔案。如需詳細資訊，請參閱 about_Execution_Policies，網址為 https:/go.microsoft.com/fwlink/?LinkID=135170。 位於 線路:1 字元:1</p>
                </div>
                <div class="accordin-content">
                    <p>這個錯誤訊息表示你的作業系統禁用了執行 PowerShell 指令碼，而 Yarn 則必須透過 PowerShell 指令碼來執行。要解決這個問題，可以按照以下步驟來調整你的 PowerShell 執行原則：</p>
                    <h6>1. 在「開始」選單中找到「PowerShell」應用程式，在右鍵快捷選單裡選擇「以系統管理員身份運行」。或是透過搜尋功能找到「PowerShell」，同樣選擇「以系統管理員身份運行」。</h6>
                    <figure>
                        <img src="/images/learn/js/yarn-1.jpg">
                    </figure>
                    <p><br></p>
                    <h6>2. 在開啟的「PowerShell」應用程式視窗裡輸入以下指令：</h6>
                    <pre
                        class="line-numbers"
                        data-prismjs-copy="Copy"
                        data-prismjs-copy-success="Copied"
                        data-prismjs-copy-error="Error!"
                        data-prismjs-copy-timeout="2000"
                        data-toolbar-order="copy-to-clipboard" 
                    >
                        <code class="language-powershell" v-prism>
                            Get-ExecutionPolicy
                        </code>
                    </pre>
                    <p>這個指令會顯示目前 PowerShell 的執行原則設定，假如你執行 <em>yarn</em> 遭遇到這則錯誤訊息，通常執行這個指令後回傳的結果會是 <em>Restricted</em>，也就是受限制的狀態。</p>
                    <p><br></p>
                    <h6>3. 輸入以下指令將執行原則修改為 <em>RemoteSigned</em>：</h6>
                    <pre
                        class="line-numbers"
                        data-prismjs-copy="Copy"
                        data-prismjs-copy-success="Copied"
                        data-prismjs-copy-error="Error!"
                        data-prismjs-copy-timeout="2000"
                        data-toolbar-order="copy-to-clipboard" 
                    >
                        <code class="language-powershell" v-prism>
                            Set-ExecutionPolicy RemoteSigned
                        </code>
                    </pre>
                    <p>指令送出後系統會詢問是否確認要變更執行原則，輸入「Y」進行變更，之後再次執行 <em>yarn</em> 指令，應該就能順利執行動作了。</p>
                    <figure>
                        <img src="/images/learn/js/yarn-2.jpg">
                        <figcaption>PowerShell 變更執行原則完整指令操作流程。</figcaption>
                    </figure>
                    <p><br></p>
                    <blockquote class="is-warning">
                        <p>修改執行原則可能對系統安全性產生影響，因此請謹慎操作。</p>
                    </blockquote>
                </div>
                <button class="accordin-close" @click="toggle(0)"></button>
            </div>
        </div>
    </div>
</template>