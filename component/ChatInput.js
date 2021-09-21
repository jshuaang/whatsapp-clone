import {useState} from 'react'
import {db,auth} from '../firebase'
function ChatInput({value,...rest}) {
    return (
        <div className="absolute bottom-1 p-1 w-full">
            <input className="w-full h-10 rounded-full px-5 focus:outline-none" value={value} placeholder="Message" {...rest}></input>
        </div>
    )
}

export default ChatInput
