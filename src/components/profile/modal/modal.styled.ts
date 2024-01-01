import styled from 'styled-components';

export const FollowContainer = styled.div`
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  justify-content: center;
  align-items: center;
  &.isOpen {
    display: flex;
  }
`;

export const FollowWrapper = styled.div`
  background-color: #fff;
  /* position: relative;
  top: 30%;
  left: 37%; */
  padding: 20px;
  border-radius: 8px;
  width: 35em;
  height: 50rem;
  text-align: center;
  overflow-y: auto;
`;
// export const FollowListWrapper = styled.div`
//   position: relative;
// `;

type ExitBtnProps = {
  $top: string;
};
export const ExitBtn = styled.button<ExitBtnProps>`
  position: absolute;
  text-align: center;
  top: ${(props) => props.$top || '20%'};
  border-radius: 20%;
  height: 5rem;
  width: 5rem;
  font-size: 2rem;
  font-weight: 900;
  background-color: rgba(0, 0, 0, 0.2);
  color: #fff;
  cursor: pointer;
`;

export const FollowList = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  border-bottom: 0.1rem solid #dcdcdc;
  cursor: pointer;
  & img {
    width: 5rem;
    height: 5rem;
    border-radius: 50%;
    border: 0.2rem solid #dcdcdc;
  }
  & div {
    display: flex;
    width: 45%;
    text-align: left;
    align-items: center;
    font-size: 1.5rem;
  }
  & button {
  }
`;
type BtnProps = {
  $color: string;
};
export const UnfollowBtn = styled.button<BtnProps>`
  background-color: ${(props) => props.$color || '#dcdcdc'};
  width: 25%;
  height: 2rem;
  border-radius: 0.5rem;
`;

export const ReviewContainer = styled.div`
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  justify-content: center;
  align-items: center;
  &.isOpen {
    display: flex;
  }
`;

export const ReviewWrapper = styled.div`
  background-color: #fff;
  padding: 3rem 1rem;
  border-radius: 8px;
  width: 70rem;
  height: 25rem;
  text-align: center;
  & div {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

export const ReviewLabel = styled.div`
  background-color: #dcdcdc;
  border-radius: 1rem;
  width: 12rem;
  height: 12rem;
  margin: 1rem;
  font-size: 1.3rem;
  cursor: pointer;
  & input {
    display: none;
  }
  &.isActive {
    background-color: #ababab;
  }
  & label {
    margin: 0 auto;
    cursor: pointer;
  }
`;

export const SubmitBtn = styled.button`
  background-color: #dcdcdc;
  border-radius: 1rem;
  padding: 1.5rem;
  margin: 1rem;
  font-size: 1.3rem;
  cursor: pointer;
`;
