import "./index.scss";
import LVForm from "./LVForm";
import { App } from "vue";
LVForm.install = (app: App) => {
  app.component(LVForm.name, LVForm);
};
export default LVForm;
