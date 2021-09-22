import {useRouter} from 'next/router'

function Footer({Icons, type}) {
    const router = useRouter()

    if(type === 'chats'){
        return (
            <div className="absolute cursor-pointer bottom-2 right-2 w-12 h-12 bg-green-teal rounded-full text-white p-2" onClick={() => router.push('/contact')}>
                <Icons className="h-8"/>
            </div>
        )
    }

    if(type === 'status'){
         return (
            <div className="absolute cursor-pointer bottom-2 right-2 w-12 h-12 bg-green-teal rounded-full text-white p-2" onClick={() => router.push('/status/add')}>
                <Icons className="h-8"/>
            </div>
        )
    }
}

export default Footer
