import React from "react"

export default function Error(){
    
    function reload(){
        // reload window to go back to menu
        setTimeout(() => {
            window.location.reload(false);
        }, 4500)
    }

    return (
        <div style = {{display: "flex", margin: "0", flexDirection: "column", textAlign: "center", gap: "15px"}} className = "errorContainer">
            <i style = {{color: "red"}}className="fa-2xl fa-sharp fa-solid fa-circle-exclamation"></i>
            <span > Its us not you... <br></br>There seems to be a token error no more questions for this query, resetting token...</span>
            {reload()}
        </div>
    )
}

