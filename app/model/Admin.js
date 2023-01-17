'use strict';

module.exports = app => {
  const {
    STRING,
    INTEGER,
    DATE,
    TEXT,
  } = app.Sequelize;
  const Admin = app.model.define('admin', {
    id: {
      type: INTEGER,
      comment: '自增长 ID',
      primaryKey: true,
      autoIncrement: true,
    },
    account: {
      type: STRING(20),
      comment: '管理员账号',
      allowNull: false,
      unique: {
        msg: '管理员账号不允许重复',
      },
      len: [ 5, 20 ],
    },
    user_name: {
      type: STRING(10),
      comment: '管理员用户名',
      allowNull: false,
      len: [ 2, 10 ],
    },
    pwd: {
      type: STRING(255),
      comment: '登录密码',
      allowNull: false,
    },
    auth_token: {
      type: TEXT,
      comment: '登录令牌',
    },
    login_time: {
      type: DATE,
      comment: '登录时间',
    },
    login_ip: {
      type: STRING(20),
      comment: '登录 IP',
    },
    role: {
      type: STRING(10),
      comment: '角色',
      allowNull: false,
      defaultValue: 'ADMIN',
      isIn: [
        [ 'ADMIN', 'STUDENT', 'TEACHER' ],
      ], // 只能是数组中的任意一个值
    },
  }, {
    freezeTableName: true, // 自定义表名
    tableName: 'admin', // 定义表名
    timestamps: true, // 添加时间戳属性 (updatedAt, createdAt)
    paranoid: true, // 不从数据库中删除数据，而只是增加一个 deletedAt 标识当前时间
    charset: 'utf8',
    collate: 'utf8_general_ci',
  });

  return Admin;
};
