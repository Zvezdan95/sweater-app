import Image from "next/image";

export function CoatHangerImage() {
    return (
        <Image
            src="/coathanger.png"
            alt="Small Image"
            width={500}
            height={300}
            className="w-full"
        />
    );
}