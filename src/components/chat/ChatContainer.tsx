import { useEffect, useRef, useState } from 'react';
import { getUserSession, supabase } from '../../API/supabase.api';

type ChatMessage = {
  current_chat_id: number;
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
  messages: Omit<ChatMessage, 'current_chat_id'>[];
};

const ChatContainer = () => {
  const [currentChannel, setCurrentChannel] = useState<number>(0);
  const [channels, setChannels] = useState<ChannelInfo[]>();
  const [chatData, setChatData] = useState<ChatMessage[]>([]);

  const channel = supabase.channel(`${currentChannel}`, {
    config: {
      broadcast: { self: true },
    },
  });

  // user에 따른 채팅방 전체 정보 가져오기
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
      setChannels(processedData);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  // 선택한 채팅방 내역 가져오기
  const getChatMessages = async (channel: number) => {
    try {
      const { data, error } = await supabase.rpc('get_channel_messages', { input_channel_id: channel });

      const processedData: ChatMessage[] = data!.map((item: any) => ({
        current_chat_id: item.current_chat_id,
        message_id: item.message_id,
        message_created_at: item.message_created_at,
        content: item.content,
        author_id: item.author_id,
      }));
      console.log(data);
      setChatData(processedData);
    } catch (err) {
      console.log(err);
    }
  };

  const sendMessageHandler = async () => {
    const currentUser = await getUserSession();
    await supabase
      .from('chat_messages')
      .insert([
        {
          chat_id: currentChannel,
          content: inputRef.current?.value,
          author_id: currentUser.session?.user.id,
        },
      ])
      .select();
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
      (payload) => {
        const newData = {
          current_chat_id: payload.new.chat_id,
          message_id: payload.new.id,
          message_created_at: payload.new.created_at,
          content: payload.new.content,
          author_id: payload.new.author_id,
        };

        setChatData((prev) => [...prev, newData]);
      },
    )
    .subscribe();

  useEffect(() => {
    // 채널 정보 가져오기
    if (currentChannel) {
      getChatMessages(currentChannel);
    }
  }, [currentChannel]);

  useEffect(() => {
    // 전체 채널 가져오기
    getCurrectChannel();
  }, []);

  useEffect(() => {
    console.log(channels);
  }, [channels]);

  const inputRef = useRef<HTMLInputElement>(null);
  return (
    <div>
      <h2>현재 유저의 활성화된 채팅방</h2>
      <ul>
        {channels?.map((channel) => {
          return (
            <li
              key={channel.chat_id}
              style={{ display: 'flex', flexDirection: 'column', marginTop: '5rem', alignItems: 'start' }}
            >
              <span>개설된 일시: {channel.chat_created_at}</span>
              <span>채팅 미리보기: {channel.messages[0].content}</span>
              <span>마지막 채팅 일시 : {channel.messages[0].message_created_at}</span>
              <button
                onClick={() => {
                  activeChannel.unsubscribe();
                  setCurrentChannel(channel.chat_id);
                }}
              >
                해당 채팅방 활성화
              </button>
            </li>
          );
        })}
      </ul>
      {!!currentChannel && (
        <section>
          <ul>
            {chatData?.map((chat) => {
              return <li key={chat.message_id}>{chat.content}</li>;
            })}
          </ul>
          <input ref={inputRef} placeholder="채팅 입력" />
          <button onClick={sendMessageHandler}>입력</button>
        </section>
      )}
    </div>
  );
};

export default ChatContainer;
