import { FileObject } from '@supabase/storage-js';
import { createClient } from '@supabase/supabase-js';
import { nanoid } from 'nanoid';
import { Database } from '../../database.types';
import user from '../styles/assets/user.svg';

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL as string;
const supabaseKey = process.env.REACT_APP_SUPABASE_KEY as string;
export const supabase = createClient<Database>(supabaseUrl, supabaseKey);

type users = Record<string, string>;

/**
 * 리뷰 가져오기
 * @param userId 유저 아이디
 * @returns 리뷰 목록
 */
export const getReviews = async (userId: string) => {
  const { data, error } = await supabase.from('review').select('*').eq('user_id', userId);
  if (error) throw error;
  return { data, error };
};

/**
 * 찜 목록 가져오기
 * @param userId 유저 아이디
 * @returns 찜 목록
 */
export const getWishList = async (userId: string) => {
  const { data, error } = await supabase.rpc('get_likes_products', { input_user_id: userId });
  if (error) throw error;
  return data;
};

/**
 * 찜 목록 삭제하기
 * @param userId 유저 아이디
 * @returns 찜 목록
 */
export const deleteWishList = async (productId: number) => {
  const { data, error } = await supabase.from('likes').delete().eq('post_id', productId);
  if (error) throw error;
  return data;
};

/**
 * 판매 목록 가져오기 (판매중, 거래완료)
 * @param userId 유저 아이디
 * @returns 판매 목록
 */
export const getSalesList = async (userId: string) => {
  const { data, error } = await supabase.rpc('get_sales_products', { input_user_id: userId });
  if (error) throw error;
  return data;
};

/**
 * 판매 중 => 판매 완료로 상태 변경
 * @param productId 상품 아이디
 */
export const updateOnSaleToSoldOut = async (productId: number) => {
  const { data, error } = await supabase.from('products').update({ status: true }).eq('id', productId);
  if (error) throw error;
  return data;
};

/**
 * 회원가입
 * @param values 이메일, 비밀번호, 닉네임
 */
export const signupHandler = async (values: users) => {
  const { email, password, name } = values;
  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: name,
          avatar_img: user,
        },
      },
    });
    if (error) throw error;
    return data;
  } catch (error) {
    throw error;
  }
};

/**
 * 로그인
 * @param values 이메일, 비밀번호
 */
export const loginHandler = async (values: users) => {
  const { email, password } = values;
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (error) throw error;
  return data;
};

/**
 * 유저 정보 저장
 * @param values 이메일, 아이디, 가입일, 닉네임
 * @returns data
 */
export const saveUser = async (values: users) => {
  const { email, id, created_at, full_name, avatar_img } = values;
  const { data, error } = await supabase
    .from('users')
    .insert([{ email, id, created_at, nickname: full_name, avatar_img }])
    .select();
  if (error) throw error;
  return data;
};

/**
 * 소셜 로그인
 * @param provider 구글, 카카오
 */
export const signInWithProvider = async (provider: 'google' | 'kakao') => {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider,
  });

  if (error) throw error;
  return data;
};
/**
 * 로그아웃
 */
export const logoutHandler = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
};

/**
 * 유저 정보 가져오기 - DB에 저장되어있는 user의 정보
 * @returns 유저 정보
 */
export const getUserData = async () => {
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();
  if (error) throw error;
  return user;
};

/**
 * 유저 세션 가져오기 - 웹페이지에 머무르는 user의 정보
 * @returns 유저 세션
 */
export const getUserSession = async () => {
  const { data, error } = await supabase.auth.getSession();
  if (error) throw error;
  return data;
};

/**
 * 비밀번호 변경 메일 보내기
 * @param email 비밀번호 변경 메일받을 이메일
 */
export const resetPasswordHandler = async (values: users) => {
  const { email } = values;
  try {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: 'http://localhost:3000/auth/reset', // 비밀번호 찾기 페이지로 이동
    });
    if (!error) {
      alert('메일이 전송되었습니다.');
    }
  } catch (error) {
    throw error;
  }
};

