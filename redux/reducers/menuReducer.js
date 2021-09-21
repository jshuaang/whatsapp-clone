const initialState = {
    menu:'chats'
}

const menuReducer = (state = initialState, action) => {
    switch(action.type) {
        case "CHANGE_MENU":
            return {
                ...state,
                menu: action.payload
            }
            break
        default:
            return state
    }
}

export default menuReducer