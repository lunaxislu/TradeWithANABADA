import { useEffect, useRef, useState } from 'react';
import {
  ChatMessage,
  getSelectChatMessages,
  getUserSession,
  supabase,
  updateVisibleTrue,
} from '../../API/supabase.api';
import TalkMessage from './TalkMessage';
import * as St from './chat.styled';

type TalkFormProps = {
  currentChannel: number;
  setCurrentChannel: React.Dispatch<React.SetStateAction<number>>;
};

const TalkForm = ({ currentChannel, setCurrentChannel }: TalkFormProps) => {
  const [chatData, setChatData] = useState<ChatMessage[]>([]);
  const [otherUser, onOtherUser] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);

  //  메세지 보내기
  const sendMessageHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const currentUser = await getUserSession();
    await supabase.from('chat_messages').insert([
      {
        chat_id: currentChannel,
        content: inputRef.current?.value,
        author_id: currentUser.session?.user.id,
        // 유저가 보고있다면 true, false
        visible: otherUser,
      },
    ]);
  };

  const updateVisibleInfo = async () => {
    const currentUser = await getUserSession();
    await updateVisibleTrue(currentUser.session?.user.id!, currentChannel);
  };

  useEffect(() => {
    // 이전 메세지 가져오기
    const getSelectAllMessage = async () => {
      await updateVisibleInfo();
      const messageData = await getSelectChatMessages(currentChannel);
      setChatData(messageData);
    };

    const subscribeConfigSetting = async () => {
      const currentUser = await getUserSession();
      const currentUserId = currentUser.session?.user.id;
      const userStatus = {
        user: currentUserId,
        online_at: new Date().toISOString(),
      };

      channel
        .on('presence', { event: 'join' }, ({ key, newPresences }) => {
          if (newPresences[0].user !== currentUserId) {
            onOtherUser(true);
          }
        })
        .on('presence', { event: 'leave' }, ({ key, leftPresences }) => {
          if (leftPresences[0].user !== currentUserId) {
            onOtherUser(false);
          }
        })
        .subscribe(async (status) => {
          if (status !== 'SUBSCRIBED') {
            return;
          }
          const presenceTrackStatus = await channel.track(userStatus);
          console.log(presenceTrackStatus);
        });
    };

    // 채널 세팅 (동적으로 채널 변경)
    const channel = supabase.channel(`target_${currentChannel}`, {
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
          const newData = {
            current_chat_id: payload.new.chat_id,
            message_id: payload.new.id,
            message_created_at: payload.new.created_at,
            content: payload.new.content,
            author_id: payload.new.author_id,
            visible: payload.new.visible,
          };
          getSelectAllMessage();

          // setChatData((prev) => [...prev, newData]);
        },
      )
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'chat_messages',
          filter: `chat_id=eq.${currentChannel}`,
        },
        (payload) => {
          getSelectAllMessage();
        },
      );

    subscribeConfigSetting();
    getSelectAllMessage();

    const removeChannel = async () => {
      await supabase.removeChannel(channel);
    };

    return () => {
      removeChannel();
    };
  }, []);

  return (
    <St.TalkMessageContainer>
      <button
        onClick={() => {
          setCurrentChannel(0);
        }}
      >
        홈으로
      </button>

      <ul>
        {chatData?.map((chat) => {
          return <TalkMessage key={chat.message_id} chat={chat} />;
        })}
      </ul>

      <form onSubmit={sendMessageHandler}>
        <input ref={inputRef} placeholder="채팅 입력" />
        <button>입력</button>
      </form>
    </St.TalkMessageContainer>
  );
};

export default TalkForm;