/**
 * 비밀번호 변경
 * @param password 변경할 비밀번호
 */
export const updatePasswordHandler = async (values: users) => {
  const { password } = values;
  const { data, error } = await supabase.auth.updateUser({
    password,
  });
  if (data) {
    alert('비밀번호 변경이 완료되었습니다.');
  }
  if (error) {
    alert('There was an error updating your password.');
    throw error;
  }
};
/**
 * 상품등록
 * @param 아래 타입이 파라미터입니다.
 */
type ParamForRegist = {
  category2_id: number;
  title: string;
  content: string;
  price: string;
  tags: string[];
  user_id: string;
  imgFiles: (File | Blob)[];
};

export const insertProduct = async (info: ParamForRegist) => {
  // post Table에 우선 text들을 저장 합니다.
  const { data, error } = await supabase
    .from('products')
    .insert([
      {
        category2_id: info.category2_id,
        title: info.title,
        content: info.content,
        price: info.price,
        user_id: info.user_id,
        status: false,
      },
    ])
    .select();
  // post_id && createdAt를 가져와서 storage의 고유 경로로 사용합니다.
  const post_id = data?.[0].id!;
  const date = data?.[0].created_at!;

  await insertHashTag(post_id, info.tags);
  await insertImageStorage(post_id, info.imgFiles, date, info.user_id);

  if (error) {
    throw error;
  }

  return data;
};

/**
 * hash_tag 등록
 * @param post_id : number
 * @param hash_tag : 해쉬태그 string[]
 */
const insertHashTag = async (post_id: number, hash_tag: string[]) => {
  const { data, error } = await supabase
    .from('hash_tag')
    .insert([
      {
        post_id,
        hash_tag,
      },
    ])
    .select();

  if (error) {
    throw error;
  }
};

/**
 * product-image 등록
 * @param id
 * @param files
 * @param date
 * @param uuid
 */
const insertImageStorage = async (id: number, files: (File | Blob)[], date: string, uuid: string) => {
  try {
    // 이미지가 Array 형태로 담겨져 있으므로 promise All을 사용하려고 변수에 담았습니다.
    const uploadImage = files.map(async (file) => {
      // nano id를 사용해서 이미지 고유 이름으로 넣습니다.
      const imageName = nanoid();
      const { data, error } = await supabase.storage
        .from('product-images')
        .upload(`${uuid}/${id}/${date}/${imageName}`, file);
      if (error) throw error;

      return data;
    });

    // Promise.all로 처리하여 urlPath라는 변수에 담습니다.
    const urlPath = await Promise.all(uploadImage);

    // getPublicUrl이라는 메소드가 동기 함수입니다;; 당황함 그래서 그냥 async await을 사용하지 않았습니다.
    const urls = urlPath.map((url) => {
      const { data } = supabase.storage.from('product-images').getPublicUrl(`${url?.path}`);
      return data.publicUrl;
    });

    // product에다가 다시 넣어줬습니다.
    const { data, error } = await supabase
      .from('products')
      .update({
        product_img: urls,
        status: false,
      })
      .eq('id', id) // product_id를 찾는 eq입니다.
      .select();

    if (error) {
      throw error;
    }
  } catch (error) {
    throw error;
  }
};

export const deleteImageFromStorage = async (info: ProductInfoType) => {
  const { data: lists } = await supabase.storage
    .from('product-images')
    .list(`${info.user_id}/${info.product_id}/${info.created_at}`);
  const filesToRemove = lists?.map((list) => `${info.user_id}/${info.product_id}/${info.created_at}/${list.name}`);

  const { data, error } = await supabase.storage.from('product-images').remove(filesToRemove!);
  if (error) {
    throw error;
  }
};

/**
 * 상품 데이터 불러오기
 * @param page 페이지 번호
 * @returns 상품 목록
 */
export const getProducts = async (page: number) => {
  const { data, error } = await supabase.from('products').select('*');

  if (error) throw error;
  return data;
};

