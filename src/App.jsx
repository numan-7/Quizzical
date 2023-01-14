import React, {useState} from "react"
import Menu from "./Menu"
import Quiz from "./Quiz"

import blobOne from "./assets/blobOne.png"
import blobTwo from "./assets/blobTwo.png"

function App() {

  const [start, setStart] = useState(false)
  
  function handleForm(e){
    e.preventDefault()
    console.log(e.target.value)
  }

  function handleClick(e){
      e.preventDefault()
      console.log(e.target.id)
    }  

  return (
    <div className = "appContainer">
      <img className ="blobOne" src = {blobOne} />
      <img className ="blobTwo" src = {blobTwo} />
      {start 
        ? <Quiz /> 
        : <Menu 
          handleForm = {handleForm}
          handleClick = {handleClick}
        />}
    </div>
  )
}

export default App
