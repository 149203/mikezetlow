import React from 'react'
import Link from 'gatsby-link'
import styled from 'styled-components'
import { rhythm, scale } from '../utils/typography'
import Img from 'gatsby-image'
import _round from 'lodash/round'
import _forEach from 'lodash/forEach'
import _filter from 'lodash/filter'
import _lowerCase from 'lodash/lowerCase'
import global from '../utils/global_style'

// magic
const tag_available_color = global.color.blue
const tag_available_textDecoration = 'none'
const tag_unavailable_color = global.color.gray_light
const tag_unavailable_textDecoration = 'line-through'
const tag_hovered_color = global.color.blue
const tag_hovered_textDecoration = 'underline'
const topics_array = [ 'web-development', 'user-experience', 'how-we-work', 'press' ]
const hero_content_margin_right = 30
const pic_original_width = 624
const pic_original_height = 1080
const hero_content_width = 799

class Template extends React.Component {

   constructor(props) {
      super(props)
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
      const url_topic = this.url().topic

      if (url_topic !== "") { // there is a topic in the url
         if (this_topic === url_topic) {
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
      const topic_style = document.getElementById(this_topic).style
      const url_topic = this.url().topic
      const other_topics = _filter(topics_array, topic => {
         return topic !== this_topic
      })
      const all_but_url_topic = _filter(topics_array, topic => {
         return topic !== url_topic
      })
      if (url_topic !== "") { // there is a topic in the url
         if (this_topic === url_topic) {
            topic_style.color = tag_available_color
            topic_style.textDecoration = tag_available_textDecoration
            _forEach(other_topics, topic => {
               const other_topic_style = document.getElementById(topic).style
               other_topic_style.color = tag_unavailable_color
               other_topic_style.textDecoration = tag_unavailable_textDecoration
            })
         }
         else {
            const url_topic_style = document.getElementById(url_topic).style
            url_topic_style.color = tag_available_color
            url_topic_style.textDecoration = tag_available_textDecoration
            _forEach(all_but_url_topic, topic => {
               const other_topic_style = document.getElementById(topic).style
               other_topic_style.color = tag_unavailable_color
               other_topic_style.textDecoration = tag_unavailable_textDecoration
            })
         }
      }
      else { // there is no topic in the url
         _forEach(topics_array, topic => {
            const all_topics_style = document.getElementById(topic).style
            all_topics_style.color = tag_available_color
            all_topics_style.textDecoration = tag_available_textDecoration
         })
      }
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
          margin-right: 1rem;
          display: inline-block;  
        }
        
        .select_wrapper::after {
          content:'';
          border-style: solid;
          border-width: 7.8px 4.5px 0 4.5px;
          border-color: ${global.color.blue} transparent transparent transparent;
          position: absolute;
          top: 12px;    
        }
        
      `

      const { location, children, history } = this.props
      const pathname = location.pathname
      const url_order = pathname.slice(1, pathname.lastIndexOf('/'))
      const url_topic = pathname.slice(pathname.lastIndexOf('/') + 1)
      console.log({ url_topic })
      let header
      let sort_section
      let profile_pic_opacity = `1`
      let profile_pic_blur = `inherit`

      if (url_topic === '') {
         sort_section =
          <span>
             These are my top 10&nbsp;
             <span className='select_wrapper'>
                        <select value={url_order} onChange={(e) => {this.toggle_url_order(e)}}>
                            <option value='recent'>most recent</option>
                            <option value='popular'>most popular</option>
                         </select>
                     </span>
             posts.
          </span>
      }
      else sort_section =
       <span>

          Posts labeled "{_lowerCase(url_topic)}" sorted by&nbsp;
          <span className='select_wrapper'>
                        <select value={url_order} onChange={(e) => {this.toggle_url_order(e)}}>
                            <option value='recent'>most recent</option>
                            <option value='popular'>most popular</option>
                         </select>
                     </span>

       </span>

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

                   I’m a Las Vegas programmer interested in&nbsp;

                   <span className='tag_filter'
                         id='web-development'
                         style={this.set_tag_style('web-development')}
                         onClick={() => this.update_url_topic('web-development')}
                         onMouseEnter={() => this.mouse_enter_style('web-development')}
                         onMouseLeave={() => this.mouse_leave_style('web-development')}
                   >web development</span>,&nbsp;

                   <span className='tag_filter'
                         id='user-experience'
                         style={this.set_tag_style('user-experience')}
                         onClick={() => this.update_url_topic('user-experience')}
                         onMouseEnter={() => this.mouse_enter_style('user-experience')}
                         onMouseLeave={() => this.mouse_leave_style('user-experience')}
                   >user experience</span>,&nbsp;and&nbsp;

                   <span className='tag_filter'
                         id='how-we-work'
                         style={this.set_tag_style('how-we-work')}
                         onClick={() => this.update_url_topic('how-we-work')}
                         onMouseEnter={() => this.mouse_enter_style('how-we-work')}
                         onMouseLeave={() => this.mouse_leave_style('how-we-work')}
                   >how we work</span>. The&nbsp;

                   <span className='tag_filter'
                         id='press'
                         style={this.set_tag_style('press')}
                         onClick={() => this.update_url_topic('press')}
                         onMouseEnter={() => this.mouse_enter_style('press')}
                         onMouseLeave={() => this.mouse_leave_style('press')}
                   >press</span> has said nice things about me.

                   <br/><br/>

                   {sort_section}

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
