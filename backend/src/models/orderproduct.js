const { Sequelize, DataTypes, UUIDV4 } = require('sequelize');

module.exports = (sequelize, DataTypes ) => {
  const OrderProduct = sequelize.define('OrderProduct', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: UUIDV4,
      allowNull: false,
    },
    /*createdAt: {
      allowNull: false,
      type: DataTypes.DATE,
      defaultValue: Sequelize.NOW,
    },*/
    amount: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
    },
   /* orderId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'Order',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL'
    },
    productId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'Product',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL'
    }*/

  });

  return OrderProduct;
};
