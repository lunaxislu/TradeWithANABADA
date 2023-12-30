import { useEffect, useState } from 'react';
import { ChannelInfo, getCurrentUserChatChannel, getUserSession, supabase } from '../../API/supabase.api';
import TalkChannelCard from './TalkChannelCard';
import * as St from './chat.styled';

type TalkCannelListProps = {
  setCurrentChannel: React.Dispatch<React.SetStateAction<number>>;
};

const TalkChannelList = ({ setCurrentChannel }: TalkCannelListProps) => {
  const [channels, setChannels] = useState<ChannelInfo[] | []>([]);

  const update = async () => {
    const currentUser = await getUserSession();
    const data = await getCurrentUserChatChannel(currentUser.session?.user.id!);
    setChannels(data);
  };
  // 최초 mount 시 유저의 모든 채널 가져오기
  useEffect(() => {
    const getCurrentUser = async () => {
      const currentUser = await getUserSession();
      const data = await getCurrentUserChatChannel(currentUser.session?.user.id!);
      setChannels(data);
      const userChannels = data.map((channel) => channel.chat_id);
      console.log(userChannels);

      userChannels.forEach((id) => {
        supabase
          .channel(`${id}`)
          .on(
            'postgres_changes',
            {
              event: 'INSERT',
              schema: 'public',
              table: 'chat_messages',
              filter: `chat_id=eq.${id}`,
            },
            (payload) => {
              update();
            },
          )
          .subscribe();
      });
      console.log(supabase.getChannels());
    };

    getCurrentUser();
  }, []);

  return (
    <St.TalkListContainer>
      <h2>현재 진행중인 대화</h2>
      <span>대화를 통해 물물교환을 진행해보세요.</span>
      <span>상대방을 존중하며 대화하세요</span>
      <ul>
        {channels?.map((channel) => {
          return <TalkChannelCard key={channel.chat_id} channel={channel} setCurrentChannel={setCurrentChannel} />;
        })}
      </ul>
    </St.TalkListContainer>
  );
};

export default TalkChannelList;
