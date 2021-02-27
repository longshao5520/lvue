<template>
  <div>
    <el-button type="primary" @click="dialogVisible = true">123</el-button>
    <el-dialog v-model="dialogVisible" title="111" width="70vw" center>
      <lv-form :option="option"></lv-form>
      <!-- <template #footer>
        <el-button @click="dialogVisible = false">Cancel</el-button>
        <el-button type="primary" @click="submit">OK</el-button>
      </template> -->
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from "vue";

export default defineComponent({
  name: "Home",
  props: {},
  components: {},
  setup() {
    const dialogVisible = ref(true);
    const option = reactive({
      size: "",
      submitText: "提交",
      column: [
        {
          label: "用户名",
          prop: "username",
          tip: "这是信息提示",
          span: 12,
          maxlength: 3,
          suffixIcon: "el-icon-tickets",
          prefixIcon: "el-icon-tickets",
          minlength: 2
        },
        {
          label: "密码",
          prop: "password",
          type: "password",
          maxlength: 20,
          suffixIcon: "el-icon-tickets",
          prefixIcon: "el-icon-tickets",
          minlength: 2,
          span: 12
        },
        {
          label: "个人简介",
          prop: "textarea",
          type: "textarea",
          maxlength: 300,
          rows: 5,
          resize: "none"
        },
        {
          label: "爱好",
          prop: "select",
          type: "select",
          dicData: [
            { label: "篮球", value: "1" },
            { label: "乒乓球", value: "2" },
            { label: "足球", value: "3" }
          ],
          span: 6
        },
        {
          label: "性别",
          prop: "radio",
          type: "radio",
          dicData: [
            { label: "男", value: "1" },
            { label: "女", value: "0" }
          ],
          span: 6
        },
        {
          label: "开关",
          prop: "switch",
          span: 6,
          type: "switch",
          activeColor: "#13ce66",
          inactiveColor: "#ff4949"
        }
      ]
    });
    return {
      dialogVisible,
      option,
      submit: () => {
        console.log(1);
      }
    };
  }
});
</script>

<style scoped></style>
