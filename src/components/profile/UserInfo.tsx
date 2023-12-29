import * as St from './Profile.styled';
import UploadProfile from './UpdateProfile';

type UidProps = {
  uid: string;
};

const UserInfo = ({ uid }: UidProps) => {
  return (
    <St.ProfileReviewWrapper>
      <St.ProfileBox>
        <UploadProfile uid={uid} />
      </St.ProfileBox>
      <St.ReviewBox>
        <p>나의 거래 후기</p>
      </St.ReviewBox>
    </St.ProfileReviewWrapper>
  );
};

export default UserInfo;
