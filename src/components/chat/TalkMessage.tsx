import { ChatMessage } from '../../API/supabase.api';
import * as St from './chat.styled';

type style = { 'x-position': string; color: string };
type TalkMessageProps = {
  chat: ChatMessage;
  $style: style;
};
const TalkMessage = ({ chat, $style }: TalkMessageProps) => {
  console.log(chat);
  switch (chat.type) {
    case 'message':
      return (
        <St.TalkMessage key={chat.message_id} $subStyle={$style}>
          <div>
            {!chat.visible && $style['x-position'] === 'end' && <span>1</span>}
            <span>{chat.content}</span>
          </div>
        </St.TalkMessage>
      );
    case 'image':
      return (
        <St.TalkMessage key={chat.message_id} $subStyle={$style}>
          <div>
            {!chat.visible && $style['x-position'] === 'end' && <span>1</span>}
            <figure>
              <img src={chat.img_src} />
            </figure>
            <span>{chat.content}</span>
          </div>
        </St.TalkMessage>
      );
    case 'request':
      return (
        <St.TalkMessage key={chat.message_id} $subStyle={$style}>
          <div>
            {!chat.visible && $style['x-position'] === 'end' && <span>1</span>}
            <span>물품교환을 신청하였습니다.</span>
            <button>수락</button>
            <button>취소</button>
          </div>
        </St.TalkMessage>
      );
    default:
      return <div></div>;
  }
};

export default TalkMessage;
