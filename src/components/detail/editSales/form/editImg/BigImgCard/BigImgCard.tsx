import * as St from './BigImgCard.styled';
type PropsType = {
  showImages: string[];
  imageIndex: number;
};
const BigImgCard = ({ showImages, imageIndex }: PropsType) => {
  return (
    <St.Container>
      {showImages.length > 0 && <img src={showImages[imageIndex]} alt="preview 이미지입니다." />}
    </St.Container>
  );
};

export default BigImgCard;
