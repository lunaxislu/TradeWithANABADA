import { useEffect, useRef, useState } from 'react';
import { useErrorBoundary } from 'react-error-boundary';
import {
  checkFollowId,
  deleteStorageImage,
  follow,
  getUserSession,
  getUsersAvartarImg,
  getUsersNickname,
  imgPublicUrl,
  insertProfileImg,
  unfollow,
  updateTableNickname,
  updateUserNickname,
  updateUserProfile,
  uploadStorageProfileImg,
} from '../../API/supabase.api';
import defaultImg from '../../styles/assets/user.svg';
import * as St from './Profile.styled';

type Props = {
  uid: string;
  params: string | undefined;
  setFollowModal: React.Dispatch<React.SetStateAction<boolean>>;
  setReviewModal: React.Dispatch<React.SetStateAction<boolean>>;
};

const UpdateProfile = ({ uid, params, setFollowModal, setReviewModal }: Props) => {
  const imgRef = useRef<HTMLInputElement>(null);
  const [edit, setEdit] = useState(false);
  const [userSessionNickname, setUserSessionNickname] = useState('');
  const [img, setImg] = useState(defaultImg);
  const [uploadFile, setUploadFile] = useState<File>();
  const [nickname, setNickname] = useState('');
  const [followId, setFolllowId] = useState('');
  const [followBtn, setFollowBtn] = useState(true);
  const { showBoundary } = useErrorBoundary();
  // 세션에 있는 닉네임 가져오는 함수
  const getSession = async () => {
    const session = await getUserSession();
    if (session && session.session) {
      const sessionNickname = session.session.user.user_metadata.full_name;
      const sessionProfileImg = session.session.user.user_metadata.avatar_img;
      setUserSessionNickname(sessionNickname);
      setNickname(sessionNickname);
      setImg(sessionProfileImg);
    }
    return;
  };
  // 타겟 유저의 프로필 가져오는 함수
  const getTargetUserProfile = () => {
    const getInfo = async () => {
      const targetProfileImg = await getUsersAvartarImg(params as string);
      setImg(targetProfileImg[0].avatar_img!);
    };
    const getNickname = async () => {
      const targetNickname = await getUsersNickname(params as string);
      setNickname(targetNickname[0].nickname!);
    };
    getInfo();
    getNickname();
    checkFollowList();
    return;
  };
  // 이미지 미리보기 함수
  const imgReader = () => {
    const reader = new FileReader();
    if (imgRef.current && imgRef.current.files) {
      reader.readAsDataURL(imgRef.current.files[0]);
      reader.onloadend = () => {
        setImg(reader.result as string);
      };
      setUploadFile(imgRef.current.files[0]);
    }
  };
  // 닉네임 업데이트
  const updateNickname = () => {
    // 변경사항이 있는 경우에만 업뎃하고 아닌 경우엔 리턴;
    if (userSessionNickname === nickname) {
      alert('프로필 변경사항이 없습니다.');
      return;
    } else {
      updateUserNickname(nickname);
      updateTableNickname(uid, nickname);
      return;
    }
  };
  // 프로필 이미지 업데이트
  const updateProfileImg = async () => {
    if (imgRef.current === null) {
      return;
    }
    try {
      await deleteStorageImage(uid);
      await uploadStorageProfileImg(uid, uploadFile as File);
      const publicUrl = await imgPublicUrl(uid);
      await insertProfileImg(uid, publicUrl.publicUrl);
      // updateFollowTargetUser(uid, nickname, publicUrl.publicUrl);
      await updateUserProfile(publicUrl.publicUrl);
    } catch (error) {
      showBoundary(error);
    }
  };
  // 프로필 변경하기 핸들러
  const onClickChangeBtnHandler = () => {
    if (edit) {
      updateNickname();
      updateProfileImg();
      setEdit(false);
    } else {
      setEdit(true);
    }
  };
  // 팔로우 모달 보여주기
  const showFollowModal = () => {
    setFollowModal(true);
  };
  // 팔로우/언팔로우 하기
  const onClickFollowHandler = async () => {
    // follow 테이블에 followId 있으면 언팔, 없으면 팔로우
    const check = await checkFollowId(followId);
    if (check.data) {
      if (check.data.length === 0) {
        // insert follow
        const followData = await follow(followId, uid, params as string, nickname, img);
        setFollowBtn(false);
      } else {
        // delete follow
        const deleteFollow = await unfollow(followId);
        setFollowBtn(true);
      }
    }
  };
  // 팔로우/언팔로우 체크(useEffect로 상태 체크하여 버튼 바꾸기 위함
  const checkFollowList = async () => {
    const check = await checkFollowId(followId);
    if (check.data) {
      if (check.data.length === 0) {
        setFollowBtn(true); // 팔로우 버튼
      } else {
        setFollowBtn(false); // 언팔로우 버튼
      }
    }
    return;
  };
  // 리뷰 모달 보여주기
  const showReviewModal = () => {
    setReviewModal(true);
  };

  useEffect(() => {
    const initValue = async () => {
      if (uid && params) {
        await checkFollowList();
        if (uid === params) await getSession();
        else getTargetUserProfile();
        setFolllowId(() => {
          return `${uid}-${params}`;
        });
      }
      return;
    };
    initValue();
  }, [uid, params]);
  return (
    <>
      <St.ProfileImg>
        <img src={img} alt="profileImg" />
      </St.ProfileImg>
      <St.ProfileInfo>
        <St.Nickname>
          {edit ? (
            <input
              type="text"
              maxLength={8}
              value={nickname}
              onChange={(e) => {
                setNickname(e.target.value);
              }}
            />
          ) : (
            <p>{nickname}</p>
          )}{' '}
        </St.Nickname>
        {uid === params ? (
          // 마이페이지의 버튼 구역
          <>
            {edit ? (
              <>
                <St.UploadLabel htmlFor="img">이미지 업로드</St.UploadLabel>
                <input
                  id="img"
                  type="file"
                  accept="image/*"
                  ref={imgRef}
                  onChange={(e) => {
                    setUploadFile(e.target.files?.[0]);
                    imgReader();
                  }}
                  style={{ display: 'none' }}
                />
                <St.ProfileBtn onClick={onClickChangeBtnHandler}>프로필 변경 완료</St.ProfileBtn>
              </>
            ) : (
              <>
                <St.ProfileBtn onClick={showFollowModal}>팔로워 목록 보기</St.ProfileBtn>
                <St.ProfileBtn onClick={onClickChangeBtnHandler}>프로필 변경하기</St.ProfileBtn>
              </>
            )}
          </>
        ) : (
          // 타겟유저페이지의 버튼 구역
          <>
            <St.ProfileBtn onClick={showFollowModal}>팔로워 목록 보기</St.ProfileBtn>
            <St.ProfileBtn onClick={onClickFollowHandler}>{followBtn ? '팔로우하기' : '팔로우 취소하기'}</St.ProfileBtn>
          </>
        )}
      </St.ProfileInfo>
    </>
  );
};

export default UpdateProfile;
