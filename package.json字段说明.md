# 关于package.json文件中字段的说明
## name *
在package.json中最重要的两个字段就是name和version，他们都是必须存在的，否则包将无法安装。name和version一起组成包的唯一标识。
改变包应该同时改变version。
#### 命名规则
1.小于等于214个字符
2.不能以点或者下划线开始
3.不能包含大写字母
4.不能包含non-URL-safe字符
## version *
在package.json中最重要的两个字段就是name和version，他们都是必须存在的，否则包将无法安装。name和version一起组成包的唯一标识。
改变包应该同时改变version。
## description
简介，字符串。方便用户搜索时发现你的包
## keywords
关键词，字符串型数组。方便用户搜索时发现你的包
## homepage
本项目的URL
## bugs
项目的提交问题的url或邮件地址，这对遇到问题的用户很有帮助
```js
{ "url" : "http://github.com/owner/project/issues"
, "email" : "project@hostname.com"
}
```
你可以指定一个或者指定两个。如果你只想提供一个url，那就不用对象了，字符串就行。
## license
你应该指定一个许可，让用户知道使用的权利和限制的。常用BSD或者MIT
## people fields: author, contributors
作者是一个人，贡献者是多个人，这里"人"的概念为一个包含name，email和url的对象，
```js
{ "name" : "Barney Rubble"
, "email" : "b@rubble.com"
, "url" : "http://barnyrubble.tumblr.com/"
}
```
或
```js
"Barney Rubble <b@rubble.com> (http://barnyrubble.tumblr.com/)"
```
其中email和url为可选字段
## files
files是一个文件的数组，它描述了当包被当做依赖安装后将包含的文件。
如果不提供该字段，那么除了默认不包含的文件外，其余文件都将被发布。
#### ignore
1.你可以在根目录或者子目录里提供.npmignore文件，改文件中记录的文件将不被发布
2.如果没有.npmignore文件，而存在.gitignore，那么.gitignore中记录的文件将不被发布
#### 不管你怎么设置，以下内容将始终被包括
```js
package.json
README
CHANGES / CHANGELOG / HISTORY
LICENSE / LICENCE
NOTICE
The file in the "main" field
```
#### 以下内容将始终ignored
```js
.git
CVS
.svn
.hg
.lock-wscript
.wafpickle-N
.*.swp
.DS_Store
._*
npm-debug.log
.npmrc
node_modules
config.gypi
*.orig
package-lock.json (use shrinkwrap instead)
```
## main *
main字段配置一个文件名指向模块的入口。如果你包的名字叫my-package，然后用户require("my-package")，main配置的模块的exports对象会被返回。
而且，这应该是一个相对于根目录的文件路径。(Browserify & Webpack using the CommonJS or Universal Module Definition)
例如：
```js
{
  "name": "my-package",
  "version": "0.1.0",
  "main": "dist/my-package.js"
}
```
## module
作用通main字段，兼容利用es2015特性的打包器如rollup，添加该字段后可以看做同时为 UMD 和 ES2015 提供服务，使Webpack 和 Rollup 都可以构建出高效代码
例如：
```js
{
  "name": "my-package",
  "version": "0.1.0",
  "main": "dist/my-package.umd.js",
  "module": "dist/my-package.esm.js"
}
```
## bin
bin项用来指定各个内部命令对应的可执行文件的位置。
```js
"bin": {
  "someTool": "./lib/someTool.js"
}
```
上面代码指定，someTool 命令对应的可执行文件为lib子目录下的 someTool.js。npm install时npm会寻找这个文件，在node_modules/.bin/目录下建立符号链接。
在上面的例子中，someTool.js会建立符号链接npm_modules/.bin/someTool。由于node_modules/.bin/目录会在运行时加入系统的PATH变量，因此在运行npm时，就可以不带路径，直接通过命令来调用这些脚本。
因此，像下面这样的写法可以采用简写。
```js
scripts: {  
  start: './node_modules/someTool/lib/someTool.js build'
}

// 简写为

scripts: {  
  start: 'someTool build'
}
```
所有node_modules/.bin/目录下的命令，都可以用npm run [命令]的格式运行。在命令行下，键入npm run，然后按tab键，就会显示所有可以使用的命令。
#### 注意
确保.bin中链接的文件是以```#!/usr/bin/env node```开头的
## man
用来指定一个文件或者文件名的数组，以便man指令找到改文件
1.如果是单一文件，安装完成后，他就是man + <pkgname>的结果，和此文件名无关，例如：
```js
{ "name" : "foo"
, "version" : "1.2.3"
, "description" : "A packaged foo fooer for fooing foos"
, "main" : "foo.js"
, "man" : "./man/doc.1"
}
```
可以通过man foo得到 ./man/doc.1 文件的内容
2.如果man文件名称不是以模块名称开头的，安装的时候会给加上模块名称前缀。因此，下面这段配置：
```js
{ "name" : "foo"
, "version" : "1.2.3"
, "description" : "A packaged foo fooer for fooing foos"
, "main" : "foo.js"
, "man" : [ "./man/foo.1", "./man/bar.1" ]
```
会创建一些文件来作为man foo和man foo-bar命令的结果。
man文件必须以数字结尾，或者以.gz结尾。数字表示文件将被安装到man的哪个部分。
```js
{ "name" : "foo"
, "version" : "1.2.3"
, "description" : "A packaged foo fooer for fooing foos"
, "main" : "foo.js"
, "man" : [ "./man/foo.1", "./man/foo.2" ]
}
```
会创建 man foo 和 man 2 foo 两条命令。
## directories
CommonJS的包管理通过directories制定了一些方法来表明你的包的结构
## repository
指定代码存放的地方。这个对希望贡献的人有帮助。如果在github上，那么使用npm docs命令就能找到你。
```js
"repository" :
  { "type" : "git"
  , "url" : "https://github.com/npm/npm.git"
  }

"repository" :
  { "type" : "svn"
  , "url" : "https://v8.googlecode.com/svn/trunk/"
  }
```
URL应该是可用的（即便是只读的），可以不经过任何处理就能直接被版本控制程序使用。
而不应该是一个项目的页面。
若你的模块放在GitHub, GitHub gist, Bitbucket, or GitLab的仓库里，npm install的时候可以使用缩写标记来完成：
```js
"repository": "npm/npm"

"repository": "github:user/repo"

"repository": "gist:11081aaa281"

"repository": "bitbucket:user/repo"

"repository": "gitlab:user/repo"
```
## scripts
scripts是一个指定了项目的生命周期个各个环节需要执行的命令的字典。它的key是生命周期中的事件，value是要执行的命令。
详见[npm-scripts](https://docs.npmjs.com/misc/scripts).
## config
config对象用来设置一些不太变化的变量，例如如果一个包有下面的配置：
```js
{ "name" : "foo"
, "config" : { "port" : "8080" } }
```
然后有一个引用了环境变量npm_package_config_port的start指令，那么用户可以通过npm config set foo:port 8001
来重置，详见[npm-config](https://docs.npmjs.com/misc/config)和[npm-scripts](https://docs.npmjs.com/misc/scripts)。
## dependencies
配置模块所依赖的模块对象列表，对象的key是模块名称，value是版本范围，版本范围由一个或多个空格分割的字符串。
dependencies也可以被指定为一个git地址或者一个压缩包地址。
不要把测试工具或transpilers写到dependencies中。 对比下面的devDependencies。
version Must match version exactly
```js
version Must match version exactly
>version Must be greater than version
>=version etc
<version
<=version
~version "Approximately equivalent to version" See semver
^version "Compatible with version" See semver
1.2.x 1.2.0, 1.2.1, etc., but not 1.3.0
http://... See 'URLs as Dependencies' below
* Matches any version
"" (just an empty string) Same as *
version1 - version2 Same as >=version1 <=version2.
range1 || range2 Passes if either range1 or range2 are satisfied.
git... See 'Git URLs as Dependencies' below
user/repo See 'GitHub URLs' below
tag A specific version tagged and published as tag See npm-dist-tag
path/path/path See Local Paths below
```
例如：
```js
{ "dependencies" :
  { "foo" : "1.2.3 - 2.3.4"  //>=1.2.3 <=2.3.4
  , "bar" : ">=1.0.2 <2.1.2"
  , "baz" : ">1.0.2 <=2.3.4"
  , "boo" : "2.0.1"
  , "qux" : "<1.0.0 || >=2.3.1 <2.4.5 || >=2.5.2 <3.0.0"
  , "asd" : "http://asdf.com/asdf.tar.gz"
  , "til" : "~1.2"   //>=1.2.0 <1.3.0 (Same as 1.2.x),[major, minor, patch] Allows patch-level changes if a minor version is specified on the comparator. Allows minor-level changes if not.
  , "elf" : "~1.2.3" //>=1.2.3 <1.3.0
  , "two" : "1.x"    //1.0.0 <2.0.0 (Matching major version)
  , "thr" : "3.3.x"  //>=3.3.0 <3.4.0 (Matching major and minor versions)
  , "lat" : "latest"
  , "dyl" : "file:../dyl"
  , "xx"  : "~1.2.3-beta.2" //>=1.2.3-beta.2 <1.3.0 Note that prereleases in the 1.2.3 version will be allowed, if they are greater than or equal to beta.2. So, 1.2.3-beta.4 would be allowed, but 1.2.4-beta.2 would not, because it is a prerelease of a different [major, minor, patch] tuple.
  , "yy"  : "^1.2.3" //>=1.2.3 <2.0.0, Allows changes that do not modify the left-most non-zero digit in the [major, minor, patch] tuple
  }
}
```
版本具体信息参考[semer](https://docs.npmjs.com/misc/semver)
#### URLs as Dependencies
在版本的地方可以指定一个压缩包的url，这样的话在安装包时改压缩包会被下载安装
#### Git URLs as Dependencies
格式：
```js
<protocol>://[<user>[:<password>]@]<hostname>[:<port>][:][/]<path>[#<commit-ish> | #semver:<semver>]
```
<protocol>是git, git+ssh, git+http, git+https 或者 git+file中的一种.
如果提供了#<commit-ish>，则克隆某一次的提交；如果commit-ish是#semver:<semver>这种格式，那么
<semver>可以是任何semver范围中有效的值或者是确切的版本，npm将会寻找远端仓库中符合范围的任何tags或者refs，就像注册表依赖项一样
例如
```js
git+ssh://git@github.com:npm/npm.git#v1.0.27
git+ssh://git@github.com:npm/npm#semver:^5.0
git+https://isaacs@github.com/npm/npm.git
git://github.com/npm/npm.git#v1.0.27
```
#### GitHub URLs
从npm1.1.65以后，你可以使用"foo": "user/foo-project"这种格式来指向GitHub，就像git URLs,可以跟一个hash值，例如
```js
{
  "name": "foo",
  "version": "0.0.0",
  "dependencies": {
    "express": "expressjs/express",
    "mocha": "mochajs/mocha#4727d357ea",
    "module": "user/repo#feature\/branch"
  }
}
```
#### Local Paths
npm2.0.0版本以上可以提供一个本地路径来安装一个本地的模块，通过npm install xxx --save 来安装，格式如下：
```js
../foo/bar
~/foo/bar
./foo/bar
/foo/bar
```
在package.json中会生成一下格式：
```js
{
  "name": "baz",
  "dependencies": {
    "bar": "file:../foo/bar"
  }
}
```
## devDependencies
如果别人只想使用你的模块，而不需要开发和测试所需要的依赖的时候，这种情况下可以将开发测试依赖的包，写到devDependencies中。
这些模块会在npm link或者npm install的时候被安装，也可以像其他npm配置一样被管理，详见npm的[config文档](https://docs.npmjs.com/misc/config)。
对于一些跨平台的构建任务，例如把CoffeeScript编译成JavaScript，就可以通过在package.json的script属性里边配置prepare脚本来完成这个任务，
然后需要依赖的coffee-script模块就写在devDependencies属性中。
例如:
```js
{ "name": "ethopia-waza",
  "description": "a delightfully fruity coffee varietal",
  "version": "1.2.3",
  "devDependencies": {
    "coffee-script": "~1.6.3"
  },
  "scripts": {
    "prepare": "coffee -o lib/ -c src/waza.coffee"
  },
  "main": "lib/waza.js"
}
```
prepare脚本会在publishing前运行，这样用户就不用自己去require来编译就能使用。并且在开发模式中（比如本地运行npm install）会运行这个脚本以便更好地测试。
## peerDependencies
通常是在插件开发的场景下，你的插件需要某些依赖的支持，但是你又没必要去安装，因为插件的宿主会去安装这些依赖，你就可以用peerDependencies去声明一下需要依赖的插件和版本，
如果出问题npm就会有警告来提醒使用者去解决版本冲突问题，例如
```js
{
  "name": "tea-latte",
  "version": "1.3.5",
  "peerDependencies": {
    "tea": "2.x"
  }
}
```
这样会确保你的包tea-latte会和tea2.x一起安装，执行npm install tea-latte会得到下面的依赖图
#### 注意
在dependency没有明确指明需要更高的版本是，npm1和2会自动安装peerDependencies，而在npm3中只会给出警告（peerDependency未被安装）
```js
├── tea-latte@1.3.5
└── tea@2.2.0
```
这个配置的目的是让npm知道，如果要使用此插件模块，请确保安装了兼容版本的宿主模块。
## bundledDependencies
指定发布的时候会被一起打包的模块,例如指定
```js
{
  "name": "awesome-web-framework",
  "version": "1.0.0",
  "bundledDependencies": [
    "renderized", "super-streams"
  ]
}
```
当运行npm pack之后，将会得到awesome-web-framework-1.0.0.tgz，这个文件将包括依赖renderized and super-streams，而且在执行npm install awesome-web-framework-1.0.0.tgz时，
这两个依赖也会被安装。
## optionalDependencies
如果一个依赖模块可以被使用， 但你也希望在该模块找不到或无法获取时npm不中断运行，你可以把这个模块依赖放到optionalDependencies配置中。这个配置的写法和dependencies的写法一样，
不同的是这里边写的模块安装失败不会导致npm install失败。但是需要自己处理模块缺失的情况，例如：
```js
try {
  var foo = require('foo')
  var fooVersion = require('foo/package.json').version
} catch (er) {
  foo = null
}
if ( notGoodFooVersion(fooVersion) ) {
  foo = null
}

// .. then later in your program ..

if (foo) {
  foo.doFooThings()
}

```
optionalDependencies 中的配置会覆盖dependencies中同名的配置，最好只在一个地方写
## engines
你可以指定项目的node的版本，
```js
{ "engines" : { "node" : ">=0.10.3 <0.12" } }
```
和dependencies一样，如果你不指定版本范围或者指定为*，任何版本的node都可以。
也可以指定一些npm版本可以正确的安装你的模块，例如：
```js
{ "engines" : { "npm" : "~1.0.20" } }
```
记住，除非用户设置engine-strict标记，否则这个字段只是建议值。
## engineStrict
在npm3.0.0中被移除
## os
指定你的模块在哪个操作系统执行
```js
"os" : [ "darwin", "linux" ]
```
你也可以用黑名单的形式(!)
```js
"os" : [ "!win32" ]
```
os通过process.platform判断
## cpu
如果你的模块只能在某些架构的cpu上使用，你可以指定它们
```js
"cpu" : [ "x64", "ia32" ]
```
或者使用黑名单的形式(!)
```js
"cpu" : [ "!arm", "!mips" ]
```
cpu架构通过 process.arch 判断
## preferGlobal
出发npm warning，已经不建议使用
## private
如果这个属性被设置为true，npm将不会发布它。
这是为了防止一个私有模块被无意间发布出去。
如果你想让模块被发布到一个特定的npm仓库，如一个内部的仓库，可在下面的publishConfig中配置仓库参数。
## publishConfig
这是一个在publish-time时会用到的配置，专门用来设置tag、registry或access，来确保一个特定的package
未被标记'lastest'，具体参见[npm-config](https://docs.npmjs.com/misc/config)



## 参考
[package.json](https://docs.npmjs.com/files/package.json)<br>
[语义化版本 2.0.0](https://semver.org/lang/zh-CN/)<br>
[semer](https://docs.npmjs.com/misc/semver)<br>
[npm-scripts](https://docs.npmjs.com/misc/scripts)<br>
[如何使用package.json文件](https://segmentfault.com/a/1190000007777410)<br>
[npm package.json属性详解](http://www.cnblogs.com/tzyy/p/5193811.html)<br>
[package.json文件](http://javascript.ruanyifeng.com/nodejs/packagejson.html#toc3)<br>
[pkg.module](https://github.com/rollup/rollup/wiki/pkg.module)<br>
