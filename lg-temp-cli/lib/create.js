// 在创建目录的时候，需要思考一个问题：目录是否已经存在？

// 1.如果存在
// 当 { force: true } 时，直接移除原来的目录，直接创建
// 当 { force: false } 时 询问用户是否需要覆盖
// 2.如果不存在，直接创建

// 接下来我们要做的：

// 1.上一步遗留：询问用户是否覆盖已存在的目录
// 2.用户选择模板
// 3.用户选择版本
// 4.获取下载模板的链接

const path = require('path');
const fs = require('fs-extra');
const inquirer = require('inquirer'); //询问用户问题获取创建所需信息
const Generator = require('./Generator');


module.exports = async function (name, options) {
  // 执行创建命令

  // 当前命令行选择的目录
  const cwd = process.cwd();

  // 需要创建的目录地址
  const targetAir = path.join(cwd, name);
  console.log('-------------1111111----');
  // 目录是否已经存在？
  if (fs.existsSync(targetAir)) {
    // 是否为强制创建？
    if (options.force) {
      await fs.remove(targetAir);
    } else {
      // TODO：询问用户是否确定要覆盖

      let { action } = await inquirer.prompt([
        {
          name: 'action',
          type: 'list',
          message: 'Target directory already exists Pick an action:',
          choices: [
            {
              name: 'Overwrite',
              value: 'overwrite'
            },
            {
              name: 'Cancel',
              value: false
            }
          ]
        }
      ]);

      if (!action) {
        return;
      } else if (action === 'overwrite') {
        // 移除已存在的目录
        console.log(`\r\nRemoving...`);
        await fs.remove(targetAir);
        console.log('-------------33333333333----');
      }
    }
  }
  // 创建项目
  console.log('-------------222222222----');
  const generator = new Generator(name, targetAir);

  // 开始创建项目
  generator.create();
};
