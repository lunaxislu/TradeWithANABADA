import { useEffect, useRef, useState } from 'react';
import {
  deleteStorageImage,
  getUserSession,
  imgPublicUrl,
  insertProfileImg,
  updateTableNickname,
  updateUserNickname,
  updateUserProfile,
  uploadStorageProfileImg,
} from '../../API/supabase.api';
import defaultImg from '../../styles/assets/user.svg';
import * as St from './Profile.styled';

type UidProps = {
  uid: string;
  params: string | undefined;
};

const UpdateProfile = ({ uid, params }: UidProps) => {
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
    }
  };
  // 타겟 유저의 프로필 가져오는 함수
  // const getTargetUserProfile = () => {
  //   const getInfo = async () => {
  //     const targetProfileImg = await getUsersAvartarImg(uid);
  //     console.log(targetProfileImg);
  //   };
  //   const getNickname = async () => {
  //     const targetNickname = await getUsersNickname(uid);
  //     console.log(targetNickname);
  //   };
  //   getInfo();
  //   getNickname();
  // };

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

  useEffect(() => {
    getSession();
    // getTargetUserProfile();
  }, []);
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
          )}
        </St.Nickname>
        {edit ? (
          <>
            <St.UploadImg htmlFor="img">이미지 업로드</St.UploadImg>
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
          </>
        ) : null}
        {uid === params ? (
          <St.ProfileEdit onClick={onClickChangeBtnHandler}>
            {edit ? '프로필 변경 완료' : '프로필 변경하기'}
          </St.ProfileEdit>
        ) : (
          <St.ProfileReview></St.ProfileReview>
        )}
      </St.ProfileInfo>{' '}
    </>
  );
};

export default UpdateProfile;
