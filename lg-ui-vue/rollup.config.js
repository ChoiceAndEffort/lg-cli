import vue from 'rollup-plugin-vue' //
import commonjs from 'rollup-plugin-commonjs';
import {
    terser
} from 'rollup-plugin-terser';


export default {
    input: "./src/index.js",
    output: {
        file: "./dist/index.cjs.js",
        format: "cjs",
    },
    plugins: [
        vue(),
        commonjs(),
        terser(), //可以根据情况来处理打包后文件压不压缩
    ],
}