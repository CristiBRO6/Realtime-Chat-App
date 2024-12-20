module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define("User", {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        verified: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
        },
        name: {
            type: DataTypes.STRING(256),
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING(256),
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING(256),
            allowNull: true,
            defaultValue: '',
        },
        avatar: {
            type: DataTypes.TEXT,
            allowNull: true,
            defaultValue: '',
        },
    }, {
        tableName: 'user',
        timestamps: true,
        createdAt: 'createdAt',
        updatedAt: 'updatedAt',
    });

    User.associate = (models) => {
        User.hasMany(models.Message, { foreignKey: 'senderId', as: 'messages' });
    };

    return User;
};