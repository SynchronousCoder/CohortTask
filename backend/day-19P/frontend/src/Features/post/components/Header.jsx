import React from 'react'

const Header = () => {
  return (
    <div>
              <header className="posts__header">
          <div className="posts__header-top">
            <span className="posts__eyebrow">NØVA / FEED</span>

            <span className="posts__status">LIVE</span>
          </div>

          <h1 className="posts__title">
            Discover<span>.</span>
          </h1>

          <div className="posts__header-line" />
        </header>
    </div>
  )
}

export default Header
