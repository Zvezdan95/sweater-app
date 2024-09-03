import Image from "next/image";

interface InfoImageProps {
    addedClass: string
    onClick:()=>void
}

export function InfoImage({addedClass,onClick}: InfoImageProps) {
    return (
        <Image src="/infoIcon.png"
               alt="information icon"
               width={32}
               height={32}
               onClick={onClick}
               className={"min-w-8 min-h-8 cursor-pointer " + addedClass}/>
    );
}