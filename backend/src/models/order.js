const { DataTypes, UUIDV4, Sequelize } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('Order', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: UUIDV4,
      allowNull: false,
    },
    total: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
   /* createdAt: {
      allowNull: false,
      type: DataTypes.DATE,
      defaultValue: Sequelize.NOW,
    },*/
   /* customerId: {
      allowNull: false,
      type: DataTypes.UUID,
      references: {
        model:'Customer',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL'
    },*/
  });
};
