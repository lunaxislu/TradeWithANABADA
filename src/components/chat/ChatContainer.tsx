import { useEffect, useState } from 'react';
import { getUserSession, supabase } from '../../API/supabase.api';

type ChatMessage = {
  message_id: number;
  message_created_at: string;
  content: string;
  author_id: string;
};

type ChannelInfo = {
  chat_id: number;
  chat_created_at: string;
  user1_id: string;
  user2_id: string;
  messages: ChatMessage[];
};

const ChatContainer = () => {
  const [currentChannel, setCurrentChannel] = useState<number>(0);
  const [channels, setChannels] = useState<ChannelInfo[]>([]);
  const channel = supabase.channel(`${currentChannel}`);

  const fetchData = async (userId: string) => {
    try {
      const { data, error } = await supabase.rpc('get_user_channel', {
        input_user_id: userId,
      });

      const processedData: ChannelInfo[] = data!.map((item: any) => ({
        chat_id: item.chat_id,
        chat_created_at: item.chat_created_at,
        user1_id: item.user1_id,
        user2_id: item.user2_id,
        messages: item.messages,
      }));
      console.log(processedData);
      setChannels(processedData);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const getCurrectChannel = async () => {
    // 전체 채널 가져오기
    const currentUser = await getUserSession();
    const data = await fetchData(currentUser.session?.user.id!);
  };

  const activeChannel = channel
    .on(
      'postgres_changes',
      {
        event: 'INSERT',
        schema: 'public',
        table: 'chat_messages',
      },
      (payload) => console.log(payload),
    )
    .subscribe();

  useEffect(() => {
    // 채널 정보 가져오기
    return () => {
      activeChannel.unsubscribe();
    };
  }, [currentChannel]);

  useEffect(() => {
    // 전체 채널 가져오기
    console.log();
    getCurrectChannel();
  }, []);

  return (
    <div>
      <h2>현재 유저의 활성화된 채팅방</h2>
      <ul>
        {channels?.map((channel) => {
          return (
            <li key={channel.chat_id} style={{ display: 'flex', flexDirection: 'column', marginTop: '5rem' }}>
              <span>개설된 일시: {channel.chat_created_at}</span>
              <span>채팅 미리보기: {channel.messages[0].content}</span>
              <span>마지막 채팅 일시 : {channel.messages[0].message_created_at}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default ChatContainer;
