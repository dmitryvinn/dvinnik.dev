import React from 'react';

import Layout from 'components/Layout';
import SEO from 'components/SEO';
import Presentations from 'components/Presentations';

const PresentationsPage: React.FC = () => {
  return (
    <Layout>
      <SEO title="Presentations" />
      <Presentations />
    </Layout>
  );
};

export default PresentationsPage;
