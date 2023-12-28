import { ChangeEvent, KeyboardEvent, useState } from 'react';
import * as St from './HashTag.styled';
const HashTag = () => {
  const [hashTag, setHashTag] = useState('');
  const [tags, setTags] = useState<string[]>([]);

  const changeHashInput = (e: ChangeEvent<HTMLInputElement>) => {
    setHashTag(e.target.value);
  };

  const createHashTag = (e: KeyboardEvent<HTMLInputElement>) => {
    if (tags.length === 4) return;

    const codes = ['Enter', 'Space'];
    if (!codes.includes(e.code)) return;

    // currentTarget을 이용해서 value를 가져오자
    if (!e.currentTarget.value.trim()) return;

    const reg = /[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]/g;
    let newHashTag = e.currentTarget.value;
    if (reg.test(newHashTag)) {
      newHashTag = newHashTag.replace(reg, '');
    }

    if (newHashTag.includes(',')) {
      newHashTag = newHashTag.split(',').join('');
    }

    if (!newHashTag.length) return;

    setTags((pre) => {
      return [...new Set([...pre, newHashTag])];
    });
    setHashTag('');
  };

  const removeHashTag = (id: number) => () => {
    const updateTags = tags.filter((_, idx) => idx !== id);
    setTags(updateTags);
  };
  return (
    <St.Container>
      <label htmlFor="hash" className="hasTag-title">
        #해시태그
      </label>
      <St.HashTagWrapper>
        {tags?.map((tag, idx) => {
          return (
            <div className="hash-tag" onClick={removeHashTag(idx)} key={tag}>
              # {tag}
            </div>
          );
        })}
        <input
          type="text"
          id="hash"
          value={hashTag}
          placeholder="#태그는 최대 4개입니다."
          onChange={changeHashInput}
          onKeyUp={createHashTag}
        />
        <span></span>
      </St.HashTagWrapper>
    </St.Container>
  );
};

export default HashTag;
