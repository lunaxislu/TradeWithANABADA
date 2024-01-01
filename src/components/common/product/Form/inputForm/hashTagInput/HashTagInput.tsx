import React, { ChangeEvent, KeyboardEvent, useState } from 'react';
import * as St from './HashTagInput.styled';

type HashTagPropsType = {
  tags: string[];
  setTags: React.Dispatch<React.SetStateAction<string[]>>;
};
const HashTagInput = ({ tags, setTags }: HashTagPropsType) => {
  const [hashTag, setHashTag] = useState('');

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
      return [...new Set([...pre, `# ${newHashTag}`])];
    });
    setHashTag('');
  };
  const onKeyDownRemoveTag = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.code === 'Backspace' && hashTag.trim().length === 0) {
      const updateTags = tags.filter((_, idx) => tags.length - 1 !== idx);
      setTags(updateTags);
    }
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
              {tag}
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
          onKeyDown={onKeyDownRemoveTag}
        />
        <span></span>
      </St.HashTagWrapper>
    </St.Container>
  );
};

export default React.memo(HashTagInput);
