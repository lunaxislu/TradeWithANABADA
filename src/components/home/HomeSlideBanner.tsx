import { useEffect, useRef, useState } from 'react';
import { ReactComponent as Left } from '../../styles/assets/LeftButton.svg';
import { ReactComponent as Right } from '../../styles/assets/RightButton.svg';
import * as St from './home.styled';

const slideInfo = ['red', 'black', 'white', 'green', 'gray'];

const HomeSlideBanner = () => {
  const [currentIndex, setCurrentIndex] = useState<number>(1);

  const [isPause, setPause] = useState<boolean>(false);

  const slideRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const s = setInterval(() => {
      if (!isPause) nextButtonHandler();
      else clearInterval(s);
    }, 5000);
    return () => {
      clearInterval(s);
    };
  }, [currentIndex, isPause]);

  const targetSlide = [slideInfo[slideInfo.length - 1], ...slideInfo, slideInfo[0]];

  const prevButtonHandler = () => {
    setCurrentIndex((prev) => {
      slideRef.current!.style.transition = 'all 1s ease-in-out';
      return prev - 1;
    });
  };

  const nextButtonHandler = () => {
    setCurrentIndex((prev) => {
      slideRef.current!.style.transition = 'all 1s ease-in-out';
      return prev + 1;
    });
  };

  const InfiniteSlideHandler = (index: number) => {
    setTimeout(() => {
      if (slideRef.current) {
        slideRef.current.style.transition = '';
      }
      setCurrentIndex(index);
      setTimeout(() => {
        if (slideRef.current) {
          slideRef.current.style.transition = 'all 1ms ease-in-out';
        }
      }, 10);
    }, 1000);
  };

  if (currentIndex === 0) {
    InfiniteSlideHandler(targetSlide.length - 2);
  }

  if (currentIndex === targetSlide.length - 1) {
    InfiniteSlideHandler(1);
  }

  return (
    <St.SlideContainer onMouseEnter={() => setPause(true)} onMouseOut={() => setPause(false)}>
      <St.SlideViewer>
        <St.SlideItems ref={slideRef} $translateX={(100 / targetSlide.length) * currentIndex}>
          {targetSlide.map((item, index) => (
            <St.SlideItem key={index} $color={item} />
          ))}
        </St.SlideItems>
      </St.SlideViewer>

      <St.SlideButton onClick={prevButtonHandler}>
        <Left />
      </St.SlideButton>
      <St.SlideButton onClick={nextButtonHandler}>
        <Right />
      </St.SlideButton>
    </St.SlideContainer>
  );
};

export default HomeSlideBanner;
