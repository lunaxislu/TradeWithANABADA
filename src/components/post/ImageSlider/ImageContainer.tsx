import { ChangeEvent, useEffect, useRef, useState } from 'react';
import * as St from './ImageContainer.styled';
import ImageCard from './imageCard/ImageCard';
import ImageInput from './imageInput/ImageInput';

type EventObject = ChangeEvent<HTMLInputElement>;

type PropsType = {
  imgFiles: File[];
  setImgFiles: React.Dispatch<React.SetStateAction<File[]>>;
};

const ImageContainer = ({ imgFiles, setImgFiles }: PropsType) => {
  const [showImages, setShowImages] = useState<string[]>([]);
  const [imageIndex, setImageIndex] = useState(0);
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
  const deletePreviewImage = (id: number) => {
    const editImages = showImages.filter((_, idx) => idx !== id);
    const updateImgFiles = imgFiles.filter((_, idx) => idx !== id);
    setImageIndex(updateImgFiles.length - 1);
    setShowImages(editImages);
    setImgFiles(updateImgFiles);
  };
  // 이미지가 등록되면 input file을 초기화 시켜줍니다.
  useEffect(() => {
    if (inputFileRef.current) {
      inputFileRef.current.value = '';
    }
  }, [imgFiles]);

  return (
    <St.Container>
      <ImageCard showImages={showImages} imageIndex={imageIndex} />

      <ImageInput
        showImages={showImages}
        setImageIndex={setImageIndex}
        deletePreviewImage={deletePreviewImage}
        imageIndex={imageIndex}
      />

      <input id="file" type="file" onChange={previewImages} multiple ref={inputFileRef} />
    </St.Container>
  );
};

export default ImageContainer;
