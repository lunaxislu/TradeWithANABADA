import { useState } from 'react';
import ImageContainer from './ImageSlider/ImageContainer';
import * as St from './Registration.styled';
import PostForm from './form/PostForm';
/**
 *
 * @returns 리팩토링이 필요합니다.
 */
const Registration = () => {
  const [imgFiles, setImgFiles] = useState<File[]>([]);
  return (
    <St.Container>
      <St.Wrapper>
        <ImageContainer imgFiles={imgFiles} setImgFiles={setImgFiles} />
        <PostForm imgFiles={imgFiles} />
      </St.Wrapper>
    </St.Container>
  );
};

export default Registration;
