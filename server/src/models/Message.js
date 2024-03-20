import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
  userName: String,
  text: String,
  pic: String,
  room: String,
  time: String,
});

const Message = mongoose.model("Message", messageSchema);

export default Message;
