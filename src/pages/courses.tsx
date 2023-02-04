import React from 'react';

import Layout from 'components/Layout';
import SEO from 'components/SEO';
import Courses from 'components/Courses';

const CoursesPage: React.FC = () => {
  return (
    <Layout>
      <SEO title="Courses" />
      <Courses />
    </Layout>
  );
};

export default CoursesPage;
