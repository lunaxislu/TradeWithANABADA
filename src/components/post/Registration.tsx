import ImageContainer from './ImageSlider/ImageContainer';
import * as St from './Registration.styled';
import PostForm from './form/PostForm';
/**
 *
 * @returns 리팩토링이 필요합니다.
 */
const Registration = () => {
  return (
    <St.Container>
      <St.Wrapper>
        <ImageContainer />
        <PostForm />
      </St.Wrapper>
    </St.Container>
  );
};

export default Registration;
