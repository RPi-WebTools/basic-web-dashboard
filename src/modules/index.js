// Automatically grab all modules called *.module.js in this directory

const requireModule = require.context('./', true, /\.module\.js$/)
const modules = {}

requireModule.keys().forEach(file => {
    const moduleName = file.replace(/(\.\/|\.module\.js)/g, '').toUpperCase()
    modules[moduleName] = requireModule(file).default || requireModule(file)
})

export default modules
