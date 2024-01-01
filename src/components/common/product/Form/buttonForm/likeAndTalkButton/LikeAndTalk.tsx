import { useEffect, useRef, useState } from 'react';
import { cancelLike, findLike, registLike } from '../../../../../../API/supabase.api';
import { ReactComponent as Heart } from '../../../../../../styles/assets/heart.svg';
import { ReactComponent as Like } from '../../../../../../styles/assets/unlike.svg';
import { PropsOfLikeAndTalk } from '../ButtonForm';
import * as St from './LikeAndTalk.styled';

const LikeAndTalk = ({ post_id, user_id }: PropsOfLikeAndTalk) => {
  const [isLike, setIsLike] = useState(false);
  const likeRef = useRef(isLike);
  const userIdRef = useRef(user_id);
  const likeIdRef = useRef<number | null>(null);
  const validRef = useRef(false);

  useEffect(() => {
    if (user_id && post_id) {
      findLike(user_id, post_id).then((result) => {
        if (result?.[0]) {
          setIsLike(true);
          likeIdRef.current = result?.[0].id!;
        }
      });
    }
    userIdRef.current = user_id;

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user_id]);

  //  unmount 상태에서 clean up function에 useState를 사용하려면 ref 사용하자
  // useState의 초기값만 cleanup function에는 들어가게 된다.
  useEffect(() => {
    return () => {
      if (typeof userIdRef.current === 'string' && typeof post_id === 'number') {
        // validRef를 준 이유는 좋아요가 있는 상태에서 수정하기로 컴포넌트 전환되면 없는 상태가 되고 좋아요가 없으면 그 반대가 되므로 넣어줬습니다.

        if (!validRef.current) return;
        if (likeRef.current && likeIdRef.current === null) {
          registLike(userIdRef.current, post_id);
        } else if (!likeRef.current && likeIdRef.current) {
          cancelLike(post_id);
        }
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <St.Container className="like-talk">
      <St.LikeButton
        $like={isLike}
        onClick={() => {
          validRef.current = true;
          likeRef.current = !isLike;
          setIsLike(!isLike);
        }}
      >
        찜하기 {isLike ? <Heart className="like" /> : <Like className="unlike" />}
      </St.LikeButton>
      <St.TalkButton>Talk 보내기</St.TalkButton>
    </St.Container>
  );
};

export default LikeAndTalk;
