'use strict';

console.log('my-node-cli working~1');
const path = require('path');
const fs = require('fs');

const program = require('commander'); //创建脚手架启动命令
const inquirer = require('inquirer');
require('ejs');
const chalk = require('chalk'); //（粉笔）可以美化我们在命令行中输出内容的样式，例如对重点信息添加颜色
const ora = require('ora'); //控制台 loading 样式

const questions = [
  {
    type: 'input',
    name: 'idName',
    message: '请输入id名称'
  }
];

//拷贝目录
const checkDirectory = function (src, dst, callback) {
  fs.access(dst, fs.constants.F_OK, (err) => {
    if (err) {
      fs.mkdirSync(dst);
      callback(src, dst);
    } else {
      callback(src, dst);
    }
  });
};

//纯拷贝本间拷贝文件
const copy = function (src, dst) {
  let paths = fs.readdirSync(src); //同步读取当前目录
  paths.forEach(function (path) {
    var _src = src + '/' + path;
    var _dst = dst + '/' + path;
    fs.stat(_src, function (err, stats) {
      //stats 该对象 包含文件属性
      if (err) throw err;
      if (stats.isFile()) {
        //如果是个文件则拷贝
        let readable = fs.createReadStream(_src); //创建读取流
        let writable = fs.createWriteStream(_dst); //创建写入流
        readable.pipe(writable);
      } else if (stats.isDirectory()) {
        //是目录则 递归
        checkDirectory(_src, _dst, copy);
      }
    });
  });
};

//要修改的文件
// package.json
// index.html
// main.js
// router/index.js

//拷贝和修改文件
// const copyAndChange = function (src, dst) {
//   let paths = fs.readdirSync(src); //同步读取当前目录
//   paths.forEach(function (path) {
//     var _src = src + '/' + path;
//     var _dst = dst + '/' + path;
//     fs.stat(_src, function (err, stats) {
//       //stats 该对象 包含文件属性
//       if (err) throw err;
//       if (stats.isFile()) {
//         /**------------------直接拷贝------------------**/
//         //如果是个文件则拷贝
//         let readable = fs.createReadStream(_src); //创建读取流
//         let writable = fs.createWriteStream(_dst); //创建写入流
//         readable.pipe(writable);
//       } else if (stats.isDirectory()) {
//         //是目录则 递归
//         checkDirectory(_src, _dst, copy);
//       }
//     });
//   });
// };
program
  .version(`v${require('../package.json').version}`)
  .usage('<command> [option]')
  .command('create <app-name>') //创建项目名称的指令
  .description('请输入项目目录名称')
  .action((name, options) => {
    // console.log(name, options);
    //加粗字体
    console.log('project name is ' + chalk.bold(name), options);
    // 颜色
    console.log('project name is ' + chalk.cyan(name)); //添加青色
    inquirer
      .prompt(questions)
      .then((answers) => {
        // 打印互用输入结果
        console.log('idName--------', answers);
        // 模版文件目录
        const sourceDir = path.join(__dirname, './templates');

        // 当前命令行选择的目录
        const cwd = process.cwd();

        // 在当前命令行选择的目录创建的目录地址
        const targetAir = path.join(cwd, name);

        const spinner = ora('开始拷贝');
        // 开始加载动画
        spinner.start();

        checkDirectory(sourceDir, targetAir, copy);

        setTimeout(() => {
          // 状态为修改为成功
          spinner.succeed('拷贝完成!');
        }, 5000);

        console.log(`\r\nSuccessfully created project ${chalk.cyan(name)}`);
        console.log(`\r\n  cd ${chalk.cyan(name)}`);
        console.log(
          `\r\n  ${chalk.red('修改package.json中的name为项目名称')} \r\n`
        );
        console.log(
          `\r\n  ${chalk.red(
            '修改vue.config.js文件中端口为项目的启动端口'
          )} \r\n`
        );
        console.log('  npm install\r\n');
        console.log('  npm run serve\r\n');

        // fs.readdir(destUrl, (err, files) => {
        //   //读取当前目录
        //   if (err) throw err;
        //   console.log(files, 11111);
        //   files.forEach((file) => {
        // 使用 ejs 渲染对应的模版文件
        // renderFile（模版文件地址，传入渲染数据）
        // ejs
        //   .renderFile(path.join(destUrl, file), answers.idName)
        //   .then((data) => {
        // console.log(3333,data);
        // 生成 ejs 处理后的模版文件
        // fs.writeFileSync(path.join(cwdUrl, file), data);
        // });
        //   });
        // });
      })
      .catch((error) => {
        if (error.isTtyError) ;
      });
  });
// 解析用户执行命令传入参数
program.parse(process.argv);