/**
 * 검색 기능
 * @param page 페이지 번호
 * @param keyword 검색어
 * @param column 검색할 칼럼명
 * @returns 검색 결과
 */
const searchInColumn = async (page: number, keyword: string, column: string) => {
  const { data, error } = await supabase
    .rpc('get_latest_products')
    .textSearch(column, keyword, {
      type: 'websearch',
    })
    .range(page * 10 - 10, page * 10 - 1);

  if (error) throw error;

  return data;
};

export const searchProducts = async (page: number, keyword: string) => {
  try {
    const titleData = await searchInColumn(page, keyword, 'title');
    const contentData = await searchInColumn(page, keyword, 'content');
    return [...titleData, ...contentData];
  } catch (error) {
    throw error;
  }
};

// 최신 게시물 가져오기 (메인)
export const getLatestProducts = async (limitNum: number) => {
  const newNum = limitNum === 0 ? 4 : limitNum;

  if (limitNum === 0) {
    if (newNum === 4) {
      const { data, error } = await supabase.rpc('get_latest_products').limit(newNum);
      if (error) throw error;

      return data;
    } else {
      return [];
    }
  } else {
    const { data, error } = await supabase.rpc('get_latest_products').range(newNum * 10 - 10, newNum * 10 - 1);
    if (error) throw error;
    return data;
  }
};

// 인기 게시물 가져오기 (like 수)
export const getPopularProducts = async (limitNum: number) => {
  const newNum = limitNum === 0 ? 4 : limitNum;

  if (limitNum === 0) {
    if (newNum) {
      const { data, error } = await supabase.rpc('get_popular_products').limit(newNum);
      if (error) throw error;
      return data;
    } else {
      return [];
    }
  } else {
    const { data, error } = await supabase.rpc('get_popular_products').range(newNum * 10 - 10, newNum * 10 - 1);
    if (error) throw error;
    return data;
  }
};

/**
 * 카테고리 1depth 가져오기
 * @param page 페이지 번호
 * @param name 카테고리 이름
 * @returns 카테고리에 해당하는 상품 목록
 */
export const getCategoryWithOneDepth = async (page: number, name: string) => {
  // rpc 함수 사용
  const { data, error } = await supabase
    .rpc('get_category_products', { input_category_name: name })
    .range(page * 10 - 10, page * 10 - 1);
  if (error) throw error;
  return data;
};

// 유저 닉네임 변경(auth)
export const updateUserNickname = async (nickname: string) => {
  const { data, error } = await supabase.auth.updateUser({ data: { full_name: `${nickname}` } });
  if (error) throw error;
  return data;
};
// 유저 닉네임 변경(users 테이블)
export const updateTableNickname = async (uid: string, nickname: string) => {
  const { error } = await supabase.from('users').update({ nickname: nickname }).eq('id', uid);
  if (error) throw error;
};
// 유저 프로필 사진 업로드(storage)
export const uploadStorageProfileImg = async (uid: string, file: File) => {
  const { data, error } = await supabase.storage.from(`profile-images`).upload(`${uid}/img`, file);
  if (error) throw error;
  return data;
};
// 유저 프로필 사진 삭제(storage)
export const deleteStorageImage = async (uid: string) => {
  const { data, error } = await supabase.storage.from(`profile-images`).remove([`${uid}/img`]);
  if (error) throw error;
  return data;
};
// 유저 프로필 사진 업로드(users 테이블)
export const insertProfileImg = async (uid: string, url: string) => {
  const { error } = await supabase.from('users').update({ avatar_img: url }).eq('id', uid);
  if (error) throw error;
};
// 유저 프로필 사진 publicUrl 받아오기 (users 테이블에 넣어줄 url string)
export const imgPublicUrl = async (uid: string) => {
  try {
    const { data } = supabase.storage.from(`profile-images`).getPublicUrl(`${uid}/img`);
    return data;
  } catch (error) {
    throw error;
  }
};
// 유저 프로필 사진 url auth에 넣어주기
export const updateUserProfile = async (url: string) => {
  const { data, error } = await supabase.auth.updateUser({ data: { avatar_img: `${url}` } });
  if (error) throw error;
  return data;
};
export const getUsersAvartarImg = async (uid: string) => {
  const { data, error } = await supabase.from('users').select('avatar_img').eq('id', uid);
  if (error) throw error;
  return data;
};
export const getUsersNickname = async (uid: string) => {
  const { data, error } = await supabase.from('users').select('nickname').eq('id', uid);
  if (error) throw error;
  return data;
};

