import {useCollection} from 'react-firebase-hooks/firestore'
import {db} from '../firebase'
import {useRouter} from 'next/router'
import Avatar from '@material-ui/core/Avatar'


function ContactStatus({email}) {
    const router = useRouter()
    const [userSnapshot] = useCollection(db.collection('users').where('email','==',email))

    const userPhoto = (userSnapshot?.docs[0]?.data().photo)

    return (
        <div className="flex p-2 cursor-pointer items-center" onClick={() => router.push(`status/show?u=${email}`)}>
            <Avatar src={userPhoto}/>
            <p className="ml-2 font-bold">{email}</p>
        </div>
    )
}

export default ContactStatus
