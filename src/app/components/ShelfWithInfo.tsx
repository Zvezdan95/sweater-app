import {InfoImage} from "@/app/components/InfoImage";
import {FoundationLink, FoundationLinkType} from "@/app/components/FoundationLink";
import {Shelf} from "@/app/components/Shelf";
import {SweaterType} from "@/app/components/Sweater";

interface ShelfProps {
    counter: number,
    name: string,
    linkUrl: string,
    sweaters: SweaterType[]
    onDrop: (MouseEvent) => void
    onDragOver: (MouseEvent) => void
}

export function ShelfWithInfo({counter, name, linkUrl, sweaters, onDrop, onDragOver}: ShelfProps) {
    return (
        <div className="flex flex-row md:flex-col font-bold gap-3 items-center justify-between " onDrop={onDrop}
             onDragOver={onDragOver}>
            <div className="flex flex-row gap-x-6 md:hidden">
                <InfoImage addedClass=""/>
                <FoundationLink linkUrl={linkUrl}
                                linkType={FoundationLinkType.IconLink}/>
            </div>
            <span className="text-8xl text-white">{String(Math.round(counter))}</span>
            <span className="text-2xle text-custom-blue-300 text-center">{String(name)}</span>
            <div className="rounded-xl bg-custom-blue-500 relative p-2 pl-10 hidden md:block lg:block">
                <FoundationLink linkUrl={linkUrl}
                                linkType={FoundationLinkType.TextLink}/>
                <InfoImage addedClass="absolute left-1 top-1"/>
            </div>
            <Shelf
                classes="md:order-first lg:order-first" sweaters={sweaters}
            />
        </div>
    );
}