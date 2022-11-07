import React from 'react';

import Layout from 'components/Layout';
import SEO from 'components/SEO';
import Press from 'components/PressMentions';

const PressMentionsPage: React.FC = () => {
  return (
    <Layout>
      <SEO title="PressMentions" />
      <PressMentions />
    </Layout>
  );
};

export default PressMentionsPage;
