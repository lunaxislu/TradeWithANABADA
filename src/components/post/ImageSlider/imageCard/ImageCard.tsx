import { PropsWithSetState } from '../imageSlider/ImageSlider';
import * as St from './ImageCard.styled';

type PropsCardType = {
  url: string;
  imageIndex: number;
  idx: number;
  setImageIndex: React.Dispatch<React.SetStateAction<number>>;
  setNoTransition: React.Dispatch<React.SetStateAction<boolean>>;
  noTransition: boolean;
} & PropsWithSetState;

const ImageCard = ({
  url,
  imageIndex,
  idx,
  setShowImages,
  showImages,
  setImageIndex,
  setNoTransition,
  noTransition,
}: PropsCardType) => {
  // previewImage 삭제 버튼입니다.
  const deletePreviewImage = (id: number) => () => {
    const editImages = showImages.filter((_, idx) => idx !== id);

    setImageIndex((prev) => {
      if (id === 0) {
        return 0;
      } else {
        return prev - 1;
      }
    });
    setNoTransition(true);
    setShowImages(editImages);
    setTimeout(() => setNoTransition(false), 500);
  };

  return (
    <St.Card>
      <St.CardImg src={url} $imageIndex={imageIndex} $noTransition={noTransition} />
      <St.DeleteBtn className="delete-button" onClick={deletePreviewImage(idx)} />
    </St.Card>
  );
};

export default ImageCard;
