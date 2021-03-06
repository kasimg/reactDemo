const express = require('express');
const favicon = require('serve-favicon');
const ReactSSR = require('react-dom/server');
const fs = require('fs');
const path = require('path');

const isDev = process.env.NODE_ENV === 'development';

const app = express();

// app.use(favicon(path.join(__dirname, '../favicon.ico')));

if (!isDev) {

  // require默认读取整个js文件,区别于import只读取导出部分
  const serverEntry = require('../dist/server-entry').default;
  const template = fs.readFileSync(path.join(__dirname, '../dist/index.html'), 'utf8');

  // 以/public开头的一律返回静态文件
  app.use('/public', express.static(path.join(__dirname, '../dist')));
  app.get('*', function (req, res) {
    const appString = ReactSSR.renderToString(serverEntry);
    // template.replace('<app></app>', appString);
    res.send(template.replace('<app></app>', appString))
  });
} else {
  const devStatic = require('./utils/dev-static');
  devStatic(app);
}

app.listen(3333, function () {
  console.log('server is listening on 3333');
});
