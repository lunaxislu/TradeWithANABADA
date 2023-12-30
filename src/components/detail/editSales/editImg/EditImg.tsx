import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { listToBlob } from '../../../../API/supabase.api';
import { ProductInfoType } from '../../sale/Sale';
import BigImgCard from './BigImgCard/BigImgCard';
import * as St from './EditImg.styled';
import SmImgCard from './SmImgCard/SmImgCard';

type EventObject = ChangeEvent<HTMLInputElement>;
type PropsType = {
  imgFiles: any[];
  setImgFiles: React.Dispatch<React.SetStateAction<any[]>>;
  productInfo: ProductInfoType;
};

const EditImg = ({ imgFiles, setImgFiles, productInfo }: PropsType) => {
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

  useEffect(() => {
    if (inputFileRef.current) {
      inputFileRef.current.value = '';
    }
  }, [imgFiles]);

  useEffect(() => {
    setShowImages(productInfo.product_img);
  }, []);

  useEffect(() => {
    console.log('asssssssssss');
    if (productInfo) {
      listToBlob(productInfo).then((result) => {
        if (result) {
          setImgFiles(result);
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
  }, []);
  return (
    <St.Container>
      <BigImgCard showImages={showImages} imageIndex={imageIndex} />

      <SmImgCard
        showImages={showImages}
        setImageIndex={setImageIndex}
        deletePreviewImage={deletePreviewImage}
        imageIndex={imageIndex}
      />
      <input type="file" id="file" onChange={previewImages} ref={inputFileRef} />
    </St.Container>
  );
};

export default EditImg;
