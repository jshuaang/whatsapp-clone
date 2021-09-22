import ChatHeader from "../component/ChatHeader"
import ChatInput from "../component/ChatInput"
import { useCollection } from 'react-firebase-hooks/firestore'
import {useAuthState} from 'react-firebase-hooks/auth'
import {db,auth } from '../firebase'
import {useRouter} from 'next/router'
import getRecepientEmail from "../utils/getRecepientEmail"
import Message from "../component/Message"
import {useRef, useState, useEffect} from 'react'
import firebase from 'firebase'

function chat({chat, message}) {
    const [user] = useAuthState(auth)
    const [msg, setMsg] = useState('')
    const router = useRouter()
    const endOfMessagesRef = useRef(null)
    const recepientEmail =  getRecepientEmail(user.email, chat.users)
    const [recepientSnapshot] = useCollection(db.collection('users').where('email','==',recepientEmail))
    const recepientUser = recepientSnapshot?.docs[0].data()

    const [messageSnapshot] = useCollection(db.collection('chats').doc(router.query.id).collection('message').orderBy('timestamp','asc'))

    useEffect(() => {
      scrollToBottom()
    }, [messageSnapshot])

    const scrollToBottom = () => {
      endOfMessagesRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start"
      })
    }

    const submitMessage = (e) => {
        if(e.charCode === 13){
          if(msg !== ""){
            db.collection('users').doc(user.uid).set({
                timestamp: firebase.firestore.FieldValue.serverTimestamp()
            },{ merge: true })

            db.collection('chats').doc(router.query.id).collection('message').add({
                    user: user.email,
                    timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                    message: msg
            })

            setMsg('')
            scrollToBottom()
          }
        }
    }

    const showMessage = () => {
      if(messageSnapshot){
        return messageSnapshot?.docs.map((message) => (
          <Message 
          key={message.id} 
          id={message.id} 
          user={message.data().user} 
          message={{
            ...message.data(),
            timestamp: message.data().timestamp?.toDate().getTime()
            } 
          }
          />
        ))
      }else{
        JSON.parse(message).map((message) => {
          <Message 
          key={message.id} 
          id={message.id} 
          user={message.user} 
          message={{
            ...message,
            timestamp: message.timestamp
            } 
          }
          />
        })
      }
    }


    return (
        <div className="flex flex-col w-full sm:w-1/3 bg-yellow-100 m-auto h-screen relative">
            <ChatHeader email={recepientUser?.email} photo={recepientUser?.photo} lastseen={recepientUser?.lastseen}/>
            <div className="p-2 h-screen scrollbar-hide overflow-y-scroll mb-12">
              {showMessage()}
              <div ref={endOfMessagesRef} />
            </div>
            <ChatInput value={msg} onChange={(e) => setMsg(e.target.value)} onKeyPress={submitMessage}/>
        </div>
    )
}

export default chat

export async function getServerSideProps(context) {
  const {id} = context.query
  const ref = db.collection("chats").doc(id)
  const messageRes = await ref.collection("message").orderBy('timestamp','asc').get()

  const message = messageRes.docs
    .map((doc) => ({
        id: doc.id,
      ...doc.data()}))
    .map((message) => ({
      ...message,
      timestamp: message.timestamp.toDate().getTime()
  }))

  const chatRes = await ref.get()
  const chat = {
      id: chatRes.id,
      ...chatRes.data()
  }


  return {
    props: {
        message:JSON.stringify(message),
        chat
    }, // will be passed to the page component as props
  }
}
