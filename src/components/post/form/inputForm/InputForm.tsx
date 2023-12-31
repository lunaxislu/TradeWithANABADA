import InfoInput from './InfoInput/InfoInput';
import * as St from './InputForm.style';
import CategoryInput from './categoryInput/CategoryInput';
import FormButton from './formButton/FormButton';
import HashTagInput from './hashTagInput/HashTagInput';
import TextInput from './textInput/TextInput';

type PropsType = {
  tags: string[];
  setTags: React.Dispatch<React.SetStateAction<string[]>>;
};
const InputForm = ({ tags, setTags }: PropsType) => {
  return (
    <St.Container>
      <InfoInput />
      <HashTagInput tags={tags} setTags={setTags} />
      <CategoryInput />
      <TextInput />
      <FormButton />
    </St.Container>
  );
};

export default InputForm;
