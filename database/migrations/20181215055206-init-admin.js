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
    return await queryInterface.createTable('admin', {
      id: {
        type: INTEGER,
        comment: '自增长 ID',
        primaryKey: true,
        autoIncrement: true,
      },
      account: {
        type: STRING(20),
        comment: '管理员账号',
        unique: true,
        allowNull: false,
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
    return await queryInterface.dropTable('admin');
  },
};
