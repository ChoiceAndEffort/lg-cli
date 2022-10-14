#脚手架指令demo

- npm init 初始一个项目
- 在项目中新建 bin 文件夹
- 在项目 bin 文件夹下新建一个 first-cli.js
- 在 first-cli.js 文件中编写代码

```js
#!/usr/bin/env node

function run(argv) {
  console.log("argv", argv);
  if (argv[0] === "-v" || argv[0] === "--version") {
    console.log("  version is 0.0.1");
  } else if (argv[0] === "-h" || argv[0] === "--help") {
    console.log("  usage:\n");
    console.log("  -v --version [show version]");
  }
}
run(process.argv.slice(2));
```

- 在 package.json 中引入编写的文件

```json
  "bin": {
    "first-cli": "bin/first-cli.js"
  },
```

- 在项目中 npm link 弄一个本地镜像包

- 在要用到脚手架的项目中 npm link first-cli
- 然后输入 first-cli -v 指令中打印出脚手架对应的版本
