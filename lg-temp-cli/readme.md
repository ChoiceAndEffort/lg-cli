- https://juejin.cn/post/6966119324478079007#heading-38(可以参照这个链接)


## 可以参考这个一比一搭建(实际操作可行),这个是关联大佬的github仓库的
# 将固定模板拷贝到项目中-脚手架

- npm init -y // 快速初始化一个项目
- 新建命令行的入口文件 /bin/cli.js
- 将 npm 包链接到全局执行环境: npm link
- 执行 temp-cli 命令//输出：Hello World!
- npm i inquirer ejs -D

搭建步骤拆解：

1. 创建项目
2. 创建脚手架启动命令（使用 commander）
3. 询问用户问题获取创建所需信息（使用 inquirer）
4. 下载远程模板（使用 download-git-repo）
5. 发布项目


## 验证搭建效果
- 创建一个文件夹my-demo
- 文件npm link lg-temp-cli
- temp-cli create a1
