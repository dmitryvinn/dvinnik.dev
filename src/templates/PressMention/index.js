import React from 'react';
import { graphql } from 'gatsby';
import Link from 'gatsby-link';

import Layout from 'components/Layout';
import SEO from 'components/SEO';
import Container from 'components/ui/Container';
import TitleSection from 'components/ui/TitleSection';
import FormatHtml from 'components/utils/FormatHtml';

import * as Styled from './styles';

const PressMention = ({ data, pageContext }) => {
  const pressMention = data.markdownRemark;
  const { previous, next } = pageContext;

  return (
    <Layout>
      <SEO title={pressMention.frontmatter.title} description={pressMention.frontmatter.description} canonicalUrl={pressMention.frontmatter.canonicalUrl} />
      <Container section>
        <TitleSection title={pressMention.frontmatter.date} subtitle={pressMention.frontmatter.title} />
        <FormatHtml content={pressMention.html} />
        <Styled.Links>
          <span>
            {previous && (
              <Link to={previous.fields.slug} rel="previous">
                ← {previous.frontmatter.title}
              </Link>
            )}
          </span>
          <span>
            {next && (
              <Link to={next.fields.slug} rel="next">
                {next.frontmatter.title} →
              </Link>
            )}
          </span>
        </Styled.Links>
      </Container>
    </Layout>
  );
};

export default PressMention;

export const query = graphql`
  query PressMentionBySlug($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
        description
        canonicalUrl
        date(formatString: "MMM DD, YYYY")
      }
    }
  }
`;
