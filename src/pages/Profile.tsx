import { useEffect, useState } from 'react';
import { getUserSession } from '../API/supabase.api';
import * as St from '../components/profile/Profile.styled';
import ProfileProductList from '../components/profile/ProfileProductList';
import UserInfo from '../components/profile/UserInfo';

const Profile = () => {
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
        <UserInfo uid={uid} />
        <ProfileProductList type="likes" uid={uid} />
        <ProfileProductList type="sales" uid={uid} />
      </St.ProfileWrapper>
    </>
  );
};

export default Profile;
