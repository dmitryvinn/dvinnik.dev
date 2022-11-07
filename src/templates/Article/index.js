import React from 'react';
import { graphql } from 'gatsby';
import Link from 'gatsby-link';

import Layout from 'components/Layout';
import SEO from 'components/SEO';
import Container from 'components/ui/Container';
import TitleSection from 'components/ui/TitleSection';
import FormatHtml from 'components/utils/FormatHtml';

import * as Styled from './styles';

const Article = ({ data, pageContext }) => {
  const article = data.markdownRemark;
  const { previous, next } = pageContext;

  return (
    <Layout>
      <SEO title={article.frontmatter.title} description={article.frontmatter.description} canonicalUrl={article.frontmatter.canonicalUrl} />
      <Container section>
        <TitleSection title={article.frontmatter.date} subtitle={article.frontmatter.title} />
        <FormatHtml content={article.html} />
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

export default Article;

export const query = graphql`
  query ArticleBySlug($slug: String!) {
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
