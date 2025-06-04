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
                    <p>快速呼叫「快捷鍵組合」的方法</p>
                </div>
                <div class="accordin-content">
                    <p>同時按下 <b>Ctrl</b> + <b>Shift</b> + <b>?</b>，即可呼叫 Figma 的快捷鍵列表。</p>
                    <figure>
                        <img src="/images/learn/design/figma-shortcuts.jpg">
                    </figure>
                    <p>順帶一提，如果要呼叫指令面板可同時按下 <b>Ctrl</b> + <b>/</b> 來觸發。</p>
                </div>
                <button class="accordin-close" @click="toggle(0)"></button>
            </div>
            <div class="accordin-item" :class="isActive==1002 ? 'is-active' : ''">
                <div class="accordin-title" @click="toggle(1002)">
                    <p>按住 Shift 鍵移動物件的距離</p>
                </div>
                <div class="accordin-content">
                    <p>在 Figma 的預設中，按方向鍵可以移動物件 1px 單位（稱為 Small Nudge），若按住 <b>Shift</b> 一下就會移動 10px（Big Nudge）。但如果想改變這個設定，可以在 Figma 的「Preferences」→「Nudge amount」功能中，調整自己想要的預設值：</p>
                    <figure>
                        <img src="/images/learn/design/figma-nudgeamount-1.jpg">
                    </figure>
                    <p>假如要使用 8px grid 設計原則，可以將數值分別設置為 2px 與 16px，那麼所有物件移動的幅度也將會是 2 的倍數。</p>
                </div>
                <button class="accordin-close" @click="toggle(0)"></button>
            </div>
            <div class="accordin-item" :class="isActive==1003 ? 'is-active' : ''">
                <div class="accordin-title" @click="toggle(1003)">
                    <p>呼叫「標尺」與「對齊參考線」</p>
                </div>
                <div class="accordin-content">
                    <p>通過快捷鍵 <b>Shift</b> + <b>R</b> 打開或關閉標尺。</p>
                </div>
                <button class="accordin-close" @click="toggle(0)"></button>
            </div>
            <div class="accordin-item" :class="isActive==1004 ? 'is-active' : ''">
                <div class="accordin-title" @click="toggle(1004)">
                    <p>快速返回畫布所在的位置</p>
                </div>
                <div class="accordin-content">
                    <p>通過快捷鍵 <b>Shift</b> + <b>1</b> 會自動將視圖縮放並調整到顯示當前畫布中所有內容的最佳視角。</p>
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
                    <p>如何等比縮放整個群組物件（包含文字）的大小</p>
                </div>
                <div class="accordin-content">
                    <p>一般情況下，我們如果按住 <b>Shift</b> 等比放大包含文字在內的群組物件，通常只有形狀圖層會等比放大，但是文字並不會跟著放大，反之縮小亦然。若希望物件群組內的文字也能跟隨形狀一同等比縮放，則可以按下 <b>Cmd</b> + <b>K</b> 組合鍵（Windows 系統則是 <b>fn</b> + <b>K</b>），這時 Figma 會切換成 Scale 模式，這時再拖曳群組物件就會整個物件裡的內容都一併放大縮小了。</p>
                </div>
                <button class="accordin-close" @click="toggle(0)"></button>
            </div>
            <div class="accordin-item" :class="isActive==3002 ? 'is-active' : ''">
                <div class="accordin-title" @click="toggle(3002)">
                    <p>如何同時貼上物件到多個畫框（Frames）</p>
                </div>
                <div class="accordin-content">
                    <p>假設我們要將畫框 Frame1 裡的上下兩個物件複製貼上給 Frame2 與 Frame3：</p>
                    <figure>
                        <img src="/images/learn/design/figma-frame-1.jpg">
                    </figure>
                    <p>首先複製要於多個畫框貼上的物件，接著用左鍵圈選其他要貼上該物件的畫框，如下圖：</p>
                    <figure>
                        <img src="/images/learn/design/figma-frame-2.jpg">
                    </figure>
                    <p>接著利用快捷鍵組合 <b>Ctrl</b> + <b>V</b> 快速貼上已預先複製好的物件即可。</p>
                    <figure>
                        <img src="/images/learn/design/figma-frame-3.jpg">
                    </figure>
                </div>
                <button class="accordin-close" @click="toggle(0)"></button>
            </div>
            <div class="accordin-item" :class="isActive==3003 ? 'is-active' : ''">
                <div class="accordin-title" @click="toggle(3003)">
                    <p>如何讓切片輸出的是透明背景的 PNG 圖片？</p>
                </div>
                <div class="accordin-content">
                    <h6>1. 選擇切片之後，去右側的檢查面板的「導出（Export）」區域。</h6>
                    <h6>2. 點擊「+」號來新增導出設置，然後選擇 PNG 格式。</h6>
                    <h6>3. 確認切片中沒有任何填充背景色，尤其是白色的背景，這樣 PNG 圖片的背景會保持透明。</h6>
                    <h6>4. 點擊「導出」，導出的 PNG 圖片將會是透明底的。</h6>
                    <p>需要注意的是，如果我們的畫布或 Frame 裡有白色背景，這個背景會被包括在導出的圖片中，因此需要手動隱藏或移除該背景，來確保輸出的 PNG 是透明的。</p>
                </div>
                <button class="accordin-close" @click="toggle(0)"></button>
            </div>
            <div class="accordin-item" :class="isActive==3004 ? 'is-active' : ''">
                <div class="accordin-title" @click="toggle(3004)">
                    <p>Export 選項中的 ignore overlapping layers 核選方塊有何功用？</p>
                </div>
                <div class="accordin-content">
                    <figure>
                        <img src="/images/learn/design/figma-ignore.jpg">
                    </figure>
                    <p>在 Figma 的 Export（導出） 選項中，「Ignore overlapping layers」（忽略重疊圖層） 核選框的作用是：當我們選擇導出某個特定元素或切片時，這個選項可以讓 Figma 忽略與該元素重疊的其他圖層。換句話說，如果啟用了這個選項，Figma 只會導出我們選中的元素或切片範圍內的內容，而不會包括任何與其重疊的其他圖層或元素。</p>
                    <p><br></p>
                    <h3>什麼時候使用？</h3>
                    <h5>1. 不需要重疊圖層：</h5>
                    <p>當你想只導出某個特定元素或區域的圖片，而不希望其他重疊的圖層被包含時，可以啟用這個選項。例如，你在一個設計中有多個疊加的圖層，但你只想導出某個按鈕，這時候勾選這個選項就可以忽略其他重疊的部分。</p>
                    <h5>2. 導出乾淨的單一元素：</h5>
                    <p>如果你需要導出一個純粹的對象資產，而不希望其他的圖層或陰影、背景等干擾導出結果，這個選項非常有用。</p>
                </div>
                <button class="accordin-close" @click="toggle(0)"></button>
            </div>
            <div class="accordin-item" :class="isActive==3005 ? 'is-active' : ''">
                <div class="accordin-title" @click="toggle(3005)">
                    <p>如何製作遮色片？</p>
                </div>
                <div class="accordin-content">
                    <p>在 Figma 中，我們可以通過一些方法模擬類似 Photoshop 的「遮色片」和「漸層效果」的功能，儘管 Figma 沒有完全相同的遮色片工具。但我們仍可以使用「遮罩（Mask）」結合「漸層填充」來實現類似的效果。</p>
                    <h6>1. 首先，導入要添加遮色片效果的圖片。</h6>
                    <figure>
                        <img src="/images/learn/design/figma-mask-1.jpg">
                    </figure>
                    <h6>2. 創建漸層形狀：</h6>
                    <p>使用「矩形工具（快捷鍵 <b>R</b>）」在圖片上繪製一個與圖片大小相同的矩形。</p>
                    <p>在右側的「填充（Fill） 」選項中，將矩形的填充類型設置為「漸層（Gradient）」。例如設置漸層的顏色，一端是黑色，另一端是透明度為 0% 的黑色，這樣可以模擬出漸變效果。</p>
                    <figure>
                        <img src="/images/learn/design/figma-mask-2.jpg">
                    </figure>
                    <p><strong>※ 記得圖片要在形狀圖層上方，否則在做遮色片的時候會將圖片當作遮色片的底襯。</strong></p>
                    <h6>3. 應用遮罩：</h6>
                    <figure>
                        <img src="/images/learn/design/figma-mask-3.jpg">
                    </figure>
                    <p>選中圖片和剛才創建的漸層矩形，右鍵點擊，選擇「Use as Mask（設置為遮罩）」或者使用快捷鍵 <b>Ctrl</b> + <b>Alt</b> + <b>M</b>（Windows）或 <b>Command</b> + <b>Option</b> + <b>M</b>（Mac）。這會將漸層形狀作為遮罩應用在圖片上，從而創建出類似 Photoshop 中的「遮色片漸層」效果。</p>
                    <figure>
                        <img src="/images/learn/design/figma-mask-4.jpg">
                    </figure>
                    <p><br></p>
                    <h3>更加自然的過渡效果：</h3>
                    <p>如果想模擬 Photoshop 的那種細膩的遮色片效果，可以調整漸層透明度，將漸層中一端的透明度設置為 0%，另一端保持為 100% 不透明，這樣會產生更自然的過渡效果。</p>
                </div>
                <button class="accordin-close" @click="toggle(0)"></button>
            </div>
            <div class="accordin-item" :class="isActive==3006 ? 'is-active' : ''">
                <div class="accordin-title" @click="toggle(3006)">
                    <p>如何將重複使用的物件模板化？</p>
                </div>
                <div class="accordin-content">
                    <p>在 Figma 中，如果想將某個圖層的物件或圖片作為模板並在其他 Frame 中重複使用，通常有幾種方法可以達到這個目的。最常見的方法是使用「元件（Components）」來進行重複使用，這樣可以讓我們在多個 Frame 中保持一致的設計，並且能夠集中管理更新。</p>
                    <h6>1. 將物件或圖片設置為元件</h6>
                    <p>右鍵點擊選中的物件，然後選擇「Create component（創建元件）」，或者使用快捷鍵 <b>Ctrl</b> + <b>Alt</b> + <b>K</b>（Windows）或 <b>Command</b> + <b>Option</b> + <b>K</b>（Mac）。</p>
                    <figure>
                        <img src="/images/learn/design/figma-component-1.jpg">
                    </figure>
                    <p>這將創建一個元件，並且在圖層面板上會看到它有一個特殊的「菱形」圖標，表示它是元件。</p>
                    <figure>
                        <img src="/images/learn/design/figma-component-2.jpg">
                    </figure>
                    <h6>2. 在其他 Frame 中使用元件：</h6>
                    <p>將這個元件拖拽到其他 Frame 或頁面中使用。如果需要多次使用該元件，可以在 Assets（資產）面板中找到這個元件，並將它拖到任意 Frame 或畫布上使用。</p>
                    <p><br></p>
                    <h3>更新元件內容？</h3>
                    <p>假如我們需要更新這個模板，直接修改主元件（即最初創建的元件），所有應用這個元件的實例都會自動更新，且保持同步。</p>
                    <figure>
                        <img src="/images/learn/design/figma-component-3.jpg">
                    </figure>
                </div>
                <button class="accordin-close" @click="toggle(0)"></button>
            </div>
            <div class="accordin-item" :class="isActive==3007 ? 'is-active' : ''">
                <div class="accordin-title" @click="toggle(3007)">
                    <p>使用「元件變體」（Component Variants）讓模板有更細部的變化</p>
                </div>
                <div class="accordin-content">
                    <p>如果你有一組類似的模板需要應用在不同的情境中，並且希望它們在保持一致的同時能夠有細微的變化，可以使用元件變體來實現目標。</p>
                    <h6>1. 創建變體：</h6>
                    <p>選擇已經創建的元件，右鍵點擊並選擇「Add variant（添加變體）」來創建該元件的變體。</p>
                    <figure>
                        <img src="/images/learn/design/figma-component-4.jpg">
                    </figure>
                    <p>這時在原本的模板元件下方會產生新的一個相同元件，它就是變體。我們可以針對這個變體做細部的樣式調整，比如不同的顏色、大小或其他屬性。</p>
                    <figure>
                        <img src="/images/learn/design/figma-component-5.jpg">
                    </figure>
                    <p><br></p>
                    <h6>2. 切換變體：</h6>
                    <p>在其他 Frame 中使用元件時，可以在右側屬性面板中切換元件的變體，來適應不同的需求。</p>
                    <figure>
                        <img src="/images/learn/design/figma-component-6.jpg">
                    </figure>
                    <p>切換成功：</p>
                    <figure>
                        <img src="/images/learn/design/figma-component-7.jpg">
                    </figure>
                </div>
                <button class="accordin-close" @click="toggle(0)"></button>
            </div>
        </div>
    </div>
</template>