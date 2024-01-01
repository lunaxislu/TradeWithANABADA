import { CommonPropsOfButtonType } from '../ButtonForm';
import * as St from './EditButton.styled';

const EditButton = ({ userData, productInfo, isEdit, setIsEdit }: CommonPropsOfButtonType) => {
  const onClickChangeEditState = () => {
    if (setIsEdit) {
      setIsEdit(!isEdit);
    }
  };

  return (
    <St.Container>
      {userData?.id === productInfo?.user_id && (
        <St.EditButton $isEdit={isEdit as boolean} onClick={onClickChangeEditState}>
          {isEdit ? '수정완료' : '수정하기'}
        </St.EditButton>
      )}
    </St.Container>
  );
};

export default EditButton;
