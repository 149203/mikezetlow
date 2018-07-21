module.exports = {
   siteMetadata: {
      title: 'MikeZetlow.com',
      author: 'Mike Zetlow',
      description: 'I’m a software developer interested in UX, entrepreneurship, how we work, public domain music, poker, and other stuff.',
      siteUrl: 'https://www.mikezetlow.com',
   },
   pathPrefix: '/gatsby-starter-blog',
   plugins: [
      {
         resolve: `gatsby-source-filesystem`,
         options: {
            path: `${__dirname}/src/pages`,
            name: 'pages',
         },
      },
      {
         resolve: 'gatsby-plugin-mailchimp',
         options: {
            endpoint: 'https://MikeZetlow.us18.list-manage.com/subscribe/post?u=c53af7376ee4ec2cea8ddb253&amp;id=2054508644', // see instructions section below
         },
      },

      {
         resolve: `gatsby-transformer-remark`,
         options: {
            plugins: [
               {
                  resolve: `gatsby-remark-images`,
                  options: {
                     maxWidth: 720,
                  },
               },
               {
                  resolve: `gatsby-remark-responsive-iframe`,
                  options: {
                     wrapperStyle: `margin-bottom: 1.0725rem`,
                  },
               },
               'gatsby-remark-prismjs',
               'gatsby-remark-copy-linked-files',
               'gatsby-remark-smartypants',
            ],
         },
      },
      `gatsby-transformer-sharp`,
      `gatsby-plugin-sharp`,
      /*{
         resolve: `gatsby-plugin-google-analytics`,
         options: {
            //trackingId: `ADD YOUR TRACKING ID HERE`,
         },
      },*/
      `gatsby-plugin-feed`,
      `gatsby-plugin-offline`,
      `gatsby-plugin-react-helmet`,
      `gatsby-plugin-styled-components`,
      {
         resolve: 'gatsby-plugin-typography',
         options: {
            pathToConfigModule: 'src/utils/typography',
         },
      },
   ],
}
