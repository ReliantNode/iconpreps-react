import React from 'react';
import Layout from 'components/Layout';
import { H1, Text } from 'components/Typography';

function NotFoundPage() {
  return (
    <Layout>
      <H1>Page not found</H1>
      <Text style={{ marginTop: '2rem' }}>The page you were looking for doesn't exist.</Text>
    </Layout>
  );
}

export default NotFoundPage;
