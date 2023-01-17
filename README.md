# student_elective_system_server

# 学生网上自主选课系统

> 服务端

## 系统简介

学生网上自主选课系统是一个前后端分离的学生选课系统, 项目采用 Egg.js + Vue.js 框架进行 开发。旨在实现一个学生能够在网上自主选课（选修课）的微系统。该系统分为三个角色：管理员, 学生, 教师；每一个角色的权限不同, 待操作项不同, 其中管理员能够对用户（学生、教师）和课程、专业、院系等信息进行增删改查；学生能进行选课、退选、查看成绩等操作；教师能够对学生的成绩进行评定, 能够查询到学生的选课状况等操作。

## 特色

- 前后端分离
- MVVM 模式、MVC 模式
- 前端采用最新的前端开发框架 Vue.js、Webpack 构建技术
- UI 框架采用 [Ant-Design-Vue](https://vuecomponent.github.io/ant-design-vue/docs/vue/introduce-cn/)
- 后端采用 egg.js 框架、Webpack 构建技术来构建一个 API 服务
- 跨域身份验证采用 JWT（JSON Web Token）
- API 接口规范遵守 RESTful 定义的规范
- 数据库采用 MySQL 数据库
- 采用 AJAX 异步请求方案
- 是一个 PC 端的 WEB 应用
- 分布式版本控制采用 Git
- 单元测试（目前只覆盖 GET 接口, PS：单元测试将临时关闭权限验证）

## 技术栈

- Vue.js
- Vuex.js
- Vue-Router.js
- axios.js
- Egg.js
- MySQL
- JSON Web Token
- Node.js
- Git
- Mockjs

## E-R

### E-R 完整版

![E-R_full](https://github.com/vxhly/egg-server/blob/master/.github/img/E-R_full.png)

### E-R Mini 版

![E-R_mini](https://github.com/vxhly/egg-server/blob/master/.github/img/E-R_mini.png)

## 系统功能结构图

### 系统功能结构图

![系统功能结构图](https://github.com/vxhly/egg-server/blob/master/.github/img/系统功能结构图.png)

## 用例图和数据流图

### ADMIN 权限用户登录之后能够进行的操作

`用例图`

![ADMIN](https://github.com/vxhly/egg-server/blob/master/.github/img/ADMIN.png)

`数据流图`

![ADMIN](https://github.com/vxhly/egg-server/blob/master/.github/img/ADMIN数据流图.png)


### STUDENT 权限用户登录之后能够进行的操作

`用例图`

![STUDENT](https://github.com/vxhly/egg-server/blob/master/.github/img/STUDENT.png)

`数据流图`

![STUDENT](https://github.com/vxhly/egg-server/blob/master/.github/img/STUDENT数据流图.png)

### TEACHER 权限用户登录之后能够进行的操作

`用例图`

![TEACHER](https://github.com/vxhly/egg-server/blob/master/.github/img/TEACHER.png)

`数据流图`

![TEACHER](https://github.com/vxhly/egg-server/blob/master/.github/img/TEACHER数据流图.png)

## 表结构

### 管理员表（admin)

![E-R-admin](https://github.com/vxhly/egg-server/blob/master/.github/img/E-R-admin.png)

| 列名       | 类型         | 说明         | 备注                                                |
|------------|--------------|------------|-----------------------------------------------------|
| id         | int          | 自增长ID     | 主键, AUTO_INCREMENT                                |
| account    | varchar(20)  | 管理员账号   | 唯一值,长度5~20                                     |
| user_name  | varchar(10)  | 管理员用户名 | 长度5~10                                            |
| pwd        | varchar(255) | 登录密码     |                                                     |
| auth_token | text         | 登录令牌     | 允许空                                              |
| login_time | datetime     | 登录时间     | 允许空                                              |
| login_ip   | varchar(20)  | 登录 IP      | 允许空                                              |
| role       | varchar(10)  | 角色         | 默认值'ADMIN', 有效值：'ADMIN', 'STUDENT', 'TEACHER' |
| created_at | datetime     | 创建时间     |                                                     |
| updated_at | datetime     | 更新时间     |                                                     |
| deleted_at | datetime     | 删除时间     | 允许空                                              |

### 课程表（course）

![E-R-course](https://github.com/vxhly/egg-server/blob/master/.github/img/E-R-course.png)

| 列名       | 类型         | 说明         | 备注                                                          |
|------------|--------------|------------|---------------------------------------------------------------|
| id         | int          | 自增长ID     | 主键, AUTO_INCREMENT                                          |
| c_id       | varchar(20)  | 课程编号     | 唯一值, 长度1~20                                              |
| t_id       | varchar(20)  | 授课教师工号 | 外键, 参考教师表的 t_id                                       |
| c_name     | varchar(30)  | 课程名称     | 长度2~30                                                      |
| c_info     | varchar(255) | 课程介绍     | 允许空, 默认''                                                |
| credit     | double       | 课程学分     | 默认值1.0, 有效值：0.5, 1.0, 1.5, 2.0, 2.5, 3.0, 3.5, 4.0, 4.5 |
| count      | int          | 可供选课人数 | 默认值10, 最小值0, 最大值100                                  |
| current    | int          | 当前被选人数 | 默认值0, 最小值0, 最大值100                                   |
| created_at | datetime     | 创建时间     |                                                               |
| updated_at | datetime     | 更新时间     |                                                               |
| deleted_at | datetime     | 删除时间     | 允许空                                                        |

### 院系表（dept）

![E-R-dept](https://github.com/vxhly/egg-server/blob/master/.github/img/E-R-dept.png)

| 列名       | 类型         | 说明     | 备注                 |
|------------|--------------|--------|----------------------|
| id         | int          | 自增长ID | 主键, AUTO_INCREMENT |
| d_id       | varchar(20)  | 院系编号 | 唯一值, 长度1~20     |
| d_name     | varchar(30)  | 院系名称 | 长度2~30             |
| d_info     | varchar(255) | 院系介绍 | 允许空, 默认''       |
| created_at | datetime     | 创建时间 |                      |
| updated_at | datetime     | 更新时间 |                      |
| deleted_at | datetime     | 删除时间 | 允许空               |

### 专业表（major）

![E-R-major](https://github.com/vxhly/egg-server/blob/master/.github/img/E-R-major.png)

| 列名       | 类型         | 说明     | 备注                    |
|------------|--------------|--------|-------------------------|
| id         | int          | 自增长ID | 主键, AUTO_INCREMENT    |
| m_id       | varchar(20)  | 专业编号 | 唯一值, 长度1~20        |
| d_id       | varchar(20)  | 院系编号 | 外键, 参照院系表的 d_id |
| m_name     | varchar(30)  | 专业名称 | 长度2~30                |
| m_info     | varchar(255) | 专业介绍 | 允许空, 默认''          |
| created_at | datetime     | 创建时间 |                         |
| updated_at | datetime     | 更新时间 |                         |
| deleted_at | datetime     | 删除时间 | 允许空                  |

### 学生表（student）

![E-R-student](https://github.com/vxhly/egg-server/blob/master/.github/img/E-R-student.png)

| 列名       | 类型         | 说明     | 备注                                                  |
|------------|--------------|--------|-------------------------------------------------------|
| id         | int          | 自增长ID | 主键, AUTO_INCREMENT                                  |
| s_id       | varchar(20)  | 学号     | 唯一值, 长度5~20                                      |
| m_id       | varchar(20)  | 专业编号 | 外键, 参照专业表的 m_id                               |
| s_name     | varchar(5)   | 学生姓名 | 长度2~5                                               |
| sex        | varchar(5)   | 性别     | 默认'女', '男'或者'女'                                |
| pwd        | varchar(255) | 登录密码 |                                                       |
| phone      | varchar(20)  | 联系电话 | 默认''                                                |
| auth_token | text         | 登录令牌 | 允许空                                                |
| login_time | datetime     | 登录时间 | 允许空                                                |
| login_ip   | varchar(20)  | 登录 IP  | 允许空                                                |
| role       | varchar(10)  | 角色     | 默认值'STUDENT', 有效值：'ADMIN', 'STUDENT', 'TEACHER' |
| created_at | datetime     | 创建时间 |                                                       |
| updated_at | datetime     | 更新时间 |                                                       |
| deleted_at | datetime     | 删除时间 | 允许空                                                |

### 学生选课表（student_course）

![E-R-student_course](https://github.com/vxhly/egg-server/blob/master/.github/img/E-R-student_course.png)

| 列名         | 类型        | 说明           | 备注                                      |
|--------------|-------------|--------------|-------------------------------------------|
| id           | int         | 自增长ID       | 主键, AUTO_INCREMENT                      |
| s_id         | varchar(20) | 学生学号       | 主键, 外键, 参照学生表的 s_id             |
| c_id         | varchar(20) | 课程编号       | 主键, 外键, 照课程表的 c_id               |
| score        | double      | 成绩           | 默认值0, 最小值0, 最大值100               |
| second_score | double      | 补考成绩       | 默认值0, 最小值0, 最大值100               |
| is_publish   | varchar(3)  | 是否已公布成绩 | 默认值'未公布', 有效值：'已公布', '未公布' |
| created_at   | datetime    | 创建时间       |                                           |
| updated_at   | datetime    | 更新时间       |                                           |
| deleted_at   | datetime    | 删除时间       | 允许空                                    |

### 教师表（teacher）

![E-R-teacher](https://github.com/vxhly/egg-server/blob/master/.github/img/E-R-teacher.png)

| 列名       | 类型         | 说明       | 备注                                                  |
|------------|--------------|----------|-------------------------------------------------------|
| id         | int          | 自增长ID   | 主键, AUTO_INCREMENT                                  |
| t_id       | varchar(20)  | 教师工号   | 唯一值, 长度5~20                                      |
| t_name     | varchar(5)   | 教师姓名   | 长度2~5                                               |
| sex        | varchar(5)   | 性别       | 默认'女', 有效值：'男', '女'                           |
| job        | varchar(5)   | 职称       | 默认'讲师', 有效值：'讲师', '教授', '副教授'           |
| count      | int          | 可供开课数 | 默认值10, 最小值0, 最大值20                           |
| current    | int          | 当前开课数 | 默认值0, 最小值0, 最大值20                            |
| pwd        | varchar(255) | 登录密码   |                                                       |
| phone      | varchar(20)  | 联系电话   | 默认''                                                |
| auth_token | text         | 登录令牌   | 允许空                                                |
| login_time | datetime     | 登录时间   | 允许空                                                |
| login_ip   | varchar(20)  | 登录 IP    | 允许空                                                |
| role       | varchar(10)  | 角色       | 默认值'TEACHER', 有效值：'ADMIN', 'STUDENT', 'TEACHER' |
| created_at | datetime     | 创建时间   |                                                       |
| updated_at | datetime     | 更新时间   |                                                       |
| deleted_at | datetime     | 删除时间   | 允许空                                                |

## QuickStart

<!-- add docs here for user -->

see [egg docs][egg] for more detail.

### 持续化部署

```bash
$ cd design-docker 
$ docker-compose up -d # 确保机子上有装 docker，第一次执行的时候将会下载容器会比较慢
$ cd ../
$ yarn install
$ yarn migrate
$ yarn dev
$ yarn test:data-user
$ yarn test:data
```

### testing

```bash
$ npm run test
```

### Deploy

```bash
$ npm start
$ npm stop
```

### npm scripts

- Use `npm run lint` to check code style.
- Use `npm test` to run unit test.
- Use `npm run autod` to auto detect dependencies upgrade, see [autod](https://www.npmjs.com/package/autod) for more detail.

[egg]: https://eggjs.org