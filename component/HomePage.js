import HeaderHome from "./HeaderHome"
import Navbar from "./Navbar"
import Chats from "./Chats"
import Status from "./Status"
import {useSelector} from 'react-redux'
import Footer from "./Footer"
import {ChatAltIcon} from '@heroicons/react/outline'
import {useCollection} from 'react-firebase-hooks/firestore'
import {useAuthState} from 'react-firebase-hooks/auth'
import {db,auth} from '../firebase'

function HomePage() {
    const [user] = useAuthState(auth)
    const [chatSnapshot] = useCollection(db.collection('chats').where('users','array-contains',user.email))

    const showChats = () => {
        if(chatSnapshot){
            return(
                chatSnapshot?.docs.map((chats) => (
                    <Chats key={chats.id} id={chats.id} users={chats.data().users}/>
                ))
            )
        }
    }

    const {menu} = useSelector(state => state)
    return (
        <div className="flex flex-col w-full sm:w-1/3 bg-white m-auto h-screen relative">
            <HeaderHome title='Whatsapp-clone'/>
            <Navbar />
            <div className="overflow-x-scroll flex-1 scrollbar-hide">
            {menu === 'chats'? showChats() : null}
            {menu === 'status'? <Status /> : null} 
            </div>

            <Footer Icons={ChatAltIcon}/>

        </div>
    )
}

export default HomePage
