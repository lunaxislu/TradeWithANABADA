import { useEffect, useRef, useState } from 'react';
import { useErrorBoundary } from 'react-error-boundary';
import {
  cancelLike,
  createTalkChannel,
  findLike,
  getTalkChannel,
  getUserSession,
  registLike,
} from '../../../../../../API/supabase.api';
import { ReactComponent as Heart } from '../../../../../../styles/assets/heart.svg';
import { ReactComponent as Like } from '../../../../../../styles/assets/unlike.svg';
import { PropsOfLikeAndTalk } from '../ButtonForm';
import * as St from './LikeAndTalk.styled';

const LikeAndTalk = ({ productInfo, user_id }: PropsOfLikeAndTalk) => {
  const [isLike, setIsLike] = useState(false);
  const likeRef = useRef(isLike);
  const userIdRef = useRef(user_id);
  const likeIdRef = useRef<number | null>(null);
  const validRef = useRef(false);
  const [talkChannelAlready, isTalkChannelAlready] = useState<boolean>(false);
  const { showBoundary } = useErrorBoundary();
  const createTalkChannelHandler = async () => {
    try {
      const channelId = await createTalkChannel(productInfo?.user_id!, user_id!, productInfo?.product_id!);
    } catch (error) {
      showBoundary(error);
    }
  };

  const openTalkChannelHandler = async () => {
    const allChannel = await getTalkChannel(productInfo?.product_id!);
    const targetChannelInfo = allChannel?.find((channel) => {
      if (channel.chat_user) return channel.chat_user.user1_id === user_id || channel.chat_user.user2_id === user_id;
    });

    const channelId = targetChannelInfo?.id;
  };

  // 전체 채팅방 정보 가져오기 join해서 chat, chat_uesrs
  useEffect(() => {
    const getChannel = async () => {
      try {
        const userData = await getUserSession();
        const currentUserId = userData.session?.user.id!;
        if (productInfo) {
          const allChannel = await getTalkChannel(productInfo?.product_id);

          if (allChannel) {
            const isAlready = allChannel?.some((channel) => {
              if (channel.chat_user) {
                return channel.chat_user?.user1_id! === currentUserId || channel.chat_user?.user2_id! === currentUserId;
              }
            });
            isTalkChannelAlready(isAlready!);
          }
        }
      } catch (error) {
        showBoundary(error);
      }
    };
    getChannel();
  }, []);

  useEffect(() => {
    try {
      if (user_id && productInfo?.product_id) {
        findLike(user_id, productInfo?.product_id).then((result) => {
          if (result?.[0]) {
            setIsLike(true);
            likeIdRef.current = result?.[0].id!;
          }
        });
      }
      userIdRef.current = user_id;
    } catch (error) {
      showBoundary(error);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user_id]);

  //  unmount 상태에서 clean up function에 useState를 사용하려면 ref 사용하자
  // useState의 초기값만 cleanup function에는 들어가게 된다.
  useEffect(() => {
    return () => {
      if (typeof userIdRef.current === 'string' && typeof productInfo?.product_id === 'number') {
        // validRef를 준 이유는 좋아요가 있는 상태에서 수정하기로 컴포넌트 전환되면 없는 상태가 되고 좋아요가 없으면 그 반대가 되므로 넣어줬습니다.

        if (!validRef.current) return;
        try {
          if (likeRef.current && likeIdRef.current === null) {
            registLike(userIdRef.current, productInfo?.product_id);
          } else if (!likeRef.current && likeIdRef.current) {
            cancelLike(productInfo?.product_id);
          }
        } catch (error) {
          showBoundary(error);
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
      {/* Talk 보내기 버튼 조건부 처리 필요
          1.같은 productId로 동일한 두 유저 
      */}
      {talkChannelAlready ? (
        <St.TalkButton onClick={openTalkChannelHandler}>이미 Talk이 있으시네요</St.TalkButton>
      ) : (
        <St.TalkButton onClick={createTalkChannelHandler}>Talk 하기</St.TalkButton>
      )}
    </St.Container>
  );
};

export default LikeAndTalk;
