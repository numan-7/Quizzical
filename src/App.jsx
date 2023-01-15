import React, {useEffect, useState} from "react"
import  { nanoid } from "nanoid"
import Menu from "./components/Menu"
import Quiz from "./components/Quiz"
import Error from "./components/Error"

import blobOne from "./assets/blobOne.png"
import blobTwo from "./assets/blobTwo.png"

import { randomizeQuestions } from "./utility/randomizeQuestions"

function App() {
  // States
  const [questions, setQuestions] = useState({})
  const [isLoading, setisLoading] = useState(false)
  const [error, setError] = useState(false)
  const [start, setStart] = useState(false)
  const [validToken, setValidToken] = useState(true)
  const [Url, setUrl] = useState('')
  const [formData, setFormData] = useState({
    categories: "",
    difficulties: "",
    types: ""
  })

  const baseURL = 'https://opentdb.com/api.php?amount=10'

  // Gets Questions When The User Starts Quiz
  function getQuestions(){
      fetch(Url)
      .then(res => res.json())
      .then(data => {
          if(data.response_code != 0){
            setValidToken(false)
            setError(true)
          } else {
              setQuestions(data.results.map(ques => {
                return {
                  id: nanoid(),
                  question: ques.question,
                  correctAnswer: ques.correct_answer,
                  allAnswers: randomizeQuestions([ques.correct_answer, ...ques.incorrect_answers]), 
                  selected: ''
                }
              }))
          }
      })
      .then(() => {
        setisLoading(false)
      })
  }

  function getNewToken(){
    fetch('https://opentdb.com/api_token.php?command=request')
    .then(res => res.json())
    .then(data => {
      return data.token
    })
  }
  
  // Gets Token From Local Storage or API
  function fetchToken(){
    // retrieve token from local storage
    let token = localStorage.getItem("token")
    setisLoading(true)
    if(token){
      // check if token is valid
      fetch(`https://opentdb.com/api.php?amount=10&token=${token}`)
        .then(res => res.json())
        .then(data => {
          // if token is invalid
          if(data.response_code != 0){
            // get new token and set new Url
            token = getNewToken()
            localStorage.setItem("token", token)
          }
          setUrl(baseURL + `&token=${token}`)
        })
        .catch((error) => console.log(error))
        .finally(() => setisLoading(false))
    } else {
      // token does not exist, so get a token
      fetch('https://opentdb.com/api_token.php?command=request')
      .then(res => res.json())
      .then(data => {
        // set token in local storage
        localStorage.setItem("token", data.token)
        // update Url
        setUrl(baseURL + `&token=${data.token}`)
      })
      .catch((error) => console.log(error))
      .finally(() => setisLoading(false))
    }
    // setUrl(baseURL + `&token=${token}`)
  }

  // Handle Form Changes
  function handleForm(e){
    const {id, value} = e.target
    setFormData(prevFormData => {
      return {
        ...prevFormData,
        [id]: value
      }
    })
  }

  // User Starts Quiz
  function handleClick(e){
    e.preventDefault()
    setisLoading(true)
    getQuestions()
    setStart(!start)
  }

  // Initializes Url On Page Load
  useEffect(() => {
    if(!Url) {
      fetchToken()
    }
  }, [])

  // Resets Token
  useEffect(() => {
    if(!validToken){
      localStorage.clear()
    }
  }, [validToken])

  // Updates Base URL When Form Data Changes
  useEffect(() => {
    const category = formData.categories ? `&category=${formData.categories}` : ''
    const difficulty = formData.difficulties ? `&difficulty=${formData.difficulties}` : ''
    const type = formData.types ? `&type=${formData.types}` : ''
    // Set Api Url
    setUrl(prevState => prevState + category + difficulty + type)
  }, [formData])

  return (
    <div className = "appContainer">
      <img className ="blobOne" src = {blobOne} />
      <img className ="blobTwo" src = {blobTwo} />
      
      {isLoading ? 
        <div className = "loader"></div>
        :
        <div>
          {/* If there is any Error, show Error Screen */}
          {error ? <Error /> :
          // Else display Quiz or Menu
          <div>
              {start 
                ? <Quiz 
                  Url = {Url}
                  Return = {handleClick}
                  data = {questions}
                /> 
                : <Menu 
                  handleForm = {handleForm}
                  handleClick = {handleClick}
                />} 
              </div>
          }
        </div>
      }
    </div>
  )
}

export default App
