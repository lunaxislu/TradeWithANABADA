import { UserMetadata } from '@supabase/supabase-js';
import { ProductInfoType } from '../../sale/Sale';
import * as St from './EditButton.styled';

type PropsType = {
  userData: UserMetadata;
  productInfo: ProductInfoType;
  isEdit: boolean;
  setIsEdit: React.Dispatch<React.SetStateAction<boolean>>;
};
const EditButton = ({ userData, productInfo, isEdit, setIsEdit }: PropsType) => {
  const onClickChangeEditState = () => {
    setIsEdit(!isEdit);
  };
  return (
    <>
      {userData?.id === productInfo?.user_id && (
        <St.EditButton $isEdit={isEdit} onClick={onClickChangeEditState}>
          수정하기
        </St.EditButton>
      )}
    </>
  );
};

export default EditButton;
