import { PropsWithChildren } from 'react';
import * as St from './chat.styled';

type TalkLayoutType = {
  talkOpen: boolean;
};
const TalkLayout = ({ children, talkOpen }: PropsWithChildren<TalkLayoutType>) => {
  return <St.TalkContainer $talkOpen={talkOpen}>{children}</St.TalkContainer>;
};

export default TalkLayout;
