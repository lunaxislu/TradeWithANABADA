import { BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, Title, Tooltip } from 'chart.js';
import { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { getReviews, getUserData } from '../../../API/supabase.api';
import * as St from './Chart.styled';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

// null이 들어가는 이유는 리뷰가 없을 수도 있고 DB에서 null을 허용해놨기 때문에
type ReviewType = {
  res_fast: number | null;
  kind: number | null;
  good_product: number | null;
  good_time: number | null;
  same_product: number | null;
  user_id: string | null;
}[];

export const LineChart = () => {
  const [reviews, setReviews] = useState<ReviewType>();
  const reviewData = reviews
    ? reviews.map((review) => ({
        '거래가 수월해요': review.res_fast!,
        '고객이 착해요': review.kind!,
        '물품 상태가 좋아요': review.good_product!,
        '사진과 동일해요': review.good_time!,
        '약속을 잘 지켜요': review.same_product!,
      }))
    : [];

  useEffect(() => {
    const fetchReviews = async () => {
      const session = await getUserData();
      if (!session) return alert('로그인이 필요합니다.');
      const review = await getReviews(session.id);
      setReviews(review);
    };
    fetchReviews();
  }, []);

  const options = {
    indexAxis: 'y' as const,
    responsive: true,
    scales: {
      x: {
        display: false,
      },
    },
    plugins: {
      legend: {
        display: false,
        position: 'right' as const,
        labels: {
          font: {
            size: 10,
          },
        },
      },
    },
  };

  const labels = reviewData.length > 0 ? Object.keys(reviewData[0]) : [];
  const datas = reviewData.length > 0 ? Object.values(reviewData[0]) : [];
  const data = {
    labels,
    datasets: [
      {
        data: datas,
        borderColor: 'rgb(0, 0, 0)',
        backgroundColor: [
          'rgba(255, 99, 132, 0.5)',
          'rgba(255, 193, 206, 0.5)',
          'rgba(160, 255, 241, 0.5)',
          'rgba(195, 253, 182, 0.5)',
          'rgba(228, 185, 255, 0.5)',
        ],
        borderWidth: 2.5,
        borderRadius: 10,
      },
    ],
  };
  return (
    <St.ReviewWrapper>
      <div>
        <h3>거래한 고객분이 리뷰를 달아주셨어요 👍</h3>
        <Bar options={options} data={data} />
      </div>
    </St.ReviewWrapper>
  );
};
