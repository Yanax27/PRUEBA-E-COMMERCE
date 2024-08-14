const { DataTypes, UUIDV4, Sequelize  } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('Category', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: UUIDV4,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE,
      defaultValue: Sequelize.NOW,
    },
  });
};
