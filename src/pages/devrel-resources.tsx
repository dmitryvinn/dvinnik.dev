import React from 'react';

import Layout from 'components/Layout';
import SEO from 'components/SEO';
import Container from 'components/ui/Container';
import TitleSection from 'components/ui/TitleSection';

const DevRelResources: React.FC = () => (
  <Layout>
    <SEO title="DevRel Resources" />
    <Container section>
      <TitleSection title="Developer Relations Resources" subtitle="Single place for all your DevRel Learnings" center />
      <p className="mt-4 text-center w-full">This section of the site is still under construction 🚧 </p>
      <p className="mt-4 text-center w-full">Please go to <a href="https://github.com/dmitryvinn/awesome-dev-advocacy">this GitHub repository</a> for the most current DevRel resources.</p>
    </Container>
  </Layout>
);

export default DevRelResources;
