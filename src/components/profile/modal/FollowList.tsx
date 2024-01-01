import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Tables } from '../../../../database.types';
import { getFollowList, mypageUnfollow } from '../../../API/supabase.api';
import user from '../../../styles/assets/user.svg';
import * as St from './modal.styled';

type Props = {
  uid: string;
  params: string | undefined;
  followModal: boolean;
  setFollowModal: React.Dispatch<React.SetStateAction<boolean>>;
};

const FollowList = ({ uid, params, followModal, setFollowModal }: Props) => {
  const [following, setFollowing] = useState<Tables<'follow'>[] | null>();
  const [followId, setFollowId] = useState('');

  const navigate = useNavigate();
  const arr = [
    '하니',
    '민지',
    '다니엘',
    '해린',
    '혜인',
    '아이린',
    '슬기',
    '웬디',
    '조이',
    '예리',
    '채원',
    '윤진',
    '사쿠라',
    '은채',
    '카즈하',
  ];
  //
  const filterFollowList = async () => {
    const followData = await getFollowList(params as string);
    if (followData) {
      console.log(followData);
    }
    setFollowing(followData);
  };

  useEffect(() => {
    filterFollowList();
  }, [followModal]);

  return (
    <St.FollowContainer className={followModal ? 'isOpen' : ''} onClick={() => setFollowModal(false)}>
      <St.ExitBtn $top="20%">X</St.ExitBtn>
      <St.FollowWrapper>
        <ul>
          {following?.map((item, i) => {
            return (
              <St.FollowList key={i} onClick={() => navigate(`/profile/${item.to_user_id}`)}>
                <img src={user} />
                <div>{item.to_user_nickname}</div>
                {uid === params ? (
                  <St.UnfollowBtn
                    $color="#dcdcdc"
                    onClick={async () => {
                      // to_user_id 비교해서 삭제해야함
                      await mypageUnfollow(item.to_user_id);
                      console.log('삭제 완료');
                    }}
                  >
                    팔로우 취소
                  </St.UnfollowBtn>
                ) : (
                  <St.UnfollowBtn $color="transparent"></St.UnfollowBtn>
                )}
              </St.FollowList>
            );
          })}
        </ul>
      </St.FollowWrapper>
    </St.FollowContainer>
  );
};

export default FollowList;
