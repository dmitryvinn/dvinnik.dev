module.exports = {
    pathPrefix: "/",

  siteMetadata: {
    title: `Dmitry Vinnik`,
    description: `
    Dmitry Vinnik is an engineering manager specializing in AI/ML. He is currently working at Meta, where he leads a team of engineers developing cutting-edge solutions. With a decade of experience in the tech industry, Dmitry is recognized for his expertise in developer relations, dev tools, programming languages, and open source technologies. He is a regular speaker at conferences and meetups on various topics related to software development, open source, and engineering leadership.
    `,
image: `/gatsby-icon.png`,
twitterUsername: `@DmitryVinnik`,
siteUrl: `https://dvinnik.dev/`,
    author: `Dmitry Vinnik`
    
  },
  plugins: [
    `gatsby-plugin-typescript`,
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/assets/images`
      }
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `content`,
        path: `${__dirname}/src/data`
      }
    },
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: [
          {
            resolve: 'gatsby-remark-images',
            options: {
              maxWidth: 768,
              linkImagesToOriginal: false
            }
          }
        ]
      }
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-personal-website-starter`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#4C6E94`,
        theme_color: `#4C6E94`,
        display: `minimal-ui`,
        icon: `src/assets/images/gatsby-icon.png`
      }
    },
    `gatsby-plugin-offline`,
    `gatsby-plugin-styled-components`,
    `gatsby-plugin-postcss`,
    `gatsby-plugin-tailwindcss`,
    {
      resolve: `gatsby-plugin-purgecss`,
      options: {
        tailwind: true,
        purgeOnly: [`src/assets/styles/global.css`]
      }
    },
    {
      resolve: `gatsby-plugin-google-gtag`,
      options: {
        trackingIds: [
          "UA-131185434-1", // Google Analytics / GA
        ],
        pluginConfig: {
          head: true,
          anonymize_ip: true,
        },
      }
    }
  ]
};
