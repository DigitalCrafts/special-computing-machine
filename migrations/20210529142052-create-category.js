/** @typedef { import('sequelize/types').QueryInterface } QueryInterface QueryInterface */
/** @typedef { import('sequelize/types').DataTypes } DataTypes DataTypes */

module.exports = {
  /**
   * Run Migration
   * @param {QueryInterface} queryInterface sequelize Query Interface
   * @param {DataTypes} Sequelize available data types
   */
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Categories', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      enabled: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
      },
      ParentId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Categories',
          key: 'id',
        },
        onDelete: 'SET NULL',
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
    await queryInterface.dropTable('Categories');
  },
};
