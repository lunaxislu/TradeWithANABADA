import { useEffect, useRef, useState } from 'react';
import { cancelLike, findLike, registLike } from '../../../../API/supabase.api';
import { ReactComponent as Heart } from '../../../../styles/assets/heart.svg';
import { ReactComponent as Like } from '../../../../styles/assets/unlike.svg';
import * as St from './Button.styled';
type PropsType = {
  post_id: number;
  user_id: string;
};

const Button = ({ post_id, user_id }: PropsType) => {
  const [isLike, setIsLike] = useState(false);
  const likeRef = useRef(isLike);
  const userIdRef = useRef(user_id);
  const likeIdRef = useRef<number | null>(null);
  useEffect(() => {
    findLike(user_id, post_id).then((result) => {
      if (result?.[0]) {
        setIsLike(true);
        likeIdRef.current = result?.[0].id!;
      }
    });
    userIdRef.current = user_id;
  }, [user_id]);
  console.log(user_id);
  console.log('likeRef', likeRef);
  console.log('likeId', likeIdRef);
  console.log('userIdRef', userIdRef);
  //  unmount 상태에서 clean up function에 useState를 사용하려면 ref 사용하자
  // useState의 초기값만 cleanup function에는 들어가게 된다.
  useEffect(() => {
    //     console.log('likeRef', likeIdRef);
    //     console.log('likeId', likeIdRef);
    //     console.log('userIdRef', userIdRef);
    return () => {
      if (likeRef.current && likeIdRef.current === null) {
        registLike(userIdRef.current, post_id);
      } else if (!likeRef.current && likeIdRef.current) {
        cancelLike(post_id);
      }
    };
  }, []);

  return (
    <St.ButtonContainer>
      <St.LikeButton
        $like={isLike}
        onClick={() => {
          console.log(likeRef);
          likeRef.current = !isLike;
          setIsLike(!isLike);
        }}
      >
        찜하기 {isLike ? <Heart className="like" /> : <Like className="unlike" />}
      </St.LikeButton>
      <St.TalkButton>Talk 보내기</St.TalkButton>
    </St.ButtonContainer>
  );
};

export default Button;
