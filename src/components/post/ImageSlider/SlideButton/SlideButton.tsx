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
      <St.SlideButton
        className="left-button"
        $showImages={showImages}
        $imageIndex={imageIndex}
        onClick={showPrevImg}
      ></St.SlideButton>
      <St.SlideButton
        className="right-button"
        $imageIndex={imageIndex}
        $showImages={showImages}
        onClick={showNextImg}
      ></St.SlideButton>
    </St.ButtonContainer>
  );
};

export default SlideButton;