// 팔로우 추가하기
export const follow = async (id: string, uid: string, params: string, nickname: string, img: string) => {
  const { data, error } = await supabase
    .from('follow')
    .insert([{ follow_id: id, from_user_id: uid, to_user_id: params, to_user_nickname: nickname, to_user_img: img }]);
  if (error) throw error;
  return { data, error };
};

// 팔로우 목록 가져오기
export const getFollowList = async (params: string) => {
  const { data, error } = await supabase.from('follow').select('*').eq('from_user_id', params);
  if (error) throw error;
  return data;
};
// 팔로우 목록 확인하기(followId로)
export const checkFollowId = async (followId: string) => {
  const { data, error } = await supabase.from('follow').select('follow_id').eq('follow_id', followId);
  if (error) throw error;
  return { data, error };
};
// 팔로우 취소하기
export const unfollow = async (followId: string) => {
  const { error } = await supabase.from('follow').delete().eq('follow_id', followId);
  if (error) throw error;
};
// 팔로우 취소하기(마이페이지)
export const mypageUnfollow = async (targetuser: string) => {
  const { error } = await supabase.from('follow').delete().eq('to_user_id', targetuser);
  if (error) throw error;
};

// 유저의 리뷰 row 가져오기
export const filteredReview = async (uid: string) => {
  const { data, error } = await supabase.from('review').select('*').eq('user_id', uid);
  if (error) throw error;
  return data;
};
type ReviewProps = {
  params: string;
  i1: number;
  i2: number;
  i3: number;
  i4: number;
  i5: number;
};
// 리뷰삭제(update가 잘 먹지 않는 것 같아 삭제하고 insert)
export const deleteReview = async (params: string) => {
  const { error } = await supabase.from('review').delete().eq('user_id', params);
  if (error) throw error;
};

// 리뷰등록(update)
export const updateReview = async ({ params, i1, i2, i3, i4, i5 }: ReviewProps) => {
  const { data, error } = await supabase
    .from('review')
    .update({ res_fast: i1, kind: i2, good_product: i3, same_product: i4, good_time: i5 })
    .eq('user_id', params);
  if (error) throw error;
  return data;
};
// 리뷰등록(insert)
export const insertReview = async ({ params, i1, i2, i3, i4, i5 }: ReviewProps) => {
  const { data, error } = await supabase
    .from('review')
    .insert([{ user_id: params, res_fast: i1, kind: i2, good_product: i3, same_product: i4, good_time: i5 }])
    .select();
  if (error) throw error;
};
// 구매목록 불러오는 함수
export const getPurchaseLists = async (uid: string) => {
  const { data, error } = await supabase.rpc('get_purchase_lists', { input_user_id: uid });
  if (error) throw error;
  return data;
};
// 리뷰 폼에서 등록 시, paramUid이용하여 sales 상태 바꿔주기
export const UpdateReviewStatus = async (uid: string) => {
  const { data, error } = await supabase.from('sales').update({ review_status: true }).eq('user_id', uid);
  if (error) throw error;
  return data;
};

/**
 * product를 등록한 user의 point& nickname & avatar_img 가져오는 함수입니다.
 * @param [{}] 형태로 가져옵니다.
 */

export const getUserInfoInProduct = async (uid: string) => {
  const { data } = await supabase.from('users').select('point,nickname,avatar_img').eq('id', uid);
  if (data) {
    return data;
  }
};

export const findLike = async (user_id: string, post_id: number) => {
  if (user_id && post_id) {
    const { data, error } = await supabase.from('likes').select().eq('user_id', user_id).eq('post_id', post_id);
    if (error) throw error;
    return data;
  }
};

