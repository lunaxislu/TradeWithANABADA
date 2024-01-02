import { useEffect, useRef, useState } from 'react';
import { Tables } from '../../../database.types';
import { getUserInfo, sendMessage, supabase, updateVisibleTrue } from '../../API/supabase.api';
import { useTalkContext } from '../../contexts/TalkContext';
import { ReactComponent as Cancel } from '../../styles/assets/cancel.svg';
import { ReactComponent as ImageSelector } from '../../styles/assets/imageSelector.svg';
import { ReactComponent as SendMessage } from '../../styles/assets/sendMessage.svg';
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
  const [selectImage, setSelectImage] = useState<File[] | null>(null);

  const fileRef = useRef<HTMLInputElement>(null);

  //  메세지 보내기 (type=message/image)
  const sendMessageHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const message = inputRef.current?.value;

    // 이미지가 없을 때
    if (!selectImage) {
      // 메시지가 없다 => 입력값이 없다.
      if (!message) {
        alert('메시지를 입력하세요.');
        return;
      }
      // 메시지 형식 : type message
      await sendMessage({
        currentChannel,
        message,
        otherUserIn,
        image: null,
        type: 'message',
      });
      inputRef.current.value = '';
      return;
    }
    // 이미지가 있을 때 : type image
    else {
      await sendMessage({
        currentChannel,
        message: message ? message : null,
        otherUserIn,
        image: selectImage[0],
        type: 'image',
      });
      if (inputRef.current) inputRef.current.value = '';
      fileDeleteHandler();
    }
  };

  //  메세지 보내기 (type=request)
  const sendRequestMessageHandler = async () => {
    await sendMessage({
      currentChannel,
      message: null,
      otherUserIn,
      image: null,
      type: 'request',
    });
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

  const fileChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length === 0) {
      setSelectImage(null);
      return;
    } else {
      const convertArray = Array.from(e.target.files!);
      setSelectImage(convertArray);
    }
  };

  const fileDeleteHandler = () => {
    setSelectImage(null);
    if (fileRef.current) fileRef.current.value = '';
  };

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
              <TalkMessage key={talk.message_id} chat={talk} $style={{ 'x-position': 'start', color: '#FFFFFF' }} />
            );
          } else {
            return <TalkMessage key={talk.message_id} chat={talk} $style={{ 'x-position': 'end', color: '#000000' }} />;
          }
        })}
      </ul>

      <St.InputForm onSubmit={sendMessageHandler}>
        <button type="button" onClick={sendRequestMessageHandler}>
          물품교환 신청하기
        </button>

        <St.InputArea>
          <label htmlFor="file-selector">
            <ImageSelector />
          </label>
          <div>
            <input ref={inputRef} placeholder="채팅 입력" />
            <button type="submit">
              <SendMessage />
            </button>
          </div>
          <input type="file" id="file-selector" onChange={fileChangeHandler} ref={fileRef} accept="image/*" />
        </St.InputArea>

        {!!selectImage && (
          <St.SelectImageSection>
            <span>선택된 이미지 : {selectImage[0].name}</span>
            <button onClick={fileDeleteHandler}>
              <Cancel />
            </button>
          </St.SelectImageSection>
        )}
      </St.InputForm>
    </St.TalkMessageContainer>
  );
};

export default TalkForm;
