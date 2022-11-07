import React from 'react';

import Layout from 'components/Layout';
import SEO from 'components/SEO';
import Container from 'components/ui/Container';
import TitleSection from 'components/ui/TitleSection';

const ContentPage: React.FC = () => (
  <Layout>
    <SEO title="My Content" />
    <Container section>
      <TitleSection title="My Content" subtitle="Sharing all the educational materials I was a part of" center />
      <p className="mt-4 text-center w-full">
        <ul>
          <li>Articles</li>
          <li>Videos</li>
          <li>Events</li>
          <li>Podcasts</li>
          <li>Press Mentions</li>
        </ul>
      </p>
    </Container>
  </Layout>
);

export default ContentPage;
