'use strict';

module.exports = app => {
  const {
    STRING,
    INTEGER,
    DOUBLE,
    INITIALLY_IMMEDIATE,
  } = app.Sequelize;
  const StudentCourse = app.model.define('student_course', {
    id: {
      type: INTEGER,
      comment: '自增长 ID',
      primaryKey: true,
      autoIncrement: true,
    },
    s_id: {
      type: STRING(20),
      comment: '学号',
      primaryKey: true,
      allowNull: false,
      references: {
        model: app.model.Student,
        key: 's_id',
        deferrable: INITIALLY_IMMEDIATE,
      },
    },
    c_id: {
      type: STRING(20),
      comment: '课程编号',
      primaryKey: true,
      references: {
        model: app.model.Course,
        key: 'c_id',
        deferrable: INITIALLY_IMMEDIATE,
      },
    },
    score: {
      type: DOUBLE,
      comment: '课程成绩',
      allowNull: false,
      defaultValue: 0,
      min: 0,
      max: 100,
    },
    second_score: {
      type: DOUBLE,
      comment: '补考成绩',
      allowNull: false,
      defaultValue: 0,
      min: 0,
      max: 100,
    },
    is_publish: {
      type: STRING(3),
      comment: '是否已公布成绩',
      allowNull: false,
      defaultValue: '未公布',
      isIn: [
        [ '已公布', '未公布' ],
      ],
    },
  }, {
    freezeTableName: true, // 自定义表名
    tableName: 'student_course', // 定义表名
    timestamps: true, // 添加时间戳属性 (updatedAt, createdAt)
    paranoid: true, // 不从数据库中删除数据，而只是增加一个 deletedAt 标识当前时间
    charset: 'utf8',
    collate: 'utf8_general_ci',
  });

  StudentCourse.associate = () => {
    StudentCourse.belongsTo(app.model.Student, {
      foreignKey: 's_id',
      targetKey: 's_id',
    });

    StudentCourse.belongsTo(app.model.Course, {
      foreignKey: 'c_id',
      targetKey: 'c_id',
    });
  };

  return StudentCourse;
};
