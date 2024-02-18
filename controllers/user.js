const { User } = require('../models');

module.exports = {
    async getAllUsers(req, res) {
        try {
            const allUsers = await User.find();
            res.json(allUsers);
        } catch (err) {
            res.status(500).json(err)
        }
    },
    async getSingleUser(req, res) {
        try {
            const singleUser = await User.findOne({ _id: req.params.userId });

            if (!singleUser) {
                return res.status(404).json({ message: 'No user found' })
            }

            res.json(singleUser)
        } catch (err) {
            res.status(500).json(err);
        }
    },
    async createUser(req, res) {
        try {
            const newUser = await User.create(req.body);
            res.json(newUser)
        } catch (err) {
            res.status(500).json(err)
        }
    },
    async updateUser(req, res) {
        try {
            const modifyUser = await User.findOneAnd({ _id: req.params.userId }, req.body, { new: true });

            if (!modifyUser) {
                return res.status(404).json({ message: 'No user found' });
            }

            res.json(modifyUser);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    async deleteUser(req, res) {
        
    }
}
