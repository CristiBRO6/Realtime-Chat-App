module.exports = (sequelize, DataTypes) => {
    const UserEmailVerification = sequelize.define('UserEmailVerification', {
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
        code: {
            type: DataTypes.BIGINT,
            allowNull: false
        },
        expire: {
            type: DataTypes.BIGINT,
            allowNull: false,
            defaultValue: -1
        },
    }, {
        tableName: 'user_email_verification',
        timestamps: true,
        createdAt: 'createdAt',
        updatedAt: 'updatedAt',
    });

    return UserEmailVerification;
};