export const cancelLike = async (post_id: number) => {
  const { error } = await supabase.from('likes').delete().eq('post_id', post_id);
  if (error) throw error;
};

export const registLike = async (user_id: string, post_id: number) => {
  const { data, error } = await supabase.from('likes').insert([{ post_id, user_id }]).select();

  if (error) throw error;
};

/**
 * product Edit 할 때 사용하는 함수들과 타입입니다.
 */
type ProductInfoType = {
  category2_id: number;
  content: string;
  created_at: string;
  hash_tags: string[];
  like_count: number;
  price: string;
  product_id: number;
  product_img: string[];
  title: string;
  user_id: string;
};

type NewProductType = {
  category2_id: number;
  content: string | null;
  created_at: string;
  id: number;
  price: string;
  product_img: string[] | null;
  title: string | null;
  user_id: string;
}[];

export const listToBlob = async (info: ProductInfoType) => {
  const lists = await getImageFileList(info);
  if (lists !== undefined) {
    const blobs = await downloadImageFiles(lists, info);
    return blobs;
  }
};
const downloadImageFiles = async (lists: FileObject[], info: ProductInfoType) => {
  const promiseBlob = lists.map(async (list) => {
    const { data, error } = await supabase.storage
      .from('product-images')
      .download(`${info.user_id}/${info.product_id}/${info.created_at}/${list.name}`);
    if (error) throw error;
    return data;
  });

  const blobs = await Promise.all(promiseBlob);
  return blobs;
};
const getImageFileList = async (info: ProductInfoType) => {
  const { data, error } = await supabase.storage
    .from('product-images')
    .list(`${info.user_id}/${info.product_id}/${info.created_at}`);
  if (data) {
    return data;
  }
  if (error) throw error;
};
export const updateTableRow = async (preInfo: ProductInfoType, currentInfo: NewProductType) => {
  const { data, error } = await supabase
    .from('likes')
    .update({ post_id: currentInfo[0].id })
    .eq('post_id', preInfo.product_id);

  if (error) {
    throw error;
  }
};
export const deleteProduct = async (info: ProductInfoType) => {
  const { error } = await supabase.from('products').delete().eq('id', info.product_id);
  if (error) throw error;
};

/**
 * category 불러오기
 */

export const getMainCategory = async () => {
  let { data: categories1, error } = await supabase.from('categories1').select('*');
  if (error) {
    throw error;
  }
  return categories1;
};

export const getSubCategory = async (id: number) => {
  let { data: categories2, error } = await supabase.from('categories2').select('name,id').eq('category1_id', id);
  if (error) {
    throw error;
  }
  return categories2;
};

// realtime 채팅 로직
export type ChatMessage = {
  current_chat_id: number;
  message_id: string;
  message_created_at: string;
  content: string;
  author_id: string;
  visible: boolean;
  type: string;
  img_src: string;
  request_answer: boolean;
};

export type ChannelInfo = {
  chat_id: number;
  chat_created_at: string;
  user1_id: string;
  user2_id: string;
  top_message: ChatMessage | null;
  invisible_count: number;
  product_status: boolean;
  product_id: number;
};

// 현재 유저 정보에 따른 채팅방 가져오기
export const getCurrentUserChatChannel = async (userId: string): Promise<ChannelInfo[] | []> => {
  if (!userId) return [];
  const { data, error } = await supabase
    .rpc('get_user_channel', {
      input_user_id: userId,
    })
    .returns<ChannelInfo[]>();

  if (error) throw error;
  return data;
};

// 선택한 채팅방 내역 가져오기
export const getSelectChatMessages = async (channel: number): Promise<ChatMessage[] | []> => {
  const { data, error } = await supabase.rpc('get_channel_messages', { input_channel_id: channel });

  if (error) throw error;
  return data;
};

export const updateVisibleTrue = async (user_id: string, chat_id: number): Promise<void> => {
  await supabase.rpc('update_visible', { input_user_id: user_id, input_chat_id: chat_id });
};

