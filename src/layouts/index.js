import React from 'react'
import Link from 'gatsby-link'
import styled from 'styled-components'
import { rhythm, scale } from '../utils/typography'
import Img from 'gatsby-image'
import _round from 'lodash/round'
import _kebabCase from 'lodash/kebabCase'
import _forEach from 'lodash/forEach'
import _filter from 'lodash/filter'
import _merge from 'lodash/merge'
import global from '../utils/global_style'

const tag_ui = {
   available: {
      color: global.color.blue,
      textDecoration: `none`
   },
   unavailable: {
      color: global.color.gray_light,
      textDecoration: `line-through`
   },
   hovered: {
      color: global.color.blue,
      textDecoration: `underline`
   }
}
const topics_array = ['user-experience', 'how-we-work', 'other-stuff', 'press']
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
      this.update_url_topic = this.update_url_topic.bind(this)
      this.toggle_url_order = this.toggle_url_order.bind(this)
      this.reset_filters = this.reset_filters.bind(this)
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
   }

   componentWillUnmount() {
      window.removeEventListener("resize", this.update_responsive_layout);
   }

   update_url_topic(e) {
      const location = this.props.location
      const url = location.pathname.slice(1)
      let url_topic = url.slice(url.indexOf('/') + 1)
      const filter = { ...this.state.filter }
      const slugified_text = _kebabCase(e.currentTarget.textContent)
      if (url_topic === slugified_text) {
         filter.topic = null
      }
      else {
         filter.topic = _kebabCase(slugified_text)
      }

      this.setState({ filter }, () => { // setState is asynchronous, a callback is used to get updated state // https://stackoverflow.com/a/30783011/6305196
         const state_filter = this.state.filter
         if (state_filter.topic === null) this.props.history.push(`/${state_filter.order}/`)
         else {
            this.props.history.push(`/${state_filter.order}/${state_filter.topic}`)
         }
         console.log('NEW FILTER STATE: ', this.state.filter)
      })
   }

   toggle_url_order(e) {
      const filter = { ...this.state.filter }
      const selected_text = e.currentTarget.value
      console.log('TEXT: ', selected_text)
      const topic = this.state.filter.topic
      if (topic !== null) {
         const kebab_topic = _kebabCase(topic)
         if (selected_text === 'recent') {
            filter.order = 'recent'
            this.props.history.push(`/recent/${kebab_topic}`)
         }
         else {
            filter.order = 'popular'
            this.props.history.push(`/popular/${kebab_topic}`)
         }
      }
      else {
         console.log('topic is null')
         if (selected_text === 'recent') {
            filter.order = 'recent'
            this.props.history.push(`/recent/`)
         }
         else {
            filter.order = 'popular'
            this.props.history.push(`/popular/`)
         }
      }

      this.setState({ filter }, () => {
         console.log('NEW FILTER STATE: ', this.state.filter)
      })
   }

   reset_filters(e) {
      const filter = { ...this.state.filter }
      filter.order = 'recent'
      filter.topic = null
      this.setState({ filter })
   }

   set_tag_style(this_topic) {
      // return an object for style
      if (this.state.filter.topic) {
         if (this_topic === this.state.filter.topic) return tag_ui.available
         else return tag_ui.unavailable
      }
      else return tag_ui.available
   }

   mouse_enter_style(this_topic) {
      const filter = { ...this.state.filter }
      filter.hovered = this_topic

      this.setState({ filter }, () => { // after setting the state, do this stuff
         const state_topic = this.state.filter.topic
         const hover_topic = this.state.filter.hovered
         const topic_style = document.getElementById(this_topic).style
         const other_topics = _filter(topics_array, topic => {
            return topic !== this_topic
         })

         if (state_topic) { // there is a topic in the url
            if (this_topic === state_topic) {
               _merge(topic_style, tag_ui.hovered)
               _forEach(other_topics, topic => {
                  _merge(document.getElementById(topic).style, tag_ui.available)
               })
            }
            else {
               _merge(topic_style, tag_ui.hovered)
               _forEach(other_topics, topic => {
                  _merge(document.getElementById(topic).style, tag_ui.unavailable)
               })
            }
         }
         else { // there is no topic in the url
            _forEach(topics_array, topic => {
               _merge(document.getElementById(topic).style, tag_ui.available)
            })
            if (this_topic === hover_topic) {
               _merge(topic_style, tag_ui.hovered)
               _forEach(other_topics, topic => {
                  _merge(document.getElementById(topic).style, tag_ui.unavailable)
               })
            }
         }
      })
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
               _merge(topic_style, tag_ui.available)
               _forEach(other_topics, topic => {
                  _merge(document.getElementById(topic).style, tag_ui.unavailable)
               })
            }
            else {
               _merge(document.getElementById(state_topic).style, tag_ui.available)
               _forEach(all_but_state_topic, topic => {
                  _merge(document.getElementById(topic).style, tag_ui.unavailable)
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

      const { location, children } = this.props
      let header
      let profile_pic_opacity = `1`
      let profile_pic_blur = `inherit`

      let rootPath = `/`
      if (typeof __PREFIX_PATHS__ !== `undefined` && __PREFIX_PATHS__) {
         rootPath = __PATH_PREFIX__ + `/`
      }
      //console.log('location.pathname: ', location.pathname)

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
             <Bio>
                <p>
                   I’m a software developer interested in&nbsp;
                   <span className='tag_filter'
                         id='user-experience'
                         style={this.set_tag_style('user-experience')}
                         onClick={(e) => this.update_url_topic(e)}
                         onMouseEnter={() => this.mouse_enter_style('user-experience')}
                         onMouseLeave={() => this.mouse_leave_style('user-experience')}
                   >user experience</span>,&nbsp;

                   <span className='tag_filter'
                         id='how-we-work'
                         style={this.set_tag_style('how-we-work')}
                         onClick={(e) => this.update_url_topic(e)}
                         onMouseEnter={() => this.mouse_enter_style('how-we-work')}
                         onMouseLeave={() => this.mouse_leave_style('how-we-work')}
                   >how we work</span>, and&nbsp;

                   <span className='tag_filter'
                         id='other-stuff'
                         style={this.set_tag_style('other-stuff')}
                         onClick={(e) => this.update_url_topic(e)}
                         onMouseEnter={() => this.mouse_enter_style('other-stuff')}
                         onMouseLeave={() => this.mouse_leave_style('other-stuff')}
                   >other stuff</span>. The&nbsp;

                   <span className='tag_filter'
                         id='press'
                         style={this.set_tag_style('press')}
                         onClick={(e) => this.update_url_topic(e)}
                         onMouseEnter={() => this.mouse_enter_style('press')}
                         onMouseLeave={() => this.mouse_leave_style('press')}
                   >press</span> has said nice things about me. Sorted by&nbsp;

                   <span className='select_wrapper'>
                      <select value={this.state.filter.order} onChange={(e) => {this.toggle_url_order(e)}}>
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
