import * as St from './Profile.styled';

type sampleTypes = {
  title: string;
  price: string;
}[];

const List = () => {
  const sampleList: sampleTypes = [
    { title: '닌텐도 스위치 동물의 숲 한정판', price: '400,000' },
    { title: '포켓몬 빵 띠부띠부 씰', price: '3,000' },
    { title: '(상태 최상급)일렉기타', price: '500,000' },
    { title: '(포메전용)강아지 샴푸', price: '10,000' },
  ];
  return (
    <St.ListWrapper>
      {sampleList.map((item, index) => {
        return (
          <St.ListBox key={index}>
            <St.ListImage>
              <St.ListImageProduct src={process.env.PUBLIC_URL + '/profile.jpeg'} />
              <St.ListImageHeart src={process.env.PUBLIC_URL + '/favicon.ico'} />
            </St.ListImage>

            <St.ListInfo>
              <St.ListTitle>{item.title}</St.ListTitle>
              <St.ListPriceandDate>
                <St.ListPrice>{item.price}</St.ListPrice>
                <St.ListDate>5분 전</St.ListDate>
              </St.ListPriceandDate>
            </St.ListInfo>
          </St.ListBox>
        );
      })}
    </St.ListWrapper>
  );
};

export default List;
