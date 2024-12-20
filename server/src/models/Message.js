module.exports = (sequelize, DataTypes) => {
    const Message = sequelize.define("Message", {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        senderId: {
            type: DataTypes.UUID,
            allowNull: false,
        },
        receiverId: {
            type: DataTypes.UUID,
            allowNull: true,
        },
        text: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        isGlobal: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
        },
    }, {
        tableName: 'message',
        timestamps: true,
        createdAt: 'createdAt',
        updatedAt: 'updatedAt',
    });

    Message.associate = (models) => {
        Message.belongsTo(models.User, { foreignKey: 'senderId', as: 'user' });
    };
    
    return Message;
  };
  