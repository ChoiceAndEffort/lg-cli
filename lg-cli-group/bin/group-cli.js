#!/usr/bin/env node
console.log('hello group-cli');
const program = require('commander');
const createNewProject = require('../packages/commands/create-new-project');
const initCodeEnv = require('../packages/commands/init-code-env');


//创建一个空白模板的项目
program
  .command('create <app-name>')
  .description('请输入项目目录名称')
  .action(function (name, options) {
    createNewProject(name, options);
  });

//初始化编码环境
program
  .version(`v${require('../package.json').version}`, '-v, --version')
  .command('init-code-env')
  .description('初始化编码环境')
  .action(initCodeEnv);

program.parse(process.argv);
