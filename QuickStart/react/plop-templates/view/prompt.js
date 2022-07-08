
const { notEmpty } = require('../utils.js')

module.exports = {
  description: 'generate a view page',
  prompts: [
    {
      type: 'input',
      name: 'pageName',
      message: 'absolute path',
      validate: notEmpty('pageName')
    },
    {
      type: 'input',
      name: 'name',
      message: 'view name please',
      validate: notEmpty('name')
    }
  ],
  actions: data => {
    const name = '{{name}}'
    const pageName = '{{pageName}}' // 页面路径顶级目录
    const actions = [
      {
        type: 'add',
        path: `${pageName}/${name}/index.tsx`,
        templateFile: 'plop-templates/view/index.hbs'
      },
      {
        type: 'add',
        path: `${pageName}/${name}/index.module.less`
      }
    ]
    return actions
  }
}
