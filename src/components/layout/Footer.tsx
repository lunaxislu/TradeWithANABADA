import { ReactComponent as Github } from '../../styles/assets/github.svg';
import { ReactComponent as Sparta } from '../../styles/assets/sparta.svg';
import * as St from './footer.styled';

const Footer = () => {
  return (
    <St.Footer>
      <St.FooterContainer>
        <h1>ANABADA</h1>
        <div>
          <section>
            <span> 대표 최문길, 장예성, 강나연, 김명섭 | 우쿠렐레 컴퍼니</span>
            <span> 주소 경기도 성남시 분당구</span>
            <span> 메일 ukulele@ukulele.co.kr</span>
            <span> 전화 : 070-0000-0000</span>
          </section>
          <section>
            <a href="https://github.com/UmpaLuna/TradeWithANABADA">
              <Github />
            </a>
            <a href="https://spartacodingclub.kr/">
              <Sparta />
            </a>
          </section>
        </div>
        <span>Copyright ©2024.UKULELE_ANABADA. All rights reserved.</span>
      </St.FooterContainer>
    </St.Footer>
  );
};

export default Footer;
