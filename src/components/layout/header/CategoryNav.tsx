import { useState } from 'react';
import { ReactComponent as HamburgMenu } from '../../../styles/assets/hamburgerMenu.svg';
import CategoryItem from './CategoryItem';
import * as St from './header.styled';

type categoryType = {
  text: string;
  query: string;
};
const categoryList: Array<categoryType> = [
  { text: '여성의류', query: '' },
  { text: '남성의류', query: '' },
  { text: '신발', query: '' },
  { text: '쥬얼리', query: '' },
  { text: '디지털', query: '' },
  { text: '가전의류', query: '' },
  { text: '도서', query: '' },
];

const CategoryNav = () => {
  const [categoryOpen, setCategoryOpen] = useState<boolean>(false);

  const categoryToggle = () => {
    setCategoryOpen((prev) => !prev);
  };
  return (
    <section>
      <St.CategoryButton onClick={categoryToggle}>
        <HamburgMenu />
      </St.CategoryButton>
      <St.SideBar $isOpen={categoryOpen}>
        <span>전체 카테고리</span>
        <ul>
          {categoryList.map((category, index) => (
            <CategoryItem key={index} query={category.text}>
              {category.text}
            </CategoryItem>
          ))}
        </ul>
      </St.SideBar>
    </section>
  );
};

export default CategoryNav;
