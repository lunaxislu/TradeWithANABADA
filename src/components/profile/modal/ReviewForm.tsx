import * as St from './modal.styled';

type Props = {
  reviewModal: boolean;
  setReviewModal: React.Dispatch<React.SetStateAction<boolean>>;
};

const ReviewForm = ({ reviewModal, setReviewModal }: Props) => {
  const reviewArr = [
    '응답이 빨라요',
    '친절해요',
    '상품 상태가 좋아요',
    '상품 상태가 설명한 것과 같아요',
    '시간 약속을 잘 지켜요',
  ];
  return (
    <St.ReviewContainer className={reviewModal ? 'isOpen' : ''} onClick={() => setReviewModal(false)}>
      <St.ReviewWrapper>
        <St.ExitBtn top="20%">X</St.ExitBtn>
        <ul>
          {reviewArr.map((item) => {
            return <St.ReviewBtn>{item}</St.ReviewBtn>;
          })}
        </ul>
      </St.ReviewWrapper>
    </St.ReviewContainer>
  );
};

export default ReviewForm;
