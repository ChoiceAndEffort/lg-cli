module.exports = {
    presets: [
        '@vue/cli-plugin-babel/preset'
    ],
    'env': {
        'development': {
            'plugins': ['dynamic-import-node'], //提高热更新速度
        }
    },
    "plugins":[
        // null判断运算符支持 ??
        '@babel/plugin-proposal-nullish-coalescing-operator',
        // 链判断运算符支持 ?.
        '@babel/plugin-proposal-optional-chaining'
    ]
}
