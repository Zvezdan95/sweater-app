import {InfoImage} from "@/app/components/InfoImage";
import {FoundationLink, FoundationLinkType} from "@/app/components/FoundationLink";
import {Shelf} from "@/app/components/Shelf";
import {SweaterType} from "@/app/components/Sweater";

export  type FoundationDetails = {
    name: string
    description: string
}

interface ShelfProps {
    counter: number,
    name: string,
    linkUrl: string,
    sweaters: SweaterType[]
    onDrop: (MouseEvent) => void
    onDragOver: (MouseEvent) => void
    onInfoClick: (FoundationDetails) => void
}

export function ShelfWithInfo({counter, name, linkUrl, sweaters, onDrop, onDragOver, onInfoClick}: ShelfProps) {
    const foundationDetails: FoundationDetails = {
        name: name,
        description: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugait "
    };
    const infoClick = () => onInfoClick(foundationDetails);

    return (
        <div className="flex flex-row md:flex-col font-bold gap-3 items-center justify-between " onDrop={onDrop}
             onDragOver={onDragOver}>
            <div className="flex flex-row gap-x-6 md:hidden">
                <InfoImage addedClass="" onClick={infoClick}/>
                <FoundationLink linkUrl={linkUrl}
                                linkType={FoundationLinkType.IconLink}/>
            </div>
            <span className="text-8xl text-white">{String(sweaters.length)}</span>
            <span className="text-2xle text-custom-blue-300 text-center">{String(name)}</span>
            <div className="rounded-xl bg-custom-blue-500 relative p-2 pl-10 hidden md:block lg:block">
                <FoundationLink linkUrl={linkUrl}
                                linkType={FoundationLinkType.TextLink}/>
                <InfoImage addedClass="absolute left-1 top-1" onClick={infoClick}/>
            </div>
            <Shelf
                classes="md:order-first lg:order-first" sweaters={sweaters}
            />
        </div>
    );
}