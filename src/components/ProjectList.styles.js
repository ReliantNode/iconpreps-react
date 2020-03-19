import styled from 'styled-components';
import { breakpoints, palette } from 'utils/designTokens';

export const Container = styled.div`
  display: flex;
  align-items: flex-start;
`;

export const Listing = styled.div`
  flex: 1;

  @media screen and (min-width: ${breakpoints.min.lg}) {
    margin-left: 3rem;
  }
`;

export const Filters = styled.div`
  @media screen and (max-width: ${breakpoints.max.md}) {
    display: ${({ showing }) => (showing ? 'block' : 'none')};
    position: absolute;
    top: 0;
    left: -2rem;
    right: -2rem;
    min-height: 100%;
    background: ${palette.white};
  }

  @media screen and (min-width: ${breakpoints.min.lg}) {
    display: block;
    flex-shrink: 0;
    width: 26rem;
    background: ${palette.white};
    border: 1px solid ${palette.gray.border};
    border-radius: 0.6rem;
    box-shadow: 0 2px 5px 0 rgba(206, 210, 219, 0.5);
  }
`;

export const ProjectDetails = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: center;
  margin-left: 2.5rem;
`;

export const ProjectHeader = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
`;

export const ProjectMeta = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-top: 1px solid ${palette.gray.border};
  padding-top: 1.5rem;
  margin-top: 1.5rem;
`;

export const ProjectMetaSeparator = styled.div`
  flex-shrink: 0;
  align-self: stretch;
  width: 1px;
  background: ${palette.gray.border};
  margin: 0 2.5rem;
`;

export const ProjectRecent = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

export const Dot = styled.div`
  display: inline-block;
  width: 0.8rem;
  height: 0.8rem;
  border-radius: 0.8rem;
  margin-right: 1rem;
`;
