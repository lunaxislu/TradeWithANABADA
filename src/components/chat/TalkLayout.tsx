import { PropsWithChildren } from 'react';
import * as St from './chat.styled';

const TalkLayout = ({ children }: PropsWithChildren) => {
  return <St.TalkContainer>{children}</St.TalkContainer>;
};

export default TalkLayout;
