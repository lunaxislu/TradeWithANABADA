import { useState } from 'react';
import { ReactComponent as Talk } from '../../styles/assets/talk.svg';
import TalkChannelList from './TalkChannelList';
import TalkForm from './TalkForm';
import TalkLayout from './TalkLayout';
import * as St from './chat.styled';

const TalkArea = () => {
  const [currentChannel, setCurrentChannel] = useState<number>(0);
  const [invisible, setInvisible] = useState<number>(0);

  return (
    <section>
      <figure>
        <Talk />
        <span>TALK</span>
      </figure>
      <St.InvisibleMessage>{invisible}</St.InvisibleMessage>
      <TalkLayout>
        {!!currentChannel ? (
          <TalkForm currentChannel={currentChannel} setCurrentChannel={setCurrentChannel} />
        ) : (
          <TalkChannelList setCurrentChannel={setCurrentChannel} setInvisible={setInvisible} />
        )}
      </TalkLayout>
    </section>
  );
};

export default TalkArea;
