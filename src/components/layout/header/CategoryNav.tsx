import { useState } from 'react';
import { ReactComponent as HamburgMenu } from '../../../styles/assets/hamburgerMenu.svg';

const CategoryNav = () => {
  const [categoryOpen, setCategoryOpen] = useState<boolean>(false);

  const categoryToggle = () => {
    // TODO : category open
    setCategoryOpen((prev) => !prev);
  };
  return (
    <section>
      <button onClick={categoryToggle}>
        <HamburgMenu />
      </button>
    </section>
  );
};

export default CategoryNav;
