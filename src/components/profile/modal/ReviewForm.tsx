import { useState } from 'react';
import { Tables } from '../../../../database.types';
import { UpdateReviewStatus, deleteReview, filteredReview, getReviews, insertReview } from '../../../API/supabase.api';
import * as St from './modal.styled';

type Props = {
  params: string | undefined;
  reviewModal: boolean;
  setReviewModal: React.Dispatch<React.SetStateAction<boolean>>;
  paramUid: string;
};

const ReviewForm = ({ params, reviewModal, setReviewModal, paramUid }: Props) => {
  const [input1, setInput1] = useState(0);
  const [input2, setInput2] = useState(0);
  const [input3, setInput3] = useState(0);
  const [input4, setInput4] = useState(0);
  const [input5, setInput5] = useState(0);
  const [data, setData] = useState<Tables<'review'>[] | null>();

  const reviewArr = [
    '거래가 수월해요',
    '판매자가 친절해요',
    '물품 상태가 좋아요',
    '사진과 동일해요',
    '약속을 잘 지켜요',
  ];

  const onSubmitReviewHandler = async () => {
    const checkUser = await getReviews(paramUid as string);
    if (checkUser.data.length > 0) {
      const filteredData = await filteredReview(paramUid as string);
      setData(filteredData);
      if (data) {
        const a = data[0].res_fast;
        const b = data[0].kind;
        const c = data[0].good_product;
        const d = data[0].same_product;
        const e = data[0].good_time;
        await deleteReview(paramUid);
        await insertReview({
          params: paramUid!,
          i1: a! + input1,
          i2: b! + input2,
          i3: c! + input3,
          i4: d! + input4,
          i5: e! + input5,
        });
      }
    } else {
      await insertReview({
        params: paramUid!,
        i1: input1,
        i2: input2,
        i3: input3,
        i4: input4,
        i5: input5,
      });
    }
    setInput1(0);
    setInput2(0);
    setInput3(0);
    setInput4(0);
    setInput5(0);
    setReviewModal(false);
    // 후기 상태 false -> true로 바꿔주기
    await UpdateReviewStatus(paramUid);
  };

  return (
    <St.ReviewContainer className={reviewModal ? 'isOpen' : ''} onClick={() => setReviewModal(false)}>
      <St.ExitBtn $top="30%">X</St.ExitBtn>
      <St.ReviewWrapper
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <div>
          <St.ReviewLabel className={input1 === 1 ? 'isActive' : ''}>
            <input
              id="1"
              type="checkbox"
              value={input1}
              onChange={(e) => {
                setInput1(Number(e.target.checked));
              }}
            />
            <label htmlFor="1">
              거래가
              <br />
              수월해요
            </label>
          </St.ReviewLabel>
          <St.ReviewLabel className={input2 === 1 ? 'isActive' : ''}>
            <input
              id="2"
              type="checkbox"
              value={input2}
              onChange={(e) => {
                setInput2(Number(e.target.checked));
              }}
            />
            <label htmlFor="2">
              판매자가
              <br />
              친절해요
            </label>
          </St.ReviewLabel>
          <St.ReviewLabel className={input3 === 1 ? 'isActive' : ''}>
            <input
              id="3"
              type="checkbox"
              value={input3}
              onChange={(e) => {
                setInput3(Number(e.target.checked));
              }}
            />
            <label htmlFor="3">
              물품 상태가
              <br />
              좋아요
            </label>
          </St.ReviewLabel>
          <St.ReviewLabel className={input4 === 1 ? 'isActive' : ''}>
            <input
              id="4"
              type="checkbox"
              value={input4}
              onChange={(e) => {
                setInput4(Number(e.target.checked));
              }}
            />
            <label htmlFor="4">
              사진과
              <br />
              동일해요
            </label>
          </St.ReviewLabel>
          <St.ReviewLabel className={input5 === 1 ? 'isActive' : ''}>
            <input
              id="5"
              type="checkbox"
              value={input5}
              onChange={(e) => {
                setInput5(Number(e.target.checked));
              }}
            />
            <label htmlFor="5">
              약속을
              <br />잘 지켜요
            </label>
          </St.ReviewLabel>
        </div>
        <St.SubmitBtn onClick={onSubmitReviewHandler}>후기 보내기</St.SubmitBtn>
      </St.ReviewWrapper>
    </St.ReviewContainer>
  );
};

export default ReviewForm;
