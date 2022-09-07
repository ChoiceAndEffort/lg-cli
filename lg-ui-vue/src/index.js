import LgTable from "./lg-table/index.vue"
import LgOperate from "./lg-operate/index.vue"

const components = [
    ['lg-table', LgTable],
    ['lg-operate', LgOperate],
]

const install = function (Vue) {
    // 注册 组件
    components.forEach((item) => {
        Vue.component(item[0], item[1]);
    });
};



export default {
    install
}