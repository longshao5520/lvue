import LVButton from "./LVButton";
import { App } from "vue";

LVButton.install = (app: App) => {
  app.component(LVButton.name, LVButton);
};
export default LVButton;
