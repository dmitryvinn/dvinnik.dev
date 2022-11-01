import React from 'react';

import Layout from 'components/Layout';
import SEO from 'components/SEO';
import Videos from 'components/Videos';

const VideosPage: React.FC = () => {
  return (
    <Layout>
      <SEO title="Videos" />
      <Videos />
    </Layout>
  );
};

export default VideosPage;
