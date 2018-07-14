import React from 'react'
import Link from 'gatsby-link'
import styled from 'styled-components'
import { rhythm, scale } from '../utils/typography'
import Img from 'gatsby-image'
import _round from 'lodash/round'
import _kebabCase from 'lodash/kebabCase'
import _forEach from 'lodash/forEach'
import _filter from 'lodash/filter'
import global from '../utils/global_style'

const tag_available_color = global.color.blue
const tag_available_textDecoration = 'none'
const tag_unavailable_color = global.color.gray_light
const tag_unavailable_textDecoration = 'line-through'
const tag_hovered_color = global.color.blue
const tag_hovered_textDecoration = 'underline'
const topics_array = [ 'user-experience', 'how-we-work', 'other-stuff', 'press' ]
const hero_content_margin_right = 30
const pic_original_width = 624
const pic_original_height = 1080
const hero_content_width = 799

class Template extends React.Component {

   constructor(props) {
      super(props)

      const url = this.props.location.pathname.slice(1)
      const url_order = url.slice(0, url.indexOf('/'))
      const url_topic = url.slice(url.indexOf('/') + 1)

      this.update_responsive_layout = this.update_responsive_layout.bind(this)
      this.url = this.url.bind(this)
      this.update_url_topic = this.update_url_topic.bind(this)
      this.toggle_url_order = this.toggle_url_order.bind(this)
      this.set_tag_style = this.set_tag_style.bind(this)
      this.mouse_enter_style = this.mouse_enter_style.bind(this)
      this.mouse_leave_style = this.mouse_leave_style.bind(this)
      this.state = {
         responsive: {
            hero_pic_display: `none`,
            hero_content_float: ``,
            hero_content_margin_right: `auto`,
         },
         filter: {
            order: return_url_order(url_order),
            topic: return_url_topic(url_topic), // this-is-slugified
            hovered: null,
         }
      }

      function return_url_order(url_order) {
         if (url_order === 'popular') return 'popular'
         else return 'recent'
      }

      function return_url_topic(url_topic) {
         if (url_topic !== '') return url_topic
         else return null
      }

   }

   update_responsive_layout() {

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
      this.set_tag_style(this.url().topic)
   }

   componentWillUnmount() {
      window.removeEventListener("resize", this.update_responsive_layout);
   }

   url() {
      const url = this.props.location.pathname.slice(1)
      const topic = url.slice(url.indexOf('/') + 1)
      const order = url.slice(0, url.indexOf('/'))
      return { order, topic }
   }

   update_url_topic(selected_topic) {
      let { order, topic } = this.url()
      if (order === "") {order = "recent"}
      if (topic === selected_topic) {
         this.props.history.push(`/${order}/`)
      }
      else {
         this.props.history.push(`/${order}/${selected_topic}`)
      }
   }

   toggle_url_order(e) {
      const selected_text = e.currentTarget.value
      const topic = this.url().topic
      if (topic !== "") {
         if (selected_text === 'recent') {
            this.props.history.push(`/recent/${topic}`)
         }
         else {
            this.props.history.push(`/popular/${topic}`)
         }
      }
      else {
         if (selected_text === 'recent') {
            this.props.history.push(`/recent/`)
         }
         else {
            this.props.history.push(`/popular/`)
         }
      }
   }

   set_tag_style(this_topic) {
      const topic = this.url().topic
      if (topic !== '') {
         if (this_topic === topic) return {
            color: tag_available_color,
            textDecoration: tag_available_textDecoration
         }
         else return {
            color: tag_unavailable_color,
            textDecoration: tag_unavailable_textDecoration
         }
      }
      else return {
         color: tag_available_color,
         textDecoration: tag_available_textDecoration
      }
   }

   mouse_enter_style(this_topic) {
      const topic_style = document.getElementById(this_topic).style
      const other_topics = _filter(topics_array, topic => {
         return topic !== this_topic
      })
      const state_topic = this.url().topic

      if (state_topic) { // there is a topic in the url
         if (this_topic === state_topic) {
            topic_style.color = tag_hovered_color
            topic_style.textDecoration = tag_hovered_textDecoration
            _forEach(other_topics, topic => {
               const other_topic_style = document.getElementById(topic).style
               other_topic_style.color = tag_available_color
               other_topic_style.textDecoration = tag_available_textDecoration
            })
         }
         else {
            topic_style.color = tag_hovered_color
            topic_style.textDecoration = tag_hovered_textDecoration
            _forEach(other_topics, topic => {
               const other_topic_style = document.getElementById(topic).style
               other_topic_style.color = tag_unavailable_color
               other_topic_style.textDecoration = tag_unavailable_textDecoration
            })
         }
      }
      else { // there is no topic in the url
         _forEach(topics_array, topic => {
            const topic_style = document.getElementById(topic).style
            topic_style.color = tag_available_color
            topic_style.textDecoration = tag_available_textDecoration
         })
         topic_style.color = tag_hovered_color
         topic_style.textDecoration = tag_hovered_textDecoration
         _forEach(other_topics, topic => {
            const other_topic_style = document.getElementById(topic).style
            other_topic_style.color = tag_unavailable_color
            other_topic_style.textDecoration = tag_unavailable_textDecoration
         })
      }
   }

