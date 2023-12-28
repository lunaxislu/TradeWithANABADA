import React, { useState } from 'react';
import SlideButton from '../SlideButton/SlideButton';
import ImageCard from '../imageCard/ImageCard';
import * as St from './ImageSlider.styled';

// type 입니다.
type SetStateProps = React.Dispatch<React.SetStateAction<string[]>>;
export type PropsWithSetState = {
  showImages: string[];
  setShowImages: SetStateProps;
};

const ImageSlider = ({ showImages, setShowImages }: PropsWithSetState) => {
  const [imageIndex, setImageIndex] = useState(0);
  const [noTransition, setNoTransition] = useState(false);
  // 다음 이미지 넘어가기 함수
  const showNextImg = () => {
    setImageIndex((idx) => {
      if (idx === showImages.length - 1) return 0;
      return idx + 1;
    });
  };

  // 이전 이미지로 넘어가는 함수
  const showPrevImg = () => {
    setImageIndex((idx) => {
      if (idx === 0) return showImages.length - 1;
      return idx - 1;
    });
  };

  return (
    <St.SliderContainer>
      <div className="slide-wrapper">
        {showImages.map((url, idx) => (
          <ImageCard
            key={url}
            url={url}
            imageIndex={imageIndex}
            idx={idx}
            setShowImages={setShowImages}
            showImages={showImages}
            setImageIndex={setImageIndex}
            noTransition={noTransition}
            setNoTransition={setNoTransition}
          />
        ))}
      </div>
      <SlideButton
        showImages={showImages}
        imageIndex={imageIndex}
        showNextImg={showNextImg}
        showPrevImg={showPrevImg}
      />
    </St.SliderContainer>
  );
};

export default ImageSlider;
