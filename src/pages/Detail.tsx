import { useLocation } from 'react-router-dom';

const Detail = () => {
  const location = useLocation();
  console.log(location.state);

  return <div></div>;
};

export default Detail;
