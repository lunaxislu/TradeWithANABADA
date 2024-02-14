import { PropsWithChildren } from 'react';
import { useMainContext } from '../../contexts/MainContext';
import * as St from './chat.styled';

const TalkLayout = ({ children }: PropsWithChildren) => {
  const { talkOpen } = useMainContext();
  return <St.TalkContainer $talkOpen={talkOpen}>{children}</St.TalkContainer>;
};

export default TalkLayout;
