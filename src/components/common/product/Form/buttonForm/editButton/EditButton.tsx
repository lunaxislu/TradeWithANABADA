import { CommonPropsOfButtonType } from '../ButtonForm';
import * as St from './EditButton.styled';

const EditButton = ({ userData, productInfo, isEdit, setIsEdit }: CommonPropsOfButtonType) => {
  return (
    <St.Container>
      {userData?.id === productInfo?.user_id && (
        <St.EditButton type="submit" $isEdit={isEdit as boolean}>
          {isEdit ? '수정완료' : '수정하기'}
        </St.EditButton>
      )}
    </St.Container>
  );
};

export default EditButton;
