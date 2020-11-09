import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
//mongodb와 nodejs를 연결해주는 역할을 하는 mongoose

mongoose.connect(process.env.MONGO_URL_PROD, {
  useNewUrlParser: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});
//object의 변수는 설정을 의미하는데 니코가 신경안써도 된다함
const db = mongoose.connection;

const handleOpen = () => console.log("✅  Connected to DB");
const handleError = (error) =>
  console.log(`❌ Error on DB Connection:${error}`);

db.once("open", handleOpen);
db.on("error", handleError);
