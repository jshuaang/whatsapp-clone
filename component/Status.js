import MyStatus from "./MyStatus"
import {useAuthState} from 'react-firebase-hooks/auth'
import {useCollection} from 'react-firebase-hooks/firestore'
import {db,auth,storage} from'../firebase'
import {useState, useEffect} from 'react'
import getRecepientEmail from '../utils/getRecepientEmail'
import ContactStatus from "./ContactStatus"

function Status() {
    const [contact, setContact] = useState([])
    const [user] = useAuthState(auth)
    const [contactSnapshot] = useCollection(db.collection('chats').where('users','array-contains',user.email))

    useEffect(() => {
        setContact([])
        contactSnapshot?.docs.map((users) => {
            const email = getRecepientEmail(user.email,users.data().users)
            const listRef = storage.ref(email+'/')

            listRef.listAll()
            .then(res => {
                if(res.items.length > 0){
                    setContact(contact => [...contact,email])
                    res.items.map((path) => checkTimeStatus(path.name,email))
                }
            })
        })
    },[contactSnapshot])

    const checkTimeStatus = (time,email) => {
        const currTime = new Date().getTime()
        const statusTime = parseInt(time)

        const newTime = currTime - statusTime
        if(Math.ceil(newTime/3600000)>24){
            const deleteRef = storage.ref(email+'/'+time)
            deleteRef.delete()
        }
    }
    
    const showContactStatus = () => {
        if(contact.length > 0){
            return contact.map((email) => (
                 <ContactStatus key={email} email={email}/>
            ))
        }
    }

    return (
        <div>
            <MyStatus />
            <p className="p-2 text-gray-500 font-bold text-sm">Recent updates</p>
            {showContactStatus()}
        </div>
    )
}

export default Status