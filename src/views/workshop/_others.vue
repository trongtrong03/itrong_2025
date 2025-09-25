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
        <h2>實用技巧</h2>
        <div class="text-accordin is-tips">
            <div class="accordin-item" :class="isActive==1001 ? 'is-active' : ''">
                <div class="accordin-title" @click="toggle(1001)">
                    <p>Windows OS 批次修改資料夾命名的方法</p>
                </div>
                <div class="accordin-content">
                    <p>建立一個純文字空白檔案，然後輸入以下內容：</p>
                    <pre
                        class="line-numbers"
                        data-prismjs-copy="Copy"
                        data-prismjs-copy-success="Copied"
                        data-prismjs-copy-error="Error!"
                        data-prismjs-copy-timeout="2000"
                        data-toolbar-order="copy-to-clipboard" 
                    >
                        <code class="language-bash" v-prism>
                            @echo off
                            chcp 65001 >nul
                            PowerShell -NoProfile -ExecutionPolicy Bypass -Command "Get-ChildItem -LiteralPath 'D:\圖片' -Recurse -Directory -Filter '原本名稱' | ForEach-Object { Rename-Item -LiteralPath $_.FullName -NewName '新的名稱' }"
                            pause
                        </code>
                    </pre>
                    <p>完成後另存檔案，並將副檔名格式修改為 <b>.bat</b>，之後點擊該執行程式便可運作成功。</p>
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
        </div>
    </div>
</template>