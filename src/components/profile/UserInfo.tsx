import { useState } from 'react';
import * as St from './UserInfo.styled';

const UserInfo = () => {
  const [edit, setEdit] = useState(false);
  const [nickname, setNickname] = useState('강나연');

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNickname(e.target.value);
  };

  const onChangeNicknameHandler = () => {
    setEdit(!edit);
    if (edit === true) {
      alert('프로필 변경하기를 눌러야 변경사항이 저장됩니다.');
    }
  };

  return (
    <St.ProfileReviewWrapper>
      <St.ProfileBox>
        <St.ProfileImg>
          <img src={process.env.PUBLIC_URL + '/profile.jpeg'} />
        </St.ProfileImg>
        <St.ProfileInfo>
          <St.Nickname>
            {edit ? (
              <input type="text" maxLength={10} value={nickname} onChange={(e) => onChangeHandler(e)} />
            ) : (
              <p>{nickname}</p>
            )}
            <button onClick={onChangeNicknameHandler}>닉네임 변경하기</button>
            {/* onClick시, nickname값 DB에 바꿔치기 */}
          </St.Nickname>
          <St.ProfileEdit>프로필 변경하기</St.ProfileEdit>
        </St.ProfileInfo>
      </St.ProfileBox>
      <St.ReviewBox>
        <p>나의 거래 후기</p>
      </St.ReviewBox>
    </St.ProfileReviewWrapper>
  );
};

export default UserInfo;
