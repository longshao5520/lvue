<template>
  <div class="home-root">
    <div>
      <lv-table
        :data="data.tableData"
        :option="data.tableOption"
        :page="data.page"
        @examine="examine"
        @update="update"
        @remove="remove"
        @current-change="currentChange"
      >
        <template #menu="{index, row}">
          <el-button
            type="text"
            @click="clickBtn(index, row)"
          >
            去处理
          </el-button>
        </template>
      </lv-table>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onBeforeMount, reactive } from "vue";
import { ElMessage } from "../packages/index";
import axios from "axios";

export default defineComponent({
  name: "Home",
  components: {},
  setup() {
    const data = reactive({
      tableData: [],
      page: {
        total: 50,
        currentPage: 1,
        pageSize: 4
      },
      tableOption: {
        // align: "left",
        menu: true,
        menuWidth: "200px",
        // button/icon/text
        menuType: "",
        viewBtn: false,
        editBtn: false,
        delBtn: false,

        // viewBtnText: "查看按钮",
        // editBtnText: "编辑按钮",
        // delBtnText: "删除按钮",

        index: true,
        // selection: true,

        // width: "80%",
        // height: "648px",
        // stripe: true,
        // border: true,
        showPagination: true,
        column: [
          { label: "标题", prop: "title", type: "text", width: "150px" },
          { label: "姓名", prop: "author", type: "text", width: "120px" },
          { label: "头像", prop: "img", type: "link" }
          // { label: "头像", prop: "img", type: "img" }
        ]
      }
    } as {
      tableData: Array<object>;
      page: {
        total: number;
        currentPage: number;
        pageSize: number;
      };
    });

    function onClick(e: MouseEvent) {
      console.log(e);
    }

    let arrData: any = [];
    function fetch() {
      axios.get("http://localhost:3000/posts").then(res => {
        arrData = res.data;
        const arr = [arrData[0], arrData[1], arrData[2], arrData[3]];
        data.tableData = arr;
        data.page.total = res.data.length;
      });
    }

    const currentChange = (index: number) => {
      // ElMessage(`当前第 ${index} 页`);
      data.page.currentPage = index;
      const arr = [
        arrData[index * data.page.pageSize - 4],
        arrData[index * data.page.pageSize - 3],
        arrData[index * data.page.pageSize - 2],
        arrData[index * data.page.pageSize - 1]
      ];
      data.tableData = arr;
    };

    onBeforeMount(() => {
      fetch();
    });

    return {
      data,
      onClick,
      examine: (index: number, row: object) => {
        // console.log(index, row);

        ElMessage("查看按钮");
      },
      update: () => {
        ElMessage("编辑按钮");
      },
      remove: () => {
        ElMessage("删除按钮");
      },
      clickBtn: (index: number, row: object) => {
        ElMessage("查看" + index);
      },
      currentChange
    };
  }
});
</script>

<style lang="scss" scoped>
.btn-container {
  width: 480px;
  height: 160px;

  display: flex;
  justify-content: center;
  align-items: center;
}

.btn {
  margin: 10px;
}

.my-icon {
  margin-left: 3px;
}
</style>
