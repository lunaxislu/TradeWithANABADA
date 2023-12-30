import { ChatMessage } from '../../API/supabase.api';
import * as St from './chat.styled';

const TalkMessage = ({ chat }: { chat: ChatMessage }) => {
  return (
    <St.TalkMessage key={chat.message_id}>
      <span>{chat.content}</span>
      {!chat.visible && <span>1</span>}
    </St.TalkMessage>
  );
};

export default TalkMessage;
