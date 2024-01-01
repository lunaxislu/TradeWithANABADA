import { useEffect, useRef, useState } from 'react';
import { getCurrentUserChatChannel, getSelectChatMessages, getUserSession, supabase } from '../../API/supabase.api';

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
  const [channels, setChannels] = useState<ChannelInfo[] | []>([]);
  const [chatData, setChatData] = useState<ChatMessage[]>([]);

  const channel = supabase.channel(`${currentChannel}`, {
    config: {
      broadcast: { self: true },
    },
  });

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
    const data = await getCurrentUserChatChannel(currentUser.session?.user.id!);
    setChannels(data);
  };

  const getSelectAllMessage = async () => {
    const messageData = await getSelectChatMessages(currentChannel);
    setChatData(messageData);
  };

  const activeChannel = channel
    .on(
      'postgres_changes',
      {
        event: 'INSERT',
        schema: 'public',
        table: 'chat_messages',
        filter: `chat_id=eq.${currentChannel}`,
      },
      (payload) => {
        console.log(payload);
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
      getSelectAllMessage();
    }
  }, [currentChannel]);

  useEffect(() => {
    // 전체 채널 가져오기
    getCurrectChannel();
  }, []);

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
