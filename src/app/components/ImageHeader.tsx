import Image from 'next/image';

export function ImageHeader() {
    return (
        <div className="flex flex-col items-center">
            <Image
                src="/headerphone.png"
                alt="Header Image"
                width={3126}
                height={2302}
                className="w-full md:hidden"
            />
            <Image
                src="/headerImage2022_small.png"
                alt="Header Image"
                width={1936}
                height={864}
                className="w-full hidden md:block lg:hidden"
            />
            <Image
                src="/headerImage2022.png"
                alt="Header Image"
                width={2350}
                height={654}
                className="w-full hidden lg:block"
            />
        </div>
    );
}
