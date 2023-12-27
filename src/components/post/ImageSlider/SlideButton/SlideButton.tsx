import { ReactComponent as LeftButton } from '../../../../styles/assets/LeftButton.svg';
import { ReactComponent as RightButton } from '../../../../styles/assets/RightButton.svg';
import * as St from './SlideButton.styled';

type ButtonProps = {
  showNextImg: () => void;
  showPrevImg: () => void;
  imageIndex: number;
  showImages: string[];
};
const SlideButton = ({ showPrevImg, showNextImg, imageIndex, showImages }: ButtonProps) => {
  return (
    <St.ButtonContainer className="button-group">
      <St.SlideButton className="left-button" $showImages={showImages} $imageIndex={imageIndex} onClick={showPrevImg}>
        <LeftButton />
      </St.SlideButton>

      <St.SlideButton className="right-button" $imageIndex={imageIndex} $showImages={showImages} onClick={showNextImg}>
        <RightButton />
      </St.SlideButton>
    </St.ButtonContainer>
  );
};

export default SlideButton;
