import HeaderHome from "../component/HeaderHome"
import {UserAddIcon} from '@heroicons/react/outline'
import Chats from '../component/Chats'
import {useCollection, useCollectionData} from 'react-firebase-hooks/firestore'
import {useAuthState} from 'react-firebase-hooks/auth'
import {db,auth} from '../firebase' 
import * as EmailValidator from 'email-validator';

function contact() {
    const [user] = useAuthState(auth)
    const [chatSnapshot] = useCollection(db.collection('chats').where('users','array-contains',user.email))

    const addNewContact = () => {
        const emailContact = prompt("Input valid email: ")

        if(EmailValidator.validate(emailContact) && emailContact !== user.email && !chatAlreadyExist(emailContact)){
            db.collection('chats').add({
                users:[user.email, emailContact]
            })
        }
    }

    const chatAlreadyExist = (emailContact) => {
       return !!chatSnapshot?.docs.find((chat) => chat.data().users.find((users) => users === emailContact)?.length > 0)
    } 

    return (
        <div className="w-full sm:w-1/3 h-screen bg-white m-auto flex flex-col">
            <HeaderHome title='Select contact'/>
            {/* add new contact */}
            <div className="w-full border border-gray-50 hover:bg-gray-300 cursor-pointer text-center p-2 flex items-center px-3"
                onClick={addNewContact}>
                <div className="bg-green-light rounded-full p-2 mr-3 text-white">
                    <UserAddIcon className="h-6"/>  
                </div>
                <p>New contact</p>
            </div>
            {chatSnapshot?.docs.map((chat) => (
                <Chats key={chat.id} id={chat.id} users={chat.data().users}/>
            ))}
        </div>
    )
}

export default contact

