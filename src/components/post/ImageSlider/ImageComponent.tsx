import { ChangeEvent, useState } from 'react';
import ImageSlider from './ImageSlider';
import * as St from './ImageSlider.styled';
type EventObject = ChangeEvent<HTMLInputElement>;

const ImageComponent = () => {
  const [showImages, setShowImages] = useState<string[]>([]);

  const previewImages = (e: EventObject) => {
    const imageList = e.target.files || [];
    let imagesUrl = [...showImages];

    // // type에서 null에러가 뜨길래 해줬습니다.
    // if (!imageList) return; 위의 10번째에서 빈 배열 넣어줬씁니다.

    // 값이 null이 아니라면 아래 로직을 수행합니다.
    for (let i = 0; i < imageList.length; i++) {
      const currentImageUrl = URL.createObjectURL(imageList[i]);
      imagesUrl.push(currentImageUrl);
    }

    // 이미지 Url은 최대 5개로 지정한 조건문입니다.
    if (imagesUrl.length > 5) imagesUrl.splice(0, 5);
    setShowImages(imagesUrl);
  };

  const deletePreviewImage = (id: number) => {
    const editImages = showImages.filter((_, idx) => idx !== id);
  };

  return (
    <St.Container>
      {showImages.length ? <ImageSlider showImages={showImages} setShowImages={setShowImages} /> : null}
      <input type="file" onChange={previewImages} multiple />
    </St.Container>
  );
};

export default ImageComponent;
