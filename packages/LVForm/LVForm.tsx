import { defineComponent, onMounted, PropType, reactive } from "vue";

interface FormOption {
  labelPosition: "left" | "top" | "right";
  submitText: string;
  rules: object;
  column: Array<FormColumn>;
}

interface FormColumn {
  label: string;
  prop: string;
  type: string;
  span: number;
  dicData: Array<any>;
  placeholder: string;
  minlength: number;
  maxlength: number;
  rows: number;
  resize: "none" | "both" | "horizontal" | "vertical";
  activeColor: string;
  inactiveColor: string;
  disabled: string;
  readonly: string;
}

export default defineComponent({
  name: "lv-form",
  props: {
    value: {
      type: Object
    },
    option: {
      type: Object as PropType<FormOption>
    }
  },
  setup(props) {
    const option = reactive({ ...props.option } as FormOption);

    const form = reactive({} as any);

    const formStyle = {
      // width: "50vw"
    };

    onMounted(() => {
      console.log(props);

      // option.column.forEach(item => {
      //   form[item.prop] = "";
      // });
    });

    function formItem(item: FormColumn) {
      if (item.type == "inpt" || item.type == undefined) {
        return (
          <el-input
            v-model={form[item.prop]}
            placeholder={`请输入${item.label}`}
            maxlength={item.maxlength}
            minlength={item.minlength}
            show-word-limit
            clearable
          ></el-input>
        );
      } else if (item.type == "password") {
        return (
          <el-input
            v-model={form[item.prop]}
            type="password"
            autocomplete="new-password"
            placeholder={`请输入${item.label}`}
            maxlength={item.maxlength}
            minlength={item.minlength}
            show-word-limit
            show-password
            clearable
          ></el-input>
        );
      } else if (item.type == "textarea") {
        return (
          <el-input
            v-model={form[item.prop]}
            type="textarea"
            placeholder={`请输入${item.label}`}
            maxlength={item.maxlength}
            minlength={item.minlength}
            rows={item.rows}
            resize={item.resize}
            show-word-limit
            clearable
          ></el-input>
        );
      } else if (item.type == "select") {
        return (
          <el-select
            v-model={form[item.prop]}
            placeholder={`请选择${item.label}`}
          >
            {item.dicData.map(option => {
              return (
                <el-option
                  label={option.label}
                  value={option.value}
                ></el-option>
              );
            })}
          </el-select>
        );
      } else if (item.type == "radio") {
        return (
          <el-radio-group v-model={form[item.prop]}>
            {item.dicData.map(option => {
              return <el-radio label={option.value}>{option.label}</el-radio>;
            })}
          </el-radio-group>
        );
      } else if (item.type == "switch") {
        return (
          <el-switch
            v-model={form[item.prop]}
            active-color={item.activeColor}
            inactive-color={item.inactiveColor}
          ></el-switch>
        );
      } else if (item.type == "checkbox") {
        return (
          <el-input
            v-model={form[item.prop]}
            type="password"
            autocomplete="new-password"
          ></el-input>
        );
      }
    }

    return () => (
      <el-form
        model={form}
        label-position="left"
        label-width="auto"
        style={formStyle}
      >
        <el-row>
          {option.column.map(item => {
            return (
              <el-col span={item.span}>
                <el-form-item label={item.label}>{formItem(item)}</el-form-item>
              </el-col>
            );
          })}
        </el-row>

        <el-row type="flex" justify="center">
          <el-button>取消</el-button>
          <el-button type="primary">{option.submitText}</el-button>
        </el-row>
      </el-form>
    );
  }
});
