import ImageSlider from './ImageSlider/ImageComponent';
import * as St from './Post.styled';
import PostForm from './form/PostForm';

const Registration = () => {
  return (
    <St.Container>
      <St.Wrapper>
        <ImageSlider />
        <PostForm />
      </St.Wrapper>
    </St.Container>
  );
};

export default Registration;
