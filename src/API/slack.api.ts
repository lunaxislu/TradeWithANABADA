import axios from 'axios';
import { ErrorInfo } from 'react';

// 아... 시간이 좀만더 있더라면 ...
type SlackWithError = {
  statusCode?: string;
  message?: string;
  code?: number;
  status?: number;
  name?: string;
  stack?: string;
};

export const postSlackApiWithError = async (error: SlackWithError, info: ErrorInfo, whose?: string) => {
  const errorTarget = info.componentStack?.split('\n')[1].trim();
  if (error.code || error.statusCode) {
    const alertErrorText = JSON.stringify({
      text:
        '서버와의 통신중 \n 에러 : ' +
        error.message +
        ` 발생했습니다. \n Component는 \n ${errorTarget}에서 발생했습니다. \n 에러 Code = ${error.code} 입니다.
        `,
    });

    await axios({
      method: 'post',
      url: process.env.REACT_APP_SLACK_URL,
      // json 형태로 data를 입력해야 합니다.
      // data: `{"text":"${error.message} 발생했습니다. \n Component는 \n ${errorTarget}에서 발생했습니다."}`,
      data: `${alertErrorText} `,
    });
  }
  if (error.statusCode) {
    const alertErrorText = JSON.stringify({
      text:
        '저희 쪽 user 잘못일 수도 아닐수도 있는 \n 에러 : ' +
        error.message +
        ` 발생했습니다. \n \n ㅜㅜ \n Component는 \n ${errorTarget}에서 발생했습니다. \n 에러 Code = ${error.statusCode} 입니다.
        `,
    });

    await axios({
      method: 'post',
      url: process.env.REACT_APP_SLACK_URL,
      // json 형태로 data를 입력해야 합니다.
      // data: `{"text":"${error.message} 발생했습니다. \n Component는 \n ${errorTarget}에서 발생했습니다."}`,
      data: `${alertErrorText} `,
    });
  }
  if (error?.status) {
    const alertErrorText = JSON.stringify({
      text:
        '서버와의 통신중 \n 에러 : ' +
        error.message +
        ` 발생했습니다. \n Component는 \n ${errorTarget}에서 발생했습니다. \n status = ${error.status} 입니다.
        `,
    });

    await axios({
      method: 'post',
      url: process.env.REACT_APP_SLACK_URL,
      // json 형태로 data를 입력해야 합니다.
      // data: `{"text":"${error.message} 발생했습니다. \n Component는 \n ${errorTarget}에서 발생했습니다."}`,
      data: `${alertErrorText} `,
    });
  }

  if (error.name === 'AuthApiError' && error.status) {
    const alertErrorText = JSON.stringify({
      text:
        '로그인 시도를 하다가.... \n 에러 : ' +
        error.message +
        ` 발생했습니다. \n 이상한 사람일까나??.
        `,
    });

    await axios({
      method: 'post',
      url: process.env.REACT_APP_SLACK_URL,
      // json 형태로 data를 입력해야 합니다.
      // data: `{"text":"${error.message} 발생했습니다. \n Component는 \n ${errorTarget}에서 발생했습니다."}`,
      data: `${alertErrorText} `,
    });
  }

  if (error.stack) {
    const alertErrorText = JSON.stringify({
      text:
        '컴포넌트 내부에서 렌더링중 \n 에러 : ' +
        error.message +
        ` 발생했습니다. \n Component는 \n ${errorTarget}에서 발생했습니다. \n 즉시 담당자 수정해주세요
        `,
    });

    await axios({
      method: 'post',
      url: process.env.REACT_APP_SLACK_URL,
      // json 형태로 data를 입력해야 합니다.
      // data: `{"text":"${error.message} 발생했습니다. \n Component는 \n ${errorTarget}에서 발생했습니다."}`,
      data: `${alertErrorText} `,
    });
  }
};
