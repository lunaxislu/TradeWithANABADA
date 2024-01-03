import { ChatMessage, updateMessageUpdate, updateOnSaleToSoldOut, updateSales } from '../../API/supabase.api';
import { useTalkContext } from '../../contexts/TalkContext';
import * as St from './chat.styled';

type style = { 'x-position': string; color: string };
type TalkMessageProps = {
  chat: ChatMessage;
  $style: style;
};
const TalkMessage = ({ chat, $style }: TalkMessageProps) => {
  const { userAllChannelInfo, currentUserInfo } = useTalkContext();

  const convertDate = () => {
    const currentDate = new Date();

    const dates = new Date(chat.message_created_at);
    const month = dates.getMonth() + 1;
    const date = dates.getDate();
    const hour = dates.getHours();
    const minutes = dates.getMinutes();
    const seconds = dates.getSeconds();

    const day = `${dates.getFullYear()}${month}${date}`;
    const currentDay = `${currentDate.getFullYear()}${currentDate.getMonth() + 1}${currentDate.getDate()}`;

    if (day === currentDay) {
      return `${Math.floor(hour / 10) ? hour : `0${hour}`}:${Math.floor(minutes / 10) ? minutes : `0${minutes}`}:${
        Math.floor(seconds / 10) ? seconds : `0${seconds}`
      }`;
    }

    return `${dates.getFullYear()}/${Math.floor(month / 10) ? month : `0${month}`}/${
      Math.floor(date / 10) ? date : `0${date}`
    } ${Math.floor(hour / 10) ? hour : `0${hour}`}:${Math.floor(minutes / 10) ? minutes : `0${minutes}`}:${
      Math.floor(seconds / 10) ? seconds : `0${seconds}`
    }`;
  };

  const acceptTradeHandler = async () => {
    const currentChannelInfo = userAllChannelInfo.find((channelInfo) => channelInfo.chat_id === chat.current_chat_id)!;
    await updateOnSaleToSoldOut(currentChannelInfo.product_id);
    await updateMessageUpdate(chat.message_id, true);
    await updateSales(currentUserInfo.session?.user.id!, currentChannelInfo.product_id);
  };

  const denyTradeHandler = async () => {
    await updateMessageUpdate(chat.message_id, false);
  };

  const requestStatus = () => {
    if (chat.request_answer === null) {
      if (chat.author_id !== currentUserInfo.session?.user.id) {
        return (
          <>
            <button onClick={acceptTradeHandler}>수락</button>
            <button onClick={denyTradeHandler}>취소</button>
          </>
        );
      }
    }
    if (chat.request_answer === false) {
      return <span>거절하셨습니다.</span>;
    }

    if (chat.request_answer === true) {
      return <span>수락하셨습니다.</span>;
    }
  };

  switch (chat.type) {
    case 'message':
      return (
        <St.TalkMessage key={chat.message_id} $subStyle={$style}>
          {!chat.visible && $style['x-position'] === 'end' && <St.VisibleChecker>1</St.VisibleChecker>}
          <St.MessageContext>{chat.content}</St.MessageContext>
          <St.MessageDate>{convertDate()}</St.MessageDate>
        </St.TalkMessage>
      );
    case 'image':
      return (
        <St.TalkMessage key={chat.message_id} $subStyle={$style}>
          {!chat.visible && $style['x-position'] === 'end' && <St.VisibleChecker>1</St.VisibleChecker>}
          <figure>
            <img src={chat.img_src} />
          </figure>
          <St.MessageContext>{chat.content}</St.MessageContext>
          <St.MessageDate>{convertDate()}</St.MessageDate>
        </St.TalkMessage>
      );
    case 'request':
      return (
        <St.TalkMessage key={chat.message_id} $subStyle={$style}>
          {!chat.visible && $style['x-position'] === 'end' && <St.VisibleChecker>1</St.VisibleChecker>}
          <span>물품교환을 신청하였습니다.</span>
          <div>{requestStatus()}</div>
          <St.MessageDate>{convertDate()}</St.MessageDate>
        </St.TalkMessage>
      );
    default:
      return <div></div>;
  }
};

export default TalkMessage;
