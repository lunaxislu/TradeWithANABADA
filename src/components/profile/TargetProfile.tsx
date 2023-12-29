import * as St from './Profile.styled';

type ParamProps = {
  params: string | undefined;
};

const TargetProfile = ({ params }: ParamProps) => {
  return (
    <>
      <St.ProfileImg></St.ProfileImg>
    </>
  );
};

export default TargetProfile;
