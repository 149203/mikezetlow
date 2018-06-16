import React from 'react'

// Import typefaces
import 'typeface-merriweather'
import 'typeface-open-sans'

import { rhythm } from '../utils/typography'

class Bio extends React.Component {
  render() {
    return (
      <div
        style={{
          display: 'flex',
        }}
      >
        <p>
           I’m a software developer interested in user experience, how we work, entrepreneurship, public domain music, poker, and other stuff.<br/><br/>
           Below is a collection of articles, videos, and press sorted by most recent.
        </p>
      </div>
    )
  }
}

export default Bio
