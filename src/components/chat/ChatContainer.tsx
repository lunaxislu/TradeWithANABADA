import { useEffect, useState } from 'react';
import { supabase } from '../../API/supabase.api';

const ChatContainer = () => {
  const [messages, setMessages] = useState<string[]>([]);
  // const [message, setMessage] = useState({ username: '', content: '' });
  const channelTest = supabase.channel('test-channel');
  useEffect(() => {
    const test = channelTest
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'chat_messages' }, (payload: any) => {
        console.log(payload);
        payload && setMessages((oldMessages) => [...oldMessages, payload.new]);
      })
      .subscribe();
    return () => {
      test.unsubscribe();
    };
  }, []);

  return <div>{/* <button onClick={sendMessage}>send</button> */}</div>;
};

export default ChatContainer;
