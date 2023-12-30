import { ChannelInfo } from '../../API/supabase.api';
import { displayCreateAt } from '../../utils/date';
import * as St from './chat.styled';

type TalkChannelCardProps = {
  channel: ChannelInfo;
  setCurrentChannel: React.Dispatch<React.SetStateAction<number>>;
};
const TalkChannelCard = ({ channel, setCurrentChannel }: TalkChannelCardProps) => {
  return (
    <St.TalkChannelCardItem
      key={channel.chat_id}
      onClick={() => {
        setCurrentChannel(channel.chat_id);
      }}
    >
      <figure>
        <img src="https://images.freeimages.com/fic/images/icons/573/must_have/256/user.png" />
      </figure>

      <div>
        {/* 유저정보 */}
        <div>
          <h3>닉네임</h3>
        </div>

        {/* preview */}
        <div>
          <span>{channel.messages[0].content}</span>
          <span>{displayCreateAt(channel.messages[0].message_created_at)}</span>
        </div>
      </div>
      {!!channel.invisible_count && <St.InvisibleMessage>{channel.invisible_count}</St.InvisibleMessage>}
    </St.TalkChannelCardItem>
  );
};

export default TalkChannelCard;
