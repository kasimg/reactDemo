const axios = require('axios');
const path = require('path');
const webpack = require('webpack');
const MemoryFs = require('memory-fs'); // 从内存获取数据
const ReactDomServer = require('react-dom/server');

const serverConfig = require('../../build/webpack.config.server');

const getTemplate = () => {
    return new Promise((resolve, reject) => {
        axios.get('http://localhost:8888/public/index.html')
            .then((res) => {
                resolve(res.data);
            })
            .catch(reject);
    });
};

const Module = module.constructor;

const mfs = new MemoryFs;

// 监听entry下的依赖文件是否有变化
const serverCompiler = webpack(serverConfig);

// 从内存读取数据
serverCompiler.outputFileSystem = mfs;
let serverBundle;
serverCompiler.watch({}, (err, stats) => {
  // console.log('stats:', stats);
    if (err) throw err;
    stats = stats.toJSON();
    stats.errors.forEach((err) => {console.error(err)});
    stats.warnings.forEach((err) => {console.warn(err)});

    const bundlePath = path.join(
        serverConfig.output.path,
        serverConfig.output.filename
    );
    const bundle = mfs.readFileSync(bundlePath, 'utf-8');
    const m = Module();
    // m._compile(bundle, 'server-entry.js');
    // serverBundle = m.default;
});

module.exports = function (app) {

    app.get('*', function (req, res) {
        getTemplate().then((template) => {
            const content = ReactDomServer.renderToString(serverBundle);
            res.send(template.replace('<!-- app -->', content));
        })
    });
};