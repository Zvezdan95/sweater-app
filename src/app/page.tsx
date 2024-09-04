"use client"
import {ImageHeader} from "@/app/components/ImageHeader";
import {allSweaters, SweaterType} from "@/app/components/Sweater";
import React, {useEffect, useReducer} from "react";
import {ResetButton} from "@/app/components/ResetButton";
import {SelfPosition, Shelves} from "@/app/components/Shelves";
import {CoatHangerWithSweaters} from "@/app/components/CoatHangerWithSweaters";
import {FoundationDetails} from "@/app/components/ShelfWithInfo";

enum Msg {
    OnDragStart,
    OnDrop,
    OnReset,
    OnModalClose,
    OnModalOpen,
    OnReceiveLastRequestAt
}

type AppState = {
    unassignedSweaters: SweaterType[]
    draggingSweater: SweaterType | null
    lefShelf: SweaterType[]
    middleLefShelf: SweaterType[]
    middleRightShelf: SweaterType[]
    rightShelf: SweaterType[]
    foundationDetails: FoundationDetails | null
    lastRequestAt: number | null
}

const initialState = (): AppState => {
    return {
        unassignedSweaters: allSweaters,
        draggingSweater: null,
        lefShelf: [],
        middleLefShelf: [],
        middleRightShelf: [],
        rightShelf: [],
        foundationDetails: null,
        lastRequestAt: null
    }
};

type MsgPayload = {
    msg: Msg
    sweater: SweaterType | null
    shelf: SelfPosition | null
    foundationDetails: FoundationDetails | null
    lastRequestAt: number | null
}

function reducer(prevState: AppState, payload: MsgPayload): AppState {
    console.log("prevState payload.msg", payload.msg)
    switch (payload.msg) {

        case Msg.OnDragStart:
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
            return {...initialState(), lastRequestAt: prevState.lastRequestAt};

        case Msg.OnModalClose:
            return {...prevState, foundationDetails: null};

        case Msg.OnModalOpen:
            return {...prevState, foundationDetails: payload.foundationDetails};

        case Msg.OnReceiveLastRequestAt:
            console.log("OnReceiveLastRequestAt", payload.lastRequestAt)
            return {...prevState, lastRequestAt: payload.lastRequestAt};

        default:
            return prevState;
    }
}


export default function Home() {
    const [appState, dispatch] = useReducer(reducer, {...initialState()});
    const state: AppState = appState;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('/api/get-time-of-last-request'); // Replace with your API endpoint
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const jsonData = await response.json();
                console.log(jsonData);
                dispatch({msg: Msg.OnReceiveLastRequestAt, lastRequestAt: jsonData.time})
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    function handleReset(e: React.MouseEvent) {
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

    function handleOnSave(e: React.MouseEvent) {
        saveCurrentShelfStacking(state)
            .then((res) =>
                dispatch({msg: Msg.OnReceiveLastRequestAt, lastRequestAt: Date.now()}))
            .catch((err) => console.log(err));
    }

    function handleModalClose() {
        dispatch({msg: Msg.OnModalClose});
    }

    function handleModalOpen(foundationDetails: FoundationDetails) {
        dispatch({msg: Msg.OnModalOpen, foundationDetails: foundationDetails});
    }

    return (
        <main className="flex min-h-screen flex-col bg-custom-blue-100 items-center relative">
            <ImageHeader/>
            <CoatHangerWithSweaters
                sweaters={state.unassignedSweaters}
                onDragStart={handleDragStart}
                onSave={handleOnSave}
                lastRequestAt={state.lastRequestAt}
            />
            <Shelves
                lefShelf={state.lefShelf}
                middleLefShelf={state.middleLefShelf}
                middleRightShelf={state.middleRightShelf}
                rightShelf={state.rightShelf}
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                onInfoClick={handleModalOpen}
            />
            <ResetButton onClick={handleReset}/>
            {state.foundationDetails && <div className={"fixed inset-0 flex items-center justify-center p-4"}>
                <div
                    className="flex flex-col items-center gap-y-4 p-4 rounded-md bg-custom-blue-500/90 overflow-hidden relative">
                    <div className="text-4xl"> {state.foundationDetails.name}</div>
                    <div className="text-lg"> {state.foundationDetails.description} </div>
                    <button
                        className="absolute right-2 top-2 rounded-full bg-custom-blue-500 p-1 px-2 font-bold"
                        onClick={handleModalClose}
                    >X
                    </button>

                </div>
            </div>}

        </main>
    );
}

async function saveCurrentShelfStacking(state: AppState) {
    const values: string[] = [];

    values.push(state.lefShelf.length.toString());
    values.push(state.middleLefShelf.length.toString());
    values.push(state.middleRightShelf.length.toString());
    values.push(state.rightShelf.length.toString());

    return await fetch('/api/create-new-sheet-row', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json', // Adjust if sending different data formats
        },
        body: JSON.stringify({
            // Your data to send in the POST request
            values: values
        }),
    });
}
