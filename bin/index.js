#!/usr/bin/env node

const program = require('commander')
const inquirer = require('inquirer') // 手动选择-交互命令
const ora = require('ora') // 显示加载效果
const download = require('download-git-repo') // 下载git项目

const chalk = require('chalk')
chalk.level = 1

// 询问用户
let promptList = [
  {
    type: 'list',
    name: 'frame',
    message: 'please choose this project template',
    choices: ['pc', 'h5', 'admin']
  }
  // {
  //     type: 'input',
  //     name: 'description',
  //     message: 'Please enter the project description:'
  // },
  // {
  //     type: 'input',
  //     name: 'author',
  //     message: 'Please enter the author name:'
  // }
]

let prompt = () => {
  const templates = {
    pc: 'Auroka/vue-pc-template',
    h5: 'Auroka/vue-h5-template',
    admin: 'Auroka/vue-admin-template'
  }
  return new Promise(resolve => {
    // inquirer提供prompt函数来实现询问，其参数为数组，询问将按数组的顺序来
    inquirer.prompt(promptList).then(answer => {
      resolve(templates[answer.frame])
    })
  })
}

//name 新项目名称
program
  .version(require('../package.json').version, '-v, --version')
  .command('create <name>')
  .action(async name => {
    const url = await prompt()
    let loading = ora('download template ...')
    loading.start()
    download(url, name, err => {
      if (err) {
        console.log(err)
        loading.fail(chalk.red('download error'))
        return
      }
      loading.succeed(chalk.green('download success'))
    })
  })
program.parse(process.argv)

// 待实现
// 1.多功能选择
// 2.下载完项目后改变项目中的项目名和其他信息（手动选择的）
