import React from 'react'
import Helmet from 'react-helmet'
import get from 'lodash/get'
import styled from 'styled-components'
import global from '../utils/global_style'
import addToMailchimp from 'gatsby-plugin-mailchimp'

import { rhythm, scale } from '../utils/typography'

class BlogPostTemplate extends React.Component {

   constructor(props) {
      super(props)
      this.submit_email_to_mailchimp = this.submit_email_to_mailchimp.bind(this)
   }

   // MailChimp stuff
   submit_email_to_mailchimp(e) {
      e.preventDefault()
      const input_value = this.refs.input_email.value
      console.log('MAILCHIMP SUBMIT INPUT: ', input_value)

      // console.time('start')
      addToMailchimp(input_value)
       .then(data => {
          // I recommend setting data to React state
          // but you can do whatever you want
          console.log('RETURNED from MAILCHIMP: ', data)
          //console.timeEnd('finish')
       })
       .catch(() => {
          // unnecessary because Mailchimp only ever
          // returns a 200 status code
          // see below for how to handle errors
       })
   }

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
      const Enter_Email = styled.div`
        form label p {
          //font-size: 80%;
          //font-weight: lighter;
          color: ${global.color.gray};
          font-style: italic;
          -webkit-margin-after: 0;
          margin-bottom: 0;          
        }
        input {
          width: 80%;
          @media(min-width: 490px) and (max-width: 719px) {
            width: 70%;
          }      
          @media(min-width:0) and (max-width: 489px) {
            width: 57%;
          }    
        }
        input:focus, button:focus {
          outline: none;
        }
        input, button {
          border: 2px solid ${global.color.blue};
          padding: 0.25rem 0.75rem;
        }
        button {
          margin-left: -2px;
          cursor: pointer;
          color: ${global.color.white};
          background-color: ${global.color.blue};
          width: 20%;
          @media(min-width: 490px) and (max-width: 719px) {
            width: 30%;
          }
          @media(min-width:0) and (max-width: 489px) {
            width: 43%;
          }
        }
        button:hover {
          background-color: ${global.color.blue_dark};
          border-color: ${global.color.blue_dark};
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
             {/*metadata image sizes best for both Facebook and Twitter*/}
             {/*Facebook: https://developers.facebook.com/docs/sharing/best-practices#images*/}
             {/*Twitter: https://twittercommunity.com/t/what-is-the-optimum-size-for-the-image-on-a-summary-card-with-large-image/22251/4 (same as Facebook)*/}
             <meta property="og:image:width" content="1200"/>
             <meta property="og:image:height" content="630"/>
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
          <h2>Enjoyed this post?</h2>
          <p>Enter your email address and I'll email you the next one.
             <br/>
          I'll never give away your email address or try to sell you something.</p>

          <Enter_Email>
             <form onSubmit={(e) => this.submit_email_to_mailchimp(e)}>
                <label>
                   <p>Your email</p>
                   <input ref="input_email"></input>
                   <button>Let's do it!</button>
                </label>
             </form>
          </Enter_Email>

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
    }
`
