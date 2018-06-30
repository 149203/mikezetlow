import React from 'react'
import Link from 'gatsby-link'
import styled from 'styled-components'
import { rhythm, scale } from '../utils/typography'
import Img from 'gatsby-image'
import _round from 'lodash/round'
import _kebabCase from 'lodash/kebabCase'

class Template extends React.Component {

   constructor(props) {
      super(props)
      this.update_responsive_layout = this.update_responsive_layout.bind(this)
      this.update_url_topic = this.update_url_topic.bind(this)
      this.update_url_type = this.update_url_type.bind(this)
      this.toggle_url_order = this.toggle_url_order.bind(this)
      this.reset_filters = this.reset_filters.bind(this)
      this.state = {
         responsive: {
            hero_pic_display: `none`,
            hero_content_float: ``,
            hero_content_margin_right: `auto`,
         },
         filter: {
            topic_is_selected: false,
            type_is_selected: false,
            order: 'recent',
            topic: 'all',
            type: 'posts',
         }
      }
   }

   update_responsive_layout() {
      // Magic numbers
      const hero_content_margin_right = 30
      const pic_original_width = 624
      const pic_original_height = 1080
      const hero_content_width = 799
      //const hero_content_width = document.getElementById('hero_content').offsetWidth + hero_content_margin_right // 799

      // Maths
      const pic_original_aspect_ratio = _round(pic_original_width / pic_original_height, 4) // 624 / 1080 = 0.5778
      const screen_width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth
      const screen_height = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight
      const remaining_width = screen_width - hero_content_width
      const pic_dom_width = _round(screen_height * pic_original_aspect_ratio, 4)
      let responsive = { ...this.state.responsive } // dupe state for the changes that follow
      console.log('screen_width : ', screen_width)
      console.log('screen_height : ', screen_height)
      console.log('remaining_width : ', remaining_width)
      console.log('pic_dom_width * 2 : ', pic_dom_width * 2)

      if (screen_width >= hero_content_width + pic_dom_width) { // if there's room for a profile pic

         if (remaining_width >= pic_dom_width * 2) {
            console.log(`WIDE SCREEN`)
            responsive.hero_pic_display = `block`
            responsive.hero_content_float = ``
            responsive.hero_content_margin_right = `auto`
            this.setState({ responsive })
         }
         else {
            console.log(`STANDARD SCREEN`)
            responsive.hero_pic_display = `block`
            responsive.hero_content_float = `right`
            responsive.hero_content_margin_right = pic_dom_width + hero_content_margin_right
            this.setState({ responsive })
         }
      }

      else {
         console.log(`MOBILE / PORTRAIT SCREEN`)
         responsive.hero_pic_display = `none`
         responsive.hero_content_float = ``
         responsive.hero_content_margin_right = `auto`
         this.setState({ responsive })
      }

   }

   componentDidMount() {
      window.addEventListener("resize", this.update_responsive_layout);
      this.update_responsive_layout()
   }

   componentWillUnmount() {
      window.removeEventListener("resize", this.update_responsive_layout);
   }

   update_url_topic(e) {
      console.log(e.currentTarget.textContent)
      const filter = { ...this.state.filter }
      filter.topic = _kebabCase(e.currentTarget.textContent)
      this.setState({ filter })
      this.props.history.push(`/${this.state.filter.order}/${filter.topic}-${this.state.filter.type}`)
   }

   update_url_type(e) {
      console.log(e.currentTarget.textContent)
      const filter = { ...this.state.filter }
      filter.type = e.currentTarget.textContent
      this.setState({ filter })
      this.props.history.push(`/${this.state.filter.order}/${this.state.filter.topic}-${filter.type}`)
   }

   toggle_url_order(e) {
      // TODO: CHANGE HTML TEXT ON TOGGLE
      const filter = { ...this.state.filter }
      const text = e.currentTarget.textContent
      if (text === 'most recent') {
         filter.order = 'popular'
         this.props.history.push(`/popular/${this.state.filter.topic}-${this.state.filter.type}`)
      }
      else {
         filter.order = 'recent'
         this.props.history.push(`/recent/${this.state.filter.topic}-${this.state.filter.type}`)
      }
      this.setState({ filter })
   }

   reset_filters(e) {
      const filter = { ...this.state.filter }
      filter.topic_is_selected = false
      filter.type_is_selected = false
      filter.order = 'recent'
      filter.topic = 'all'
      filter.type = 'posts'
      this.setState({filter})
   }

