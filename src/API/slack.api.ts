import axios from 'axios';
import { ErrorInfo } from 'react';

export const postSlackApiWithError = async (error: Error, info: ErrorInfo) => {
  const errorTarget = info.componentStack?.split('\n')[1].trim();
  await axios({
    method: 'post',
    url: process.env.REACT_APP_SLACK_URL,
    // json 형태로 data를 입력해야 합니다.
    data: `{"text":"${error} 발생했습니다. \n Component는 \n ${errorTarget}에서 발생했습니다."  }`,
  });
};
