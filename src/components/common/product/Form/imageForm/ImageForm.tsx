import React, { ChangeEvent, useEffect, useRef, useState } from 'react';
import { listToBlob } from '../../../../../API/supabase.api';

import FileResizer from 'react-image-file-resizer';
import { CommonProductInfoType } from '../Form';
import * as St from './ImageForm.styled';
import BigImgCard from './bigImgCard/BigImgCard';
import SmImgCard from './smImgCard/SmImgCard';
type CommonImageInputType = {
  imgFiles: (Blob | File)[];
  setImgFiles: React.Dispatch<React.SetStateAction<(Blob | File)[]>>;
  productInfo?: CommonProductInfoType | undefined;
};
type ParamOfEventType = ChangeEvent<HTMLInputElement>;
const ImageForm = ({ imgFiles, setImgFiles, productInfo }: CommonImageInputType) => {
  const [showImages, setShowImages] = useState<string[]>([]);
  const [imageIndex, setImageIndex] = useState(0);
  const inputFileRef = useRef<HTMLInputElement>(null);

  const previewImages = async (e: ParamOfEventType) => {
    if (showImages.length >= 5) return alert('5개가 최대입니다.');

    const imageFile = e.target.files || [];

    const resizeFile = (file: File) =>
      new Promise((res) => {
        FileResizer.imageFileResizer(
          file, // 파일
          1500, // 최대 넓이
          1500, // 최대 높이
          'WEBP', // 포맷팅 : JPEG, PNG or WEBP.
          20, // 이미지 퀄리티
          0, // 모서리 라운드
          (uri) => res(uri), // 응답 uri
          'file', // outputType : Can be either base64, blob or file.(Default type is base64)
        );
      });
    const resize = await resizeFile(imageFile[0]);
    const currentImageUrl = URL.createObjectURL(resize as Blob);
    setShowImages((prev) => [...prev, currentImageUrl]);
    setImgFiles((pre) => [...pre, resize as Blob]);
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
  // Common으로 사용되는 useEffect
  useEffect(() => {
    if (inputFileRef.current) {
      inputFileRef.current.value = '';
    }
  }, [imgFiles]);

  // 수정하기 컴포넌트에 사용되는 useEffect
  useEffect(() => {
    if (productInfo) {
      setShowImages(productInfo.product_img);
    }
  }, [productInfo]);

  // 수정하기 컴포넌트에 사용되는 useEffect
  useEffect(() => {
    if (productInfo) {
      listToBlob(productInfo).then((result) => {
        if (result?.length) {
          setImgFiles(result as Blob[]);
        }
      });
    }
    // 이건 왜안되냐...
    // if(productInfo){
    //   const result =listToBlob(productInfo)
    //   if(result){
    //     setImgFiles(result)
    //   }
    // }
  }, [productInfo, setImgFiles]);
  return (
    <St.Container>
      <BigImgCard showImages={showImages} imageIndex={imageIndex} />

      <SmImgCard
        showImages={showImages}
        setImageIndex={setImageIndex}
        deletePreviewImage={deletePreviewImage}
        imageIndex={imageIndex}
      />

      <input type="file" id="file" multiple onChange={previewImages} ref={inputFileRef} />
    </St.Container>
  );
};

export default ImageForm;
