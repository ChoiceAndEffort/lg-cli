<template>
  <div class="hb_table">
    <transition name="el-zoom-in-top">
      <TableHint :num="num" @empty="empty"></TableHint>
    </transition>
    <el-table
      :ref="tableName"
      v-bind="$attrs"
      v-on="$listeners"
      :data="tableData"
      :stripe="stripe"
      :border="border"
      :style="{ width: drawer ? '85%' : '100%' }"
      :header-row-class-name="headerClass"
      :row-class-name="rowClassNames || rowClassName"
      :cell-class-name="cellClassName"
      @selection-change="handleSelectionChange"
      @cell-mouse-enter="handleMouseEnter"
      @cell-mouse-leave="handleMouseLeave"
    >
      <template v-for="(item, index) in copyColConfig">
        <!-- 自定义列(头部)及对应列内容展示-包含头插槽和内容查抄 -->
        <el-table-column
          v-if="item.slotHeaderName && item.switch"
          :key="index"
          v-bind="item.attrs || {}"
        >
          <!-- 头插槽 -->
          <template slot="header" slot-scope="scope">
            <template v-if="item.slotHeaderName === 'hbSetting'">
              <!-- 展示表头搜索 -->
              <i
                class="i-division"
                :class="
                  showSearchTable ? 'el-icon-arrow-up' : 'el-icon-arrow-down'
                "
                @click="showSearchTable = !showSearchTable"
              ></i>
              <!-- 配置 -->
              <i class="el-icon-setting i-division" @click="handleSetTable"></i>
              <br />
              <!-- 查询 -->
              <i
                class="el-icon-search i-division"
                @click="handleSearch"
                v-show="showSearchTable"
              ></i>

              <!-- 重置 -->
              <i
                class="el-icon-delete i-division"
                @click="handleResetSearch"
              ></i>
            </template>
            <template v-else>
              {{ copyColConfig[index].attrs.label }}
              <br />
              <slot
                :name="item.slotHeaderName"
                :row="item"
                v-if="showSearchTable"
                v-bind="item.attrs || {}"
              >
              </slot>
            </template>
          </template>

          <!-- 自定义表头列下的内容 -->
          <template slot-scope="scope">
            <!-- 自定义表头列下的操作项插槽 -->
            <template v-if="item.slotHeaderName === 'hbSetting'">
              <slot name="operation" :row="scope.row"></slot>
            </template>
            <!-- 自定义表头列下-非操作项插槽 -->
            <template v-else>
              <!-- 自定义表头下-内容插槽 -->
              <template v-if="item.slotBodyName">
                <slot :name="item.slotBodyName" :row="scope.row">
                  {{
                    scope.row[item.attrs.prop]
                      ? scope.row[item.attrs.prop]
                      : "-"
                  }}
                </slot>
              </template>
              <!-- 自定义表头下-非内容插槽 -->
              <template v-else>
                <!-- 自定义表头列下的内容自定义展示 -->
                <slot name="other-header-col" :row="scope.row">
                  {{
                    scope.row[item.attrs.prop]
                      ? scope.row[item.attrs.prop]
                      : "-"
                  }}
                </slot>
              </template>
            </template>
          </template>
        </el-table-column>
        <!-- 自定义列(内容) -->
        <el-table-column
          v-else-if="item.slot && item.switch"
          :key="index"
          v-bind="item.attrs || {}"
        >
          <template slot-scope="scope">
            <slot :name="item.slot" :row="scope.row">{{
              "自定义列插槽默认内容"
            }}</slot>
          </template>
        </el-table-column>
        <!-- 填充剩余宽度列 -->
        <el-table-column
          v-else-if="index == copyColConfig.length - autoIndex"
          :key="index"
        >
        </el-table-column>
        <!-- 一般正常列 -->
        <template v-else>
          <el-table-column
            :key="index"
            v-if="item.switch"
            v-bind="item.attrs || {}"
          >
          </el-table-column>
        </template>
      </template>
    </el-table>
    <!-- 侧边栏配置列表展示项 -->
    <el-drawer :title="drawerTitle" :visible.sync="drawer" size="15%">
      <table-config
        :initList="colConfig"
        :saveComponentKey="saveComponentKey"
        @changeColConfig="handleColConfig"
      />
    </el-drawer>
  </div>
