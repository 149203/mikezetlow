import React from 'react'
import Helmet from 'react-helmet'
import Link from 'gatsby-link'
import get from 'lodash/get'
import styled from 'styled-components'
import global from '../utils/global_style'

import { rhythm, scale } from '../utils/typography'

class BlogPostTemplate extends React.Component {
   render() {
      const post = this.props.data.markdownRemark
      const siteTitle = get(this.props, 'data.site.siteMetadata.title')
      // const { previous, next } = this.props.pathContext

      const Post = styled.div`
        figcaption {
        color: ${global.color.gray};
        text-align: center;
        margin-top: -${rhythm(3 / 4)};
        margin-bottom: ${rhythm(1)};
        font-size: 80%;
        font-weight: lighter;
        }
        
        blockquote {
          color: ${global.color.gray};
        }
        
`
      console.log('props: ', this.props)
      const ADDME ='junk_string'

      return (

       <div>
          <Helmet>
             <title>{post.frontmatter.title}</title>
             <meta name="description" content={'THIS IS DESCRIPTION'} />
             <meta name="image" content={ADDME} />

             {/* OpenGraph tags */}
             <meta property="og:url" content={ADDME} />
             <meta property="og:type" content="article" />
             <meta property="og:title" content={post.frontmatter.title} />
             <meta property="og:description" content={ADDME} />
             <meta property="og:image" content={ADDME} />
             <meta property="fb:app_id" content={ADDME} />

             {/* Twitter Card tags */}
             <meta name="twitter:card" content="summary_large_image" />
             <meta name="twitter:creator" content={ADDME} />
             <meta name="twitter:title" content={post.frontmatter.title} />
             <meta name="twitter:description" content={ADDME} />
             <meta name="twitter:image" content={ADDME} />

          </Helmet>
          < h1> {post.frontmatter.title
          }</h1>
          <
           p
           style={
              {
                 fontSize: '80%',
                 display:
                  'block',
                 marginBottom:
                  rhythm(1),
                 marginTop:
                  rhythm(-1),
                 color:
                 global.color.gray
              }
           }
          >
             {post.frontmatter.date}
          </p>
          <
           Post>
             < div
              dangerouslySetInnerHTML={
                 { __html: post.html }
              }
             />
          </Post>
          <
           hr
           style={
              {
                 marginBottom: rhythm(1),
              }
           }
          />
       </div>
      )
   }
}

export default BlogPostTemplate

export const pageQuery = graphql`
    query BlogPostBySlug($slug: String!) {
        site {
            siteMetadata {
                title
                author
            }
        }
        markdownRemark(fields: { slug: { eq: $slug } }) {
            id
            html
            frontmatter {
                title
                date(formatString: "MMMM Do, YYYY")
            }
        }
    }
`
