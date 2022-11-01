const inquirer = require('inquirer');
const path = require('path');
const fs = require('fs-extra');
module.exports = async (name, options) => {
  console.log('创建项目');
  // const cwd = process.cwd();
  // const targetAir = path.join(cwd, name);
  // // 目录是否已经存在？
  // if (fs.existsSync(targetAir)) {
  //   // 是否为强制创建？
  //   if (options.force) {
  //     await fs.remove(targetAir);
  //   } else {
  //     // TODO：询问用户是否确定要覆盖
  //     let { action } = await inquirer.prompt([
  //       {
  //         name: 'action',
  //         type: 'list',
  //         message: 'Target directory already exists Pick an action:',
  //         choices: [
  //           {
  //             name: 'Overwrite',
  //             value: 'overwrite'
  //           },
  //           {
  //             name: 'Cancel',
  //             value: false
  //           }
  //         ]
  //       }
  //     ]);

  //     if (!action) {
  //       return;
  //     } else if (action === 'overwrite') {
  //       console.log(`\r\nRemoving...`);
  //       await fs.remove(targetAir);
  //     }
  //   }
  // }
};
