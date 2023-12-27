import { PropsWithChildren } from 'react';
import { Link } from 'react-router-dom';
import * as St from './header.styled';

type CategoryItemProps = {
  query: string;
};

const CategoryItem = ({ children, query }: PropsWithChildren<CategoryItemProps>) => {
  return (
    <St.CategoryLi>
      {/* TODO: to= "" > to= {`detail/${query}`} */}
      <Link to="">{children}</Link>
    </St.CategoryLi>
  );
};

export default CategoryItem;
