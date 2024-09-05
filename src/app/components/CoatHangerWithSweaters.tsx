import {CoatHangerImage} from "@/app/components/CoatHangerImage";
import {Sweater, SweaterType} from "@/app/components/Sweater";
import {SaveButton} from "@/app/components/SaveButton";
import React from "react";

interface CoatHangerWithSweatersProps {
    sweaters: SweaterType[]
    onDragStart: (sweater: SweaterType) => void
    onSave: (e: React.MouseEvent) => void
    lastRequestAt: number | null
}

export function CoatHangerWithSweaters({sweaters, onDragStart, onSave, lastRequestAt}: CoatHangerWithSweatersProps) {
    return (
        <div className="w-full relative overflow-hidden">
            <CoatHangerImage/>
            <div className="absolute left-0 right-0 bottom-0 flex flex-row items-start"
                 style={{paddingLeft: "14vw", paddingRight: "6.82vw", top: "10.9vw"}}>
                {sweaters.map((sweater, index) =>
                    <Sweater key={index} sweater={sweater}
                             className=""
                             width="18.3376vw"
                             onDragStart={onDragStart}
                    />
                )}
            </div>
            <SaveButton onClick={onSave} isVisible={sweaters.length === 0} lastRequestAt={lastRequestAt} />
        </div>
    );
}