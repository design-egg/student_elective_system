'use strict';

module.exports = app => {
  const {
    STRING,
    INTEGER,
  } = app.Sequelize;
  const Dept = app.model.define('dept', {
    id: {
      type: INTEGER,
      comment: '自增长 ID',
      primaryKey: true,
      autoIncrement: true,
    },
    d_id: {
      type: STRING(20),
      comment: '院系编号',
      allowNull: false,
      unique: {
        msg: '院系编号不允许重复',
      },
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
  }, {
    freezeTableName: true, // 自定义表名
    tableName: 'dept', // 定义表名
    timestamps: true, // 添加时间戳属性 (updatedAt, createdAt)
    paranoid: true, // 不从数据库中删除数据，而只是增加一个 deletedAt 标识当前时间
    charset: 'utf8',
    collate: 'utf8_general_ci',
  });

  Dept.associate = () => {
    Dept.hasMany(app.model.Major, {
      foreignKey: 'd_id',
      targetKey: 'd_id',
    });
  };

  return Dept;
};
