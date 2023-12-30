import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getUserSession } from '../API/supabase.api';
import * as St from '../components/profile/Profile.styled';
import ProfileProductList from '../components/profile/ProfileProductList';
import UserInfo from '../components/profile/UserInfo';

// type RouterParams = {
//   params: string
// }

const Profile = () => {
  const params = useParams();
  // console.log('휘파람쓰', params);

  const [uid, setUid] = useState('');
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
        <UserInfo uid={uid} params={params.id} />
        {/* 프로필 아래 목록 표시 컴포넌트 */}
        <ProfileProductList />
      </St.ProfileWrapper>
    </>
  );
};

export default Profile;
