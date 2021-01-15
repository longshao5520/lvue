import { createApp } from "vue";
import App from "./App.vue";
const app = createApp(App);

import("./assets/icons");
import lvue from "../packages";
app.use(lvue, { locale: "zh" });

app.mount("#app");
