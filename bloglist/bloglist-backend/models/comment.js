const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  message: {
    type: String,
    required: [true, 'A message is required'],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  /// Exercise says that the comments are anonymous,
  /// otherwise, I think I'd store the user ID too.
  // userID: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: 'User',
  // },
});

commentSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model('Comment', commentSchema);
