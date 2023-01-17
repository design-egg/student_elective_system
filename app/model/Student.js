'use strict';
const moment = require('moment');

module.exports = app => {
  const {
    STRING,
    INTEGER,
    DATE,
    TEXT,
    INITIALLY_IMMEDIATE,
  } = app.Sequelize;
  const Student = app.model.define('student', {
    id: {
      type: INTEGER,
      comment: '自增长 ID',
      primaryKey: true,
      autoIncrement: true,
    },
    s_id: {
      type: STRING(20),
      comment: '学号',
      allowNull: false,
      unique: {
        msg: '学号不允许重复',
      },
      len: [ 5, 20 ],
    },
    m_id: {
      type: STRING(20),
      comment: '专业编号',
      allowNull: false,
      references: {
        model: app.model.Major,
        key: 'm_id',
        deferrable: INITIALLY_IMMEDIATE,
      },
    },
    s_name: {
      type: STRING(5),
      comment: '学生姓名',
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
      ], // 只能是数组中的任意一个值
    },
    pwd: {
      type: STRING(255),
      comment: '登录密码',
      allowNull: false,
    },
    phone: {
      type: STRING(255),
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
      defaultValue: 'STUDENT',
      isIn: [
        [ 'ADMIN', 'STUDENT', 'TEACHER' ],
      ], // 只能是数组中的任意一个值
    },
  }, {
    freezeTableName: true, // 自定义表名
    tableName: 'student', // 定义表名
    timestamps: true, // 添加时间戳属性 (updatedAt, createdAt)
    paranoid: true, // 不从数据库中删除数据，而只是增加一个 deletedAt 标识当前时间
    charset: 'utf8',
    collate: 'utf8_general_ci',
  });

  Student.associate = () => {
    Student.belongsTo(app.model.Major, {
      foreignKey: 'm_id',
      targetKey: 'm_id',
    });

    Student.hasMany(app.model.StudentCourse, {
      foreignKey: 's_id',
      targetKey: 's_id',
    });
  };

  return Student;
};
