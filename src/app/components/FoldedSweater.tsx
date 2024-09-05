import Image from "next/image";
import {sweaterToColor, SweaterType} from "@/app/components/Sweater";

export enum SweaterColor {
    Beige,
    Blue,
    Darkgreen,
    Green2,
    Green,
    Lightblue,
    Lightgreen,
    Maroon,
    Red,
    White,
}

interface FoldedSweaterProps {
    sweater: SweaterType
    className: string
    key?: number
}

export function FoldedSweater({sweater, className, key}: FoldedSweaterProps) {
    const color = sweaterToColor(sweater);
    return (
        <img
            src={sweaterColorToImage(color)}
            alt="Folded Sweater Image"
            style={{width:"50%"}}
            key={key}
            className={className}
        />
    );
}

export  function sweaterColorToImage(color: SweaterColor): string {
    switch (color) {
        case SweaterColor.Beige :
            return "/sweater-beige.png";

        case SweaterColor.Blue :
            return "/sweater-blue.png";

        case SweaterColor.Darkgreen :
            return "/sweater-darkgreen.png";

        case SweaterColor.Green2 :
            return "/sweater-green2.png";

        case SweaterColor.Green :
            return "/sweater-green.png";

        case SweaterColor.Lightblue :
            return "/sweater-lightblue.png";

        case SweaterColor.Lightgreen :
            return "/sweater-lightgreen.png";

        case SweaterColor.Maroon :
            return "/sweater-maroon.png";

        case SweaterColor.Red :
            return "/sweater-red.png";

        case SweaterColor.White :
            return "/sweater-white.png";
        default:
            return "";

    }
}