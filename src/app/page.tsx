"use client"
import {ImageHeader} from "@/app/components/ImageHeader";
import {CoatHangerImage} from "@/app/components/CoatHangerImage";
import {allSweaters, Sweater, SweaterType} from "@/app/components/Sweater";
import {useReducer} from "react";
import {ShelfWithInfo} from "@/app/components/ShelfWithInfo";

enum Msg {
    OnSweaterMouseDown,
    OnSweaterMouseUp
}

function reducer(prevState, action) {
    switch (action.__type) {
        case Msg.OnSweaterMouseUp:
            console.log("OnSweaterMouseUp");
            return {
                ...prevState, draggingSweater: null
            };

        case Msg.OnSweaterMouseDown:
            if (action.sweater) {
                console.log("OnSweaterMouseDown", action.sweater);
                // return {
                //     ...prevState,
                //     unassignedSweaters: prevState.unassignedSweaters.filter(sweater => sweater !== action.sweater)
                // }
                return {
                    ...prevState, draggingSweater: action.sweater
                }
            }
            return prevState;

        default:
            return prevState;
    }
}


export default function Home() {
    const [appState, dispatch] = useReducer(reducer, {unassignedSweaters: allSweaters, draggingSweater: null});

    function handleSweaterMouseDown(sweater: SweaterType) {
        return dispatch({__type: Msg.OnSweaterMouseDown, sweater: sweater});
    }

    function handleSweaterMouseUp() {
        return dispatch({__type: Msg.OnSweaterMouseUp, sweater: null})
    }

    return (
        <main className="flex min-h-screen flex-col bg-custom-blue-100">
            <ImageHeader/>
            <div className="w-full relative">
                <CoatHangerImage/>
                <div className={"absolute top-0 left-0 right-0 "} style={{height: 170}}></div>
                <div className="absolute left-0 right-0 bottom-0 flex flex-row items-start"
                     style={{paddingLeft: "14vw", paddingRight: "6.82vw", top: "10.9vw"}}>
                    {appState.unassignedSweaters.map(sweater =>
                        <Sweater sweater={sweater} className="" width="18.3376vw"
                                 onMouseDown={handleSweaterMouseDown}
                                 onMouseUp={handleSweaterMouseUp}/>
                    )}

                </div>
            </div>
            <div className="flex flex-col md:flex-row mt-32 justify-start md:justify-between" >
                <ShelfWithInfo counter={0}
                               linkUrl={"www.szentistvanzene.hu"}
                               name={"SZENT ISTVÁN KIRÁLY ZENEI ALAPÍTVÁNY"}
                               // sweaters={allSweaters}
                               sweaters={[]}
                />
                <ShelfWithInfo counter={0}
                               linkUrl={"www.autizmus.hu"}
                               name={"AUTIZMUS ALAPÍTVÁNY"}
                               // sweaters={allSweaters}
                               sweaters={[]}
                />
                <ShelfWithInfo counter={0}
                               linkUrl={"www.elelmiszerbank.hu"}
                               name={"ÉLELMISZERBANK EGYESÜLET"}
                               // sweaters={allSweaters}
                               sweaters={[]}
                />
                <ShelfWithInfo counter={0}
                               linkUrl={"www.lampas92.hu"}
                               name={"LÁMPÁS ’92 ALAPÍTVÁNY"}
                               // sweaters={allSweaters}
                               sweaters={[]}
                />
            </div>
            <div className="h-64"></div>
        </main>
    );
}
