import * as St from './BigImgCard.styled';

type PropsType = {
  showImages: string[];
  imageIndex: number;
};
const ImageCard = ({ showImages, imageIndex }: PropsType) => {
  return (
    <St.Container>
      {showImages.length > 0 ? (
        <img src={showImages[imageIndex]} alt="preview 이미지입니다." />
      ) : (
        <St.SampleImage>
          <img
            src={process.env.PUBLIC_URL + '/asset/product/productDefaultImg.png'}
            alt="상품등록 예시 이미지입니다."
          />
        </St.SampleImage>
      )}
    </St.Container>
  );
};

export default ImageCard;
