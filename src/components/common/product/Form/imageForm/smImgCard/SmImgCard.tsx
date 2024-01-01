import React from 'react';
import * as St from './SmImgCard.styled';
type SetStateProps = React.Dispatch<React.SetStateAction<number>>;

type PropsOfSmImgCard = {
  showImages: string[];
  setImageIndex: SetStateProps;
  deletePreviewImage: (param: number) => void;
  imageIndex: number;
};
const SmImgCard = ({ showImages, setImageIndex, deletePreviewImage, imageIndex }: PropsOfSmImgCard) => {
  return (
    <St.Container>
      {showImages.map((url, idx) => {
        return (
          <div
            key={url}
            onClick={() => {
              setImageIndex(idx);
            }}
          >
            <St.Img $idx={idx} $imageIndex={imageIndex} src={url} alt="preview 이미지의 small 버전" />
            <St.DeleteImg
              onClick={(e) => {
                e.stopPropagation();
                deletePreviewImage(idx);
              }}
            />
          </div>
        );
      })}
      <label htmlFor="file">이미지는 최대 5장</label>
    </St.Container>
  );
};

export default SmImgCard;
