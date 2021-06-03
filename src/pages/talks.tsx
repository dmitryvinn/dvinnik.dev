import React from 'react';

import Layout from 'components/Layout';
import SEO from 'components/SEO';
import Talks from 'components/Talks';

const TalkPage: React.FC = () => {
  return (
    <Layout>
      <SEO title="Talks" />
      <Talks />
    </Layout>
  );
};

export default TalkPage;
