import {ShelfWithInfo, FoundationDetails} from "@/app/components/ShelfWithInfo";
import {SweaterType} from "@/app/components/Sweater";

interface ShelvesProps {
    lefShelf: SweaterType[]
    middleLefShelf: SweaterType[]
    middleRightShelf: SweaterType[]
    rightShelf: SweaterType[]
    onDrop: (Self, MouseEvent) => void
    onDragOver: (MouseEvent) => void
    onInfoClick: (FoundationDetails) => void
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
                            onDragOver
                        }: ShelvesProps) {
    return (
        <div className="flex flex-col md:flex-row mt-32 justify-start md:justify-between">
            <ShelfWithInfo
                           linkUrl={"www.szentistvanzene.hu"}
                           name={"SZENT ISTVÁN KIRÁLY ZENEI ALAPÍTVÁNY"}
                           sweaters={lefShelf}
                           onDragOver={onDragOver}
                           onDrop={e => onDrop(SelfPosition.Left, e)}
                           onInfoClick={onInfoClick}
            />
            <ShelfWithInfo
                           linkUrl={"www.autizmus.hu"}
                           name={"AUTIZMUS ALAPÍTVÁNY"}
                           onDragOver={onDragOver}
                           onDrop={e => onDrop(SelfPosition.MiddleLeft, e)}
                           sweaters={middleLefShelf}
                           onInfoClick={onInfoClick}
            />
            <ShelfWithInfo
                           linkUrl={"www.elelmiszerbank.hu"}
                           name={"ÉLELMISZERBANK EGYESÜLET"}
                           sweaters={middleRightShelf}
                           onDragOver={onDragOver}
                           onDrop={e => onDrop(SelfPosition.MiddleRight, e)}
                           onInfoClick={onInfoClick}
            />
            <ShelfWithInfo
                           linkUrl={"www.lampas92.hu"}
                           name={"LÁMPÁS ’92 ALAPÍTVÁNY"}
                           sweaters={rightShelf}
                           onDragOver={onDragOver}
                           onDrop={e => onDrop(SelfPosition.Right, e)}
                           onInfoClick={onInfoClick}
            />
        </div>
    );
}