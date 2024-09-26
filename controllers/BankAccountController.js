const BankAccount = require('../models/BankAccount')

module.exports = class BankAccountController {

    static async deposit(req, res) {
        const { id } = req.params;
        const { amount } = req.body;

        if (isNaN(amount) || amount <= 0) {
            return res.status(400).json({ error: 'O valor deve ser um número positivo.' });
        }

        try {
            const result = await BankAccount.sequelize.transaction(async (transaction) => {
                const bankAccount = await BankAccount.findByPk(id, {
                    lock: transaction.LOCK.UPDATE,
                    transaction,
                });

                if (!bankAccount) {
                    return res.status(404).json({ error: 'Conta bancária não encontrada.' });
                }

                bankAccount.balance = parseFloat(bankAccount.balance) + parseFloat(amount);
                return await bankAccount.save();
            });

            return res.status(200).json({ message: 'Valor adicionado com sucesso!', result });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Erro ao adicionar valor.', message: error.message});
        }
    }

    static async withdraw(req, res) {
        const { id } = req.params;
        const { amount } = req.body;
        if (isNaN(amount) || amount <= 0) {
            return res.status(400).json({ error: 'O valor deve ser um número positivo.' });
        }
        
        try {
            const result = await BankAccount.sequelize.transaction(async (transaction) => {
                const bankAccount = await BankAccount.findByPk(id, {
                    lock: transaction.LOCK.UPDATE,
                    transaction,
                });
                if (!bankAccount) {
                    return res.status(404).json({ error: 'Conta bancária não encontrada.' });
                }
        
                if (parseFloat(bankAccount.balance) < parseFloat(amount)) {
                    return res.status(400).json({ error: 'Saldo insuficiente para realizar a retirada.' });
                }
        
                bankAccount.balance = parseFloat(bankAccount.balance) - parseFloat(amount);
                return await bankAccount.save();
            });

            return res.status(200).json({ message: 'Retirada realizada com sucesso!', result });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Erro ao realizar a retirada.', message: error.message});
        }
    }

}