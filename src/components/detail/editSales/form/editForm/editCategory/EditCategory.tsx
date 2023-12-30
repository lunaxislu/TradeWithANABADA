import { useEffect, useState } from 'react';
import { getCategory, getSubCategory } from '../../../../../../API/supabase.api';
import * as St from './EditCategory.styled';

type MainCategoryType = {
  created_at: string;
  id: number;
  name: string;
}[];

const EditCategory = () => {
  const [category, setCategory] = useState<MainCategoryType>([]);
  const [subCategory, setSubCategory] = useState<{ name: string }[]>([]);

  const [idx, setIdx] = useState('');

  useEffect(() => {
    getCategory().then((result) => {
      setCategory(result!);
    });
  }, []);
  useEffect(() => {
    getSubCategory(parseInt(idx)).then((result) => {
      setSubCategory(result!);
    });
  }, [idx]);
  return (
    <St.Container>
      <select
        name="category_1"
        id="category_1"
        onChange={(e) => {
          setIdx(e.currentTarget.value);
        }}
      >
        <option value="">선택하기</option>
        {category?.map((option, idx) => {
          return (
            <option key={option.id} value={idx + 1}>
              {option.name}
            </option>
          );
        })}
      </select>

      {idx && (
        <select name="category_2" id="category_2">
          <option value="">선택하기</option>

          {subCategory?.map((subOption) => {
            return <option value={subOption.name}>{subOption.name}</option>;
          })}
        </select>
      )}
    </St.Container>
  );
};

export default EditCategory;
