import { RealtimeChannel, Session } from '@supabase/supabase-js';
import { createContext, useContext, useEffect, useState } from 'react';
import { ChannelInfo, getCurrentUserChatChannel, getSelectChatMessages, getUserSession } from '../API/supabase.api';

type Messages = {
  message_id: string;
  message_created_at: string;
  current_chat_id: number;
  content: string;
  author_id: string;
  visible: boolean;
  type: string;
  img_src: string;
  request_answer: boolean;
};

type initStateType = {
  userAllChannelInfo: [] | ChannelInfo[];
  currentChannel: number;
  changeCurrentChannel: (arg1: number) => void;
  talkMessages: Messages[] | [];
  invisible: number;
  currentUserInfo:
    | {
        session: Session;
      }
    | {
        session: null;
      };

  updateChannelStatus: () => Promise<void>;
  getCurrentChannelAllMessage: () => Promise<void>;
  TalkChannelSubscribeSetting: (arg1: RealtimeChannel, arg2: number) => void;
  TalkChannelMessageSubscribeSetting: (channel: RealtimeChannel) => void;
};

const initialState: initStateType = {
  userAllChannelInfo: [],
  currentChannel: 0,
  changeCurrentChannel: (num) => {},
  talkMessages: [],
  invisible: 0,
  currentUserInfo: { session: null },
  updateChannelStatus: async () => {},
  getCurrentChannelAllMessage: async () => {},
  TalkChannelSubscribeSetting: (channel, channelId) => {},
  TalkChannelMessageSubscribeSetting: (channel) => {},
};

// context 초기설정
const TalkContext = createContext<initStateType | undefined>(undefined);

const TalkContextProvider = ({ children }: React.PropsWithChildren) => {
  // 전체 채널 정보
  const [userAllChannelInfo, setUserAllChannelInfo] = useState(initialState.userAllChannelInfo);
  // 현재 채널
  // default 0 > 채널 구독 x 상태
  const [currentChannel, setCurrentChannel] = useState(initialState.currentChannel);
  // 현재 채널의 전체 메시지를 관리하는 state
  const [talkMessages, setTalkMessages] = useState(initialState.talkMessages);
  // 현재 유저의 채팅방 중 읽지 않은 모든 메시지 개수
  const [invisible, setInvisible] = useState(initialState.invisible);
  // 현재 유저 정보
  const [currentUserInfo, setCurrentUserInfo] = useState(initialState.currentUserInfo);

  // currentUser 관련
  // func: 현재 유저를 가져오는 함수
  const getCurrentUserInfo = async () => {
    const currentUser = await getUserSession();
    setCurrentUserInfo(currentUser);
  };

  // func: 정보가 업데이트 될 때마다 채팅방 상태를 업데이트 하는 함수
  const updateChannelStatus = async () => {
    const currentUser = await getUserSession();
    // 현재유저에 따른 전체 채팅방 정보 가져오기
    const currentUserChatChannels = await getCurrentUserChatChannel(currentUser.session?.user.id!);

    // 전체채팅방에 따른 안읽은 메시지 개수 저장
    setInvisibleMessageCount(currentUserChatChannels);

    // 현재유저에 따른 전체 채팅방 정보 state에 저장
    setUserAllChannelInfo(currentUserChatChannels);
  };

  // func: 정보가 업데이트 될 때마다 채팅방 메시지를 업데이트 하는 함수
  const getCurrentChannelAllMessage = async () => {
    // 현재유저에 따른 전체 채팅방 정보 가져오기
    try {
      const currentChannelAllMessage = await getSelectChatMessages(currentChannel);
      setTalkMessages(currentChannelAllMessage);
    } catch (error) {
      throw error;
    }
  };

  // func: 전체 채팅방에서 읽지않은 메시지 개수를 저장하는 함수
  const setInvisibleMessageCount = (channelsInfo: [] | ChannelInfo[]) => {
    let totalInvisibleNum = 0;
    channelsInfo.forEach((channel) => (totalInvisibleNum += channel.invisible_count));
    setInvisible(totalInvisibleNum);
  };

  // func: 채널 구독을 실시하는 이벤트
  const TalkChannelSubscribeSetting = (channel: RealtimeChannel, channelId: number) => {
    // 채널 구독 이벤트 설정 및 구독
    channel.on(
      // realtime table의 변경상태 구독
      'postgres_changes',
      {
        // INSERT UPDATE 등 모든 변경상태 구독
        event: '*',
        schema: 'public',
        // 변경상태를 구독할 table 지정
        table: 'chat_messages',
        // table 내에서도 다음 조건을 만족할 때만 구독
        filter: `chat_id=eq.${channelId}`,
      },
      // 위 조건을 만족할 때 다음 콜백 실행
      updateChannelStatus,
    );
  };

  // func: 특정채팅방의 메시지를 구독하는 이벤트
  const TalkChannelMessageSubscribeSetting = (channel: RealtimeChannel) => {
    // 채널 구독 이벤트 설정 및 구독
    channel
      .on(
        // realtime table의 변경상태 구독
        'postgres_changes',
        {
          // INSERT UPDATE 등 모든 변경상태 구독
          event: 'INSERT',
          schema: 'public',
          // 변경상태를 구독할 table 지정
          table: 'chat_messages',
          // table 내에서도 다음 조건을 만족할 때만 구독
          filter: `chat_id=eq.${currentChannel}`,
        },
        // 위 조건을 만족할 때 다음 콜백 실행
        getCurrentChannelAllMessage,
      )
      .on(
        // realtime table의 변경상태 구독
        'postgres_changes',
        {
          // INSERT UPDATE 등 모든 변경상태 구독
          event: 'UPDATE',
          schema: 'public',
          // 변경상태를 구독할 table 지정
          table: 'chat_messages',
          // table 내에서도 다음 조건을 만족할 때만 구독
          filter: `chat_id=eq.${currentChannel}`,
        },
        // 위 조건을 만족할 때 다음 콜백 실행
        getCurrentChannelAllMessage,
      );
  };

  // 선택한 채널을 변경해주는 로직
  const changeCurrentChannel = (channel: number) => {
    setCurrentChannel(channel);
  };

  // effect: 유저 정보 업데이트
  useEffect(() => {
    getCurrentUserInfo();
  }, []);

  const value = {
    userAllChannelInfo,
    currentChannel,
    talkMessages,
    invisible,
    currentUserInfo,
    updateChannelStatus,
    TalkChannelSubscribeSetting,
    getCurrentChannelAllMessage,
    changeCurrentChannel,
    TalkChannelMessageSubscribeSetting,
  };
  return <TalkContext.Provider value={value}>{children}</TalkContext.Provider>;
};

export default TalkContextProvider;

export const useTalkContext = () => {
  const context = useContext(TalkContext);
  if (!context) {
    throw new Error('useMyContext must be used within a MyContextProvider');
  }
  return context;
};
