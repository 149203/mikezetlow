import React from 'react'
import Helmet from 'react-helmet'
import get from 'lodash/get'
import styled from 'styled-components'
import global from '../utils/global_style'

import { rhythm, scale } from '../utils/typography'

class BlogPostTemplate extends React.Component {
   render() {
      const post = this.props.data.markdownRemark
      const siteTitle = get(this.props, 'data.site.siteMetadata.title')
      const frontmatter = post.frontmatter
      const title = frontmatter.title
      const excerpt = post.excerpt
      const featuredImage = `https://www.mikezetlow.com${frontmatter.featuredImage.childImageSharp.resize.src}` // TODO: use imageSharp to get image. See lengstorf.com repo
      const author = get(this.props, 'data.site.siteMetadata.author')
      const slug = `https://mikezetlow.com${this.props.location.pathname}`

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

      return (

       <div>
          <Helmet>
             <title>{title}</title>
             <meta name="description" content={excerpt}/>
             <meta name="image" content={featuredImage}/>

             {/* OpenGraph tags */}
             <meta property="og:url" content={slug}/>
             <meta property="og:type" content="article"/>
             <meta property="og:locale" content="en_US"/>
             <meta property="og:title" content={title}/>
             <meta property="og:description" content={excerpt}/>
             <meta property="og:image" content={featuredImage}/>
             <meta property="og:site_name" content={siteTitle}/>

             {/* Twitter Card tags */}
             <meta name="twitter:card" content="summary_large_image"/>
             <meta name="twitter:creator" content={author}/>
             <meta name="twitter:title" content={title}/>
             <meta name="twitter:description" content={excerpt}/>
             <meta name="twitter:image" content={featuredImage}/>

          </Helmet>
          < h1> {frontmatter.title
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
                 global.color.gray,
                 textTransform: `capitalize`,
                 fontWeight: `lighter`,
              }
           }
          >
             {frontmatter.date} | {frontmatter.topic}
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
        excerpt
        frontmatter {
            topic
            title
            date(formatString: "MMMM Do, YYYY")
            featuredImage {
                childImageSharp {
                    resize(width: 1200, height: 630, cropFocus: ENTROPY) {
                        src
                    }
                }
            }
        }
    }
`
