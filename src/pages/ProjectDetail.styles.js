import { Link } from '@reach/router';
import styled from 'styled-components';
import { palette } from 'utils/designTokens';

export const Header = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
`;

export const Container = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
`;

export const Main = styled.div`
  flex: 1;
`;

export const Sidebar = styled.div`
  width: 36rem;
  margin-left: 3rem;
`;

export const Card = styled.div`
  position: relative;
  background: ${palette.white};
  border: 1px solid ${palette.gray.border};
  border-radius: 0.6rem;
  box-shadow: 0 2px 5px 0 rgba(206, 210, 219, 0.5);
  padding: 3rem;
  margin-top: 3rem;
`;

export const ProjectOverview = styled.div`
  display: flex;
  align-items: stretch;
  justify-content: space-between;
  min-height: 5.5rem;
  margin-top: 2.5rem;
`;

export const ProjectOverviewItem = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-left: 1px solid ${palette.gray.border};
  padding: 0 3rem;

  &:first-child {
    border: none;
    padding-left: 0;
  }
  &:last-child {
    padding-right: 0;
  }
`;

export const PRepDetail = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin-top: 1.5rem;
`;

export const PRepLink = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 5rem;
  font-weight: 600;
  font-size: 1.6rem;
  line-height: 2.2rem;
  text-decoration: none;
  color: ${palette.white};
  background: ${palette.brand.primary};
  border: none;
  border-radius: 0.4rem;
  margin-top: 3rem;
`;

export const RelatedProject = styled.div`
  border-top: 1px solid ${palette.gray.border};
  padding-top: 2rem;
  margin-top: 2rem;
`;

export const ProjectDescription = styled.div`
  font-weight: 400;
  font-size: 1.5rem;
  line-height: 2.2rem;
  color: ${palette.black};

  p,
  ul {
    margin: 1.5rem 0 0;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    font-weight: 600;
    margin: 2rem 0 1rem;
  }
  h1,
  h2 {
    font-size: 1.7rem;
    line-height: 2.2rem;
  }
  h3,
  h4 {
    font-size: 1.5rem;
    line-height: 2.2rem;
  }
  h5,
  h6 {
    font-size: 1.3rem;
    line-height: 1.8rem;
  }

  a {
    font-weight: 600;
    color: unset;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
`;