</template>
<!-- 使用示例 -->
<!-- 
    必填参数:colConfig,tableData 
    选题参数：
    关联参数（选填）：selection && selectionEvent
    具名插槽： <template slot="state" slot-scope="{ scope }">
                <div>{{scope.row.state}}</div>
              </template>
            slot：插槽名称
            slot-scope：数据传递
            scope.row.state:接收数据
  -->
<!--   
    <Table :colConfig="copyColConfig" :tableData="tableData" :selection="selection" @selectionEvent="selectionEvent">
      <template slot="opCol">
        <el-button type="text">详情</el-button>
          <el-button type="text">删除</el-button>
        </template>
    </Table> 
  -->
<script>
import TableHint from "./table-hint.vue";
import TableConfig from "./table-config.vue";
import { cloneDeep } from "lodash";
export default {
  props: {
    tableName: {
      type: String,
      default: "hb_table",
      /*
        tableName:表单名
        必填：否
        type:String;
        默认为hb_table。
      */
    },

    stripe: {
      type: Boolean,
      default: false,
      /*
        stripe:带斑马纹。
        必填：否
        type:Boolean;
        默认为false，设置为true即为启用。
      */
    },
    border: {
      type: Boolean,
      default: true,
      /*
        border:带边框
        必填：否
        type:Boolean;
        默认为false，设置为true即为启用。
      */
    },
    // height: {
    //   type: Number || String,
    //   /*
    //     height:Table 的高度，默认为自动高度。
    //     必填：否
    //     如果 height 为 number 类型，单位 px；
    //     如果 height 为 string 类型，则这个高度会设置为 Table 的 style.height 的值，
    //     Table 的高度会受控于外部样式。
    //   */
    // },
    // selection: {
    //   type: Boolean,
    //   default: false,
    //   /*
    //     selection:多选;
    //     必填：否
    //     type:Boolean;
    //     默认为false，设置为true即为启用;
    //   */
    // },
    selectionEvent: {
      type: Function,
      /*
        selectionEvent:多选事件;
        必填：和selection同步使用,当传了selection时,selectionEvent也要传。
        type:Function;
      */
    },
    colConfig: {
      type: Array,
      /* 
      colConfig:表头lable 与 prop 对应关系、多选和筛选显示等相关数据
      必填：是
        attrs:{
          label: String, 表头列名称
          prop: String,  表头列数据
          align: "left/center/right", 对齐方式
          width: Number,  宽度
          fixed:  Boolean 值或者left/right  固定列
          showOverflowTooltip:Boolean 默认 true
          resizable: 对应列是否可以通过拖动改变宽度（需要在 el-table 上设置 border 属性为真）
        },
        sortable:Boolean,  是否排序
        slot: String , 自定义（具名插槽） --见使用示例--
        **注**：colConfig倒数第二条不要设置slot,否则影响表格自适应样式
      */
    },
    tableData: {
      type: Array,
      /*
        tableData:表数据
        必填：是
      */
    },
    autoIndex: {
      type: Number,
      default: 1,
      /*
        autoIndex:第几项填充表格剩余空间 默认倒数第二条
        **注**：倒数第 autoIndex 条不要 设置 width ;
        必填：否
      */
    },
    drawerTitle: {
      //侧边栏标题
      type: String,
      require: false,
      default: () => "表格显示设置",
    },
    saveComponentKey: {
      //用于存储表格配置项在本地sessionStorage,
      //同一路由下只有一个表格可以使用默认值,
      //同一路由下>=2个表格,必须传该值,可以使用路由名称拼接数字 如:page-1,page-2;
      type: String,
      require: false,
      default: () => window.location.href.split("?")[0].split("/").slice(-1)[0],
    },
    rowClassNames: {
      //行的 className 的回调方法，也可以使用字符串为所有行设置一个固定的 className。见el-table官方文档
      type: Function,
      require: false,
      default: () => {
        return {};
      },
    },
    handleMouseEnter: {
      //	当单元格 hover 进入时会触发该事件。见el-table官方文档
      type: Function,
      require: false,
      default: () => {
        return {};
      },
    },
    handleMouseLeave: {
      //当单元格 hover 退出时会触发该事件。见el-table官方文档
      type: Function,
      require: false,
      default: () => {
        return {};
      },
    },
    // slotHeaderName: 自定义列表头插槽名字;
    // slotHeaderSearchType:自定义列表头插槽-搜索框类型;//目前配置input 和select 的可以便利循环
    // 自定义列表头插槽-搜索框key;//用于配置传递给服务端的查询key
    // 自定义列是否展示,true-展示, false-隐藏
  },
  components: {
    TableHint,
    TableConfig,
  },
  data() {
    return {
      headerClass: "table-header-gray", //表头行的 className 的回调方法，也可以使用字符串为所有表头行设置一个固定的 className。
      cellClassName: "cell-class-name",
      multipleSelection: [],
      num: 0,
      drawer: false,
      copyColConfig: cloneDeep(this.colConfig),
      showSearchTable: false,
    };
  },
  computed: {
    haveHbSetting() {
      return this.colConfig?.some(
        (item) => item.slotHeaderName === "hbSetting"
      );
    },
  },
  methods: {
    //打开侧边抽屉进行配置
    handleSetTable() {
      this.drawer = true;
    },

    handleSelectionChange(val) {
      this.num = val.length;
      this.multipleSelection = val;
      this.$emit("selectionEvent", val);
    },
    /*
      table多选提示 清空 点击事件
    */
    empty() {
      this.$refs[this.tableName].clearSelection();
      this.num = 0;
    },

    //拖拽后以及开关开闭后展示最新列的顺序
    handleColConfig(val) {
      this.copyColConfig = JSON.parse(JSON.stringify(val));
      this.$emit("update-search-col-config", val);
    },

    //调用查询
    handleSearch() {
      this.$emit("to-search");
    },
    //重置查询
    handleResetSearch() {
      this.$emit("reset-search");
    },
  },
  created() {
    //获取用户上次拖拽后保存在本地列表展示的配置项
    if (this.haveHbSetting) {
      this.copyColConfig =
        JSON.parse(sessionStorage.getItem(this.saveComponentKey)) ||
        this.colConfig;
    }
  },
};
</script>
<style lang="scss">
// @import "@/styles/element-variables.less";
.hb_table {
  background: #fff;

  // position: relative;
  // // height: 430px;
  // width: 461px;
  // overflow: auto;
  // will-change: transform;
  // direction: ltr;
  .table-header-gray {
    background: #f2f3f5;
    color: #242833;
    font-weight: 600;
    th {
      background: #f2f3f5;
    }
  }
  .el-table .el-table__cell {
    height: 40px;
    padding: 0px 0;
    min-width: 0;
    box-sizing: border-box;
    text-overflow: ellipsis;
    vertical-align: middle;
    position: relative;
    color: #242833;
  }
  .el-table .sort-caret.ascending {
    border-bottom-color: #242833;
  }
  .el-table .sort-caret.descending {
    border-top-color: #242833;
  }
  .el-table .descending .sort-caret.descending {
    border-top-color: #1678ff;
  }
  .el-table .ascending .sort-caret.ascending {
    border-bottom-color: #1678ff;
  }
  // .i-division {
  //   padding: 0 5px;
  //   display: none;
  // }
  .i-division {
    cursor: pointer;
    font-size: 18px;
    padding: 5px;
  }
  .cell-class-name {
    border-left: none;
    border-right: none;
  }
  .el-table--border,
  .el-table--group {
    border: none;
  }
  .el-table::before {
    height: 0px;
  }
  .el-table__fixed-right::before,
  .el-table__fixed::before {
    height: 0px;
  }
  .el-table--border::after,
  .el-table--group::after {
    width: 0;
  }
}
</style>
