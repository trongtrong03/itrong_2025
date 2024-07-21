import "./assets/scss/style.scss";

import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";
import AOS from "aos";
import Prism from 'prismjs';
import 'prismjs/themes/prism-tomorrow.css'; // 可以選擇不同的主題

// 導入PrismJS插件
import 'prismjs/plugins/toolbar/prism-toolbar.css';
// import 'prismjs/plugins/show-language/prism-show-language.css';
// import 'prismjs/plugins/copy-to-clipboard/prism-copy-to-clipboard.css';

import 'prismjs/plugins/toolbar/prism-toolbar';
import 'prismjs/plugins/show-language/prism-show-language';
import 'prismjs/plugins/copy-to-clipboard/prism-copy-to-clipboard';

// 導入所有語言包
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-json';
import 'prismjs/components/prism-jq';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-css';
import 'prismjs/components/prism-scss';
import 'prismjs/components/prism-stylus';
import 'prismjs/components/prism-markup';
import 'prismjs/components/prism-pug';
// import 'prismjs/components/prism-php';  // 這支檔案引用會有錯誤訊息
import 'prismjs/components/prism-bash';
import 'prismjs/components/prism-git';
import 'prismjs/components/prism-ruby';
// import 'prismjs/components/prism-python';

import PrismHighlight from '@/components/Common/PrismHighlight.vue';

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(AOS);

app.component('PrismHighlight', PrismHighlight);

app.mount('#app');
