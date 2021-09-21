import {useRouter} from 'next/router'

function Footer({Icons}) {
    const router = useRouter()

    return (
        <div className="absolute cursor-pointer bottom-2 right-2 w-12 h-12 bg-green-light rounded-full text-white p-2" onClick={() => router.push('/contact')}>
            <Icons className="h-8"/>
        </div>
    )
}

export default Footer
