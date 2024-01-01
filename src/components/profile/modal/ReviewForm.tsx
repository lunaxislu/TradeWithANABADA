import * as St from './modal.styled';

type Props = {
  reviewModal: boolean;
  setReviewModal: React.Dispatch<React.SetStateAction<boolean>>;
};

const ReviewForm = ({ reviewModal, setReviewModal }: Props) => {
  const reviewArr = [
    '거래가 수월해요',
    '판매자가 친절해요',
    '물품 상태가 좋아요',
    '사진과 동일해요',
    '약속을 작 지켜요',
  ];

  const onSubmitReviewHandler = () => {};
  return (
    <St.ReviewContainer className={reviewModal ? 'isOpen' : ''} onClick={() => setReviewModal(false)}>
      <St.ExitBtn $top="20%">X</St.ExitBtn>
      <St.ReviewWrapper>
        <ul>
          {reviewArr.map((item, i) => {
            return <St.ReviewBtn key={i}>{item}</St.ReviewBtn>;
          })}
        </ul>
        <St.SubmitBtn onClick={onSubmitReviewHandler}>후기 보내기</St.SubmitBtn>
      </St.ReviewWrapper>
    </St.ReviewContainer>
  );
};

export default ReviewForm;
