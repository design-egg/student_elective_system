'use strict';

module.exports = app => {
  const {
    STRING,
    INTEGER,
    DOUBLE,
    INITIALLY_IMMEDIATE,
  } = app.Sequelize;
  const Course = app.model.define('course', {
    id: {
      type: INTEGER,
      comment: '自增长 ID',
      primaryKey: true,
      autoIncrement: true,
    },
    c_id: {
      type: STRING(20),
      comment: '课程编号',
      allowNull: false,
      unique: {
        msg: '课程编号不允许重复',
      },
      len: [ 1, 20 ],
    },
    t_id: {
      type: STRING(20),
      comment: '教师工号',
      allowNull: false,
      references: {
        model: app.model.Teacher,
        key: 't_id',
        deferrtable: INITIALLY_IMMEDIATE,
      },
    },
    c_name: {
      type: STRING(30),
      comment: '课程名称',
      allowNull: false,
      len: [ 2, 30 ],
    },
    c_info: {
      type: STRING(255),
      comment: '课程介绍',
    },
    credit: {
      type: DOUBLE,
      comment: '课程学分',
      allowNull: false,
      defaultValue: 1.0,
      min: 0.5,
      max: 4.5,
      isIn: [
        [ 0.5, 1.0, 1.5, 2.0, 2.5, 3.0, 3.5, 4.0, 4.5 ],
      ],
    },
    count: {
      type: INTEGER,
      comment: '可供选课人数',
      allowNull: false,
      defaultValue: 10,
      min: 0,
      max: 100,
    },
    current: {
      type: INTEGER,
      comment: '当前被选人数',
      allowNull: false,
      defaultValue: 0,
      min: 0,
      max: 100,
    },
  }, {
    freezeTableName: true, // 自定义表名
    tableName: 'course', // 定义表名
    timestamps: true, // 添加时间戳属性 (updatedAt, createdAt)
    paranoid: true, // 不从数据库中删除数据，而只是增加一个 deletedAt 标识当前时间
    charset: 'utf8',
    collate: 'utf8_general_ci',
  });

  Course.associate = () => {
    Course.hasMany(app.model.StudentCourse, {
      foreignKey: 'c_id',
      targetKey: 'c_id',
    });

    Course.belongsTo(app.model.Teacher, {
      foreignKey: 't_id',
      targetKey: 't_id',
    });
  };

  return Course;
};
