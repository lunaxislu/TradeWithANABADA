import { ChatMessage } from '../../API/supabase.api';
import * as St from './chat.styled';

type style = { 'x-position': string; color: string };
type TalkMessage = {
  chat: ChatMessage;
  $style: style;
};
const TalkMessage = ({ chat, $style }: TalkMessage) => {
  return (
    <St.TalkMessage key={chat.message_id} $subStyle={$style}>
      <div>
        {!chat.visible && $style['x-position'] === 'end' && <span>1</span>}
        <span>{chat.content}</span>
      </div>
    </St.TalkMessage>
  );
};

export default TalkMessage;
