const { User, Thought } = require('../models');

module.exports = {
    async getThoughts(req, res) {
        try {
            const thoughts = await Thought.find();
            res.json(thoughts);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    async getSingleThought(req, res) {
        try {
            const thought = await Thought.findOne({ _id: (req.params.thoughtId) });
        if (!thought) {
            return res.status(404).json({ message: 'No Thought with that ID'});
        }
        res.json(thought);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    async createThought(req, res) {
        try {
            const thought = await Thought.create(req.body);
            const user = await User.findOneAndUpdate(
                { _id: (req.body.userId) }, 
                { $addToSet: { thoughts: thought._id } },
                { new: true});
            if (!user) {
                return res.status(404).json({ message: 'Thoughts created, but no User with that ID'})
            }
        res.json('Thought created!');
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },
    async updateThought(req, res) {
        try {
            const thought = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId }, // Remove unnecessary parentheses
                req.body, // Use the req.body directly instead of wrapping it in $set
                { runValidators: true, new: true }
            );
            if (!thought) {
                return res.status(404).json({ message: 'No Thought with that ID' });
            }
            res.json(thought);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },
    async deleteThought(req, res) {
        try {
            const thought = await Thought.findOneAndDelete({ _id: req.params.thoughtId });
        if (!thought) {
            return res.status(404).json({ message: 'No Thought with this ID' });
        }
        const user = await User.findOneAndUpdate(
            { thoughts: req.params.thoughtId },
            { $pull: { thoughts :req.params.thoughtId } },
            { new: true }
        );
        if (!user) {
            return res.status(404).json({ message: 'Thought created but no User with this ID', }
            );
        }
        res.json({ message: 'Thought successfully deleted!' });
        } catch (err) {
            res.status(500).json(err);
        }
    },
    async createReaction(req, res) {
        try {
            const thought = await Thought.findOneAndUpdate(
                { _id: (req.params.thoughtId) },
                { $addToSet: { reactions: req.params.reactionId }},
                { runValidators: true, new: true }
            );
            if (!thought) {
                return res.status(404).json({ message: 'No thought found with this ID'});
            }
            return res.json(thought);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    async deleteReaction(req, res) {
        try {
            const thought = await Thought.findOneAndUpdate(
                { _id: (req.params.thoughtId) },
                { $pull: { reactions: req.params.reactionId } },
                { runValidators: true, new: true }
            );
            if (!thought) {
                return res.status(404).json({ message: 'No thought with that ID' });
            }
            res.json(thought);
        } catch (err) {
            res.status(500).json(err);
        }
    },
};