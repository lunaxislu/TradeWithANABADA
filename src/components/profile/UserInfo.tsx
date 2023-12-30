import * as St from './Profile.styled';
import ProfileInfo from './ProfileInfo';

type UidProps = {
  uid: string;
  params: string | undefined;
};

const UserInfo = ({ uid, params }: UidProps) => {
  return (
    <St.ProfileReviewWrapper>
      <St.ProfileBox>
        <ProfileInfo uid={uid} params={params} />
        {/* {uid === params ? <UploadProfile uid={uid} params={params} /> : <TargetProfile params={params} />} */}
      </St.ProfileBox>
      <St.ReviewBox>
        <p>나의 거래 후기</p>
      </St.ReviewBox>
    </St.ProfileReviewWrapper>
  );
};

export default UserInfo;
