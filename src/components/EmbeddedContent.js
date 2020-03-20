import React, { useLayoutEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { palette } from 'utils/designTokens';

const Container = styled.div`
  font-weight: 400;
  font-size: 1.5rem;
  line-height: 2.2rem;

  * {
    color: ${palette.black} !important;
  }

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

  img {
    height: auto !important;
  }

  pre,
  code {
    white-space: pre-wrap;
  }
`;

function EmbeddedContent({ content, ...props }) {
  const el = useRef();

  useLayoutEffect(() => {
    const [...links] = el.current.querySelectorAll('a');
    links.forEach(link => {
      link.setAttribute('target', '_blank');
      link.setAttribute('rel', 'noopener noreferrer');
    });
  }, [content]);

  return <Container dangerouslySetInnerHTML={{ __html: content }} ref={el} {...props} />;
}

EmbeddedContent.propTypes = {
  content: PropTypes.string.isRequired,
};

export default EmbeddedContent;