   render() {

      const Home = styled.div`             
        a {
          text-decoration: none;
        }
        a:hover {
          text-decoration: underline !important;
        }   
      `
      const Hello = styled.h1`
        font-size: 250%;
        margin-bottom: rhythm(1.25);
        margin-top: 0;
        
        @media(max-width: 480px) {
          font-size: 190%;
        }
        

`

      const { location, children } = this.props
      let header
      let profile_pic_opacity = `1`
      let profile_pic_blur = `inherit`

      let rootPath = `/`
      if (typeof __PREFIX_PATHS__ !== `undefined` && __PREFIX_PATHS__) {
         rootPath = __PATH_PREFIX__ + `/`
      }
      console.log('location.pathname: ', location.pathname)

      if (location.pathname === rootPath
          || /\/recent\//.test(location.pathname)
          || /\/popular\//.test(location.pathname)
      ) {
         header = (
          <div>
             <Hello>
                <Link
                 style={{
                    boxShadow: 'none',
                    textDecoration: 'none',
                    color: 'inherit',
                    fontWeight: '700',
                    cursor: 'pointer',
                 }}
                 to={'/'}
                 onClick={(e) => {this.reset_filters(e)}}
                >
                   Hi, I'm Mike Zetlow.
                </Link>

             </Hello>
             <div
              style={{
                 display: 'flex',
              }}
             >
                <p>
                   I’m a software developer interested in <span className='topic_filter tag_filter' onClick={(e) => this.update_url_topic(e)}>user experience</span>, <span className='topic_filter tag_filter' onClick={(e) => this.update_url_topic(e)}>how we work</span>, and <span className='topic_filter tag_filter' onClick={(e) => this.update_url_topic(e)}>other stuff</span>.
                   <br/><br/>
                   Below is a collection of <span className='type_filter tag_filter' onClick={(e) => this.update_url_type(e)}>articles</span> and <span className='type_filter tag_filter' onClick={(e) => this.update_url_type(e)}>videos</span> sorted by <span className='order_filter tag_filter' onClick={(e) => {this.toggle_url_order(e)}}>most {this.state.filter.order}</span>.
                </p>
             </div>
          </div>
         )
      }

      else {
         profile_pic_opacity = `0.3`
         profile_pic_blur = `blur(5px)`
         header = (
          <h3
           style={{
              marginTop: 0,
              marginBottom: rhythm(-1),
           }}
          >
             <Link
              style={{
                 boxShadow: 'none',
                 color: 'inherit',
                 fontWeight: '700',
              }}
              to={'/'}
             >
                <Home>
                   MikeZetlow.com
                </Home>

             </Link>
          </h3>
         )
      }

      const Hero_Pic = styled.div`
          .hero_pic div {
            padding-bottom: 0 !important;
          }
`

      return (
       <div>
          <Hero_Pic>
             <Img
              id="hero_pic"
              title="Mike Zetlow"
              sizes={this.props.data.file.childImageSharp.sizes}
              /*sizes={{...this.props.data.file.childImageSharp.sizes, aspectRatio: 1080/624}}*/
              imgStyle={{
                 position: `fixed`,
                 right: 0,
                 bottom: 0,
                 left: `inherit`,
                 marginBottom: 0,
                 paddingBottom: 0,
                 opacity: profile_pic_opacity,
                 filter: profile_pic_blur,
                 height: `100vh`,
                 width: `auto`,
                 zIndex: -5000,
                 display: this.state.responsive.hero_pic_display,
              }}
              className='hero_pic'
             />
          </Hero_Pic>
          <div
           id="hero_content"
           style={{
              marginLeft: `auto`,
              marginRight: this.state.responsive.hero_content_margin_right,
              float: this.state.responsive.hero_content_float,
              maxWidth: rhythm(24),
              padding: `${rhythm(1.5)} ${rhythm(3 / 4)}`,
              top: 0,
           }}
          >
             {header}
             {children()}
          </div>
       </div>
      )
   }
}

export default Template

export const pageQuery = graphql`
    query ProfilePic {
        file(name: {eq: "mike-zetlow-profile-picture"}) {
            childImageSharp {
                sizes(maxWidth: 624) {
                    ...GatsbyImageSharpSizes
                },

            }
        }
    }
`
