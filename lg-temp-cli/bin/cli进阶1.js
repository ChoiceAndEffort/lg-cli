#!/usr/bin/env node  //用于解释程序的脚本
console.log('Hello World!'); //为了测试是否正常

const program = require('commander'); //自定义命令行指令-命令行交互工具
const chalk = require('chalk'); //（粉笔）可以美化我们在命令行中输出内容的样式，例如对重点信息添加颜色
program
  .version(require('../package.json').version)
  .command('create <name>') //创建项目名称的指令
  .description('create a new project')
  .action((name) => {
    // 打印命令行输入的值

    //加粗字体
    console.log('project name is ' + chalk.bold(name));
    // 颜色
    console.log('project name is ' + chalk.cyan(name));
    console.log('project name is ' + chalk.green(name));

    // 背景色
    console.log('project name is ' + chalk.bgRed(name));

    // 使用RGB颜色输出
    console.log('project name is ' + chalk.rgb(4, 156, 219).underline(name));
    console.log('project name is ' + chalk.hex('#049CDB').bold(name));
    console.log('project name is ' + chalk.bgHex('#049CDB').bold(name));
  });

program.parse();
