import React, { ChangeEvent, useEffect, useRef, useState } from 'react';
import { ProductInfoType } from '../../../detail/sale/Sale';
import ImageCard from './BigImgCard/BigImgCard';
import * as St from './ImageInput.styled';
import SmImgCard from './smImgCard/SmImgCard';

type EventObject = ChangeEvent<HTMLInputElement>;

type PropsType = {
  imgFiles: File[];
  setImgFiles: React.Dispatch<React.SetStateAction<File[]>>;
  productInfo?: ProductInfoType;
};

const ImageInput = ({ imgFiles, setImgFiles, productInfo }: PropsType) => {
  const [showImages, setShowImages] = useState<string[]>([]);
  const [imageIndex, setImageIndex] = useState(0);
  const inputFileRef = useRef<HTMLInputElement>(null);

  const previewImages = (e: EventObject) => {
    if (showImages.length >= 5) return alert('5개가 최대입니다.');

    const imageFile = e.target.files || [];
    const currentImageUrl = URL.createObjectURL(imageFile[0]);
    setShowImages((prev) => [...prev, currentImageUrl]);
    setImgFiles((pre) => [...pre, e.target.files![0]]);
  };
  const deletePreviewImage = (id: number) => {
    const editImages = showImages.filter((_, idx) => idx !== id);
    const updateImgFiles = imgFiles.filter((_, idx) => idx !== id);

    if (updateImgFiles.length !== 0) {
      setImageIndex(updateImgFiles.length - 1);
    }
    if (updateImgFiles.length === 0) {
      setImageIndex(0);
    }
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

      <SmImgCard
        showImages={showImages}
        setImageIndex={setImageIndex}
        deletePreviewImage={deletePreviewImage}
        imageIndex={imageIndex}
      />

      <input id="file" type="file" onChange={previewImages} multiple ref={inputFileRef} />
    </St.Container>
  );
};

export default React.memo(ImageInput);
