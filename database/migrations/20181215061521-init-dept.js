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
    } = Sequelize;
    return await queryInterface.createTable('dept', {
      id: {
        type: INTEGER,
        comment: '自增长 ID',
        primaryKey: true,
        autoIncrement: true,
      },
      d_id: {
        type: STRING(20),
        comment: '院系编号',
        unique: true,
        allowNull: false,
        len: [ 1, 20 ],
      },
      d_name: {
        type: STRING(30),
        comment: '院系名称',
        allowNull: false,
        len: [ 2, 30 ],
      },
      d_info: {
        type: STRING(255),
        comment: '院系介绍',
        defaultValue: '',
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
    return await queryInterface.dropTable('dept');
  },
};
