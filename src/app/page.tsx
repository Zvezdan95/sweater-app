"use client"
import {ImageHeader} from "@/app/components/ImageHeader";
import {allSweaters, SweaterType} from "@/app/components/Sweater";
import {useReducer} from "react";
import {ResetButton} from "@/app/components/ResetButton";
import {SelfPosition, Shelves} from "@/app/components/Shelves";
import {CoatHangerWithSweaters} from "@/app/components/CoatHangerWithSweaters";

enum Msg {
    OnDragStart,
    OnDrop,
    OnReset
}

type AppState = {
    unassignedSweaters: SweaterType[]
    draggingSweater: SweaterType | null
    lefShelf: SweaterType[]
    middleLefShelf: SweaterType[]
    middleRightShelf: SweaterType[]
    rightShelf: SweaterType[]
}

const initialState: AppState = {
    unassignedSweaters: allSweaters,
    draggingSweater: null,
    lefShelf: [],
    middleLefShelf: [],
    middleRightShelf: [],
    rightShelf: []
};

type MsgPayload = {
    msg: Msg
    sweater: SweaterType | null
    shelf: SelfPosition | null
}

function reducer(prevState: AppState, payload: MsgPayload): AppState {
    switch (payload.msg) {

        case Msg.OnDragStart:
            console.log("OnDragStart", payload.sweater)
            return {...prevState, draggingSweater: payload.sweater};

        case Msg.OnDrop:
            const {draggingSweater} = prevState;
            if (draggingSweater != null) {
                const newState: AppState = {
                    ...prevState,
                    draggingSweater: null,
                    unassignedSweaters: prevState.unassignedSweaters.filter(sweater => sweater !== draggingSweater)
                };

                const pushIfUnique = (sweaterArr: SweaterType[], sweater: SweaterType) => {
                    if (sweaterArr.indexOf(sweater) === -1) {
                        sweaterArr.push(sweater);
                    }
                }
                switch (payload.shelf) {
                    case SelfPosition.Left:
                        pushIfUnique(newState.lefShelf, draggingSweater);
                        return newState;

                    case SelfPosition.MiddleLeft:
                        pushIfUnique(newState.middleLefShelf, draggingSweater);
                        return newState;

                    case SelfPosition.MiddleRight:
                        pushIfUnique(newState.middleRightShelf, draggingSweater);
                        return newState;

                    case SelfPosition.Right:
                        pushIfUnique(newState.rightShelf, draggingSweater);
                        return newState;
                    default:
                        return prevState;
                }
            }
            return prevState;

        case Msg.OnReset:
            return initialState;
        default:
            return prevState;
    }
}


export default function Home() {
    const [appState, dispatch] = useReducer(reducer, initialState);
    const state: AppState = appState;


    function handleReset(e: MouseEvent) {
        return dispatch({msg: Msg.OnReset, sweater: null});
    }

    function handleDragOver(e: MouseEvent) {
        e.preventDefault();
    }

    function handleDrop(shelf: SelfPosition, e: MouseEvent) {
        e.stopPropagation();
        e.preventDefault();
        dispatch({msg: Msg.OnDrop, shelf: shelf});
    }

    function handleDragStart(sweater: SweaterType) {
        dispatch({msg: Msg.OnDragStart, sweater: sweater});
    }

    return (
        <main className="flex min-h-screen flex-col bg-custom-blue-100 items-center">
            <ImageHeader/>
            <CoatHangerWithSweaters sweaters={state.unassignedSweaters} onDragStart={handleDragStart}/>
            <Shelves
                lefShelf={state.lefShelf}
                middleLefShelf={state.middleLefShelf}
                middleRightShelf={state.middleRightShelf}
                rightShelf={state.rightShelf}
                onDragOver={handleDragOver}
                onDrop={handleDrop}
            />
            <ResetButton onClick={handleReset}/>
        </main>
    );
}
