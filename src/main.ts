import "./assets/scss/style.scss";

import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";
import AOS from "aos";
import { setupPrism } from '@/plugins/prism';

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(AOS);
setupPrism(app);


app.mount('#app');
