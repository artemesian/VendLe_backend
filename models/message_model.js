const mongoose = require("mongoose");
const mongooseHistory = require("mongoose-history");
const async = require("async");
const { Schema } = mongoose;

const messageSchema = new Schema(
  {
    sender: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    body: {
      type: String,
      required:true
    },
    room: {//refer to Chat Name
      type: String,
      ref: "Chat",
      required: true,
    },
  },
  { timestamp: true }
);

messageSchema.plugin(mongooseHistory);
module.exports = mongoose.model("Message", messageSchema);
/*Recommended
-senderID
-receiverID
*/
