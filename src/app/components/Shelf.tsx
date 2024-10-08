import Image from "next/image";
import {SweaterType} from "@/app/components/Sweater";
import {FoldedSweater} from "@/app/components/FoldedSweater";

interface ShelfImageProps {
    classes: string
    sweaters: SweaterType[]
}

export function Shelf({classes, sweaters}: ShelfImageProps) {
    return (
        <div className={"flex flex-col min-h-fit md:min-h-[30vw] justify-end items-center w-64 md:w-full " + classes}>
            {sweaters.slice().reverse().map((sweater: SweaterType, index) =>
                <FoldedSweater
                    key={index}
                    sweater={sweater}
                    className="l"/>
            )}
            <Image
                src="/shelf.png"
                alt="Shelf With Info Image"
                width={400}
                height={864}
                className={""}
            />
        </div>
    );
}