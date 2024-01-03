import { useEffect } from 'react';
import { useErrorBoundary } from 'react-error-boundary';
import { useTalkContext } from '../../contexts/TalkContext';
import TalkChannelCard from './TalkChannelCard';
import * as St from './chat.styled';

const TalkChannelList = () => {
  const { updateChannelStatus, userAllChannelInfo, currentChannel } = useTalkContext();

  const { showBoundary } = useErrorBoundary();
  useEffect(() => {
    try {
      updateChannelStatus();
    } catch (error) {
      showBoundary(error);
    }
  }, []);

  return (
    <St.TalkListContainer $talkChannelOpen={!!currentChannel}>
      <h2>현재 진행중인 대화</h2>
      <span>대화를 통해 물물교환을 진행해보세요.</span>
      <span>상대방을 존중하며 대화하세요</span>
      <ul>
        {userAllChannelInfo?.map((channel) => {
          return <TalkChannelCard key={channel.chat_id} channel={channel} />;
        })}
      </ul>
    </St.TalkListContainer>
  );
};

export default TalkChannelList;
