import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getUserSession } from '../API/supabase.api';
import * as St from '../components/profile/Profile.styled';
import ProfileProductList from '../components/profile/ProfileProductList';
import UserInfo from '../components/profile/UserInfo';
import FollowList from '../components/profile/modal/FollowList';
import ReviewForm from '../components/profile/modal/ReviewForm';

// type RouterParams = {
//   params: string
// }

const Profile = () => {
  const params = useParams();

  const [uid, setUid] = useState('');
  const [followModal, setFollowModal] = useState(false);
  const [reviewModal, setReviewModal] = useState(false);

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
        <ReviewForm params={params.id} reviewModal={reviewModal} setReviewModal={setReviewModal} />
        <UserInfo uid={uid} params={params.id} setFollowModal={setFollowModal} setReviewModal={setReviewModal} />
        {/* 프로필 아래 목록 표시 컴포넌트 */}
        <ProfileProductList uid={uid} params={params.id} />
      </St.ProfileWrapper>
    </>
  );
};

export default Profile;
