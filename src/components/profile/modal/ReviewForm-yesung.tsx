import { useState } from 'react';
import { Tables } from '../../../../database.types';
import { filteredReview, getReviews } from '../../../API/supabase.api';
import { useReview } from '../../../hooks/queryHook/profile/useReview';
import * as St from './modal.styled';

type Props = {
  params: string | undefined;
  reviewModal: boolean;
  setReviewModal: React.Dispatch<React.SetStateAction<boolean>>;
};

type ReviewKey = 'res_fast' | 'kind' | 'good_product' | 'same_product' | 'good_time';
type ReviewData = Record<ReviewKey, number> & { params: string };

const ReviewForm = ({ params, reviewModal, setReviewModal }: Props) => {
  const initialInput = [0, 0, 0, 0, 0];
  const [inputs, setInputs] = useState(initialInput);
  const [data, setData] = useState<Tables<'review'>[] | null>();
  const { update, insert } = useReview();

  const reviewArr = [
    { id: '1', text: '거래가 수월해요' },
    { id: '2', text: '판매자가 친절해요' },
    { id: '3', text: '물품 상태가 좋아요' },
    { id: '4', text: '사진과 동일해요' },
    { id: '5', text: '약속을 잘 지켜요' },
  ];

  const onSubmitReviewHandler = async () => {
    const checkUser = await getReviews(params as string);
    if (checkUser.data.length > 0) {
      const filteredData = await filteredReview(params as string);
      setData(filteredData);
      if (data) {
        const newData: ReviewData | any = {
          params: params!,
          res_fast: 0,
          kind: 0,
          good_product: 0,
          same_product: 0,
          good_time: 0,
        };
        (['res_fast', 'kind', 'good_product', 'same_product', 'good_time'] as const).forEach((key, index) => {
          newData[key] = (data[0][key] as number) + inputs[index];
        });
        // await updateReview(newData);
        insert(newData);
      }
    } else {
      const newData: ReviewData | any = {
        params: params!,
        res_fast: 0,
        kind: 0,
        good_product: 0,
        same_product: 0,
        good_time: 0,
      };
      (['res_fast', 'kind', 'good_product', 'same_product', 'good_time'] as const).forEach((key, index) => {
        newData[key] = inputs[index];
      });
      // await insertReview(newData);
      update(newData);
    }
    setInputs(initialInput);
    setReviewModal(false);
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
          {reviewArr.map((review, index) => (
            <St.ReviewLabel key={review.id} className={inputs[index] === 1 ? 'isActive' : ''}>
              <input
                id={review.id}
                type="checkbox"
                value={inputs[index]}
                onChange={(e) => {
                  const newInputs = [...inputs];
                  newInputs[index] = Number(e.target.checked);
                  setInputs(newInputs);
                }}
              />
              <label htmlFor={review.id}>{review.text}</label>
            </St.ReviewLabel>
          ))}
        </div>
        <St.SubmitBtn onClick={onSubmitReviewHandler}>후기 보내기</St.SubmitBtn>
      </St.ReviewWrapper>
    </St.ReviewContainer>
  );
};

export default ReviewForm;
