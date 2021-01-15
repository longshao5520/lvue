import { computed, defineComponent, reactive } from "vue";
import "./LVIcon.scss";

export default defineComponent({
  name: "lv-icon",
  props: {
    icon: {
      type: String,
      required: true
    },
    size: {
      type: String,
      default: ""
    }
  },
  setup(props) {
    const icon = computed(() => (props.icon ? `#icon-${props.icon}` : ""));

    const size = reactive({
      width: props.size,
      height: props.size
    });

    return () => (
      <svg class="lv-icon" style={size} aria-hidden="true">
        <use xlinkHref={icon.value} />
      </svg>
    );
  }
});
