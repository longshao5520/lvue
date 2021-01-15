import LVIcon from "./LVIcon";
import { App } from "vue";
import "../icons";

LVIcon.install = (app: App) => {
  app.component(LVIcon.name, LVIcon);
};
export default LVIcon;
