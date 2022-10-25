#! /usr/bin/env node

// #! 符号的名称叫 Shebang，用于指定脚本的解释程序
// Node CLI 应用入口文件必须要有这样的文件头
// 如果是Linux 或者 macOS 系统下还需要修改此文件的读写权限为 755
// 具体就是通过 chmod 755 cli.js 实现修改

// 用于检查入口文件是否正常执行
console.log('my-node-cli working~1');

const inquirer = require('inquirer');
const questions = [
  {
    type: 'confirm',
    name: 'order',
    message: '您好，需要点餐吗?',
    default: true
  },
  {
    type: 'number',
    name: 'amount',
    message: '你们几个人?',
    default: 1
  },
  {
    type: 'list',
    name: 'mainFood',
    message: '主食需要吃点什么？',
    choices: ['Rice', 'Noodle', 'Pizza'],
    // 对用户的回答进行转换，返回转换过的结果
    filter(val) {
      return val.toLowerCase();
    },
    default: 'Pizza' // 注意：default 值为转化前的值
  },
  {
    type: 'list',
    name: 'smell',
    message: '需要什么口味的？',
    choices: [
      {
        key: 0,
        name: '辣',
        value: 'hot'
      },
      {
        key: 1,
        name: '甜',
        value: 'sweet'
      }
    ]
  },
  {
    type: 'rawlist',
    message: 'Pizza 要多大尺寸的？',
    name: 'size',
    choices: ['5寸', '6寸', '7寸'],
    when(answers) {
      return answers.mainFood === 'pizza';
    },
    default: 1 // default 是选项在 choices 数组中的索引
  },
  {
    type: 'checkbox',
    name: 'menu',
    message: '想要吃点什么菜?',
    choices: [
      {
        name: '东坡肉',
        checked: true
      },
      {
        name: '剁椒鱼头'
      },
      {
        name: '法式鹅肝',
        disabled: '卖完了'
      },
      {
        name: '西红柿炒鸡蛋'
      }
    ]
  },
  {
    type: 'expand',
    name: 'drinks',
    message: '饮料喝点什么?',
    choices: [
      {
        key: 'a', // key 必须是单个小写的字符
        name: '小麦茶',
        value: 'XiaoMaiCha'
      },
      {
        key: 'b',
        name: '雪碧',
        value: 'XueBi'
      },
      {
        key: 'c',
        name: '果粒橙',
        value: 'GuoLiCheng'
      }
    ],
    default: 0 // default 值必须是选项在 choices 数组中的索引
  },
  {
    type: 'input',
    name: 'vipCard',
    message: '请输入会员卡号',
    validate(value) {
      const pass = /^\d{8}$/.test(value);
      if (pass) {
        return true;
      }

      return '会员卡号是8位纯数字！';
    }
  },
  {
    type: 'password',
    name: 'pwd',
    message: '请输入会员卡密码',
    mask: '*',
    validate(value) {
      let valid = value.length === 6;

      return valid || '密码必须是6位！';
    }
  },
  {
    type: 'editor',
    name: 'suggest',
    message: '您对本店有什么建议吗？'
  }
];

inquirer
  .prompt(questions)
  .then((answers) => {
    // 打印互用输入结果
    console.log(answers);
  })
  .catch((error) => {
    if (error.isTtyError) {
      // Prompt couldn't be rendered in the current environment
    } else {
      // Something else went wrong
    }
  });
