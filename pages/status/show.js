import {storage} from '../../firebase'
import {useState, useEffect} from 'react'
import {useDispatch} from 'react-redux'
import {useRouter} from 'next/router'
import {useCollection} from 'react-firebase-hooks/firestore'
import {db} from '../../firebase'
import Avatar from '@material-ui/core/Avatar'

function ShowStatus() {
    const [imageURL, setImageURL] = useState([])
    const [counter, setCounter] = useState(0)
    const router = useRouter()
    const dispatch = useDispatch()
    const user = router.query.u
    const [userSnapshot] = useCollection(db.collection('users').where('email','==',user))

    const userPhoto = (userSnapshot?.docs[0]?.data().photo)

    const listRef = storage.ref(user+'/')

    useEffect(() => {
        listRef.listAll()
        .then(res => {
            console.log('res',res)
            res.items.map(item => {
                storage.ref(item.fullPath).getDownloadURL().then(res =>  setImageURL(imageURL => [...imageURL, res])).catch(err => console.log(err))
                console.log(item)
                }
            )
        })
        .catch(err => console.log(err))
    }, [])

    const nextStatus = () => {
        if(counter >= imageURL.length - 1){
            dispatch({type:'CHANGE_MENU', payload:'status'})
            router.push('/')
            setImageURL([])
            setCounter(0)
        }

            setCounter(counter + 1)
            console.log(counter, imageURL.length)
            console.log(imageURL)
    }

    return (
        <div className="flex flex-col justify-center w-full sm:w-1/3 bg-black m-auto h-screen relative" onClick={nextStatus}>
            <div className="absolute top-5 left-6 flex items-center">
                <Avatar src={userPhoto} />
                <p className="text-white font-bold ml-5">{user}</p> 
            </div>
            <img src={imageURL[counter]}/>
        </div>
    )
}

export default ShowStatus

