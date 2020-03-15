import React from 'react';
import styled from 'styled-components';
import searchIcon from 'assets/icons/search.svg';
import { H3 } from 'components/Typography';
import { palette } from 'utils/designTokens';

const Container = styled.div`
  flex-shrink: 0;
  width: 26rem;
  padding: 3rem 2rem;
  background: ${palette.white};
  border: 1px solid ${palette.gray.border};
  border-radius: 0.6rem;
  box-shadow: 0 2px 5px 0 rgba(206, 210, 219, 0.5);
`;

const SearchInput = styled.input`
  width: 100%;
  height: 4rem;
  line-height: 4rem;
  font-size: 1.5rem;
  font-weight: 500;
  border: 1px solid ${palette.gray.border};
  border-radius: 0.4rem;
  padding: 0 1rem 0 4rem;
  margin-top: 2rem;
  background: no-repeat 1rem/2rem url(${searchIcon});

  &::placeholder {
    opacity: 0.25;
  }
`;

const Separator = styled.hr`
  width: 100%;
  height: 1px;
  background: ${palette.gray.border};
  border: none;
  margin: 3rem 0;
`;

function ProjectSearch() {
  return (
    <Container>
      <H3>Search</H3>
      <SearchInput type="text" placeholder="Search P-Rep projects" />
      <Separator />
      <H3>Category</H3>
      <Separator />
      <H3>Rating</H3>
      <Separator />
      <H3>Recent activity</H3>
      <Separator />
      <H3>Status</H3>
    </Container>
  );
}

export default ProjectSearch;
