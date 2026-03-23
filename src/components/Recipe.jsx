import { forwardRef } from "react"
import Markdown from "react-markdown"
import "/src/css/Main.css"

const Recipe = forwardRef((props) => {
    return (
        <section className="suggested-recipe-section" aria-live="polite">
            <h2>Chef Claude Recommends:</h2>
            <Markdown>{props.recipe}</Markdown>
        </section>
    )
})

export default Recipe