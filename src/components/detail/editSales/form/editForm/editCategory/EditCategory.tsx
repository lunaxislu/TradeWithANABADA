import { useEffect, useState } from 'react';
import { getMainCategory, getSubCategory } from '../../../../../../API/supabase.api';
import * as St from './EditCategory.styled';

type MainCategoryType = {
  created_at: string;
  id: number;
  name: string;
}[];

const EditCategory = () => {
  const [category, setCategory] = useState<MainCategoryType>([]);
  const [subCategory, setSubCategory] = useState<{ name: string }[]>([]);

  const [mainIndex, setMainIndex] = useState('');
  const [subIndex, setSubIndex] = useState('');
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
        name="category_1"
        id="category_1"
        onChange={(e) => {
          setMainIndex(e.currentTarget.value);
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

      {mainIndex && (
        <select
          name="category_2"
          id="category_2"
          onChange={(e) => {
            setSubIndex(e.currentTarget.value);
          }}
        >
          <option value="">선택하기</option>

          {subCategory?.map((subOption, idx) => {
            return <option value={idx + 1}>{subOption.name}</option>;
          })}
        </select>
      )}
    </St.Container>
  );
};

export default EditCategory;
