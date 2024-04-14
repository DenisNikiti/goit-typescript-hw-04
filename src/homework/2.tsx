import React, { useReducer } from "react";
import { PayloadAction } from "@reduxjs/toolkit";
type State = {
  isRequestInProgress: boolean;
  requestStep: string;
};


enum Steps  {
  start = "start",
  idle = "idle",
  
  pending = "pending",
  finished = "finished"
 }

 type Action = 
  | { type: 'START_REQUEST' }
  | { type: 'PENDING_REQUEST' }
  | { type: 'FINISH_REQUEST' }
  | { type: 'RESET_REQUEST' }


const initialState: State = {
  isRequestInProgress: false,
  requestStep: Steps.idle
};

function requestReducer(state: State, action: Action): State {
  switch (action.type) {
    case "START_REQUEST":
      return { ...state, isRequestInProgress: true, requestStep: "start" };
    case "PENDING_REQUEST":
      return { ...state, isRequestInProgress: true, requestStep: "pending" };
    case "FINISH_REQUEST":
      return { ...state, isRequestInProgress: false, requestStep: "finished" };
    case "RESET_REQUEST":
      return { ...state, isRequestInProgress: false, requestStep: "idle" };
    default:
      return state;
  }
}

export function RequestComponent() {
  const [requestState, requestDispatch] = useReducer(
    requestReducer,
    initialState
  );

  const startRequest = () => {
    requestDispatch({ payload:void, type: "START_REQUEST"  } );
    // Імітуємо запит до сервера
    setTimeout(() => {
      requestDispatch({ payload:void, type: "PENDING_REQUEST", });
      // Імітуємо отримання відповіді від сервера
      setTimeout(() => {
        requestDispatch({payload:void, type: "FINISH_REQUEST" });
      }, 2000);
    }, 2000);
  };

  const resetRequest = ():void => {
    requestDispatch({ payload:void, type: "RESET_REQUEST" });
  };

  return (
    <div>
      <button onClick={startRequest}>Почати запит</button>
      <button onClick={resetRequest}>Скинути запит</button>
      <p>Стан запиту: {requestState.requestStep}</p>
    </div>
  );
}

export default RequestComponent;
