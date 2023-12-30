import { ReviewChart } from '../ui/chart/Chart';
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
        <p>거래한 고객분이 리뷰를 달아주셨어요 👍</p>
        <ReviewChart />
      </St.ReviewBox>
    </St.ProfileReviewWrapper>
  );
};

export default UserInfo;
