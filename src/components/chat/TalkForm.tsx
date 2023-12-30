import { useEffect, useRef, useState } from 'react';
import { ChatMessage, getSelectChatMessages, getUserSession, supabase } from '../../API/supabase.api';

type TalkFormProps = {
  currentChannel: number;
  setCurrentChannel: React.Dispatch<React.SetStateAction<number>>;
};

const TalkForm = ({ currentChannel, setCurrentChannel }: TalkFormProps) => {
  const [chatData, setChatData] = useState<ChatMessage[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  //  메세지 보내기
  const sendMessageHandler = async () => {
    const currentUser = await getUserSession();
    await supabase.from('chat_messages').insert([
      {
        chat_id: currentChannel,
        content: inputRef.current?.value,
        author_id: currentUser.session?.user.id,
      },
    ]);
  };

  // 이전 메세지 가져오기
  const getSelectAllMessage = async () => {
    const messageData = await getSelectChatMessages(currentChannel);
    setChatData(messageData);
  };

  useEffect(() => {
    getSelectAllMessage();

    // 채널 세팅 (동적으로 채널 변경)
    const channel = supabase.channel(`${currentChannel}`, {
      config: {
        broadcast: { self: true },
      },
    });
    // 연결된 채널에 연결된 table의 insert 동작을 구독 (동적으로 변경)
    channel
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'chat_messages',
          filter: `chat_id=eq.${currentChannel}`,
        },
        (payload) => {
          console.log('트리거 세부');
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

    const removeChannel = async () => {
      await supabase.removeChannel(channel);
    };
    console.log(supabase.getChannels());

    return () => {
      removeChannel();
    };
  }, []);

  return (
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
  );
};

export default TalkForm;
