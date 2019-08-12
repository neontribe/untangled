
import React from "react"
import { withPrefix } from "gatsby"

const UntangledApp = () => (

    <React.Fragment>
        <script src={withPrefix('mysketch.js')} />
        <script src={withPrefix('mysketch-lighter.js')} />
        <script src={withPrefix('p5.clickable.min.js')} />
        <script src={withPrefix('p5.dom.min.js')} />
        <script src={withPrefix('p5.min.js')} />
        <script src={withPrefix('Tone.js')} />
    </React.Fragment>

)

export default UntangledApp
