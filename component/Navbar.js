import {useDispatch} from 'react-redux'

function Navbar() {
    const dispatch = useDispatch()
    return (
        <div className="grid grid-cols-2 text-center text-white uppercase bg-green-teal font-bold text-sm h-10">
            <p className="hover:border-b-4 hover:border-white cursor-pointer" onClick={() => dispatch({type:"CHANGE_MENU", payload:"chats"})}>Chats</p>
            <p className="hover:border-b-4 hover:border-white cursor-pointer" onClick={() => dispatch({type:"CHANGE_MENU", payload:"status"})}>Status</p>
        </div>
    )
}

export default Navbar