   mouse_leave_style(this_topic) {
      const filter = { ...this.state.filter }
      filter.hovered = null

      this.setState({ filter }, () => { // after setting the state, do this stuff
         const state_topic = this.state.filter.topic
         const topic_style = document.getElementById(this_topic).style
         const other_topics = _filter(topics_array, topic => {
            return topic !== this_topic
         })
         const all_but_state_topic = _filter(topics_array, topic => {
            return topic !== state_topic
         })
         if (state_topic) { // there is a topic in the url
            if (this_topic === state_topic) {
               topic_style.color = tag_available_color
               topic_style.textDecoration = tag_available_textDecoration
               _forEach(other_topics, topic => {
                  const other_topic_style = document.getElementById(topic).style
                  other_topic_style.color = tag_unavailable_color
                  other_topic_style.textDecoration = tag_unavailable_textDecoration
               })
            }
            else {
               const state_topic_style = document.getElementById(state_topic).style
               state_topic_style.color = tag_available_color
               state_topic_style.textDecoration = tag_available_textDecoration
               _forEach(all_but_state_topic, topic => {
                  const other_topic_style = document.getElementById(topic).style
                  other_topic_style.color = tag_unavailable_color
                  other_topic_style.textDecoration = tag_unavailable_textDecoration
               })
            }
         }
      })
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
      const Bio = styled.div`
        display: flex;
        p {
          margin-bottom: 0;
        }
        
        .tag_filter {
          color: ${global.color.blue};
          cursor: pointer;
        }
        
        select {
          background-color: transparent;
          padding: 0 4px 0 0;
          border: none;
          border-bottom: 1px solid ${global.color.blue};
          border-radius: 0;
          cursor: pointer;
          -webkit-appearance: none;
          -moz-appearance: none;
          appearance: none;
        }
        
        select:focus {
          outline: none
        }
        
        .select_wrapper {
          position: relative;
        }
        
        .select_wrapper::after {
          content:'';
          border-style: solid;
          border-width: 7.8px 4.5px 0 4.5px;
          border-color: ${global.color.blue} transparent transparent transparent;
          position: absolute;
          top: 9px;      
        }
        
      `

      const { location, children, history } = this.props
      const pathname = location.pathname
      const url_order = pathname.slice(1, pathname.lastIndexOf('/'))
      let header
      let profile_pic_opacity = `1`
      let profile_pic_blur = `inherit`

      let rootPath = `/`
      if (typeof __PREFIX_PATHS__ !== `undefined` && __PREFIX_PATHS__) {
         rootPath = __PATH_PREFIX__ + `/`
      }

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
                 onClick={() => {history.push(`/`)}}
                >
                   Hi, I'm Mike Zetlow.
                </Link>

             </Hello>
             <Bio>
                <p>
                   I’m a software developer interested in&nbsp;
                   <span className='tag_filter'
                         id='user-experience'
                         style={this.set_tag_style('user-experience')}
                         onClick={() => this.update_url_topic('user-experience')}
                         onMouseEnter={() => this.mouse_enter_style('user-experience')}
                         onMouseLeave={() => this.mouse_leave_style('user-experience')}
                   >user experience</span>,&nbsp;

                   <span className='tag_filter'
                         id='how-we-work'
                         style={this.set_tag_style('how-we-work')}
                         onClick={() => this.update_url_topic('how-we-work')}
                         onMouseEnter={() => this.mouse_enter_style('how-we-work')}
                         onMouseLeave={() => this.mouse_leave_style('how-we-work')}
                   >how we work</span>, and&nbsp;

                   <span className='tag_filter'
                         id='other-stuff'
                         style={this.set_tag_style('other-stuff')}
                         onClick={() => this.update_url_topic('other-stuff')}
                         onMouseEnter={() => this.mouse_enter_style('other-stuff')}
                         onMouseLeave={() => this.mouse_leave_style('other-stuff')}
                   >other stuff</span>. The&nbsp;

                   <span className='tag_filter'
                         id='press'
                         style={this.set_tag_style('press')}
                         onClick={() => this.update_url_topic('press')}
                         onMouseEnter={() => this.mouse_enter_style('press')}
                         onMouseLeave={() => this.mouse_leave_style('press')}
                   >press</span> has said nice things about me. Sorted by&nbsp;

                   <span className='select_wrapper'>
                      <select value={url_order} onChange={(e) => {this.toggle_url_order(e)}}>
                         <option value='recent'>most recent</option>
                         <option value='popular'>most popular</option>
                      </select>
                   </span>
                   <br/><br/>
                   You can reach me at: mike@mikezetlow.com
                </p>
             </Bio>
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
              onClick={() => {history.push(`/`)}}
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
