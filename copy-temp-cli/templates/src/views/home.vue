<template>
  <div class="home">
    <!-- {{ pkg.name }}首页 -->
    
  </div>
</template>

<script>
import pkg  from "../../package.json";
export default {
  data() {
    return {
      pkg:pkg,
    };
  },
  created(){
    // console.log(this.pkg,66666666666);
  },
};
</script>

<style scoped lang="scss">
@import "https://unpkg.com/element-ui@2.15.6/lib/theme-chalk/index.css";
.home {
  width: 100%;
  padding-right: 10px;
  .top_img {
    width: 100%;
    display: flex;
    .top_l {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      padding-right: 8px;
      width: 75.5%;
      img {
        width: 100%;
      }
    }
    > img {
      width: 24.5%;
    }
  }
  .m_img,
  .b_img {
    margin-top: 8px;
    width: 100%;
    img {
      width: 100%;
    }
  }
}
</style>
