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
      TEXT,
    } = Sequelize;
    return await queryInterface.createTable('teacher', {
      id: {
        type: INTEGER,
        comment: '自增长 ID',
        primaryKey: true,
        autoIncrement: true,
      },
      t_id: {
        type: STRING(20),
        comment: '教师工号',
        unique: true,
        allowNull: false,
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
    return await queryInterface.dropTable('teacher');
  },
};
