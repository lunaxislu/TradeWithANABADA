import { useEffect, useRef, useState } from 'react';
import { Tables } from '../../../database.types';
import { getUserInfo, sendMessage, supabase, updateVisibleTrue } from '../../API/supabase.api';
import { useTalkContext } from '../../contexts/TalkContext';
import TalkMessage from './TalkMessage';
import * as St from './chat.styled';

const initialUser = {
  avatar_img: '',
  created_at: '',
  email: '',
  id: '',
  nickname: '',
  point: 0,
};

const TalkForm = () => {
  const {
    changeCurrentChannel,
    currentChannel,
    currentUserInfo,
    TalkChannelMessageSubscribeSetting,
    getCurrentChannelAllMessage,
    talkMessages,
    userAllChannelInfo,
  } = useTalkContext();

  const [otherUserIn, onOtherUserIn] = useState<boolean>(false);
  const [otherUserInfo, setOtherUserInfo] = useState<Tables<'users'>>(initialUser);

  const messageListRef = useRef<HTMLUListElement>(null);

  const inputRef = useRef<HTMLInputElement>(null);

  //  메세지 보내기
  const sendMessageHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const message = inputRef.current?.value;
    if (!message) return;
    await sendMessage(currentChannel, message, otherUserIn);
  };

  useEffect(() => {
    scrollMessageSection();
  }, [talkMessages]);

  const updateVisibleInfo = async () => {
    await updateVisibleTrue(currentUserInfo.session?.user.id!, currentChannel);
  };

  const getOtherUserInfo = async () => {
    const currentChannelInfo = userAllChannelInfo.find((channelInfo) => channelInfo.chat_id === currentChannel)!;

    if (currentChannelInfo?.user1_id === currentUserInfo.session?.user.id) {
      const userData = await getUserInfo(currentChannelInfo?.user2_id);
      setOtherUserInfo(userData![0]);
      return;
    }

    const userData = await getUserInfo(currentChannelInfo?.user1_id);
    setOtherUserInfo(userData![0]);
  };

  const initMessageSetting = async () => {
    await updateVisibleInfo();
    await getOtherUserInfo();
    await getCurrentChannelAllMessage();
    scrollMessageSection();
  };

  const scrollMessageSection = () => {
    if (messageListRef.current) messageListRef.current.scrollTop = messageListRef.current.scrollHeight;
  };
  useEffect(() => {
    initMessageSetting();
    const messageChannel = supabase.channel(`message_channel_${currentChannel}`);

    const userStatus = {
      user: currentUserInfo.session?.user.id,
      online_at: new Date().toISOString(),
    };

    TalkChannelMessageSubscribeSetting(messageChannel);

    messageChannel
      .on('presence', { event: 'join' }, ({ newPresences }) => {
        if (newPresences[0].user !== currentUserInfo.session?.user.id) {
          onOtherUserIn(true);
        }
      })
      .on('presence', { event: 'leave' }, ({ leftPresences }) => {
        if (leftPresences[0].user !== currentUserInfo.session?.user.id) {
          onOtherUserIn(false);
        }
      })
      .subscribe(async (status) => {
        if (status !== 'SUBSCRIBED') {
          return;
        }
        await messageChannel.track(userStatus);
      });

    const removeChannel = async () => {
      await supabase.removeChannel(messageChannel);
    };

    return () => {
      removeChannel();
    };
  }, []);

  return (
    <St.TalkMessageContainer>
      <button
        onClick={() => {
          changeCurrentChannel(0);
        }}
      >
        홈으로
      </button>

      {/* 상대방 user Info */}
      <St.TalkFormUserInfo>
        <img src={otherUserInfo.avatar_img!}></img>
        <h2>{otherUserInfo.nickname}</h2>
      </St.TalkFormUserInfo>

      <ul ref={messageListRef}>
        {talkMessages?.map((talk) => {
          if (talk.author_id === otherUserInfo.id) {
            return (
              <TalkMessage key={talk.message_id} chat={talk} $style={{ 'x-position': 'start', color: '#f8c291' }} />
            );
          } else {
            return <TalkMessage key={talk.message_id} chat={talk} $style={{ 'x-position': 'end', color: '#82ccdd' }} />;
          }
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
