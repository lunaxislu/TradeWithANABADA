import { useEffect, useState } from 'react';
import { supabase } from '../../../../../../API/supabase.api';
import * as St from './EditCategory.styled';

const EditCategory = () => {
  const [category, setCategory] = useState();
  const [subCategory, setSubCategory] = useState();
  const getCategory = async () => {
    let { data: categories1, error } = await supabase.from('categories1').select('*');
    console.log(categories1);
  };
  useEffect(() => {
    getCategory();
  }, []);
  return (
    <St.Container>
      <select name="category_1" id="category_1" onChange={(e) => {}}>
        <option value="">선택하기</option>
      </select>
      <select name="category_2" id="category_2"></select>
    </St.Container>
  );
};

export default EditCategory;
