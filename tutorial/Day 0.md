# Day 0: 项目背景及技术栈介绍
本项目是一个计算机领域公开课点评网站，旨在帮助用户了解、交流计算机领域优秀公开课程，提供了课程检索、用户评分等功能。

整个项目需要读者实现前端界面和后端接口；了解数据库的基本使用和概念；学习如何利用公有云资源部署前后端应用和数据库。

整个项目将托管在 github 上，需要用户了解 git 的基本操作。

## 前端和后端
首先阐述前端和后端的区别，这里的前后端针对的是互联网应用的范畴。

简单来说，前端就是互联网应用中和用户直接交互的部分；后端则是处理互联网应用中和数据相关的部分。
以本项目中的课程展示为例。我们需要提供一个浏览器可访问的课程列表页面，可能还需要支持排序、检索等功能，其交互逻辑和展示页面都属于前端的范畴。

而页面中的数据通常不是写死在静态页面里的，而是通过调用服务端接口获得的；这样网站的提供者和用户就可以动态地修改或获取前端页面所需要的数据。这里我们所需要实现的提供数据的服务和接口就属于后端的范畴。

后端的数据通常则需要存储在数据库中。

## 技术栈详解

### 前端

1. React
React 是目前主流的两大前端开发框架之一，起源于Facebook的内部项目，于2013年开源；。（另一款流行的前端框架是 Vue.js 作者是尤雨溪）。

React 采用了声明式的设计；开发者维护复杂的业务逻辑时，可以为每个页面设计一套数据模型（状态），将用户的交互转化为对数据模型的修改，React 框架则会根据状态的变化自动更新渲染前端组件。

React 也是组件化的。可以将复杂页面拆成多个独立、状态自治的封装组件，从而更好地复用代码，降低开发成本。组件和组件之间可以通过状态传递进行通信。

React 的组件现在充满了函数式编程的影子。

React 性能很好。虚拟 DOM 的机制极大地减少浏览器对 DOM 渲染的开销。

2. React Hook
React Hook 是 React 16.8 提供的特性；现在已经是 React 状态管理的事实标准之一。使用 React 函数组件替代 React Class，移除了 Class 中的 state；使得复用组件之间的状态逻辑变得更容易；本项目中将全部使用 React Hook 进行开发。

3. TypeScript
TypeScript 是微软开发的开源编程语言，在 JavaScript 基础上提供了静态类型的功能。通过使用 TypeScript，前端工程师更加可以体会面向接口编程的概念，将模块之间的边界定义的更清楚，结合静态类型带来的语法检查和更强的抽象能力，可以大大提高开发效率。

### 后端
1. Node.js
底层基于 Chrome V8 引擎，使用事件驱动模型的 JS 运行时；使得开发者可以使用 JS 进行高性能后端服务的开发。

2. Express.js
主流的 Node.js 后端服务框架之一；采用了 MVC 架构 (Model-View-Controller)，不过我们将只用 Express.js 提供服务接口，不用其展示页面。

3. MongoDB
一个文档型数据库（与之相对的概念通常包括关系型数据库，PostgreSQL 就是一款经典且流行的关系型数据库），配合 Node.js 开发非常方便。

Mongoose 是一个 MongoDB 的 ORM 库，使得开发者可以很方便的通过 Node.js 操作 MongoDB。

4. OAuth
一种安全开放的第三方授权的方案。在本项目中，我们不自己提供完整的用户鉴权系统，而是通过 github 第三方登录的方式为用户身份进行校验并获取基本的用户信息。这背后就需要用到 OAuth 协议。

### git
主流的版本管理工具；建议掌握基本的 git 使用方法。

*以上内容都会在后续开发过程中具体展开讲解*

## 环境配置（Mac）

### brew 安装
brew 是 mac 上最流行的包管理器。我们后续所需要的大部分工具都将通过 brew 安装。

执行下述命令即可安装。
```
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install.sh)"
```

如有网络问题，可以考虑换国内镜像。

### git
```
brew install git
```

### Node.js 环境
安装 node.js 时也会同时安装 node.js 的包管理工具， npm。 我们可以用它来安装其他 node.js 的库。
```
brew install node
```

运行 node -v 可查看版本，返回正确版本说明安装成功。
```
$ node -v
v17.8.0
```

为了加速 npm 访问速度，我们可以切换到国内源。一种最简单的方式是直接安装 `cnpm` 包，默认会访问淘宝的镜像。
```
npm install -g cnpm
```
之后在命令行中使用 cnpm 替代所有的 npm 即可。

### 后端相关

首先安装 express-generator；用于初始化 express 项目。
```
sudo npm install express-generator -g
```

此后，我们就可以利用该工具在项目路径下初始化我们的后端服务，并在进入`backend`目录后，安装应用依赖。
```
express --no-view backend
cd backend
npm install
```
这里要选择 --no-view 参数，因为我们不希望渲染出前端页面模板。

之后，我们就可以尝试启动项目了。
```
DEBUG=backend npm start
```

然后安装生产环境部署所需要的 node 进程管理工具，可简化后端服务所需的自动重启、监控等任务，用于减少运维的成本。其具体作用我们后续展开讲解。
```
sudo npm install -g pm2
```

最后，我们需要安装 MongoDB 数据库，用于存放我们的业务数据。
```
brew tap mongodb/brew
brew update

brew install mongodb-community@6.0
```
安装 mongodb 6.0 社区版之后，我们在 Mac 上拥有了 mongod 服务软件和 mongosh 终端。

### 前端相关
由于我们已经安装了 node 和 npm，前端环境的配置会更简单一些。

和后端一样，我们选择直接利用脚手架工具生成前端项目代码。 create-react-app 则是 react 官方提供的 react 项目脚手架，可以快速创建前端项目。
```
cnpm install -g create-react-app
```

安装完毕后初始化项目
```
create-react-app frontend
```

项目初始化完毕，安装依赖并尝试启动项目
```
cd frontend
npm install
npm start
```
如果浏览器弹出（或手动打开），访问 `localhost:3000` 看到 react 欢迎页，说明 react 开发环境搭建完成。

至此，全部开发环境搭建完成。