export const getUserInfo = async (uid: string) => {
  const { data, error } = await supabase.from('users').select('*').eq('id', uid);
  if (data) {
    return data;
  }

  if (error) throw error;
};

type sendMessageArgs = {
  currentChannel: number;
  message: string | null;
  otherUserIn: boolean;
  image: File | null;
  type: string;
};

export const sendMessage = async ({
  currentChannel,
  message,
  otherUserIn,
  image,
  type,
}: sendMessageArgs): Promise<void> => {
  const currentUser = await getUserSession();

  switch (type) {
    case 'message':
      await supabase.from('chat_messages').insert([
        {
          id: nanoid(),
          chat_id: currentChannel,
          content: message,
          author_id: currentUser.session?.user.id,
          visible: otherUserIn,
          type: type,
          request_answer: null,
          img_src: null,
        },
      ]);
      break;
    case 'request':
      await supabase.from('chat_messages').insert([
        {
          id: nanoid(),
          chat_id: currentChannel,
          content: message,
          author_id: currentUser.session?.user.id,
          visible: otherUserIn,
          type: type,
          // null일 때 질문을 던지고 답이 없는 상황
          request_answer: null,
          img_src: null,
        },
      ]);
      break;
    case 'image':
      const messageId = nanoid();

      await supabase.from('chat_messages').insert([
        {
          id: messageId,
          chat_id: currentChannel,
          content: message,
          author_id: currentUser.session?.user.id,
          visible: otherUserIn,
          type: type,
          request_answer: null,
          img_src: null,
        },
      ]);
      await uploadTalkMessageImage(messageId, image!);
      break;
    default:
      break;
  }
};

const uploadTalkMessageImage = async (id: string, file: File | Blob) => {
  // 이미지가 Array 형태로 담겨져 있으므로 promise All을 사용하려고 변수에 담았습니다.

  const imageName = nanoid();

  const { data: urlPath, error } = await supabase.storage
    .from('talk-channel-images')
    .upload(`${id}/${imageName}`, file);

  if (error) throw error;
  // Promise.all로 처리하여 urlPath라는 변수에 담습니다.

  // getPublicUrl이라는 메소드가 동기 함수입니다;; 당황함 그래서 그냥 async await을 사용하지 않았습니다.
  const { data: storageImage } = supabase.storage.from('talk-channel-images').getPublicUrl(`${urlPath?.path}`);
  const storagePath = storageImage.publicUrl;

  // product에다가 다시 넣어줬습니다.
  await supabase
    .from('chat_messages')
    .update({
      img_src: storagePath,
    })
    .eq('id', id); // product_id를 찾는 eq입니다.
};

export const updateMessageUpdate = async (messageId: string, answer: boolean) => {
  await supabase
    .from('chat_messages')
    .update({
      request_answer: answer,
    })
    .eq('id', messageId); // product_id를 찾는 eq입니다.
};

export const getTalkChannel = async (id: number) => {
  const { data, error } = await supabase.from('chats').select(`*, chat_user(*)`).eq('product_id', id);

  if (error) throw error;
  return data ? data : [];
};

export const createTalkChannel = async (user1_id: string, user2_id: string, product_id: number) => {
  const { data: talkChannelInfo, error } = await supabase.from('chats').insert([{ product_id }]).select('*');

  if (error) throw error;
  if (talkChannelInfo) {
    await supabase.from('chat_user').insert([{ chat_id: talkChannelInfo[0].id, user1_id, user2_id }]);

    await supabase
      .from('chat_messages')
      .insert([{ author_id: user1_id, chat_id: talkChannelInfo[0].id, content: '', id: 'dummy', type: 'message' }]);

    await supabase.from('chat_messages').delete().eq('id', 'dummy');

    return talkChannelInfo[0].id;
  }
};

export const updateSales = async (user_id: string, product_id: number) => {
  await supabase.from('sales').insert([{ user_id, product_id, review_status: false }]);
};
