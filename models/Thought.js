const { Schema, model, Types } = require('mongoose');
const moment = require('moment');

const reactionSchema = new Schema({
  reactionId: {
    type: Schema.Types.ObjectId,
    default: () => new Types.ObjectId()
  },
  username: {
    type: String,
    required: true
  },
  reactionBody: {
    type: String,
    required: true,
    maxLength: 280
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: createdAtVal => moment(createdAtVal).format("MMM DD, YYYY")
  }
}, {
  toJSON: {
    virtuals: true,
    getters: true
  },
  id: false
});

const thoughtSchema = new Schema({
  thoughtText: {
    type: String,
    require: true,
    minlength: 1,
    maxlength: 280,
  },
  username: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: createdAtVal => moment(createdAtVal).format("MMM DD, YYYY")
  },
  reactions: [reactionSchema]
}, {
  toJSON: {
    virtuals: true,
    getters: true
  },
  id: false
});

thoughtSchema.virtual('reactionCount').get(function () {
  return this.reactions.length;
});

const Thought = model('Thought', thoughtSchema);

module.exports = Thought;