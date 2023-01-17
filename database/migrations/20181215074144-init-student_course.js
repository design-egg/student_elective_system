'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */
    const {
      INTEGER,
      DATE,
      STRING,
      DOUBLE,
    } = Sequelize;
    return await queryInterface.createTable('student_course', {
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
          model: 'student',
          key: 's_id',
        },
      },
      c_id: {
        type: STRING(20),
        comment: '课程编号',
        primaryKey: true,
        allowNull: false,
        references: {
          model: 'course',
          key: 'c_id',
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
      created_at: {
        type: DATE,
        comment: '创建时间',
      },
      updated_at: {
        type: DATE,
        comment: '更新时间',
      },
      deleted_at: {
        type: DATE,
        comment: '删除时间',
      },
    });
  },

  down: async queryInterface => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
    return await queryInterface.dropTable('student_course');
  },
};
