import { computed, defineComponent } from "vue";
import "./LVButton.scss";

import LVIcon from "../LVIcon";

export default defineComponent({
  name: "lv-button",
  components: { LVIcon },
  emits: ["click"],
  props: {
    tile: {
      type: Boolean,
      default: false
    },
    rounded: {
      type: Boolean,
      default: false
    },
    circle: {
      type: Boolean,
      default: false
    },

    disabled: {
      type: Boolean,
      default: false
    },

    size: {
      type: String,
      default: ""
    },
    color: {
      type: String,
      default: "#409eff"
    },
    icon: {
      type: String,
      default: ""
    }
  },
  setup(props, { emit, slots }) {
    function onClickBtn(event: MouseEvent) {
      if (!props.disabled) {
        emit("click", event);
      }
    }

    function ifIcon() {
      if (props.circle && props.icon) {
        return <lv-icon icon={props.icon}></lv-icon>;
      } else if (props.icon) {
        if (slots.default) {
          return (
            <span>
              <lv-icon icon={props.icon}></lv-icon>
              <span style="margin-left: 5px;">
                {slots.default && slots.default("Button")}
              </span>
            </span>
          );
        } else {
          return (
            <span>
              <lv-icon icon={props.icon}></lv-icon>
            </span>
          );
        }
      } else {
        return (
          <span>{(slots.default && slots.default("Button")) || "Button"}</span>
        );
      }
    }

    const resize = computed(() => (props.size ? `lv-btn-${props.size} ` : ""));
    const tile = computed(() => (props.tile ? "lv-btn-tile " : ""));
    const rounded = computed(() => (props.rounded ? "lv-btn-rounded " : ""));
    const circle = computed(() => (props.circle ? "lv-btn-circle " : ""));
    const disabled = computed(() => (props.disabled ? "lv-btn-disabled " : ""));

    return () => (
      <button
        class={`lv-btn ${resize.value}${tile.value}${rounded.value}${circle.value}${disabled.value}`}
        style={`--color-button: ${props.color}`}
        onClick={onClickBtn}
      >
        {ifIcon()}
      </button>
    );
  }
});
