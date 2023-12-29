import { useNavigate } from 'react-router-dom';

type ItemParams = {
  item: string;
};

const ProfileBtn = ({ item }: ItemParams) => {
  const navigate = useNavigate();
  return (
    <div style={{ display: 'flex' }}>
      <button
        onClick={() => {
          navigate(`/profile/${item}`);
          console.log('item이다', item);
        }}
      >
        {item}
      </button>
    </div>
  );
};

export default ProfileBtn;
