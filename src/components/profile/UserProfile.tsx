import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getUserSession } from '../../API/supabase.api';
import * as St from './Profile.styled';
import ProfileProductList from './ProfileProductList';
import UserInfo from './UserInfo';
import FollowList from './modal/FollowList';
import ReviewForm from './modal/ReviewForm';

const UserProfile = () => {
  const params = useParams();

  const [uid, setUid] = useState('');
  const [followModal, setFollowModal] = useState(false);
  const [reviewModal, setReviewModal] = useState(false);
  const [paramUid, setParamUid] = useState('');

  const checkUserSession = async () => {
    const userSession = await getUserSession();
    if (userSession !== null && userSession.session && userSession.session.user) {
      const userUid = userSession.session?.user.id;
      setUid(userUid);
    }
  };
  useEffect(() => {
    checkUserSession();
  }, []);
  return (
    <>
      <St.ProfileWrapper>
        <FollowList uid={uid} params={params.id} followModal={followModal} setFollowModal={setFollowModal} />

        <ReviewForm params={params.id} reviewModal={reviewModal} setReviewModal={setReviewModal} paramUid={paramUid} />

        <UserInfo
          uid={uid}
          params={params.id}
          paramUid={paramUid}
          setFollowModal={setFollowModal}
          setReviewModal={setReviewModal}
        />
        {/* 프로필 아래 목록 표시 컴포넌트 */}

        <ProfileProductList uid={uid} params={params.id} setParamUid={setParamUid} setReviewModal={setReviewModal} />
      </St.ProfileWrapper>
    </>
  );
};

export default UserProfile;
