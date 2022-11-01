import React from 'react';

import Layout from 'components/Layout';
import SEO from 'components/SEO';
import Events from 'components/Events';

const EventsPage: React.FC = () => {
  return (
    <Layout>
      <SEO title="Events" />
      <Events />
    </Layout>
  );
};

export default EventsPage;
