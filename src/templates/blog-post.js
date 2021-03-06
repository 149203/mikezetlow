import React from 'react'
import Helmet from 'react-helmet'
import get from 'lodash/get'
import styled from 'styled-components'
import global from '../utils/global_style'
import addToMailchimp from 'gatsby-plugin-mailchimp'
import _shuffle from 'lodash/shuffle'
import _take from 'lodash/take'
import _filter from 'lodash/filter'

import { rhythm, scale } from '../utils/typography'

import PostPreview from '../components/PostPreview'

class BlogPostTemplate extends React.Component {
  constructor(props) {
    super(props)
    this.submit_email_to_mailchimp = this.submit_email_to_mailchimp.bind(this)
    this.is_valid_email = this.is_valid_email.bind(this)
    this.clear_email_error = this.clear_email_error.bind(this)
  }

  is_valid_email(email_address) {
    // Email must be of type string and a valid email address.
    // See gatsy-plugin-mailchimp README for more information.

    // On email validation
    // https://stackoverflow.com/a/46181/6305196
    // https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/email#Basic_validation

    const email_regex = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
    return email_regex.test(String(email_address).toLowerCase())
  }

  // MailChimp stuff
  submit_email_to_mailchimp(e) {
    e.preventDefault()
    const email_address = this.refs.input_email.value
    console.log('MAILCHIMP SUBMIT INPUT: ', email_address)

    if (this.is_valid_email(email_address)) {
      addToMailchimp(email_address)
        .then(response => {
          console.log('RETURNED from MAILCHIMP: ', response)
          if (response.result === 'error') {
            if (/already subscribed to list/.test(response.msg)) {
              localStorage.setItem('subscriber', 'true')
              this.forceUpdate() // replaces Sign Up div with Subscribed div
              //alert('Thanks! Email successfully submitted!')
            } else {
              document.getElementById('email_error_display').innerHTML =
                response.msg
            }
          } else {
            localStorage.setItem('subscriber', 'true')
            this.forceUpdate() // replaces Sign Up div with Subscribed div
            //alert('Thanks! Email successfully submitted!')
          }
        })
        .catch(() => {
          // unnecessary because Mailchimp only ever returns a 200 status code
          // handle errors in the 'then' if response is missing data
        })
    } else {
      document.getElementById(
        'email_error_display'
      ).innerHTML = `<p style="margin-bottom: 0;">Heya, double-check your email. It doesn't appear to be valid.</p>`
    }
  }

  clear_email_error(e) {
    const email_address = e.target.value
    if (this.is_valid_email(email_address) || email_address === '') {
      document.getElementById('email_error_display').innerHTML = '<br/>'
    }
  }

  render() {
    console.log(this.props)

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
      form {
        margin-bottom: 0;
      }

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
        @media (min-width: 490px) and (max-width: 719px) {
          width: 70%;
        }
        @media (min-width: 0) and (max-width: 489px) {
          width: 57%;
        }
      }
      input:focus,
      button:focus {
        outline: none;
      }
      input,
      button {
        border: 2px solid ${global.color.blue};
        padding: 0.25rem 0.75rem;
      }
      button {
        margin-left: -2px;
        cursor: pointer;
        color: ${global.color.white};
        background-color: ${global.color.blue};
        width: 20%;
        @media (min-width: 490px) and (max-width: 719px) {
          width: 30%;
        }
        @media (min-width: 0) and (max-width: 489px) {
          width: 43%;
        }
      }
      button:hover {
        background-color: ${global.color.blue_dark};
        border-color: ${global.color.blue_dark};
      }
    `

    const post = get(this.props, 'data.markdownRemark')
    const frontmatter = post.frontmatter
    const title = frontmatter.title
    const all_topical_posts = this.props.data.allMarkdownRemark.edges
    const other_topical_posts = _filter(all_topical_posts, post => {
      return post.node.frontmatter.title !== title // return all posts that don't have this post's title
    })
    const random_related_posts = _take(_shuffle(other_topical_posts), 2)
    let related_posts_heading
    let related_posts_footer
    //console.log('RANDOM POSTS: ', random_related_posts)
    const siteTitle = get(this.props, 'data.site.siteMetadata.title')
    const excerpt = post.excerpt

    const image = frontmatter.featuredImage.childImageSharp.resize.src
    console.log(`IMAGE: `, image)

    const featuredImage = `https://www.mikezetlow.com${frontmatter.featuredImage.childImageSharp.resize.src}` // TODO: use imageSharp to get image. See lengstorf.com repo
    const author = get(this.props, 'data.site.siteMetadata.author')
    const slug = `https://mikezetlow.com${this.props.location.pathname}`

    let subscriber_section
    const is_subscriber =
      typeof window !== 'undefined' && window.localStorage.subscriber === 'true'
    // https://github.com/gatsbyjs/gatsby/issues/309#issuecomment-302043875

