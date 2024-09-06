import {SweaterColor} from "@/app/components/FoldedSweater";
import {match} from 'ts-pattern';
import Image from "next/image";

export enum SweaterType {
    Sweater1 = "Sweater1",
    Sweater2 = "Sweater2",
    Sweater3 = "Sweater3",
    Sweater4 = "Sweater4",
    Sweater5 = "Sweater5",
    Sweater6 = "Sweater6",
    Sweater7 = "Sweater7",
    Sweater8 = "Sweater8",
    Sweater9 = "Sweater9",
    Sweater10 = "Sweater10",
    Sweater11 = "Sweater11",
    Sweater12 = "Sweater12",
}


type SweaterType_
    = {
    type: SweaterType
}

export const allSweaters: SweaterType[] = [
    SweaterType.Sweater1,
    SweaterType.Sweater2,
    SweaterType.Sweater3,
    SweaterType.Sweater4,
    SweaterType.Sweater5,
    SweaterType.Sweater6,
    SweaterType.Sweater7,
    SweaterType.Sweater8,
    SweaterType.Sweater9,
    SweaterType.Sweater10,
    SweaterType.Sweater11,
    SweaterType.Sweater12
]


export const sweaterToColor = (sweaterType: SweaterType): SweaterColor => {
    const sadType: SweaterType_ = {type: sweaterType} as SweaterType_;
    return match(sadType)
        .with({type: SweaterType.Sweater1}, () => SweaterColor.Blue)
        .with({type: SweaterType.Sweater2}, () => SweaterColor.Darkgreen)
        .with({type: SweaterType.Sweater3}, () => SweaterColor.White)
        .with({type: SweaterType.Sweater4}, () => SweaterColor.Red)
        .with({type: SweaterType.Sweater5}, () => SweaterColor.Green)
        .with({type: SweaterType.Sweater6}, () => SweaterColor.White)
        .with({type: SweaterType.Sweater7}, () => SweaterColor.Beige)
        .with({type: SweaterType.Sweater8}, () => SweaterColor.Lightgreen)
        .with({type: SweaterType.Sweater9}, () => SweaterColor.Maroon)
        .with({type: SweaterType.Sweater10}, () => SweaterColor.Green2)
        .with({type: SweaterType.Sweater11}, () => SweaterColor.Blue)
        .with({type: SweaterType.Sweater12}, () => SweaterColor.Lightblue)
        .exhaustive();
}

const sweaterToImageSrc = (type: SweaterType): string => {
    const sadType: SweaterType_ = {type: type} as SweaterType_;
    return match(sadType)
        .with({type: SweaterType.Sweater1}, () => "/sweater1.png")
        .with({type: SweaterType.Sweater2}, () => "/sweater2.png")
        .with({type: SweaterType.Sweater3}, () => "/sweater3.png")
        .with({type: SweaterType.Sweater4}, () => "/sweater4.png")
        .with({type: SweaterType.Sweater5}, () => "/sweater5.png")
        .with({type: SweaterType.Sweater6}, () => "/sweater6.png")
        .with({type: SweaterType.Sweater7}, () => "/sweater7.png")
        .with({type: SweaterType.Sweater8}, () => "/sweater8.png")
        .with({type: SweaterType.Sweater9}, () => "/sweater9.png")
        .with({type: SweaterType.Sweater10}, () => "/sweater10.png")
        .with({type: SweaterType.Sweater11}, () => "/sweater11.png")
        .with({type: SweaterType.Sweater12}, () => "/sweater12.png")
        .exhaustive();
}

interface SweaterProps {
    sweater: SweaterType,
    className: string,
    width: string,
    onDragStart: (sweater: SweaterType) => void,
    key?: number
}

export function Sweater({sweater, className, width, onDragStart, key}: SweaterProps) {
    const sweaterSrc = sweaterToImageSrc(sweater);
    return (
        <Image
            src={sweaterSrc}
            alt="Sweater Image"
            draggable
            width={634}
            height={514}
            key={key}
            style={{width: width, marginLeft: "-11.5vw"}}
            className={"cursor-grab " + className}
            onDragStart={(e) => onDragStart(sweater)}
        />
    );
}