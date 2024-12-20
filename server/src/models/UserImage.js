module.exports = (sequelize, DataTypes) => {
    const UserImage = sequelize.define('UserImage', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        userId: {
            type: DataTypes.UUID,
            allowNull: false,
        },
        data: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        contentType: {
            type: DataTypes.STRING(256),
            allowNull: false,
        },
        hash: {
            type: DataTypes.STRING(256),
            allowNull: false,
        },
    }, {
        tableName: 'user_image',
        timestamps: true,
        createdAt: 'createdAt',
        updatedAt: 'updatedAt',
    });

    return UserImage;
};