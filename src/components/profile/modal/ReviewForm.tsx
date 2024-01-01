import { useState } from 'react';
import * as St from './modal.styled';

type Props = {
  reviewModal: boolean;
  setReviewModal: React.Dispatch<React.SetStateAction<boolean>>;
};

const ReviewForm = ({ reviewModal, setReviewModal }: Props) => {
  const [input1, setInput1] = useState(0);
  const [input2, setInput2] = useState(0);
  const [input3, setInput3] = useState(0);
  const [input4, setInput4] = useState(0);
  const [input5, setInput5] = useState(0);

  const reviewArr = [
    '거래가 수월해요',
    '판매자가 친절해요',
    '물품 상태가 좋아요',
    '사진과 동일해요',
    '약속을 잘 지켜요',
  ];

  const onSubmitReviewHandler = () => {};
  return (
    <St.ReviewContainer className={reviewModal ? 'isOpen' : ''} onClick={() => setReviewModal(false)}>
      <St.ExitBtn $top="20%">X</St.ExitBtn>
      <St.ReviewWrapper
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <div>
          <div>
            <input
              id="1"
              type="checkbox"
              value={input1}
              onChange={(e) => {
                setInput1(Number(e.target.checked));
                console.log(input1);
              }}
            />
            <label htmlFor="1">거래가 수월해요</label>
          </div>
          <div>
            <input
              id="2"
              type="checkbox"
              value={input2}
              onChange={(e) => {
                setInput2(Number(e.target.checked));
                console.log(input1);
              }}
            />
            <label htmlFor="2">판매자가 친절해요</label>
          </div>
          <div>
            <input
              id="3"
              type="checkbox"
              value={input3}
              onChange={(e) => {
                setInput3(Number(e.target.checked));
                console.log(input3);
              }}
            />
            <label htmlFor="3">물품 상태가 좋아요</label>
          </div>
          <div>
            <input
              id="4"
              type="checkbox"
              value={input4}
              onChange={(e) => {
                setInput4(Number(e.target.checked));
                console.log(input4);
              }}
            />
            <label htmlFor="4">사진과 동일해요</label>
          </div>
          <div>
            <input
              id="5"
              type="checkbox"
              value={input5}
              onChange={(e) => {
                setInput5(Number(e.target.checked));
                console.log(input5);
              }}
            />
            <label htmlFor="5">약속을 잘 지켜요</label>
          </div>
        </div>
        <St.SubmitBtn onClick={onSubmitReviewHandler}>후기 보내기</St.SubmitBtn>
      </St.ReviewWrapper>
    </St.ReviewContainer>
  );
};

export default ReviewForm;
