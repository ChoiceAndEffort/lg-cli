<template>
  <div class="table-hint" v-if="num > 0">
    <i class="el-icon-info"></i>
    <p>
      已 选 择 <span>{{ num }}</span> 项 数 据
    </p>
    <span type="text" @click="table_empty">清 空</span>
  </div>
</template>
<script>
export default {
  props: {
    num: Number,
  },
  methods: {
    table_empty() {
      this.$emit("empty", []);
    },
  },
};
</script>
<style lang="scss" scoped>
// @import "@/styles/element-variables.less";
.table-hint {
  height: 32px;
  width: 100%;
  border: 1px solid;
  border-radius: 2px;
  line-height: 32px;
  box-sizing: border-box;
  padding: 0 10px;
  display: flex;
  align-items: center;
  background: #ecf5ff;
  font-size: 13px;
  margin-bottom: 8px;
  i {
    color: #1678ff;
    font-size: 15px;
  }
  p {
    margin: 0 10px;
    word-spacing: -2px;
  }
  span {
    color: #1678ff;
    cursor: pointer;
  }
}
</style>