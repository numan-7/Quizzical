import React from "react"
import data from "./assets/data"

export default function Menu(props){
    const categoryForm = data.categories.map(category => (
        <option key = {category.id} value = {category.id}>{category.type}</option>
    ))
    
    const difficultyForm = data.difficulties.map(difficulty => (
        <option key = {difficulty.id} value = {difficulty.id}>{difficulty.type}</option>
    ))
    
    const questionTypeForm = data.questionTypes.map(questionType => (
        <option key = {questionType.id} value = {questionType.id}>{questionType.type}</option>    
    ))

    return (
        <div className = "menuContainer">
                <h1>Quizzical</h1>
                <p>Test your <strong>knowledge...</strong></p>
                <div className = "typeContainer">
                    <form>
                        <select onChange = {props.handleForm} id="categories" name="categories">
                            {categoryForm}
                        </select>
                        <select onChange = {props.handleForm} id ="difficulties" name = "difficulties">
                            {difficultyForm}
                        </select>
                        <select onChange = {props.handleForm} id = "types" name = "types">
                            {questionTypeForm}
                        </select>
                        <button id = "start" onClick = {(e) => props.handleClick(e)}>Start quiz</button>
                    </form>
                </div>
        </div>
    )
}