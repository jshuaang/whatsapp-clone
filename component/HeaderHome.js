import {DotsVerticalIcon} from '@heroicons/react/outline'
import {useState} from 'react'
import {auth} from '../firebase'

function HeaderHome({title}) {
    const [buttonLogout, setButtonLogout] = useState(false)

    const showButtonLogout = () => {
        buttonLogout? setButtonLogout(false) : setButtonLogout(true)
    }

    return (
        <div className="w-full bg-green-teal h-20 sticky text-white flex items-center justify-between px-3 pb-6">
            <h1 className="text-2xl font-bold p-2">{title}</h1>
            <div className="relative">
                <DotsVerticalIcon className="h-8 cursor-pointer" onClick={showButtonLogout}/>
                {buttonLogout?
                <div className="absolute cursor-pointer top-10 right-0 bg-white text-gray-900 p-2" onClick={() => auth.signOut() }>
                    <p>Logout</p>
                </div> : null }
            </div>
        </div>
    )
}

export default HeaderHome
