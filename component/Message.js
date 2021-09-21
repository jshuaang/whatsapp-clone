import {useAuthState} from 'react-firebase-hooks/auth'
import {auth} from '../firebase'
import moment from 'moment'

function Message({user,id, message}) {
    const [userLogin] = useAuthState(auth)

    if(user === userLogin.email){
        return (
            <div className="mr-0 ml-auto bg-green-100 mb-1 p-1 rounded-md w-max max-w-full">
                <p>{message.message}</p>
                <p className="text-right text-gray-400 text-xs -mt-1"> {message.timestamp? moment(message.timestamp).format('LT') : '...'} </p>
            </div>
        )
    }else{
        return(
            <div className="ml-0 mr-auto bg-white mb-1 p-1 rounded-md w-max max-w-full">
                <p>{message.message}</p>
                <p className="text-right text-gray-400 text-xs -mt-1"> {message.timestamp? moment(message.timestamp).format('LT') : '...'} </p>
            </div>
        )
    }
}

export default Message
