## [0.2.2](https://github.com/vxhly/student_elective_system_server/compare/v0.2.1...v0.2.2) (2019-02-18)


### Features

* **swagger:** 添加 swagger 简易文档 ([cf88a53](https://github.com/vxhly/student_elective_system_server/commit/cf88a53))
* **swagger:** 添加swagger部分信息 ([97e2800](https://github.com/vxhly/student_elective_system_server/commit/97e2800))



## [0.2.1](https://github.com/vxhly/student_elective_system_server/compare/v0.2.0...v0.2.1) (2019-02-16)


### Bug Fixes

* **rule:** 修改422报错描述 ([f52fc41](https://github.com/vxhly/student_elective_system_server/commit/f52fc41))
* **service:** 修复部分数据返回错误 ([54c737f](https://github.com/vxhly/student_elective_system_server/commit/54c737f))



# [0.2.0](https://github.com/vxhly/student_elective_system_server/compare/81b373b...v0.2.0) (2019-02-14)


### Bug Fixes

* **app/controller/dept.js:** 修复部分问题 ([a4dd65a](https://github.com/vxhly/student_elective_system_server/commit/a4dd65a))
* **app/model/:** 修复模型的返回数据 ([126dd51](https://github.com/vxhly/student_elective_system_server/commit/126dd51))
* **controller/user.js:** 修复部分问题，包含用户信息的修改 ([de023b2](https://github.com/vxhly/student_elective_system_server/commit/de023b2))
* **status:** 修复错误 ([a929dbd](https://github.com/vxhly/student_elective_system_server/commit/a929dbd))
* **studentCourse:** 教师的账号只能查看自己的学生选修课情况，并且对其进行成绩的修改 ([bf5c988](https://github.com/vxhly/student_elective_system_server/commit/bf5c988))
* **studentCourse.add:** 修复选修的验证 ([cdd833e](https://github.com/vxhly/student_elective_system_server/commit/cdd833e))
* **StudentCourseController:** 修复部分错误 ([8974d89](https://github.com/vxhly/student_elective_system_server/commit/8974d89))
* **StudentCourseController.add:** 修复 ADMIN 不能修改发布状态bug ([639a721](https://github.com/vxhly/student_elective_system_server/commit/639a721))


### Features

* **/student-course/:** 添加课程的介绍 ([f07ec39](https://github.com/vxhly/student_elective_system_server/commit/f07ec39))
* **add student:** 新增一条学生信息的记录 ([85e7acd](https://github.com/vxhly/student_elective_system_server/commit/85e7acd))
* **admin AdminController.add AdminService.addAdmin:** 重写添加管理员方法 ([6c02373](https://github.com/vxhly/student_elective_system_server/commit/6c02373))
* **admin login:** 实现管理员登录 ([88d7c89](https://github.com/vxhly/student_elective_system_server/commit/88d7c89))
* **AdminController.getByAccount:** 添加获取管理员信息的接口，接口权限ADMIN ([8d34921](https://github.com/vxhly/student_elective_system_server/commit/8d34921))
* **AdminController.resetPwd:** 修改 admin 的密码 ([23f8cc7](https://github.com/vxhly/student_elective_system_server/commit/23f8cc7))
* **AdminController.update LoginController.index:** 完成 admin 登录验证,jwt 验证,admin 用户信息的更新 ([09bf8aa](https://github.com/vxhly/student_elective_system_server/commit/09bf8aa))
* **AdminService.findAllAdmin:** 查找所有的 admin 用户 ([b01490e](https://github.com/vxhly/student_elective_system_server/commit/b01490e))
* **app/controller/teacher.js:** 修复接口中的错误 ([54b441a](https://github.com/vxhly/student_elective_system_server/commit/54b441a))
* **bcrypt:** login 密码采用 bcrypt 加密算法 ([af3eb59](https://github.com/vxhly/student_elective_system_server/commit/af3eb59))
* **center -> destroy:** 各个管理中心的批量删除接口（实际上是修改 	deleted_at 的时间） ([d707570](https://github.com/vxhly/student_elective_system_server/commit/d707570))
* **check_rule.checkRule:** 接口验证权限中间件 ([7a079e6](https://github.com/vxhly/student_elective_system_server/commit/7a079e6))
* **config(mysql):** 配置 MySQL,生成建库建表 sql 语句 ([81b373b](https://github.com/vxhly/student_elective_system_server/commit/81b373b))
* **controller/admin:** 添加 admin ,统一错误处理, 跨域, ([fd04f72](https://github.com/vxhly/student_elective_system_server/commit/fd04f72))
* **CourseController.add:** 教师开课数的验证 ([88e97ed](https://github.com/vxhly/student_elective_system_server/commit/88e97ed))
* **CourseController.all model.Course CourseService.findAllCourse:** 查询所有的课程 ([d08ee5a](https://github.com/vxhly/student_elective_system_server/commit/d08ee5a))
* **CourseController.getById DeptController.getById:** 根据课程编号获取课程信息,根据院系编号获取院系信息 ([8e2888e](https://github.com/vxhly/student_elective_system_server/commit/8e2888e))
* **CourseController.update:** 更新课程信息 ([0e5315f](https://github.com/vxhly/student_elective_system_server/commit/0e5315f))
* **DeptController.add model.Dept DeptService.addDept:** 添加一条院系信息 ([1fc908d](https://github.com/vxhly/student_elective_system_server/commit/1fc908d))
* **DeptController.all:** 获取所有的院系信息添加url请求参数 name ([e3ad649](https://github.com/vxhly/student_elective_system_server/commit/e3ad649))
* **DeptController.delete:** 批量删除 ([47d3d96](https://github.com/vxhly/student_elective_system_server/commit/47d3d96))
* **DeptController.update AdminService.findAllAdmin DeptService.findAllDept:** 更新院系信息,, admin\dept 分 ([43abac2](https://github.com/vxhly/student_elective_system_server/commit/43abac2))
* **DeptService.findAllDept AdminService.findAllAdmin:** 查询所有的院系,修复分页 bug ([d60af35](https://github.com/vxhly/student_elective_system_server/commit/d60af35))
* **error_handler.errorHandler:** 404 拦截返回信息 ([42bad89](https://github.com/vxhly/student_elective_system_server/commit/42bad89))
* **helper verifyToken:** 更严格的接口权限验证,解决重新登录的时候未过期的token还是可以用以接口访问 ([3cab867](https://github.com/vxhly/student_elective_system_server/commit/3cab867))
* **helper.setScore:** 学生账号不能看未发布的成绩，将其设置成 0 ([16ff3d2](https://github.com/vxhly/student_elective_system_server/commit/16ff3d2))
* **jwt:** json wen token ([7b8b822](https://github.com/vxhly/student_elective_system_server/commit/7b8b822))
* **MajorController.all:** 获取所有的专业信息添加url请求参数 name ([4b303e0](https://github.com/vxhly/student_elective_system_server/commit/4b303e0))
* **MajorService.findAllMajor:** 关联查询,关联表 dept ([7040279](https://github.com/vxhly/student_elective_system_server/commit/7040279))
* **model.Admin:** 修改字段,相应的代码进行修改 ([7204895](https://github.com/vxhly/student_elective_system_server/commit/7204895))
* **model.Admin:** 设置 Pwd,CreateTime,UpdateTime 字段不可查看 ([dd769b1](https://github.com/vxhly/student_elective_system_server/commit/dd769b1))
* **model.Teacher service.TeacherService:** 教师的 CURD 接口 ([af491bc](https://github.com/vxhly/student_elective_system_server/commit/af491bc))
* **model/admin:** admin 数据模型 ([17e3d9a](https://github.com/vxhly/student_elective_system_server/commit/17e3d9a))
* **sequelize:** 数据库 OEM 的配置 ([fe57ccb](https://github.com/vxhly/student_elective_system_server/commit/fe57ccb))
* **sequelize(admin dept major student teacher course student_course):** 更新数据迁移文件 ([752ba87](https://github.com/vxhly/student_elective_system_server/commit/752ba87))
* **sequelize(admin,dept,major):** 数据迁移,major 添加(外键 dept.d_id) ([130ff01](https://github.com/vxhly/student_elective_system_server/commit/130ff01))
* **student:** 查询所有的学生以及该学生对应的专业 ([862a302](https://github.com/vxhly/student_elective_system_server/commit/862a302))
* **student login:** 以学生身份进行登录操作 ([5e00587](https://github.com/vxhly/student_elective_system_server/commit/5e00587))
* **StudentController.update:** 更新学生的个人信息，更新专业的信息 ([e267813](https://github.com/vxhly/student_elective_system_server/commit/e267813))
* **StudentCourse.js:** 学生选课的简单操作 ([88fc35d](https://github.com/vxhly/student_elective_system_server/commit/88fc35d))
* **StudentCourseController.all StudentCourseController.add:** 学生选课信息表的操作 获取所有的选课信息 添加一条选课信息 ([860b5d7](https://github.com/vxhly/student_elective_system_server/commit/860b5d7))
* **StudentCourseController.destroy:** 新增学生选课的退选 ([ad7e3e1](https://github.com/vxhly/student_elective_system_server/commit/ad7e3e1))
* **StudentCourseService.findAllStudentCourse:** 添加是否通过查询，根据课程名模糊匹配，根据是否已发布成绩匹配 ([363587f](https://github.com/vxhly/student_elective_system_server/commit/363587f))
* **TeacherController.all TeacherController.add TeacherController.getById:** 教师的 API接口 ([0493f67](https://github.com/vxhly/student_elective_system_server/commit/0493f67))
* **test/app/test_data:** 批量数据导入测试 ([2fbb9df](https://github.com/vxhly/student_elective_system_server/commit/2fbb9df))
* **UserController.current:** 查询 admin 用户的个人信息 ([36e6e13](https://github.com/vxhly/student_elective_system_server/commit/36e6e13))
* **UserController.current:** 获取个人信息，学生可以获取到自己是哪一个专业 ([87b1240](https://github.com/vxhly/student_elective_system_server/commit/87b1240))
* **UserController.current:** 获取教师的个人信息 ([bf60ccd](https://github.com/vxhly/student_elective_system_server/commit/bf60ccd))
* **UserController.restPwd:** 更新用户密码（管理员、学生、教师） ([3d826a7](https://github.com/vxhly/student_elective_system_server/commit/3d826a7))
* **UserController.update:** 更新用户信息（学生） ([6a75575](https://github.com/vxhly/student_elective_system_server/commit/6a75575))
* **UserController.update:** 更新用户信息通用接口 ([f4c7bdd](https://github.com/vxhly/student_elective_system_server/commit/f4c7bdd))
* **新增字段 deleted_at:** deleted_at 用于软删除，数据不会真正从数据库中删除，只是增加一个 deleted_at 标识当前删除时间 ([7b8f15e](https://github.com/vxhly/student_elective_system_server/commit/7b8f15e))


### Performance Improvements

* **app/router.js:** 修改路由 ([aa5be19](https://github.com/vxhly/student_elective_system_server/commit/aa5be19))
* **app/router.js:** 路由文件的修改 ([edbac79](https://github.com/vxhly/student_elective_system_server/commit/edbac79))
* **current:** 修正分页参数，当前页 current，一页多少条 pageSize ([30125f3](https://github.com/vxhly/student_elective_system_server/commit/30125f3))
* **database:** 修改部分的 model 定义，相关说明见 README ([d246962](https://github.com/vxhly/student_elective_system_server/commit/d246962))
* **pageSize:** 分页，默认一页 10 条 ([ae151b7](https://github.com/vxhly/student_elective_system_server/commit/ae151b7))
* **router.js:** 修改部分 API 路由的权限 ([22d17eb](https://github.com/vxhly/student_elective_system_server/commit/22d17eb))
* **Service:** 修正 Service 层的返回 ([a531474](https://github.com/vxhly/student_elective_system_server/commit/a531474))



