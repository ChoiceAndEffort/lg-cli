#!/usr/bin/env node  //用于解释程序的脚本
console.log('Hello World!'); //为了测试是否正常

const inquirer = require('inquirer'); //交互式命令行工具-实现与询问用户信息的功能需要引入 inquirer.js
const path = require('path');
const fs = require('fs');
const ejs = require('ejs'); //借助 ejs 模版引擎将用户输入的数据渲染到模版文件上

inquirer
  .prompt([
    {
      type: 'input', //type： input, number, confirm, list, checkbox ...
      name: 'name', // key 名
      message: 'Your Project name', // 提示信息
      default: 'my-node-cli' // 默认值
    }
  ])
  .then((answers) => {
    // 打印互用输入结果
    console.log(answers, 999);

    // 模版文件目录
    const destUrl = path.join(__dirname, '../templates');

    // 生成文件目录 process.cwd() 对应控制台所在目录
    const cwdUrl = process.cwd();
    //fs.readdir()方法用于异步读取给定目录的内容。此方法的回调返回目录中所有文件名的数组。 options参数可用于更改从方法返回文件的格式。
    //fs.readdir( path, options, callback )
    fs.readdir(destUrl, (err, files) => {
      if (err) throw err;
      files.forEach((file) => {
        // 使用 ejs 渲染对应的模版文件
        // renderFile（模版文件地址，传入渲染数据）
        ejs.renderFile(path.join(destUrl, file), answers).then((data) => {
          // 生成 ejs 处理后的模版文件
          fs.writeFileSync(path.join(cwdUrl, file), data);
        });
      });
    });
  });
