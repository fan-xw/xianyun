# PAGES

This directory contains your Application Views and Routes.
The framework reads all the `*.vue` files inside this directory and creates the router of your application.
这个框架会读取 pages 目录下面的所有 .vue 文件，并且自动创建路由，根据以下标准
1.任何文件和文件夹都会形成一个路由 pages/user/login.vue 会自动形成一个 path: '/user/login' 路由
2.如果是 index.vue 文件，那么自动将当前目录创建成路由，省略 index, pages/index.vue 会生成 path:'/',
pages/air/index.vue 湖生成一个 path:'/air'

More information about the usage of this directory in [the documentation](https://nuxtjs.org/guide/routing).
