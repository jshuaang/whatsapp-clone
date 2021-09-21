import {ArrowSmLeftIcon} from '@heroicons/react/outline'
import Avatar from '@material-ui/core/Avatar'
import {useRouter} from 'next/router'
import firebase from 'firebase'

function ChatHeader({email, photo, lastseen}) {
    const router = useRouter()
    return (
        <div>
            <div className="w-full bg-green-teal h-14 sticky text-white flex items-center px-2 ">
                <ArrowSmLeftIcon className="h-8" onClick={() => router.push('/')}/>
                <Avatar src={photo}/>
                <p className="ml-2">{email}</p>
            </div>
        </div>
    )
}

export default ChatHeader
