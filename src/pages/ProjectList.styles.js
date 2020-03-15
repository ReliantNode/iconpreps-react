import styled from 'styled-components';
import { palette } from 'utils/designTokens';

export const Container = styled.div`
  display: flex;
  align-items: flex-start;
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

function getColorByStatus(status) {
  switch (status) {
    case 'Planning':
    case 'Complete':
      return palette.white;
    case 'Executing':
    default:
      return palette.black;
  }
}

function getBgByStatus(status) {
  switch (status) {
    case 'Planning':
      return palette.pink;
    case 'Complete':
      return palette.green;
    case 'Executing':
    default:
      return palette.yellow;
  }
}

export const ProjectStatus = styled.div`
  font-weight: 500;
  font-size: 1.1rem;
  line-height: 1.5rem;
  color: ${({ children }) => getColorByStatus(children)};
  background: ${({ children }) => getBgByStatus(children)};
  padding: 0.4rem 2.3rem 0.5rem;
  border-radius: 1.5rem;
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
