import {useState} from 'react'
import {useDispatch} from 'react-redux'
import {storage,auth} from '../../firebase'
import {useAuthState} from 'react-firebase-hooks/auth'
import {useRouter} from 'next/router'
import firebase from 'firebase'

function AddStatus() {
    const router = useRouter()
    const dispatch = useDispatch()
    const [user] = useAuthState(auth)
    const [image, setImage] = useState(null)

    const postToStorage = () => {
       const ref = storage.ref()
        
       const name = firebase.firestore.FieldValue.serverTimestamp()
       const metadata = {
           contentType:image.type
       }

       ref.child(`${user.email}/`+name).put(image, metadata)
       .then(() => {
            router.push('/')
            dispatch({type:"CHANGE_MENU", payload:"status"})
            setImage(null)
       })
    }

    console.log(image)

    return (
        <div className="flex flex-col justify-center w-full sm:w-1/3 bg-white m-auto h-screen relative">
            <input type="file" className="m-auto" onChange={(e) => setImage(e.target.files[0])}></input>
            <button className="w-64 bg-green-light text-white font-bold m-auto rounded-full h-10" onClick={postToStorage}>Post</button>
        </div>
    )
}

export default AddStatus
