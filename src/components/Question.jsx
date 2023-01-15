import React from "react"

export default function Question(props){
    // needed for decoding api replies
    function decodeHtml(html) {
        var txt = document.createElement('textarea')
        txt.innerHTML = html
        return txt.value
    }

    function returnStyle(btns){
        let styles = {}
        // If the game is over
        if(props.endGame){
            if(props.data.correctAnswer === btns){
                // change the background of the color answer to green
                styles = {backgroundColor: "#94D7A2", disabled: "true", border: "none"} 
            } else if (props.data.correctAnswer != btns && props.data.selected == btns) {
                // if the user selected a wrong answer change the background color to red
                styles = {backgroundColor: "#F8BCBC", disabled: "true", opacity: "0.75", border: "none"}
            } else {
                // lowering the opacity of the rest of the buttons
                styles = {opacity: "0.75"}
            }
        } else {
            // game is still ongoing, change the background of the selected answer
             styles = {backgroundColor: props.data.selected === btns ? "#D6DBF5" : ""}
        }
        return styles
    }

    // create answer buttons
    const buttons = props.data.allAnswers.map(btns => (
        <button
            disabled = {props.endGame ? true : false}
            style = {returnStyle(btns)}
            key = {btns}
            onClick = {() => props.handleClick(props.data.id, btns)}
        >
            {decodeHtml(btns)}
        </button>
    ))
    
    return (
        <div className = "question">
            <p>{decodeHtml(props.data.question)}</p>
            <div className = "question-btns">
                {buttons}
            </div> 
        </div>
    )
}