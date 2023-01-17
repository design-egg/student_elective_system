'use strict';

module.exports = app => {
  const {
    STRING,
    INTEGER,
    INITIALLY_IMMEDIATE,
  } = app.Sequelize;
  const Major = app.model.define('major', {
    id: {
      type: INTEGER,
      comment: '自增长 ID',
      primaryKey: true,
      autoIncrement: true,
    },
    m_id: {
      type: STRING(20),
      comment: '专业编号',
      allowNull: false,
      unique: {
        msg: '专业编号不允许重复',
      },
      len: [ 1, 20 ],
    },
    d_id: {
      type: STRING(20),
      comment: '院系编号',
      allowNull: false,
      references: {
        model: app.model.Dept,
        key: 'd_id',
        deferrable: INITIALLY_IMMEDIATE,
      },
    },
    m_name: {
      type: STRING(30),
      comment: '专业名称',
      allowNull: false,
      len: [ 2, 30 ],
    },
    m_info: {
      type: STRING(255),
      comment: '专业介绍',
      defaultValue: '',
    },
  }, {
    freezeTableName: true, // 自定义表名
    tableName: 'major', // 定义表名
    timestamps: true, // 添加时间戳属性 (updatedAt, createdAt)
    paranoid: true, // 不从数据库中删除数据，而只是增加一个 deletedAt 标识当前时间
    charset: 'utf8',
    collate: 'utf8_general_ci',
  });

  Major.associate = () => {
    Major.belongsTo(app.model.Dept, {
      foreignKey: 'd_id',
      targetKey: 'd_id',
    });

    Major.hasMany(app.model.Student, {
      foreignKey: 'm_id',
      targetKey: 'm_id',
    });
  };

  return Major;
};
