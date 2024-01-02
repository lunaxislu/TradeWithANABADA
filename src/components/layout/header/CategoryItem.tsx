import { PropsWithChildren } from 'react';
import { Link } from 'react-router-dom';
import * as St from './header.styled';

type CategoryItemProps = {
  query: string;
};

const CategoryItem = ({ children, query }: PropsWithChildren<CategoryItemProps>) => {
  return (
    <St.CategoryLi>
      <Link to={`/product?search=${query}`}>{children}</Link>
    </St.CategoryLi>
  );
};

export default CategoryItem;
