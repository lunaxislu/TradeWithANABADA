import { useEffect, useRef, useState } from 'react';
import {
  ChannelInfo,
  ChatMessage,
  getCurrentUserChatChannel,
  getSelectChatMessages,
  getUserSession,
  supabase,
} from '../../API/supabase.api';
import { ReactComponent as Talk } from '../../styles/assets/talk.svg';
import { displayCreateAt } from '../../utils/date';
import TalkLayout from './TalkLayout';

const TalkArea = () => {
  const [currentChannel, setCurrentChannel] = useState<number>(0);
  const [channels, setChannels] = useState<ChannelInfo[] | []>([]);
  const [chatData, setChatData] = useState<ChatMessage[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  // 채널 세팅 (동적으로 채널 변경)
  const channel = supabase.channel(`${currentChannel}`, {
    config: {
      broadcast: { self: true },
    },
  });

  // 연결된 채널에 연결된 table의 insert 동작을 구독 (동적으로 변경)
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

  // 전체 채널 가져오기
  const getAllChannel = async () => {
    const currentUser = await getUserSession();
    const data = await getCurrentUserChatChannel(currentUser.session?.user.id!);
    setChannels(data);
  };

  // 이전 메세지 가져오기
  const getSelectAllMessage = async () => {
    const messageData = await getSelectChatMessages(currentChannel);
    setChatData(messageData);
  };

  //  메세지 보내기
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

  // 최초 mount 시 유저의 모든 채널 가져오기
  useEffect(() => {
    getAllChannel();
  }, []);

  // 유저가 채팅방을 클릭 할 시 해당 채널의 message 가져오기
  useEffect(() => {
    // 채널 정보 가져오기
    if (currentChannel) {
      getSelectAllMessage();
    }
  }, [currentChannel]);

  return (
    <section>
      <figure>
        <Talk />
        <span>TALK</span>
      </figure>
      <TalkLayout>
        {!!currentChannel ? (
          <section>
            <button
              onClick={() => {
                setCurrentChannel(0);
              }}
            >
              홈으로
            </button>
            <ul>
              {chatData?.map((chat) => {
                return <li key={chat.message_id}>{chat.content}</li>;
              })}
            </ul>
            <input ref={inputRef} placeholder="채팅 입력" />
            <button onClick={sendMessageHandler}>입력</button>
          </section>
        ) : (
          <ul>
            {channels?.map((channel) => {
              return (
                <li
                  key={channel.chat_id}
                  style={{ display: 'flex', flexDirection: 'column', marginTop: '5rem', alignItems: 'start' }}
                  onClick={() => {
                    activeChannel.unsubscribe();
                    setCurrentChannel(channel.chat_id);
                  }}
                >
                  <div>
                    <span>채팅 미리보기: {channel.messages[0].content}</span>
                    <span>마지막 채팅 일시 : {displayCreateAt(channel.messages[0].message_created_at)}</span>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </TalkLayout>
    </section>
  );
};

export default TalkArea;
