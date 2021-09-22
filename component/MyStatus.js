import Avatar from '@material-ui/core/Avatar'
import {useAuthState} from 'react-firebase-hooks/auth'
import {useCollection} from 'react-firebase-hooks/firestore'
import {auth, db} from '../firebase'
import {useRouter} from 'next/router'

function MyStatus() {
    const router = useRouter()
    const [user] = useAuthState(auth)
    const [userSnapshot] = useCollection(db.collection('users').where('email','==',user.email))

    const userPhoto = (userSnapshot?.docs[0]?.data().photo)


    return (
        <div className="flex p-2 cursor-pointer" onClick={() => router.push(`status/show?u=${user.email}`)}>
            <Avatar src={userPhoto}/>
            <div className="ml-2">
                <p className="font-bold">My Status</p>
                <p className="text-gray-500 -mt-1 text-sm">Tap to see status update</p>
            </div>
        </div>
    )
}

export default MyStatus
