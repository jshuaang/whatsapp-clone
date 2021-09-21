import Avatar from '@material-ui/core/Avatar'
import {useCollection} from 'react-firebase-hooks/firestore'
import {db,auth} from '../firebase'
import {useRouter} from 'next/router'
import {useAuthState} from 'react-firebase-hooks/auth'
import getRecepientEmail from '../utils/getRecepientEmail'
import {useState, useEffect} from 'react'

function Chats({id, users}) {
    const [lastMessage, setLastMesasge] = useState('')
    const [user] = useAuthState(auth)
    const router = useRouter()
    const [userSnapshot] = useCollection(db.collection('users').where('email','==',getRecepientEmail(user.email, users)))
    const userContact = userSnapshot?.docs[0]?.data()

    const [lastChat] = useCollection(db.collection('chats').doc(id).collection('message').orderBy('timestamp','desc'))

    useEffect(() => {
        if(lastChat){
            setLastMesasge(lastChat?.docs[0].data().message)
        }
    }, [lastChat])

    return (
        <div className="flex cursor-pointer p-3 items-center border border-gray-50 hover:bg-gray-300" onClick={() => router.push(`/chat?id=${id}`)}>
            <Avatar src={userContact?.photo}/>
            <div className="ml-4">
                <p className="font-bold">{userContact?.email}</p>
                <p className="text-sm text-gray-500">{lastMessage ? lastMessage : 'Available'}</p>
            </div>
        </div>
    )
}

export default Chats
