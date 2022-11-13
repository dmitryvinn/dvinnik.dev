import React from 'react';

import Layout from 'components/Layout';
import SEO from 'components/SEO';
import Conversations from 'components/Conversations';

const ConversationsPage: React.FC = () => {
  return (
    <Layout>
      <SEO title="Conversations" />
      <Conversations />
    </Layout>
  );
};

export default ConversationsPage;
