import {CoatHangerImage} from "@/app/components/CoatHangerImage";
import {Sweater, SweaterType} from "@/app/components/Sweater";

interface CoatHangerWithSweatersProps  {
    sweaters: SweaterType[]
    onDragStart: (sweater: SweaterType) => void,
}

export function CoatHangerWithSweaters({sweaters, onDragStart}:CoatHangerWithSweatersProps) {
    return (
        <div className="w-full relative">
            <CoatHangerImage/>
            <div className="absolute left-0 right-0 bottom-0 flex flex-row items-start"
                 style={{paddingLeft: "14vw", paddingRight: "6.82vw", top: "10.9vw"}}>
                {sweaters.map(sweater =>
                    <Sweater sweater={sweater} className="" width="18.3376vw"
                             onDragStart={onDragStart}
                    />
                )}
            </div>
        </div>
    );
}