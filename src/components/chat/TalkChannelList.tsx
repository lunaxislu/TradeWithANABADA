import { useEffect } from 'react';
import { useTalkContext } from '../../contexts/TalkContext';
import TalkChannelCard from './TalkChannelCard';
import * as St from './chat.styled';

const TalkChannelList = () => {
  const { updateChannelStatus, userAllChannelInfo } = useTalkContext();
  // const [channels, setChannels] = useState<ChannelInfoUserTracking[] | []>([]);

  // const update = async () => {
  //   const currentUser = await getUserSession();
  //   const channelsInfo = await getCurrentUserChatChannel(currentUser.session?.user.id!);

  //   // const mappingData = data.map((d) => {
  //   //   return { ...d, isEnter: false };
  //   // });

  //   // 읽지 않은 메시지 수 보이기
  //   let totalInvisibleNum = 0;
  //   channelsInfo.forEach((channel) => (totalInvisibleNum += channel.invisible_count));
  //   setInvisible(totalInvisibleNum);

  //   setChannels(
  //     channelsInfo.map((d) => {
  //       return {
  //         ...d,
  //         isEnter:
  //           channels.find((channel) => {
  //             return d.chat_id === channel.chat_id;
  //           })?.isEnter || false,
  //       };
  //     }),
  //   );
  // };
  // 최초 mount 시 유저의 모든 채널 가져오기
  useEffect(() => {
    // const currentUser = await getUserSession();
    // const data = await getCurrentUserChatChannel(currentUser.session?.user.id!);
    // setChannels(data);
    // const setUserConfig = async () => {
    // const currentUser = await getUserSession();
    // const currentUserId = currentUser.session?.user.id;

    // const data = await getCurrentUserChatChannel(currentUserId!);
    // setChannels(
    //   data.map((d) => {
    //     return { ...d, isEnter: false };
    //   }),
    // );

    // // 읽지 않은 메시지 수 보이기
    // let totalInvisibleNum = 0;
    // data.forEach((item) => (totalInvisibleNum += item.invisible_count));
    // setInvisible(totalInvisibleNum);
    // await updateChannelStatus()

    //   const userStatus = {
    //     user: currentUserId,
    //     online_at: new Date().toISOString(),
    //   };

    //   const userChannels = data.map((channel) => channel.chat_id);

    //   userChannels.forEach((id) => {
    //     const trackChannel = supabase.channel(`${id}`);
    //     trackChannel
    //       .on(
    //         'postgres_changes',
    //         {
    //           event: '*',
    //           schema: 'public',
    //           table: 'chat_messages',
    //           filter: `chat_id=eq.${id}`,
    //         },
    //         (payload) => {
    //           console.log(payload);
    //           update();
    //         },
    //       )
    //       .on('presence', { event: 'join' }, ({ key, newPresences }) => {
    //         if (newPresences[0].user !== currentUserId) {
    //           console.log(newPresences);
    //           setChannels((prevChannelsInfo) => {
    //             const changeChannelsInfo = prevChannelsInfo.map((info) => {
    //               if (info.chat_id === id) return { ...info, isEnter: true };
    //               return info;
    //             });
    //             return changeChannelsInfo;
    //           });
    //         }
    //       })
    //       .on('presence', { event: 'leave' }, ({ key, leftPresences }) => {
    //         console.log(leftPresences);
    //         if (leftPresences[0].user !== currentUserId) {
    //           setChannels((prevChannelsInfo) => {
    //             const changeChannelsInfo = prevChannelsInfo.map((info) => {
    //               if (info.chat_id === id) return { ...info, isEnter: false };
    //               return info;
    //             });
    //             return changeChannelsInfo;
    //           });
    //         }
    //       })
    //       .subscribe(async (status) => {
    //         if (status !== 'SUBSCRIBED') {
    //           return;
    //         }
    //         await trackChannel.track(userStatus);
    //       });
    //   });
    // };

    // setUserConfig();
    updateChannelStatus();
  }, []);

  return (
    <St.TalkListContainer>
      <h2>현재 진행중인 대화</h2>
      <span>대화를 통해 물물교환을 진행해보세요.</span>
      <span>상대방을 존중하며 대화하세요</span>
      <ul>
        {userAllChannelInfo?.map((channel) => {
          return <TalkChannelCard key={channel.chat_id} channel={channel} />;
        })}
      </ul>
    </St.TalkListContainer>
  );
};

export default TalkChannelList;
