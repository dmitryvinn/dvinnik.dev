import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { useStaticQuery, graphql } from 'gatsby';

const SEO = ({ description, lang, meta, title , canonicalUrl}) => {
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            description
            author
          }
        }
      }
    `
  );

  
    
  const metaDescription = description || site.siteMetadata.description;
  if (canonicalUrl) {
    return(
        <Helmet
    htmlAttributes={{
      lang
    }}
    title={title}
    image={image}
    titleTemplate={`%s | ${site.siteMetadata.title}`}
    link = {[
      { rel : 'canonical', href : canonicalUrl  }
]} 
    meta={[
      {
        name: `description`,
        content: metaDescription
      },
      {
        property: `og:title`,
        content: title
      },
      {
        property: `og:description`,
        content: metaDescription
      },
      {
        property: `og:type`,
        content: `website`
      },
      {
        name: `twitter:card`,
        content: `summary`
      },
      {
        name: `twitter:creator`,
        content: site.siteMetadata.author
      },
      {
        name: `twitter:title`,
        content: title
      },
      {
        name: `twitter:description`,
        content: metaDescription
      }
    ].concat(meta)}
  />
  );
  } else {

  return (
    
    
    <Helmet
    htmlAttributes={{
      lang
    }}
    link = {[
      { rel : 'canonical', href : "test"  }
]} 
    title={title}
    titleTemplate={`%s | ${site.siteMetadata.title}`}
    meta={[
      {
        name: `description`,
        content: metaDescription
      },
      {
        property: `og:title`,
        content: title
      },
      {
        property: `og:description`,
        content: metaDescription
      },
      {
        property: `og:type`,
        content: `website`
      },
      {
        name: `twitter:card`,
        content: `summary`
      },
      {
        name: `twitter:creator`,
        content: site.siteMetadata.author
      },
      {
        name: `twitter:title`,
        content: title
      },
      {
        name: `twitter:description`,
        content: metaDescription
      }
    ].concat(meta)}
  />
  );
  }
  
  
};

SEO.defaultProps = {
  lang: `en`,
  meta: [],
  description: ``
};

SEO.propTypes = {
  lang: PropTypes.string,
  meta: PropTypes.any,
  title: PropTypes.string.isRequired
};

export default SEO;
