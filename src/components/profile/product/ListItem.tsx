import { useNavigate } from 'react-router-dom';
import { useProfile } from '../../../hooks/profileHook/useProfile';
import { displayCreateAt } from '../../../utils/date';
import { ProductData } from '../../home/HomeProductList';
import { Button } from '../../ui/Button';
import * as St from '../Profile.styled';
import { ProductDataExtends } from '../ProfileProductList';

type ListItemProps = {
  name: string;
  list: ProductDataExtends[];
  setParamUid?: React.Dispatch<React.SetStateAction<string>>;
  setReviewModal?: React.Dispatch<React.SetStateAction<boolean>>;
};

const ListItem = ({ name, list, setParamUid, setReviewModal }: ListItemProps) => {
  const navigate = useNavigate();
  const { remove, update } = useProfile();

  const moveToDetailPage = (item: ProductData) => navigate(`/detail/${item.product_id}`, { state: item });

  return (
    <>
      {list?.map((item, i) => {
        const date = displayCreateAt(item.created_at);

        return (
          <li key={item.product_id}>
            <div>
              <St.ListImage>
                {item.product_img && item.product_img.length > 0 ? (
                  <img src={item.product_img[0]} alt="" onClick={() => moveToDetailPage(item)} />
                ) : (
                  <img src="" alt="" />
                )}
              </St.ListImage>

              <St.PostsWrapper>
                <div onClick={() => moveToDetailPage(item)}>
                  <p>제목: {item.title}</p>
                  <p>내용: {item.content}</p>
                </div>
                <div>
                  <p>10,000</p>
                  <p>원의 가치</p>
                </div>
              </St.PostsWrapper>

              <St.PriceWrapper $name={name} $review_status={item.review_status}>
                <span>{date}</span>
                {(() => {
                  switch (name) {
                    case 'wish':
                      return (
                        <Button className="wish" color="primary" onClick={() => remove(item.product_id)}>
                          삭제
                        </Button>
                      );
                    case 'purchase':
                      if (!item.review_status && setParamUid && setReviewModal) {
                        return (
                          <Button
                            className="purchase"
                            color="primary"
                            onClick={() => {
                              setReviewModal(true);
                              setParamUid(item.purchased_user_id!);
                              console.log(item.purchased_user_id!);
                            }}
                          >
                            후기 등록
                          </Button>
                        );
                      } else {
                        return <></>;
                      }
                    default:
                      break;
                  }
                })()}
              </St.PriceWrapper>
            </div>
          </li>
        );
      })}
    </>
  );
};

export default ListItem;
