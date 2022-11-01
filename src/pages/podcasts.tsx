import React from 'react';

import Layout from 'components/Layout';
import SEO from 'components/SEO';
import Podcasts from 'components/Podcasts';

const PodcastsPage: React.FC = () => {
  return (
    <Layout>
      <SEO title="Podcasts" />
      <Podcasts />
    </Layout>
  );
};

export default PodcastsPage;
