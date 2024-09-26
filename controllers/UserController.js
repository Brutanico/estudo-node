const User = require('../models/User')
const BankAccount = require('../models/BankAccount')

module.exports = class UserController {
    
    static async createUser (req, res) {
        try {
            const username = req.body.username
            const occupation = req.body.occupation
            const accountNumber = req.body.accountNumber
            const bankName = req.body.bankName
            const balance = req.body.balance
    
            const user = await User.create({ 
                username, 
                occupation,
                accounts: [{
                    accountNumber,
                    bankName,
                    balance
                }]
            }, {
                include: [{
                    model: BankAccount,
                    as: 'accounts'
                }]
            });
            res.status(201).json(user);
        } catch (error) {
            res.status(500).json({ error: 'Erro ao criar usuário',
                message: error.message
            });
        }
    }

    static async getUsers (req, res) {
        try {
            const users = await User.findAll({ raw: true,
                include: {
                    model: BankAccount,
                    as: 'accounts',
                  } 
            })
            res.status(201).json(users);
        } catch (error) {
            res.status(500).json({ error: 'Erro ao listar usuários' });
        }
    }

    static async getUserById (req, res) {
        try {
            const id = req.params.id
    
            const user = await User.findOne({ raw: true, where: {id: id},
                include: {
                    model: BankAccount,
                    as: 'accounts',
                  } 
                })
            res.status(201).json(user);
        } catch (error) {
            res.status(500).json({ error: `Erro ao buscar usuário de id: ${id}` });
        }
    }
}