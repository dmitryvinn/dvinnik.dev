import React from 'react';

import Layout from 'components/Layout';
import SEO from 'components/SEO';
import Articles from 'components/Articles';

const ArticlesPage: React.FC = () => {
  return (
    <Layout>
      <SEO title="Articles" />
      <Articles />
    </Layout>
  );
};

export default ArticlesPage;
