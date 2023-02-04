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



  const presentationsTemplate = path.resolve(`src/templates/Presentation/index.js`);

  const presentationRes = await graphql(`
    query {
      allMarkdownRemark(
        filter: { frontmatter: { category: { eq: "presentation" } } }
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

  const presentations = presentationRes.data.allMarkdownRemark.edges;

  presentations.forEach((presentation, index) => {
    const previous = index === presentations.length - 1 ? null : presentations[index + 1].node;
    const next = index === 0 ? null : presentations[index - 1].node;

    createPage({
      path: `${presentation.node.fields.slug}`,
      component: presentationsTemplate,
      context: {
        slug: `${presentation.node.fields.slug}`,
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


  const conversationTemplate = path.resolve(`src/templates/Conversation/index.js`);

  const conversationRes = await graphql(`
    query {
      allMarkdownRemark(
        filter: { frontmatter: { category: { eq: "conversation" } } }
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

  const conversations = conversationRes.data.allMarkdownRemark.edges;

  conversations.forEach((conversation, index) => {
    const previous = index === conversations.length - 1 ? null : conversations[index + 1].node;
    const next = index === 0 ? null : conversations[index - 1].node;

    createPage({
      path: `${conversation.node.fields.slug}`,
      component: conversationTemplate,
      context: {
        slug: `${conversation.node.fields.slug}`,
        previous,
        next
      }
    });
  });


  const courseTemplate = path.resolve(`src/templates/Course/index.js`);

  const courseRes = await graphql(`
    query {
      allMarkdownRemark(
        filter: { frontmatter: { category: { eq: "course" } } }
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

  const courses = courseRes.data.allMarkdownRemark.edges;

  courses.forEach((course, index) => {
    const previous = index === courses.length - 1 ? null : courses[index + 1].node;
    const next = index === 0 ? null : courses[index - 1].node;

    createPage({
      path: `${course.node.fields.slug}`,
      component: courseTemplate,
      context: {
        slug: `${course.node.fields.slug}`,
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
