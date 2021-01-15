import { App } from "vue";

import ElementPlus from "element-plus";
import "element-plus/lib/theme-chalk/index.css";
import zhLocale from "element-plus/lib/locale/lang/zh-cn";
import enLocale from "element-plus/lib/locale/lang/en";

import("./icons");

import {
  ElMessage,
  ElLoading,
  ElMessageBox,
  ElNotification
} from "element-plus";

import LVButton from "./LVButton";
import LVIcon from "./LVIcon";
import LVTable from "./LVTable";

const components = [LVButton, LVIcon, LVTable];

interface LocaleType {
  locale: "zh" | "en";
}

const install = (app: App, a: LocaleType) => {
  let locale = {};
  if (a.locale == "zh") {
    locale = { locale: zhLocale };
  } else if (a.locale == "en") {
    locale = { locale: enLocale };
  } else {
    locale = {};
  }
  components.forEach(component => {
    app.use(component.install);
  });
  app.use(ElementPlus, locale);
};

export { ElMessage, ElLoading, ElMessageBox, ElNotification };

export { install, LVButton, LVIcon, LVTable };

export default { install, LVButton, LVIcon, LVTable };
