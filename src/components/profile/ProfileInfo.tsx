import { useEffect, useRef, useState } from 'react';
import {
  deleteStorageImage,
  getUserSession,
  getUsersAvartarImg,
  getUsersNickname,
  imgPublicUrl,
  insertProfileImg,
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
  const [img, setImg] = useState(defaultImg);
  const [uploadFile, setUploadFile] = useState<File | undefined>();
  const [nickname, setNickname] = useState('');

  // 세션에 있는 닉네임 가져오는 함수
  const getSession = async () => {
    const session = await getUserSession();
    if (session && session.session) {
      const sessionNickname = session.session.user.user_metadata.full_name;
      const sessionProfileImg = session.session.user.user_metadata.avatar_img;
      setNickname(sessionNickname);
      setImg(sessionProfileImg);
      console.log(sessionProfileImg);
    }
  };
  // 타겟 유저의 프로필 가져오는 함수
  const getTargetUserProfile = () => {
    const getInfo = async () => {
      const targetProfileImg = await getUsersAvartarImg(params as string);
      console.log(targetProfileImg);
      setImg(targetProfileImg[0].avatar_img!);
    };
    const getNickname = async () => {
      const targetNickname = await getUsersNickname(params as string);
      console.log(targetNickname);
      setNickname(targetNickname[0].nickname!);
    };
    getInfo();
    getNickname();
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
  const updateNickname = async () => {
    updateUserNickname(nickname);
    updateTableNickname(uid, nickname);
  };
  // 프로필 이미지 업데이트
  const updateProfileImg = async () => {
    deleteStorageImage(uid);
    uploadStorageProfileImg(uid, uploadFile as File);
    const publicUrl = await imgPublicUrl(uid);
    insertProfileImg(uid, publicUrl.publicUrl);
    updateUserProfile(publicUrl.publicUrl);
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
  const onClickFollowHandler = () => {};
  // 리뷰 모달 보여주기
  const showReviewModal = () => {
    setReviewModal(true);
  };

  useEffect(() => {
    if (uid === params) getSession();
    else getTargetUserProfile();
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
              maxLength={10}
              value={nickname}
              onChange={(e) => {
                setNickname(e.target.value);
              }}
            />
          ) : (
            <p>{nickname}</p>
          )}{' '}
          <St.Grade>{nickname}님의 점수</St.Grade>
        </St.Nickname>
        {uid === params ? (
          // 마이페이지의 버튼 구역
          <>
            <St.ProfileBtn className="empty"></St.ProfileBtn>
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
            <St.ProfileBtn onClick={onClickFollowHandler}>팔로우하기</St.ProfileBtn>
            <St.ProfileBtn onClick={showReviewModal}>후기 등록하기</St.ProfileBtn>
          </>
        )}
      </St.ProfileInfo>
    </>
  );
};

export default UpdateProfile;