    if (is_subscriber) {
      subscriber_section = (
        <div>
          <h2 style={{ marginTop: rhythm(1) }}>
            Thanks for being on my mailing list!
          </h2>
          <p style={{ marginBottom: 0 }}>
            If you want to support me, send this post to a friend:
          </p>
          <a href={slug}>{slug}</a>
          <br />
          <br />
        </div>
      )
    } else {
      subscriber_section = (
        <div>
          <h2 style={{ marginTop: rhythm(1) }}>Enjoyed this post?</h2>
          <p>
            Enter your email address and I'll email you the next one.
            <br />
            I'll never give away your email address or try to sell you
            something.
          </p>

          <Enter_Email>
            <form onSubmit={e => this.submit_email_to_mailchimp(e)}>
              <label>
                <p>Your email</p>
                <input
                  ref="input_email"
                  onChange={e => this.clear_email_error(e)}
                />
                <button>Let's do it!</button>
              </label>
            </form>
          </Enter_Email>
          <div id="email_error_display" style={{ color: global.color.red }}>
            <br />
          </div>
        </div>
      )
    }

    related_posts_heading = (
      <h1 style={{ marginTop: rhythm(1), marginBottom: 0 }}>Related posts</h1>
    )
    related_posts_footer = (
      <hr style={{ marginBottom: 0, marginTop: rhythm(1) }} />
    )

    function display_post_minutes(video_minutes, article_minutes) {
      if (video_minutes > 0) return video_minutes
      else return article_minutes
    }

    return (
      <div>
        <Helmet>
          <title>{title}</title>
          <meta name="description" content={excerpt} />
          <meta name="image" content={featuredImage} />

          {/* OpenGraph tags */}
          <meta property="og:url" content={slug} />
          <meta property="og:type" content="article" />
          <meta property="og:locale" content="en_US" />
          <meta property="og:title" content={title} />
          <meta property="og:description" content={excerpt} />
          <meta property="og:image" content={featuredImage} />
          {/*metadata image sizes best for both Facebook and Twitter*/}
          {/*Facebook: https://developers.facebook.com/docs/sharing/best-practices#images*/}
          {/*Twitter: https://twittercommunity.com/t/what-is-the-optimum-size-for-the-image-on-a-summary-card-with-large-image/22251/4 (same as Facebook)*/}
          <meta property="og:image:width" content="1200" />
          <meta property="og:image:height" content="630" />
          <meta property="og:site_name" content={siteTitle} />

          {/* Twitter Card tags */}
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:creator" content={author} />
          <meta name="twitter:title" content={title} />
          <meta name="twitter:description" content={excerpt} />
          <meta name="twitter:image" content={featuredImage} />
        </Helmet>
        <h1> {frontmatter.title}</h1>
        <p
          style={{
            fontSize: '80%',
            display: 'block',
            marginBottom: rhythm(1),
            marginTop: rhythm(-1),
            color: global.color.gray,
            textTransform: `capitalize`,
            fontWeight: `lighter`,
          }}
        >
          {frontmatter.date} | {frontmatter.topic} |{' '}
          {display_post_minutes(frontmatter.video_minutes, post.timeToRead)}
          &nbsp;<span style={{ textTransform: `lowercase` }}>minutes</span>
        </p>
        <Post>
          <div dangerouslySetInnerHTML={{ __html: post.html }} />
        </Post>

        <hr />

        {/*******************************************************************************/}

        {related_posts_heading}

        {random_related_posts &&
          random_related_posts.map(({ node }, i) => {
            const slug = node.fields.slug
            const {
              frontmatter: {
                title,
                featuredImage,
                rating,
                topic,
                video_minutes,
                date,
              },
            } = node
            return (
              <PostPreview
                key={i}
                title={title}
                slug={slug}
                sizes={featuredImage.childImageSharp.resize}
                topic={topic}
                video_minutes={video_minutes}
                time_to_read={node.timeToRead}
                date={date}
                rating={rating}
              />
            )
          })}

        {related_posts_footer}

        {/*******************************************************************************/}

        {subscriber_section}
        <p>
          Send me an email anytime and I'll get back to you: mike@mikezetlow.com
        </p>
      </div>
    )
  }
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!, $topic: String!) {
    site {
      siteMetadata {
        title
        author # for social media metadata
      }
    }

    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      html
      timeToRead
      excerpt # for social media metadata
      frontmatter {
        topic
        title
        video_minutes
        date(formatString: "MMMM Do, YYYY")
        featuredImage {
          # for social media metadata
          childImageSharp {
            resize(width: 1200, height: 630, cropFocus: ENTROPY) {
              src
            }
          }
        }
      }
    }

    allMarkdownRemark(
      filter: { frontmatter: { draft: { ne: true }, topic: { eq: $topic } } }
    ) {
      edges {
        node {
          timeToRead
          fields {
            slug
          }
          frontmatter {
            date
            title
            featuredImage {
              childImageSharp {
                resize(width: 496, height: 262, cropFocus: ATTENTION) {
                  src
                  width
                  height
                  aspectRatio
                  originalName
                }
              }
            }
            topic
            rating
            video_minutes
          }
        }
      }
    }
  }
`
