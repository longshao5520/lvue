import { computed, defineComponent, reactive, watch } from "vue";
import type { TableOptions } from './types';

export default defineComponent({
  name: "lv-table",
  emits: ["examine", "update", "remove", "current-change", "size-change"],
  props: {
    data: {
      type: Array,
      default: () => []
    },
    option: {
      type: Object,
      default: () => ({
      } as TableOptions)
    },
    page: {
      type: Object,
      default: () => ({})
    },
    loading: {
      type: Boolean,
      default: false
    }
  },

  setup(props, context) {

    const arrData = reactive({
      tableData: [] as any[]
    })

    const option = reactive({
      ...props.option
    } as TableOptions);

    const tableType = computed(() => {
      if (props.option.index) {
        return "index";
      } else if (props.option.selection) {
        return "selection";
      }
    })

    const indexStatus = computed(() => option.index || option.selection)
    const stripe = computed(() => (option.stripe ? true : false))
    const border = computed(() => (option.border ? true : false))

    // const menuStatus = computed(() => {})

    const viewBtn = computed(() =>
      option.viewBtn == undefined || option.viewBtn ? true : false
    )
    const editBtn = computed(() =>
      option.editBtn == undefined || option.editBtn ? true : false
    )
    const delBtn = computed(() =>
      option.delBtn == undefined || option.delBtn ? true : false
    )
    const viewBtnText = computed(() => option.viewBtnText || "查看")
    const editBtnText = computed(() => option.editBtnText || "编辑")
    const delBtnText = computed(() => option.delBtnText || "删除")

    const menuStatus = computed(() => {
      if (option.menu) {
        return true;
      } else {
        if (viewBtn.value || editBtn.value || delBtn.value) {
          return true;
        } else {
          return false;
        }
      }
    })

    const menuWidth = computed(() => {
      if (option.menu && option.menuWidth) {
        return option.menuWidth;
      } else if (!option.menu && option.menuWidth) {
        return option.menuWidth;
      } else {
        let i = 0;
        if (viewBtn.value) {
          i++;
        }
        if (editBtn.value) {
          i++;
        }
        if (delBtn.value) {
          i++;
        }
        return `${i * 80}px`;
      }
    })

    const tableStyle = {
      width: "100%",
      overflow: "auto"
    }
    const headerStyle = {
      "font-weight": "bold",
      height: "48px",
      "text-align": option.align || "center",
      "background-color": props.option.headerColor || "#F8F8F8",
      color: props.option.headerTextColor || "#323E4D",
      "font-size": props.option.textSize || "14px"
    }
    const rowStyle = {
      height: "60px",
      color: props.option.textColor || "#323E4D",
      "text-align": option.align || "center",
      "font-size": props.option.textSize || "14px",
      "white-space": "nowrap",
      overflow: "hidden"
    }

    const indexMethod = (index: number) => {
      return props.page.pageSize * (props.page.currentPage - 1) + (index + 1);
    }

    const examine = (row: object) => {
      console.log(row);
      
      context.emit("examine", row);
    }
    const update = (index: number, row: object) => {
      context.emit("update", index, row);
    }
    const remove = (index: number, row: object) => {
      context.emit("remove", index, row);
    }

    const currentChange = (index: number) => {
      context.emit("current-change", index);
    }
    // const SizeChange = (index: number) => {
    //   context.emit("size-change", index);
    // }

    function tableEmpty() {
      return () => (
        <div class="empty-style">
          <lv-icon icon="lv-table-empty" />
          <span style="user-select: none;">
            {option.emptyText || "暂无数据"}
          </span>
        </div>
      )
    }

    function tableIndex() {
      if (indexStatus.value) {
        return (
          <el-table-column
            index={indexMethod}
            label="序号"
            type={tableType.value}
            width="100"
            fixed
          ></el-table-column>
        )
      }
    }

    function tableOperation() {
      if (menuStatus.value){
        return (
          <el-table-column
            label="操作"
            width={menuWidth.value}
            show-overflow-tooltip
            fixed="right"
            v-slots={{
              default: (scope: any) => (
                <>
                  <el-button
                    v-show={viewBtn.value}
                    type="text"
                    size="small"
                    icon={option.viewBtnIcon}
                    style="font-size: 14px;"
                    onClick={examine.bind(scope, scope.row)}
                  >
                    {viewBtnText.value}
                  </el-button>
                  <el-button
                    v-show={editBtn.value}
                    type="text"
                    size="small"
                    icon={option.editBtnIcon}
                    style="font-size: 14px;"
                    onClick={update.bind(scope, scope.row)}
                  >
                    {editBtnText.value}
                  </el-button>
                  <el-button
                    v-show={delBtn.value}
                    type="text"
                    size="small"
                    icon={option.delBtnIcon}
                    style="font-size: 14px;"
                    onClick={remove.bind(scope, scope.row)}
                  >
                    {delBtnText.value}
                  </el-button>
                  {context.slots.menu?.({
                    index: scope.$index,
                    row: scope.row
                  })}
                </>
              )
            }}
          ></el-table-column>
        )
      }
    }
    // current-change={currentChange}

    function tablePagination() {
      if (option.showPagination) {
        return (
          <el-pagination
            background
            class="lv-pagination"
            layout="total, prev, pager, next, jumper"
            current-page={props.page.currentPage}
            page-size={props.page.pageSize}
            total={props.page.total}
            onCurrentChange={currentChange}
          ></el-pagination>
        )
      }
    }

    watch(props.data, (nv: any) => {
      arrData.tableData = nv
    })

    return () => (
      <div style={`width: ${option.width};`}>
        <el-table
          data={props.data}
          stripe={stripe.value}
          border={border.value}
          height={option.height}
          header-cell-style={headerStyle}
          cell-style={rowStyle}
          style={tableStyle}
          v-slots={{ 
            empty: tableEmpty()
          }}
        >
          {tableIndex()}
          {option.column.map(function(item){
            return (
              <el-table-column
                prop={item.prop}
                label={item.label}
                width={item.width || ''}
                show-overflow-tooltip
                v-slots={{
                  default: (scope: any) => {
                    if (item.type == 'text') {
                      return (
                        <span>
                          {scope.row[item.prop]}
                        </span>
                      )
                    }else if(item.type == 'img'){
                      return (
                        <el-image
                          src={scope.row[item.prop]}
                          style="height: 100%; width: 60px"
                        ></el-image>
                      )
                    }else if(item.type == 'link'){
                      return (
                        <a
                          href={scope.row[item.prop]}
                          target="_blank"
                          class="lv-link"
                        >
                          { scope.row[item.prop] }
                        </a>
                      )
                    }else {
                      return (
                        <>
                          {context.slots[item.prop]?.({
                            index: scope.$index,
                            row: scope.row
                          })}
                        </>
                      )
                    }
                    
                  }
                }}
              ></el-table-column>
            )
          })}
          {tableOperation()}
        </el-table>
        {tablePagination()}
      </div>);
  },
});