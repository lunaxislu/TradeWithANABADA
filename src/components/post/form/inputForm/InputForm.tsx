import InfoInput from './InfoInput/InfoInput';
import * as St from './InputForm.style';
import CategoryInput from './categoryInput/CategoryInput';
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
    </St.Container>
  );
};

export default InputForm;
