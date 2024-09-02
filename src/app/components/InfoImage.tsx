import Image from "next/image";

interface InfoImageProps {
    addedClass: string
}

export function InfoImage({addedClass}: InfoImageProps) {
    return (
        <Image src="/infoIcon.png"
               alt="information icon"
               width={32}
               height={32}
               className={"min-w-8 min-h-8 " + addedClass}/>
    );
}