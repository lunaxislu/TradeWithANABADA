import { useEffect, useState } from 'react';
import { Tables } from '../../../database.types';
import { ChannelInfo, getUserInfo, supabase } from '../../API/supabase.api';
import { useTalkContext } from '../../contexts/TalkContext';
import { ReactComponent as UserOn } from '../../styles/assets/userOn.svg';
import { displayCreateAt } from '../../utils/date';
import * as St from './chat.styled';

type TalkChannelCardProps = {
  channel: ChannelInfo;
};

const initialUser = {
  avatar_img: '',
  created_at: '',
  email: '',
  id: '',
  nickname: '',
  point: 0,
};

const TalkChannelCard = ({ channel }: TalkChannelCardProps) => {
  const { TalkChannelSubscribeSetting, currentUserInfo, changeCurrentChannel } = useTalkContext();

  const [otherUserInPage, isOtherUserInPage] = useState<boolean>(false);
  const [otherUser, setOtherUser] = useState<Tables<'users'>>(initialUser);

  useEffect(() => {
    // presence 정보 저장
    const userStatus = {
      user: currentUserInfo.session?.user.id,
      online_at: new Date().toISOString(),
    };

    // 채널 선언
    const trackChannel = supabase.channel(`talkChannel_${channel.chat_id}`);
    TalkChannelSubscribeSetting(trackChannel, channel.chat_id);

    trackChannel
      .on('presence', { event: 'sync' }, () => {
        const newState = trackChannel.presenceState();
        const currentSessionInfo = Object.values(newState);
        isOtherUserInPage(
          currentSessionInfo.some((session) => {
            if ('user' in session[0]) {
              return currentUserInfo.session?.user.id !== session[0].user;
            }
          }),
        );
      })
      .subscribe(async (status) => {
        if (status !== 'SUBSCRIBED') {
          return;
        }
        await trackChannel.track(userStatus);
      });

    const getOtherUserInfo = async () => {
      if (channel.user1_id === currentUserInfo.session?.user.id) {
        const otherUserData = await getUserInfo(channel.user2_id);
        if (otherUserData) setOtherUser(otherUserData[0]);
      }
      if (channel.user2_id === currentUserInfo.session?.user.id) {
        const otherUserData = await getUserInfo(channel.user1_id);
        if (otherUserData) setOtherUser(otherUserData[0]);
      }
    };
    getOtherUserInfo();
  }, []);

  console.log(channel.messages);

  return (
    <St.TalkChannelCardItem
      key={channel.chat_id}
      onClick={() => {
        changeCurrentChannel(channel.chat_id);
      }}
    >
      <figure>
        <img src={otherUser.avatar_img!} />
      </figure>

      <div>
        {/* 유저정보 */}
        <St.TalkCardUserInfo>
          <h3>{otherUser.nickname}</h3>
          {otherUserInPage && <UserOn />}
        </St.TalkCardUserInfo>

        {/* preview */}
        <div>
          <span>{channel.messages[0].content}</span>
          <span>{displayCreateAt(channel.messages[0].message_created_at)}</span>
        </div>
      </div>
      {!!channel.invisible_count && <St.InvisibleMessage>{channel.invisible_count}</St.InvisibleMessage>}
    </St.TalkChannelCardItem>
  );
};

export default TalkChannelCard;
