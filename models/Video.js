import mongoose from "mongoose";

const VideoSchema = new mongoose.Schema({
  fileUrl: {
    type: String,
    required: "File URL is required",
  },
  title: {
    type: String,
    required: "Tilte is required",
  },
  description: String, //이렇게 한 줄로 적어도 되는데 2개 이상일 때는 오브젝트로 적는다.
  views: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment",
    },
  ],
});

const model = mongoose.model("Video", VideoSchema);
//model이름과 schema
export default model;
