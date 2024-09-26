const { DataTypes } = require('sequelize')
const db = require('../db/conn')
const User = require('./User');

const BankAccount = db.define('BankAccount', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    accountNumber: {
        type: DataTypes.STRING,
        allowNull: false
    },
    balance: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        defaultValue: 0.00,
        validate: {
            isDecimal: true,
            min: 0
        }
    },
    bankName: {
      type: DataTypes.STRING,
      allowNull: false
    }
}, {
    hooks: {
        beforeUpdate: (account) => {
            if (parseFloat(account.balance) < 0) {
                throw new Error('O saldo não pode ser menor que 0.');
            }
        }
    }
});

User.hasMany(BankAccount, {
    foreignKey: 'userId',
    as: 'accounts'
});
BankAccount.belongsTo(User, {
    foreignKey: 'userId',
    as: 'user'
});

module.exports = BankAccount