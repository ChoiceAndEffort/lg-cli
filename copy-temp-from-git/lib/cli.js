#!/usr/bin/env node  //用于解释程序的脚本
console.log('Hello World!'); //为了测试是否正常

const program = require('commander'); //创建脚手架启动命令
const chalk = require('chalk'); //（粉笔）可以美化我们在命令行中输出内容的样式，例如对重点信息添加颜色

program
  // 配置版本号信息
  .version(`v${require('../package.json').version}`)
  .usage('<command> [option]')
  .command('create <app-name>') //创建项目名称的指令
  // -f or --force 为强制创建，如果创建的目录存在则直接覆盖
  .option('--f, --force', 'overwrite target directory if it exist')
  .description('create a new project')
  .action((name, options) => {
    // 颜色
    console.log('project name is ' + chalk.cyan(name)); //添加青色

    require('./create.js')(name, options);
  });

// 解析用户执行命令传入参数
program.parse(process.argv);
