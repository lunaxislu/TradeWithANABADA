import { useState } from 'react';
import { ReactComponent as Talk } from '../../styles/assets/talk.svg';
import TalkChannelList from './TalkChannelList';
import TalkForm from './TalkForm';
import TalkLayout from './TalkLayout';

const TalkArea = () => {
  const [currentChannel, setCurrentChannel] = useState<number>(0);

  return (
    <section>
      <figure>
        <Talk />
        <span>TALK</span>
      </figure>
      <TalkLayout>
        {!!currentChannel ? (
          <TalkForm currentChannel={currentChannel} setCurrentChannel={setCurrentChannel} />
        ) : (
          <TalkChannelList setCurrentChannel={setCurrentChannel} />
        )}
      </TalkLayout>
    </section>
  );
};

export default TalkArea;
