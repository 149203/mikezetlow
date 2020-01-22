import React from 'react'
import get from 'lodash/get'
import _filter from 'lodash/filter'
import _orderBy from 'lodash/orderBy'
import _take from 'lodash/take'
import Helmet from 'react-helmet'
import { rhythm } from '../utils/typography'
import 'typeface-merriweather'
import 'typeface-open-sans'

import PostPreview from '../components/PostPreview'

class BlogIndex extends React.Component {
  render() {
    const siteTitle = get(this, 'props.data.site.siteMetadata.title')
    let posts = get(this, 'props.data.allMarkdownRemark.edges')
    console.log('posts: ', posts)
    const location = this.props.location

    filter_posts_by_url(location)

    function filter_posts_by_url(location) {
      const url = location.pathname.slice(1)
      const url_order = url.slice(0, url.lastIndexOf('/')) // a single word, either 'recent' or 'popular'
      const url_topic = url.slice(url.lastIndexOf('/') + 1)
      let topic = new RegExp(url.slice(url.indexOf('/') + 1).replace(/-/g, ' '))
      console.log({ url, url_order, url_topic, topic })

      if (topic) topic = new RegExp(topic)
      else topic = /.*/

      posts = _filter(posts, post => {
        if (post.topic === null) return true
        else return topic.test(post.node.frontmatter.topic)
      })

      if (url_order === 'popular') {
        posts = _orderBy(
          posts,
          ['node.frontmatter.rating', 'node.frontmatter.date'],
          ['desc', 'desc']
        )
      } else
        posts = _orderBy(
          posts,
          ['node.frontmatter.date', 'node.frontmatter.rating'],
          ['desc', 'desc']
        )

      //  if (url_topic === '') {
      //     posts = _take(posts, 10) // only display top n results when not in a topic
      //  }
    }

    return (
      <div>
        <Helmet title={siteTitle} />

        {posts &&
          posts.map(({ node }) => {
            const slug = node.fields.slug
            const frontmatter = node.frontmatter
            return (
              <PostPreview
                key={slug}
                title={frontmatter.title}
                slug={slug}
                sizes={frontmatter.featuredImage.childImageSharp.resize}
                topic={frontmatter.topic}
                video_minutes={frontmatter.video_minutes}
                time_to_read={node.timeToRead}
                date={frontmatter.date}
                rating={frontmatter.rating}
              />
            )
          })}
      </div>
    )
  }
}

export default BlogIndex

// https://github.com/gatsbyjs/gatsby/tree/master/packages/gatsby-plugin-sharp
// Information on Sharp, try CENTER or ATTENTION or ENTROPY for cropFocus
export const pageQuery = graphql`
  query IndexQuery {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { draft: { ne: true } } }
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
