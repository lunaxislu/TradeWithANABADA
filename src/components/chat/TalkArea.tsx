import { useState } from 'react';
import { useTalkContext } from '../../contexts/TalkContext';
import { ReactComponent as Talk } from '../../styles/assets/talk.svg';
import TalkChannelList from './TalkChannelList';
import TalkForm from './TalkForm';
import TalkLayout from './TalkLayout';
import * as St from './chat.styled';

const TalkArea = () => {
  const { invisible, currentChannel } = useTalkContext();
  const [talkOpen, isTalkOpen] = useState<boolean>(false);

  const talkToggle = () => {
    isTalkOpen((prev) => !prev);
  };

  return (
    <section>
      <figure onClick={talkToggle}>
        <Talk />
        <span>TALK</span>
      </figure>
      <St.InvisibleMessage>{invisible}</St.InvisibleMessage>

      <TalkLayout talkOpen={talkOpen}>
        {
          <>
            <TalkChannelList />
            {!!currentChannel && <TalkForm />}
          </>
        }
      </TalkLayout>
    </section>
  );
};

export default TalkArea;
