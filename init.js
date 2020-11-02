import "./db"; //개별 export는 중괄호 사용
import app from "./app";
import dotenv from "dotenv";
import "./models/Video";
import "./models/Comment";
//mongoose가 model들을 인지해야하므로 import한 것
dotenv.config();

const PORT = process.env.PORT || 4000;
//||는 js mdn참고
//gitignore에 dotenv필수, PORT는 dotenv에 있는 변수

const handleListening = () =>
  console.log(`✅ Listening on: http://localhost:${PORT}`);

app.listen(PORT, handleListening);
