import {ShelfWithInfo, FoundationDetails} from "@/app/components/ShelfWithInfo";
import {SweaterType} from "@/app/components/Sweater";
import {DragEventHandler} from "react";

interface ShelvesProps {
    lefShelf: SweaterType[]
    middleLefShelf: SweaterType[]
    middleRightShelf: SweaterType[]
    rightShelf: SweaterType[]
    onDrop: (shelf: SelfPosition) => DragEventHandler<HTMLDivElement>,
    // onDragOver: DragEventHandler<HTMLDivElement>,
    onInfoClick: (foundationDetails:FoundationDetails) => void
}

export enum SelfPosition {
    Left,
    MiddleLeft,
    MiddleRight,
    Right
}

export function Shelves({
                            onInfoClick,
                            lefShelf,
                            middleLefShelf,
                            middleRightShelf,
                            rightShelf,
                            onDrop,
                            // onDragOver
                        }: ShelvesProps) {
    return (
        <div className="flex flex-col md:flex-row 16 justify-start md:justify-between">
            <ShelfWithInfo
                linkUrl={"www.szentistvanzene.hu"}
                name={"SZENT ISTVÁN KIRÁLY ZENEI ALAPÍTVÁNY"}
                sweaters={lefShelf}
                // onDragOver={onDragOver}
                onDrop={e => onDrop(SelfPosition.Left)}
                onInfoClick={onInfoClick}
            />
            <ShelfWithInfo
                linkUrl={"www.autizmus.hu"}
                name={"AUTIZMUS ALAPÍTVÁNY"}
                // onDragOver={onDragOver}
                onDrop={e => onDrop(SelfPosition.MiddleLeft)}
                sweaters={middleLefShelf}
                onInfoClick={onInfoClick}
            />
            <ShelfWithInfo
                linkUrl={"www.elelmiszerbank.hu"}
                name={"ÉLELMISZERBANK EGYESÜLET"}
                sweaters={middleRightShelf}
                // onDragOver={onDragOver}
                onDrop={e => onDrop(SelfPosition.MiddleRight)}
                onInfoClick={onInfoClick}
            />
            <ShelfWithInfo
                linkUrl={"www.lampas92.hu"}
                name={"LÁMPÁS ’92 ALAPÍTVÁNY"}
                sweaters={rightShelf}
                // onDragOver={onDragOver}
                onDrop={e => onDrop(SelfPosition.Right)}
                onInfoClick={onInfoClick}
            />
        </div>
    );
}