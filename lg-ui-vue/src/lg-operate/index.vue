<template>
  <div class="hb-table-setting">
    <el-button
      type="text"
      :disabled="handleColBtnIsDisabled(row)"
      @click="handleOperateCol(operateList[0].eventsName, row)"
      >{{ operateList[0].btnName }}</el-button
    >
    <el-dropdown trigger="hover" v-if="operateList.length > 1">
      <span class="el-dropdown-link">
        <i class="el-icon-arrow-down el-icon--right"></i>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item
          v-for="(item, index) in operateList"
          :key="index"
          :disabled="item.disabled && handleColBtnIsDisabled(row)"
          @click.native="handleOperateCol(item.eventsName, row)"
          >{{ item.btnName }}</el-dropdown-item
        >
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>
<script>
export default {
  props: {
    operateList: {
      type: Array,
      required: true,
      default: () => {},
    },
    row: {
      type: Object,
      required: false,
      default: () => {},
    },
  },
  methods: {
    //禁用操作列
    handleColBtnIsDisabled(row) {
      if (row.delFlag == "2") {
        return true;
      } else {
        return false;
      }
      // return row.index === 0;
    },
    handleOperateCol(eventsName, row) {
      this.$emit("setEventsName", eventsName, row);
    },
  },
};
</script>