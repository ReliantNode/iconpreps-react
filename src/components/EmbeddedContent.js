import React, { useLayoutEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { palette } from 'utils/designTokens';

const LINE_HEIGHT = 2.2;

const Container = styled.div`
  position: relative;
  max-height: ${({ isExpanded, collapsedHeight, fullHeight }) =>
    `${isExpanded ? fullHeight : collapsedHeight}rem`};
  transition: 0.3s max-height;
  overflow: hidden;
`;

const Content = styled.div`
  font-weight: 400;
  font-size: 1.5rem;
  line-height: ${LINE_HEIGHT}rem;
  word-break: break-word;

  * {
    color: ${palette.black} !important;
  }

  & > *:first-child {
    margin-top: 0 !important;
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

export const LastLineOverlay = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 3rem;
  background: linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, ${palette.white} 100%);
  opacity: ${({ isExpanded }) => (isExpanded ? 0 : 1)};
  transition: 0.3s opacity;
  pointer-events: none;
`;

export const ReadMoreButton = styled.button`
  font-weight: 500;
  font-size: 1.3rem;
  line-height: 1.8rem;
  color: ${palette.black};
  background: none;
  border: none;
  border-bottom: 1px solid ${palette.black};
  padding: 0;
  margin-top: 2rem;
  cursor: pointer;

  &[disabled] {
    color: ${palette.gray.dark};
  }

  &:focus {
    outline: none;
    border-color: ${palette.brand.primary};
  }
`;

function EmbeddedContent({ content, collapsedLines = 4, ...props }) {
  const [hasReadMore, setHasReadMore] = useState(true);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [fullHeight, setFullHeight] = useState(0);
  const el = useRef();

  const collapsedHeight = collapsedLines * LINE_HEIGHT;

  useLayoutEffect(() => {
    setIsLoading(true);

    const [...images] = el.current.querySelectorAll('img');
    if (images.length) {
      let loadedImages = 0;
      images.forEach(image => {
        image.onerror = imageLoaded;
        image.onload = imageLoaded;
      });

      function imageLoaded() {
        loadedImages++;
        if (loadedImages === images.length) handleFullHeightLoaded();
      }
    } else handleFullHeightLoaded();

    const [...links] = el.current.querySelectorAll('a');
    links.forEach(link => {
      link.setAttribute('target', '_blank');
      link.setAttribute('rel', 'noopener noreferrer');
    });
  }, [content, collapsedLines]); // eslint-disable-line

  function handleFullHeightLoaded() {
    const fullHeight = el.current.scrollHeight / 10; // convert px to rem
    setFullHeight(fullHeight);
    setHasReadMore(fullHeight > collapsedHeight);
    setIsExpanded(false);
    setIsLoading(false);
  }

  function toggleIsExpanded() {
    setIsExpanded(isExpanded => !isExpanded);
  }

  return (
    <>
      <Container
        isExpanded={isExpanded}
        collapsedHeight={collapsedHeight}
        fullHeight={fullHeight}
        {...props}
      >
        <Content dangerouslySetInnerHTML={{ __html: content }} ref={el} />
        {hasReadMore && <LastLineOverlay isExpanded={isExpanded} />}
      </Container>
      {hasReadMore && (
        <ReadMoreButton type="button" onClick={toggleIsExpanded} disabled={isLoading}>
          Read {isExpanded ? 'less' : 'more'}
        </ReadMoreButton>
      )}
    </>
  );
}

EmbeddedContent.propTypes = {
  content: PropTypes.string.isRequired,
  collapsedLines: PropTypes.number,
};

export default EmbeddedContent;
