import { useState } from 'react';
import * as St from './ImgCard.styled';
type PropsType = { imgUrl: string[] };
const ImgCard = ({ imgUrl }: PropsType) => {
  const [imgIndex, setImgIndex] = useState(0);
  const showImg = (idx: number) => () => {
    setImgIndex(idx);
  };

  return (
    <St.Container>
      {/* 큰 사진 */}
      <div className="big-img_card">
        <img src={imgUrl[imgIndex]} alt="" />
      </div>

      {/* 작은 사진 */}
      <div className="sl-img_container">
        {imgUrl?.map((url, idx) => {
          return (
            <St.SmallImg key={url} src={url} $imgIndex={imgIndex} $idx={idx} alt="상품이미지" onClick={showImg(idx)} />
          );
        })}
      </div>
    </St.Container>
  );
};

export default ImgCard;
