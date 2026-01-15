import { createContext, useState } from "react";

const 
Player = createContext()

const PlayerContext = ({children}) => {
    const [currTrack, setCurrTrack] = useState(null)
    return(
        <Player.Provider value={{currTrack, setCurrTrack}}>
            {children}
        </Player.Provider>
    )
}

export {PlayerContext, Player}