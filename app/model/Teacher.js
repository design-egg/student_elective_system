'use strict';
const moment = require('moment');

module.exports = app => {
  const {
    STRING,
    INTEGER,
    DATE,
    TEXT,
  } = app.Sequelize;
  const Teacher = app.model.define('teacher', {
    id: {
      type: INTEGER,
      comment: '自增长 ID',
      primaryKey: true,
      autoIncrement: true,
    },
    t_id: {
      type: STRING(20),
      comment: '教师工号',
      allowNull: false,
      unique: {
        msg: '教师工号不允许重复',
      },
      len: [ 5, 20 ],
    },
    t_name: {
      type: STRING(5),
      comment: '教师姓名',
      allowNull: false,
      len: [ 2, 5 ],
    },
    sex: {
      type: STRING(5),
      comment: '性别',
      allowNull: false,
      defaultValue: '女',
      isIn: [
        [ '男', '女' ],
      ],
    },
    job: {
      type: STRING(5),
      comment: '职称',
      defaultValue: '讲师',
      isIn: [
        [ '副教授', '教授', '讲师' ],
      ],
    },
    count: {
      type: INTEGER,
      comment: '可供开课数',
      allowNull: false,
      defaultValue: 20,
      min: 0,
      max: 20,
    },
    current: {
      type: INTEGER,
      comment: '已开课数',
      allowNull: false,
      defaultValue: 0,
      min: 0,
      max: 20,
    },
    pwd: {
      type: STRING(255),
      comment: '登录密码',
      allowNull: false,
    },
    phone: {
      type: STRING(20),
      comment: '联系电话',
      defaultValue: '',
    },
    auth_token: {
      type: TEXT,
      comment: '登录令牌',
    },
    login_time: {
      type: DATE,
      comment: '登录时间',
      get() {
        return this.getDataValue('login_time') ? moment(this.getDataValue('login_time')).format('YYYY-MM-DD HH:MM:SS') : '';
      },
    },
    login_ip: {
      type: STRING(20),
      comment: '登录 IP',
    },
    role: {
      type: STRING(10),
      comment: '角色',
      allowNull: false,
      defaultValue: 'TEACHER',
      isIn: [
        [ 'ADMIN', 'STUDENT', 'TEACHER' ],
      ],
    },
  }, {
    freezeTableName: true, // 自定义表名
    tableName: 'teacher', // 定义表名
    timestamps: true, // 添加时间戳属性 (updatedAt, createdAt)
    paranoid: true, // 不从数据库中删除数据，而只是增加一个 deletedAt 标识当前时间
    charset: 'utf8',
    collate: 'utf8_general_ci',
  });

  Teacher.associate = () => {
    Teacher.hasMany(app.model.Course, {
      foreignKey: 't_id',
      targetKey: 't_id',
    });
  };

  return Teacher;
};
