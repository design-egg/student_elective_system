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
    return await queryInterface.createTable('course', {
      id: {
        type: INTEGER,
        comment: '自增长 ID',
        primaryKey: true,
        autoIncrement: true,
      },
      c_id: {
        type: STRING(20),
        comment: '课程编号',
        len: [ 1, 20 ],
        unique: true,
        allowNull: false,
      },
      t_id: {
        type: STRING(20),
        comment: '教师工号',
        allowNull: false,
        references: {
          model: 'teacher',
          key: 't_id',
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
    return await queryInterface.dropTable('course');
  },
};
