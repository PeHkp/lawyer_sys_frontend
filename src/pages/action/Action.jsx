import React, { useReducer } from "react";

const initialState = {
    email: '',
    password: '',
    errorMsg: ''
}

function reducer(state, action) {
    switch (action.type) {
        case 'update':
            return { ...state, ...action.data }
        case "clear":
            return initialState
        default:
            return new Error();
    }
}

export default function Action() {
    const [state, dispatch] = useReducer(reducer, initialState);

    const { email, password } = state
    const { errorMsg, ...data } = state

    return (
        <div>
            Ação
        </div>
    )
}
