import React, { useState } from 'react';

import { createContext, useContext } from 'react';

type initStateType = {
  talkOpen: boolean;
  openTalk: () => void;
  closeTalk: () => void;
  toggleTalk: () => void;
};

const initialState: initStateType = {
  talkOpen: false,
  openTalk: () => {},
  closeTalk: () => {},
  toggleTalk: () => {},
};

// context 초기설정
const MainContext = createContext<initStateType | undefined>(undefined);

const MainContextProvider = ({ children }: React.PropsWithChildren) => {
  const [talkOpen, isTalkOpen] = useState(initialState.talkOpen);

  const openTalk = () => {
    isTalkOpen(true);
  };
  const closeTalk = () => {
    isTalkOpen(false);
  };
  const toggleTalk = () => {
    isTalkOpen((prev) => !prev);
  };

  const value = { talkOpen, openTalk, closeTalk, toggleTalk };
  return <MainContext.Provider value={value}>{children}</MainContext.Provider>;
};

export default MainContextProvider;

export const useMainContext = () => {
  const context = useContext(MainContext);
  if (!context) {
    throw new Error('useMyContext must be used within a MyContextProvider');
  }
  return context;
};
