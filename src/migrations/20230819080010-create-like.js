module.exports = {
  up: async (queryInterface, DataTypes) => {
    await queryInterface.createTable("Likes", {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      user_id:{
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true
      },
      post_id:{
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true,
      },
      is_liked: {
        type: DataTypes.BOOLEAN,
        default: true,
        allowNull: false
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      deletedAt: {
        type: DataTypes.DATE,
        allowNull: true,
      }
    });
  },
  down: async (queryInterface, DataTypes) => {
    await queryInterface.dropTable("Likes");
  }
};
