import React from 'react';

type SetStateProps = React.Dispatch<React.SetStateAction<string[]>>;
type PropsWithSetState = {
  showImages: string[];
  setShowImages: SetStateProps;
};

const ImageSlider = ({ showImages, setShowImages }: PropsWithSetState) => {
  return <div></div>;
};

export default ImageSlider;
