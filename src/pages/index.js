import React from "react"
import { Link } from "gatsby"

import LayoutIndex from "../components/layout_index.js"
import SEO from "../components/seo"

const IndexPage = () => (
  <LayoutIndex>
    <SEO title="Home" />
    <h1 id="want-to-spend-your-summer-experimenting-designing-and-making-things-with-code" className="center">Want to spend your summer experimenting, designing and making things with code?</h1>
    <div className="center"><Link to="/page-2/" className="button">Tell me more</Link></div>
  </LayoutIndex>
)

export default IndexPage
