import styled from 'styled-components';

export const ListWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 1.5rem;
`;

export const ListBox = styled.div`
  width: 48%;
  border: 0.2rem solid #dcdcdc;
  ${({ theme }) => theme.mediaQuery.sm`
  width: 23%;
  `}
  ${({ theme }) => theme.mediaQuery.lg`
  `};
`;

export const ListImage = styled.div`
  position: relative;
`;

export const ListImageProduct = styled.img``;

export const ListImageHeart = styled.img`
  width: 2rem;
  position: absolute;
  bottom: 0.5rem;
  right: 0.5rem;
  ${({ theme }) => theme.mediaQuery.lg`
    width: 2.5rem;
  `};
`;

export const ListInfo = styled.div`
  padding: 0.8rem;
  line-height: 2.5rem;
`;

export const ListPriceandDate = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const ListTitle = styled.div`
  font-size: 1.5rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const ListPrice = styled.div`
  font-size: 1.5rem;
`;

export const ListDate = styled.div``;
