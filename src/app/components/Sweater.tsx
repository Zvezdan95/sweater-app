import {SweaterColor} from "@/app/components/FoldedSweater";
import {match} from 'ts-pattern';
import Image from "next/image";

export enum SweaterType {
    Sweater1,
    Sweater2,
    Sweater3,
    Sweater4,
    Sweater5,
    Sweater6,
    Sweater7,
    Sweater8,
    Sweater9,
    Sweater10,
    Sweater11,
    Sweater12
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

export const sweaterToColor = (type: SweaterType): SweaterColor =>
    match(type)
        .with(SweaterType.Sweater1, () => SweaterColor.Blue)
        .with(SweaterType.Sweater2, () => SweaterColor.Darkgreen)
        .with(SweaterType.Sweater3, () => SweaterColor.White)
        .with(SweaterType.Sweater4, () => SweaterColor.Red)
        .with(SweaterType.Sweater5, () => SweaterColor.Green)
        .with(SweaterType.Sweater6, () => SweaterColor.White)
        .with(SweaterType.Sweater7, () => SweaterColor.Beige)
        .with(SweaterType.Sweater8, () => SweaterColor.Lightgreen)
        .with(SweaterType.Sweater9, () => SweaterColor.Maroon)
        .with(SweaterType.Sweater10, () => SweaterColor.Green2)
        .with(SweaterType.Sweater11, () => SweaterColor.Blue)
        .with(SweaterType.Sweater12, () => SweaterColor.Lightblue)
        .exhaustive();

const sweaterToImageSrc = (type: SweaterType): string =>
    match(type)
        .with(SweaterType.Sweater1, () => "/sweater1.png")
        .with(SweaterType.Sweater2, () => "/sweater2.png")
        .with(SweaterType.Sweater3, () => "/sweater3.png")
        .with(SweaterType.Sweater4, () => "/sweater4.png")
        .with(SweaterType.Sweater5, () => "/sweater5.png")
        .with(SweaterType.Sweater6, () => "/sweater6.png")
        .with(SweaterType.Sweater7, () => "/sweater7.png")
        .with(SweaterType.Sweater8, () => "/sweater8.png")
        .with(SweaterType.Sweater9, () => "/sweater9.png")
        .with(SweaterType.Sweater10, () => "/sweater10.png")
        .with(SweaterType.Sweater11, () => "/sweater11.png")
        .with(SweaterType.Sweater12, () => "/sweater12.png")
        .exhaustive();

interface SweaterProps {
    sweater: SweaterType
    className: string
    width: string
    onDragStart: (SweaterType)=> void
}

export function Sweater({sweater, className, width, onDragStart}: SweaterProps) {
    const sweaterSrc = sweaterToImageSrc(sweater);
    return (
        <Image
            src={sweaterSrc}
            alt="Sweater Image"
            draggable
            width={634}
            height={514}
            style={{width:width, marginLeft: "-11.5vw"}}
            className={"cursor-grab "+className}
            onDragStart={(e) => onDragStart(sweater)}
        />
    );
}