import UploadProfile from './UpdateProfile';
import * as St from './UserInfo.styled';

const UserInfo = () => {
  return (
    <St.ProfileReviewWrapper>
      <St.ProfileBox>
        <UploadProfile />
      </St.ProfileBox>
      <St.ReviewBox>
        <p>나의 거래 후기</p>
      </St.ReviewBox>
    </St.ProfileReviewWrapper>
  );
};

export default UserInfo;
