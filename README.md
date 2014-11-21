本项目是 [BMYBBS](http://bbs.xjtu.edu.cn) 的web新界面。其后端使用 [BMYBBS API](http://github.com/bmybbs/api)，前段基于 [ember.js](http://emberjs.com/)。

项目结构采用 [ember-cli](http://ember-cli.com/) 生成，原有的项目文件可以废弃掉，包括：
* app.html
* css/
* index.html
* js/

## 依赖

* [Git](http://git-scm.com/)
* [Node.js](http://nodejs.org/) (with NPM) and [Bower](http://bower.io/)

## 安装

* `git clone https://github.com/bmybbs/web` this repository
* change into the new directory
* `npm install`
* `bower install`

## 开发、运行

* `ember server`
* 访问 http://localhost:4200

### Code Generators

Make use of the many generators for code, try `ember help generate` for more details

### Running Tests

* `ember test`
* `ember test --server`

### Building

* `ember build` (development)
* `ember build --environment production` (production)

### Deploying

Specify what it takes to deploy your app.

## Further Reading / Useful Links

* ember: http://emberjs.com/
* ember-cli: http://www.ember-cli.com/
* Development Browser Extensions
  * [ember inspector for chrome](https://chrome.google.com/webstore/detail/ember-inspector/bmdblncegkenkacieihfhpjfppoconhi)
  * [ember inspector for firefox](https://addons.mozilla.org/en-US/firefox/addon/ember-inspector/)
