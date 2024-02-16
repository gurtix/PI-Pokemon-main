const { DataTypes, INTEGER } = require('sequelize');
module.exports = (sequelize) => {
  const Stat = sequelize.define('stats', {
        name: {
          type: DataTypes.STRING(20),
          allowNull: false,
          unique:true
        },
        base_stat: {
            type: DataTypes.INTEGER,
            allowNull: false,
          },
          effort: {
            type: DataTypes.INTEGER,
            allowNull: false,
          },
      },
      {timestamps: false}
    );
    return Stat;
  };

