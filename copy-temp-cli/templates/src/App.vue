<template>
  <div>
    <!-- APP页面 -->
    <router-view />
  </div>
</template>
<script>
export default {
  created() {},
  methods: {},
};
</script>

<style lang="scss">
.addTemplate .el-form-item__content {
  width: 80%;
}
.addTitle .el-dialog__body {
  padding: 0 !important;
}
.addTitle .el-divider {
  margin: 0 !important;
}
.addTitle .el-form-item__content {
  width: 75%;
}
.el-divider--horizontal {
  margin: 5px 0 !important;
}
</style>
