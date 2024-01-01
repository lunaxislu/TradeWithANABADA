import { useTalkContext } from '../../contexts/TalkContext';
import { ReactComponent as Talk } from '../../styles/assets/talk.svg';
import TalkChannelList from './TalkChannelList';
import TalkForm from './TalkForm';
import TalkLayout from './TalkLayout';
import * as St from './chat.styled';

const TalkArea = () => {
  const { currentChannel } = useTalkContext();
  const { invisible } = useTalkContext();

  return (
    <section>
      <figure>
        <Talk />
        <span>TALK</span>
      </figure>
      <St.InvisibleMessage>{invisible}</St.InvisibleMessage>
      <TalkLayout>
        {
          <>
            {!!currentChannel && <TalkForm />}
            <TalkChannelList />
          </>
        }
      </TalkLayout>
    </section>
  );
};

export default TalkArea;
