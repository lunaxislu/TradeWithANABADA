import { supabase } from '../../API/supabase.api';

const ChatContainer = () => {
  supabase.channel('chats').on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'chats' }, () => {
    console.log('finish');
  });
  return <div></div>;
};

export default ChatContainer;
