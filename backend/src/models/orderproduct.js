

module.exports = (sequelize, DataTypes, Sequelize) => {
  const OrderProduct = sequelize.define('OrderProduct', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.UUID
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE,
      defaultValue: Sequelize.NOW,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
    },
    orderId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'Orders',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL'
    },
    productId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'Products',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL'
    }

  });

  return OrderProduct;
};
