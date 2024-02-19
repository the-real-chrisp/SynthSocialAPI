const { Thoughts, User, Reaction } = require('../models');

module.exports = {
    async getAllThoughts(req, res) {
        try {
            const allThoughts = await Thoughts.find();
            res.json(allThoughts);
        } catch (err) {
            res.status(500).json(err)
        }
    },
    async getSingleThought(req, res) {
        try {
            const singleThought = await Thoughts.findOne({ _id: req.params.userId });

            if (!singleThought) {
                return res.status(404).json({ message: 'No thought found' })
            }

            res.json(singleThought)
        } catch (err) {
            res.status(500).json(err);
        }
    },
    async createThought(req, res) {
        try {
            const newThought = await Thoughts.create(req.body);
            res.json(newThought)
        } catch (err) {
            res.status(500).json(err)
        }
    },
    async updateThought(req, res) {
        try {
            const modifyThought = await Thoughts.findOneAndUpdate({ _id: req.params.thoughtId }, req.body, { new: true });

            if (!modifyThought) {
                return res.status(404).json({ message: 'No thought found' });
            }

            res.json(modifyThought);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    async deleteThought(req, res) {
        try {
            const removeThought = await Thoughts.findOneAndDelete({ _id: req.params.thoughtId });

            if (!removeThought) {
                return res.status(404).json({ message: 'No thought found' });
            }

            res.json({ message: 'Thought deleted successfully' });
        } catch (err) {
            res.status(500).json(err);
        }
    },
    async addReaction(req, res) {
        try {
            const addReaction = await Thoughts.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $addToSet: { reaction: req.body } },
                { runValidators: true, new: true }
            );

            res.json(addReaction);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    async deleteReaction(req, res) {
        try {
            const deleteReaction = Thoughts.findOneAndUpdate(
                { _id: req.params.userId },
                { $pull: { reactions: { reactionId: req.body.friendId} } },
                { runValidators: true, new: true }
            );

            res.json(deleteReaction);
        } catch (err) {
            res.status(500).json(err);
        }
    },
}