import { useEffect, useState } from 'react';
import { getMainCategory, getSubCategory } from '../../../../../../API/supabase.api';
import * as St from './CategoryInput.styled';
type MainCategoryType = {
  created_at: string;
  id: number;
  name: string;
}[];

type SubCategoryType = {
  name: string;
  id: number;
}[];
/**
 *
 * useEffect 리팩토링 해야함
 */

const CategoryInput = () => {
  const [category, setCategory] = useState<MainCategoryType>([]);
  const [subCategory, setSubCategory] = useState<SubCategoryType>([]);

  const [mainIndex, setMainIndex] = useState('');
  const [_, setSubIndex] = useState('');

  useEffect(() => {
    getMainCategory().then((result) => {
      setCategory(result!);
    });
  }, []);
  useEffect(() => {
    if (!mainIndex) return;
    getSubCategory(parseInt(mainIndex)).then((result) => {
      setSubCategory(result!);
    });
  }, [mainIndex]);

  return (
    <St.Container>
      <select
        required
        name="category_1"
        id="category_1"
        onChange={(e) => {
          setMainIndex(e.currentTarget.value);
        }}
      >
        <option value="">선택하기</option>
        {category?.map((option, idx) => {
          return (
            <option key={option.id} value={option.id}>
              {option.name}
            </option>
          );
        })}
      </select>

      {mainIndex && (
        <select
          required
          name="category_2"
          id="category_2"
          onChange={(e) => {
            setSubIndex(e.currentTarget.value);
          }}
        >
          <option value="">선택하기</option>

          {subCategory?.map((subOption, idx) => {
            return <option value={subOption.id}>{subOption.name}</option>;
          })}
        </select>
      )}
    </St.Container>
  );
};

export default CategoryInput;
