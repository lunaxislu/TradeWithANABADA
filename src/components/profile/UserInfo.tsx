// import { ReviewChart } from '../ui/chart/Chart';
import { ReviewChart } from '../ui/chart/Chart';
import * as St from './Profile.styled';
import ProfileInfo from './ProfileInfo';

type Props = {
  uid: string;
  params: string | undefined;
  setFollowModal: React.Dispatch<React.SetStateAction<boolean>>;
  setReviewModal: React.Dispatch<React.SetStateAction<boolean>>;
  paramUid: string;
};

const UserInfo = ({ uid, params, paramUid, setFollowModal, setReviewModal }: Props) => {
  return (
    <St.ProfileReviewWrapper>
      <St.ProfileBox>
        <ProfileInfo uid={uid} params={params} setFollowModal={setFollowModal} setReviewModal={setReviewModal} />
        {/* {uid === params ? <UploadProfile uid={uid} params={params} /> : <TargetProfile params={params} />} */}
      </St.ProfileBox>
      <St.ReviewBox>
        <p>거래한 고객분이 리뷰를 달아주셨어요 👍</p>
        <ReviewChart params={params} />
      </St.ReviewBox>
    </St.ProfileReviewWrapper>
  );
};

export default UserInfo;
