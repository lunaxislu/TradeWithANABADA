import axios from "axios";

const test = async () => {
  await axios({
    method: "post",
    url: process.env.REACT_APP_SLACK_URL,

    // json 형태로 data를 입력해야 합니다.
    data: '{"text":"Hello, World!"}',
  });
};
