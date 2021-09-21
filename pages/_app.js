import '../styles/globals.css'
import "tailwindcss/tailwind.css"
import {auth, db} from '../firebase'
import { Provider} from 'react-redux'
import store from '../redux/store'
import {useAuthState} from 'react-firebase-hooks/auth'
import Login from './login'
import Loading from '../component/Loading'
import {useEffect} from 'react'
import firebase from 'firebase'

function MyApp({ Component, pageProps }) {
  const [user, loading] = useAuthState(auth)

  useEffect(() => { 
    if(user) {
     db.collection("users").doc(user.uid).set({
        email: user.email,
        photo: user.photoURL,
        lastseen: firebase.firestore.FieldValue.serverTimestamp()
      });
    }
  }, [user])

  if(loading) return <Loading />
  if(!user) return <Login />

  
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  )
  
}

export default MyApp
