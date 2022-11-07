const path = require(`path`);
const { createFilePath } = require(`gatsby-source-filesystem`);

exports.onCreateWebpackConfig = ({ actions }) => {
  actions.setWebpackConfig({
    resolve: {
      modules: [path.resolve(__dirname, `src`), `node_modules`]
    }
  });
};

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions;

  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode });
    createNodeField({
      name: `slug`,
      node,
      value
    });
  }
};

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;
  const blogPostTemplate = path.resolve(`src/templates/BlogPost/index.js`);

  const res = await graphql(`
    query {
      allMarkdownRemark(
        filter: { frontmatter: { category: { eq: "blog" } } }
        sort: { fields: frontmatter___date, order: DESC }
      ) {
        edges {
          node {
            fields {
              slug
            }
            frontmatter {
              title
            }
          }
        }
      }
    }
  `);

  const posts = res.data.allMarkdownRemark.edges;

  posts.forEach((post, index) => {
    const previous = index === posts.length - 1 ? null : posts[index + 1].node;
    const next = index === 0 ? null : posts[index - 1].node;

    createPage({
      path: `${post.node.fields.slug}`,
      component: blogPostTemplate,
      context: {
        slug: `${post.node.fields.slug}`,
        previous,
        next
      }
    });
  });



  const talkTemplate = path.resolve(`src/templates/Talk/index.js`);

  const talkRes = await graphql(`
    query {
      allMarkdownRemark(
        filter: { frontmatter: { category: { eq: "talk" } } }
        sort: { fields: frontmatter___date, order: DESC }
      ) {
        edges {
          node {
            fields {
              slug
            }
            frontmatter {
              title
            }
          }
        }
      }
    }
  `);

  const talks = talkRes.data.allMarkdownRemark.edges;

  talks.forEach((talk, index) => {
    const previous = index === talks.length - 1 ? null : talks[index + 1].node;
    const next = index === 0 ? null : talks[index - 1].node;

    createPage({
      path: `${talk.node.fields.slug}`,
      component: talkTemplate,
      context: {
        slug: `${talk.node.fields.slug}`,
        previous,
        next
      }
    });
  });



  const articleTemplate = path.resolve(`src/templates/Article/index.js`);

  const articleRes = await graphql(`
    query {
      allMarkdownRemark(
        filter: { frontmatter: { category: { eq: "article" } } }
        sort: { fields: frontmatter___date, order: DESC }
      ) {
        edges {
          node {
            fields {
              slug
            }
            frontmatter {
              title
            }
          }
        }
      }
    }
  `);

  const articles = articleRes.data.allMarkdownRemark.edges;

  articles.forEach((article, index) => {
    const previous = index === articles.length - 1 ? null : articles[index + 1].node;
    const next = index === 0 ? null : articles[index - 1].node;

    createPage({
      path: `${article.node.fields.slug}`,
      component: articleTemplate,
      context: {
        slug: `${article.node.fields.slug}`,
        previous,
        next
      }
    });
  });



  const eventTemplate = path.resolve(`src/templates/Event/index.js`);

  const eventRes = await graphql(`
    query {
      allMarkdownRemark(
        filter: { frontmatter: { category: { eq: "event" } } }
        sort: { fields: frontmatter___date, order: DESC }
      ) {
        edges {
          node {
            fields {
              slug
            }
            frontmatter {
              title
            }
          }
        }
      }
    }
  `);

  const events = eventRes.data.allMarkdownRemark.edges;

  events.forEach((event, index) => {
    const previous = index === events.length - 1 ? null : events[index + 1].node;
    const next = index === 0 ? null : events[index - 1].node;

    createPage({
      path: `${event.node.fields.slug}`,
      component: eventTemplate,
      context: {
        slug: `${event.node.fields.slug}`,
        previous,
        next
      }
    });
  });


  const podcastTemplate = path.resolve(`src/templates/Podcast/index.js`);

  const podcastRes = await graphql(`
    query {
      allMarkdownRemark(
        filter: { frontmatter: { category: { eq: "podcast" } } }
        sort: { fields: frontmatter___date, order: DESC }
      ) {
        edges {
          node {
            fields {
              slug
            }
            frontmatter {
              title
            }
          }
        }
      }
    }
  `);

  const podcasts = podcastRes.data.allMarkdownRemark.edges;

  podcasts.forEach((podcast, index) => {
    const previous = index === podcasts.length - 1 ? null : podcasts[index + 1].node;
    const next = index === 0 ? null : podcasts[index - 1].node;

    createPage({
      path: `${podcast.node.fields.slug}`,
      component: podcastTemplate,
      context: {
        slug: `${podcast.node.fields.slug}`,
        previous,
        next
      }
    });
  });


  const pressMentionTemplate = path.resolve(`src/templates/PressMention/index.js`);

  const pressMentionRes = await graphql(`
    query {
      allMarkdownRemark(
        filter: { frontmatter: { category: { eq: "press-mention" } } }
        sort: { fields: frontmatter___date, order: DESC }
      ) {
        edges {
          node {
            fields {
              slug
            }
            frontmatter {
              title
            }
          }
        }
      }
    }
  `);

  const pressMentions = pressMentionRes.data.allMarkdownRemark.edges;

  pressMentions.forEach((pressMention, index) => {
    const previous = index === pressMentions.length - 1 ? null : pressMentions[index + 1].node;
    const next = index === 0 ? null : pressMentions[index - 1].node;

    createPage({
      path: `${pressMention.node.fields.slug}`,
      component: pressMentionsTemplate,
      context: {
        slug: `${pressMention.node.fields.slug}`,
        previous,
        next
      }
    });
  });


  const videoTemplate = path.resolve(`src/templates/Video/index.js`);

  const videoRes = await graphql(`
    query {
      allMarkdownRemark(
        filter: { frontmatter: { category: { eq: "video" } } }
        sort: { fields: frontmatter___date, order: DESC }
      ) {
        edges {
          node {
            fields {
              slug
            }
            frontmatter {
              title
            }
          }
        }
      }
    }
  `);

  const videos = videoRes.data.allMarkdownRemark.edges;

  videos.forEach((video, index) => {
    const previous = index === videos.length - 1 ? null : videos[index + 1].node;
    const next = index === 0 ? null : videos[index - 1].node;

    createPage({
      path: `${video.node.fields.slug}`,
      component: videoTemplate,
      context: {
        slug: `${video.node.fields.slug}`,
        previous,
        next
      }
    });
  });

};
