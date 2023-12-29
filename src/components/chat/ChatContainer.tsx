// import { RealtimeChannel } from '@supabase/supabase-js';
// import { useEffect, useState } from 'react';
// import { supabase } from '../../API/supabase.api';

const ChatContainer = () => {
  //   const [channel, setChannel] = useState<RealtimeChannel>();
  //   const [message, setMessages] = useState<string[]>();

  //   useEffect(() => {
  //     const channel = supabase.channel(`room:${1}`, {
  //       config: {
  //         broadcast: {
  //           self: true,
  //         },
  //       },
  //     });

  //     channel.on('broadcast', { event: 'message' }, ({ payload }) => {
  //       setMessages((messages) => [...messages!, payload]);
  //     });

  //     channel.subscribe();

  //     setChannel(channel);

  //     return () => {
  //       channel.unsubscribe();
  //       setChannel(undefined);
  //     };
  //   }, []);

  //   useEffect(() => {
  //     const { data: allChats } = getAllChats();
  //   });

  //   const getAllChats = async () => {
  //     const user = await getUserSession();
  //     // 로그인된 유저가 포함된 모든 채팅방 가져오기
  //     const { data: chatIds } = await supabase
  //       .from('chats')
  //       .select('id, users:chat_user!inner(user_id)')
  //       .eq('users.user_id', user.session?.user.id);

  //     return await supabase
  //       .from('chats')
  //       .select('*, users:chat_user!inner(user:users(id))')
  //       .in('id', [chatIds?.map((chat) => chat.id)]);
  //   };

  return <div></div>;
};

export default ChatContainer;
