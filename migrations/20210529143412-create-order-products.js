/** @typedef { import('sequelize/types').QueryInterface } QueryInterface QueryInterface */
/** @typedef { import('sequelize/types').DataTypes } DataTypes DataTypes */

module.exports = {
  /**
   * Run Migration
   * @param {QueryInterface} queryInterface sequelize Query Interface
   * @param {DataTypes} Sequelize available data types
   */
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('OrderProducts', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      quantity: {
        allowNull: false,
        defaultValue: 1,
        type: Sequelize.INTEGER,
      },
      OrderId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Orders',
          key: 'id',
        },
      },
      ProductId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Products',
          key: 'id',
        },
      },
      createdAt: {
        allowNull: false,
        defaultValue: Sequelize.NOW,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        defaultValue: Sequelize.NOW,
        type: Sequelize.DATE,
      },
    });
  },
  /**
   * Rollback Migration
   * @param {QueryInterface} queryInterface sequelize Query Interface
   */
  down: async (queryInterface) => {
    await queryInterface.dropTable('OrderProducts');
  },
};
