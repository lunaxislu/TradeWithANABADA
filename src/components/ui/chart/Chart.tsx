import { useQuery } from '@tanstack/react-query';
import { BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, Title, Tooltip } from 'chart.js';
import { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { getReviews } from '../../../API/supabase.api';
import { QueryKey } from '../../../hooks/queryHook/profile/useData';
import * as St from './Chart.styled';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const DEFAULT_LABELS = [
  '거래가 수월해요',
  '고객이 착해요',
  '물품 상태가 좋아요',
  '사진과 동일해요',
  '약속을 잘 지켜요',
];
const DEFAULT_DATAS = [0, 0, 0, 0, 0];

type Props = {
  params: string | undefined;
};

export const ReviewChart = ({ params }: Props) => {
  // 리뷰 불러오기
  const { data: reviewList, isLoading: reviewLoading } = useQuery({
    queryKey: [QueryKey.REVIEW_LIST], // 수정
    queryFn: async () => {
      if (params) {
        return await getReviews(params);
      } else {
        return [];
      }
    },
  });

  const [reviews, setReviews] = useState<typeof reviewList>([]);

  useEffect(() => {
    setReviews(reviewList);
  }, [reviewList]);

  const reviewData =
    reviews && 'data' in reviews && reviews.data.length > 0
      ? reviews.data.map((review) => {
          const data: Record<string, number | undefined> = {};
          for (let i = 0; i < DEFAULT_LABELS.length; i++) {
            const label = DEFAULT_LABELS[i];
            const value = Object.values(review)[i + 2];
            data[label] = typeof value === 'number' ? value : undefined;
          }
          return data;
        })
      : [];

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

  const labels = reviewData.length > 0 ? Object.keys(reviewData[0]) : DEFAULT_LABELS;
  const datas = reviewData.length > 0 ? Object.values(reviewData[0]) : DEFAULT_DATAS;
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
        <Bar options={options} data={data} />
      </div>
    </St.ReviewWrapper>
  );
};
