import { CommonPropsOfButtonType } from '../ButtonForm';
import * as St from './EditButton.styled';

const EditButton = ({ userData, productInfo, isEdit, setIsEdit }: CommonPropsOfButtonType) => {
  if (!isEdit && setIsEdit)
    return (
      <St.Container>
        {userData?.id === productInfo?.user_id && (
          <St.EditButton onClick={() => setIsEdit(!isEdit)} type="submit" $isEdit={isEdit as boolean}>
            수정하기
          </St.EditButton>
        )}
      </St.Container>
    );

  return (
    <St.Container className="edit-complete">
      {userData?.id === productInfo?.user_id && (
        <St.EditButton type="submit" $isEdit={isEdit as boolean}>
          수정완료
        </St.EditButton>
      )}
    </St.Container>
  );
};

export default EditButton;
