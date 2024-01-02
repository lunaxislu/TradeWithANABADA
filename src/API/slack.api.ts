import axios from 'axios';
import { ErrorInfo } from 'react';

interface Error {
  statusCode?: string;
  message?: string;
}

export const postSlackApiWithError = async (error: Error, info: ErrorInfo, whose?: string) => {
  const errorTarget = info.componentStack?.split('\n')[1].trim();
  console.log(error);
  console.log(info);
  console.log(errorTarget);
  const stringFy = JSON.stringify({
    text:
      '에러 : ' +
      error.message +
      ` 발생했습니다. \n Component는 \n ${errorTarget}에서 발생했습니다. \n 에러 statusCode = ${
        error.statusCode && error.statusCode
      } 입니다.
      `,
  });

  try {
    const { data } = await axios({
      method: 'post',
      url: process.env.REACT_APP_SLACK_URL,
      // json 형태로 data를 입력해야 합니다.
      // data: `{"text":"${error.message} 발생했습니다. \n Component는 \n ${errorTarget}에서 발생했습니다."}`,
      data: `${stringFy} `,
    });
    console.log(data);
  } catch (error) {
    console.log('error axios', error);
  }
};
