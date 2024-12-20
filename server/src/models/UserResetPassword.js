module.exports = (sequelize, DataTypes) => {
    const UserResetPassword = sequelize.define('UserResetPassword', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        userId: {
            type: DataTypes.UUID,
            allowNull: false
        },
        used: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        expire: {
            type: DataTypes.BIGINT,
            allowNull: false
        },
    }, {
        tableName: 'user_reset_password',
        timestamps: true,
        createdAt: 'createdAt',
        updatedAt: 'updatedAt',
    });

    return UserResetPassword;
};
