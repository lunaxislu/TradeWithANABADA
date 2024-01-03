import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Tables } from '../../../../database.types';
import { getFollowList, mypageUnfollow } from '../../../API/supabase.api';
import * as St from './modal.styled';

type Props = {
  uid: string;
  params: string | undefined;
  followModal: boolean;
  setFollowModal: React.Dispatch<React.SetStateAction<boolean>>;
};

const FollowList = ({ uid, params, followModal, setFollowModal }: Props) => {
  const [following, setFollowing] = useState<Tables<'follow'>[] | null>();

  const navigate = useNavigate();

  const filterFollowList = async () => {
    const followData = await getFollowList(params as string);
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
              <St.FollowList
                key={i}
                onClick={(e) => {
                  navigate(`/profile/${item.to_user_id}`);
                }}
              >
                <img src={item.to_user_img} />
                <div>{item.to_user_nickname}</div>
                {uid === params ? (
                  <St.UnfollowBtn
                    $color="#dcdcdc"
                    onClick={async (e) => {
                      // to_user_id 비교해서 삭제해야함
                      e.stopPropagation();
                      await mypageUnfollow(item.to_user_id);
                      await filterFollowList();
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
