const { Thought, User } = require('../models');

module.exports = {
    async getUsers(req, res) { //get all
        try {
            const users = await User.find();
            res.json(users);
        } catch(err) {
            res.status(500).json(err);
        }
    },
    async getSingleUser(req, res) { //get one
        try {
            const user = await User.findOne({ _id: req.params.userId })
            .select('__v');
        if (!user) {
            return res.status(404).json({ message: 'User ID does not exist' });
        }
        res.json(user);
        } catch(err) {
            res.status(500).json(err);
        }
    },
    async createUser(req, res) { //create user
        try {
            const user = await User.create(req.body);
            res.json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    async updateUser(req, res) { //update user by ID
        try {
            const user = await User.findOneAndUpdate({ _id: req.params.userId })
        if (!user) {
            return res.status(404).json({ message: 'User ID does not exist' });
        }
        res.json(user);
        } catch(err) {
            res.status(500).json(err);
        }
    },
    async deleteUser(req, res) { //delete user and associated thoughts
        try {
            const user = await User.findOneAndDelete({ _id: req.params.userId });
        if (!user) {
            return res.status(404).json({ message: 'User ID does not exist' });
        }
        await Thought.deleteMany({ _id: { $in: user.id } });
        res.json({ message: 'User and Thoughts deleted!' })
        } catch (err) {
            res.status(500).json(err);
        }
    },
    async addFriend(req, res) {
        try {
            const friend = await User.findOneAndUpdate(
                { _id: req.params.userId },
                { $addToSet: { friends: req.body }},
                { runValidators: true, new: true });
            if (!friend) {
                return res.status(404).json({ message: 'No friend found with that ID'});
            }
            res.json(friend);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    async deleteFriend(req, res) {
        try{
            const friend = await User.findOneAndUpdate(
                { _id: req.params.userId },
                { $pull: { friends: { friendId: req.params.friend }}},
                { runValidators: true, new: true }
            );
        if (!friend) {
            return res.status(404).json({ message: 'No friend found with this ID'});
        }
        res.json(friend);
        } catch (err) {
            res.status(500).json(err);
        }
    },
};