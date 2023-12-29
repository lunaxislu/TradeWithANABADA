import * as St from './ImageCard.styled';

type PropsType = {
  showImages: string[];
  imageIndex: number;
};
const ImageCard = ({ showImages, imageIndex }: PropsType) => {
  console.log('array', showImages);
  console.log('index', imageIndex);
  return (
    <St.Container>
      {showImages.length > 0 && <img src={showImages[imageIndex]} alt="preview 이미지입니다." />}
    </St.Container>
  );
};

export default ImageCard;
