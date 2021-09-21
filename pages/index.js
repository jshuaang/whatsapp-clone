import Head from 'next/head'
import HomePage from '../component/HomePage'
import {useCollection} from 'react-firebase-hooks/firestore'

export default function Home() {

  return (
    <div>
      <Head>
        <title>Whatsapp-clone</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" />
      </Head>

      <HomePage />

    </div>
  )
}
