import { ChangeEvent, useEffect, useRef, useState } from 'react';
import * as St from './ImageContainer.styled';
import ImageSlider from './imageSlider/ImageSlider';

type EventObject = ChangeEvent<HTMLInputElement>;

type PropsType = {
  imgFiles: File[];
  setImgFiles: React.Dispatch<React.SetStateAction<File[]>>;
};

const ImageContainer = ({ imgFiles, setImgFiles }: PropsType) => {
  const [showImages, setShowImages] = useState<string[]>([]);
  const inputFileRef = useRef<HTMLInputElement>(null);

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

    setImgFiles((prev) => [...prev, e.target.files![0]]);
  };
  // 이미지가 등록되면 input file을 초기화 시켜줍니다.
  useEffect(() => {
    if (inputFileRef.current) {
      inputFileRef.current.value = '';
    }
  }, [imgFiles]);

  return (
    <St.Container>
      {showImages.length ? (
        <ImageSlider
          showImages={showImages}
          setShowImages={setShowImages}
          setImgFiles={setImgFiles}
          imgFiles={imgFiles}
        />
      ) : null}
      <input type="file" onChange={previewImages} multiple ref={inputFileRef} />
    </St.Container>
  );
};

export default ImageContainer;
