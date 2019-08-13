/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import PropTypes from "prop-types"
import UntangledApp from './app.js'


import 'reset-css';
import "./layout.css"

const LayoutIndex = ({ children }) => {

  return (

    <>
      <UntangledApp />
      <div>
        <main>{children}</main>
      </div>
    </>
  )
}

LayoutIndex.propTypes = {
  children: PropTypes.node.isRequired,
}

export default LayoutIndex
