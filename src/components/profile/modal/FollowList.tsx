import user from '../../../styles/assets/user.svg';
import * as St from './modal.styled';

type Props = {
  followModal: boolean;
  setFollowModal: React.Dispatch<React.SetStateAction<boolean>>;
};

const FollowList = ({ followModal, setFollowModal }: Props) => {
  const arr = [
    '하니',
    '민지',
    '다니엘',
    '해린',
    '혜인',
    '아이린',
    '슬기',
    '웬디',
    '조이',
    '예리',
    '채원',
    '윤진',
    '사쿠라',
    '은채',
    '카즈하',
  ];
  return (
    <St.FollowContainer className={followModal ? 'isOpen' : ''} onClick={() => setFollowModal(false)}>
      <St.FollowWrapper>
        <St.ExitBtn top="23%">X</St.ExitBtn>
        <ul>
          {arr.map((item) => {
            return (
              <St.FollowList>
                <img src={user} />
                <div>{item}</div>
                <button>팔로우 취소</button>
              </St.FollowList>
            );
          })}
        </ul>
      </St.FollowWrapper>
    </St.FollowContainer>
  );
};

export default FollowList;
