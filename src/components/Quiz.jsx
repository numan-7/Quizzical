import React, {useState} from "react"
import Question from "./Question"

export default function Quiz(props){
    // State for Questions
    const [questions, setQuestions] = useState(props.data)
    const [userStats, setUserStats] = useState()
    const [endGame, setEndGame] = useState(false)

    // display users final stats
    function getStats(){
        return (
            <p style = {{textAlign: "center"}}> You scored {userStats}/10 correct answers</p>
        )
    }

    function handleMainButton(){
        if(!endGame){
            const correctAnswers = questions.filter(question => question.correctAnswer === question.selected)
            setUserStats(correctAnswers.length)
            setEndGame(!endGame)
        } else {
            window.location.reload(false)
        }
    }

    function handleClick(id, answer){
        setQuestions(prevState => prevState.map(question => (
            question.id === id ? {...question, selected: answer} : question
        )))
    }

    const quizQuestions = questions.map((ques, index) => (
        <Question 
            key = {index}
            data = {ques}
            id = {ques.id}
            handleClick = {handleClick}
            endGame = {endGame}
        />
    ))
    return (
        <div className = "questionContainer">
            {quizQuestions}
            {endGame ? getStats() : ''}
            <button onClick = {handleMainButton} id = "submit">
                {endGame ? "Play Again" : "Check Answer"}
            </button>
        </div>
    )
}