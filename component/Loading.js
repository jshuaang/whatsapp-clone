import Image from 'next/image'

function Loading() {
    return (
        <div className="w-full sm:w-1/3 h-screen m-auto bg-white text-green-light text-center pt-40">
            <Image src={`https://img.icons8.com/color/144/000000/spinning-circle--v1.png`}
            width={100}
            height={100} className="animate-spin"/>
        </div>
    )
}

export default Loading
