// import LVTable from "./LVTable.vue";
import "./index.scss";
import LVTable from "./LVTable";
import { App } from "vue";
LVTable.install = (app: App) => {
  app.component(LVTable.name, LVTable);
};
export default LVTable;
