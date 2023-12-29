import styled from 'styled-components';

export const Container = styled.div`
  padding: 5rem;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
`;

export const TitleWrapper = styled.div`
  display: flex;
  width: 100%;
  padding: 2rem;
  flex-direction: row;

  span {
    font-size: 2.5rem;
    font-weight: 700;
  }
`;

export const List = styled.ul`
  gap: 3rem;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;

  li {
    gap: 2rem;
    padding: 10px;
    display: flex;
    position: relative;
    border-radius: 10px;
    flex-direction: column;
    border: 1px solid #ccc;
    box-shadow: 2px 2px 8px #ccc;
  }

  img {
    width: 30rem;
    height: 30rem;
    object-fit: cover;
  }

  div {
    font-size: 1.8rem;
  }

  span {
    font-size: 1.8rem;
  }
`;

export const HeartBox = styled.section`
  gap: 0.5rem;
  top: -17rem;
  right: 2rem;
  display: flex;
  position: absolute;
  align-items: center;
`;

export const Content = styled.div`
  gap: 1rem;
  display: flex;
  flex-direction: column;

  p:nth-of-type(1) {
    font-size: 2.5rem;
    font-weight: 700;
  }
  p:nth-of-type(2) {
    font-size: 1.5rem;
  }
  p:nth-of-type(3) {
    font-size: 1.5rem;
  }

  div {
    display: flex;
    font-size: 1.5rem;
    flex-direction: row;

    p:nth-of-type(1) {
      padding: 0.5rem;
      font-size: 1.5rem;
      border-radius: 0.7rem;
      background-color: #c3e2c2;
    }
    p:nth-of-type(2) {
      padding: 0.5rem;
    }
  }
`;
// import styled from 'styled-components';

// export const Container = styled.div`
//   padding: 5rem;
//   display: grid;
//   place-items: center;
// `;

// export const TitleWrapper = styled.div`
//   display: grid;
//   width: 100%;
//   padding: 2rem;
//   grid-auto-flow: column;

//   span {
//     font-size: 2.5rem;
//     font-weight: 700;
//   }
// `;

// export const List = styled.ul`
//   gap: 3rem;
//   display: grid;
//   grid-template-columns: repeat(4, 1fr);

//   li {
//     gap: 2rem;
//     padding: 10px;
//     display: grid;
//     position: relative;
//     border-radius: 1rem;
//     grid-auto-flow: column;
//     border: 0.1rem solid #ccc;
//     box-shadow: 2px 2px 8px #ccc;
//   }

//   img {
//     width: 100%;
//     height: auto;
//     object-fit: cover;
//   }

//   div {
//     font-size: 1.8rem;
//   }

//   span {
//     font-size: 1.8rem;
//   }
// `;

// export const HeartBox = styled.section`
//   gap: 0.5rem;
//   top: -17rem;
//   right: 2rem;
//   display: grid;
//   position: absolute;
//   place-items: center;
// `;

// export const Content = styled.div`
//   gap: 1rem;
//   display: grid;
//   grid-auto-flow: row;

//   p:nth-of-type(1) {
//     font-size: 2.5rem;
//     font-weight: 700;
//   }
//   p:nth-of-type(2) {
//     font-size: 1.5rem;
//   }
//   p:nth-of-type(3) {
//     font-size: 1.5rem;
//   }

//   div {
//     display: grid;
//     font-size: 1.5rem;
//     grid-auto-flow: column;

//     p:nth-of-type(1) {
//       padding: 0.5rem;
//       font-size: 1.5rem;
//       border-radius: 0.7rem;
//       background-color: #c3e2c2;
//     }
//     p:nth-of-type(2) {
//       padding: 0.5rem;
//     }
//   }
// `;
