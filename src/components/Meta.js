import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { useLocation } from 'react-router-dom';

const BASE_URL = process.env.REACT_APP_BASE_URL;
const SITE_TITLE = 'ICON P-Reps';
const SITE_DESCRIPTION = 'Find and interact with projects that ICON P-Reps are working on.';
const SITE_LOGO = `${BASE_URL}/images/logo512.png`;

function Meta({ description, logo, title, twitterUrl }) {
  const location = useLocation();

  const canonicalUrl = BASE_URL + location.pathname;
  const metaTitle = title ? `${title} | ${SITE_TITLE}` : SITE_TITLE;
  const metaDescription = description || SITE_DESCRIPTION;
  const metaLogo = logo || SITE_LOGO;

  let twitterCreator = '@ReliantNode';
  if (twitterUrl !== undefined) {
    const parts = twitterUrl.split('/');
    twitterCreator = `@${parts[parts.length - 1]}`;
  }

  const meta = [
    {
      name: 'description',
      content: metaDescription,
    },
    {
      property: 'og:type',
      content: 'website',
    },
    {
      property: 'og:title',
      content: metaTitle,
    },
    {
      property: 'og:description',
      content: metaDescription,
    },
    {
      property: 'og:image',
      content: metaLogo,
    },
    {
      property: 'og:url',
      content: canonicalUrl,
    },
    {
      name: 'twitter:card',
      content: 'summary',
    },
    {
      name: 'twitter:title',
      content: metaTitle,
    },
    {
      name: 'twitter:description',
      content: metaDescription,
    },
    {
      name: 'twitter:image',
      content: metaLogo,
    },
    {
      name: 'twitter:creator',
      content: twitterCreator,
    },
  ];

  return (
    <Helmet
      title={title}
      titleTemplate={`%s | ${SITE_TITLE}`}
      defaultTitle={SITE_TITLE}
      link={[{ rel: 'canonical', href: canonicalUrl }]}
      meta={meta}
    />
  );
}

Meta.propTypes = {
  description: PropTypes.string,
  logo: PropTypes.string,
  title: PropTypes.string,
  twitterUrl: PropTypes.string,
};

export default Meta;
