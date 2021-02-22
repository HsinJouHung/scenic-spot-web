import * as types from './types'

const initState = {
    scenicSpotList: []
}

const reducer = (state = initState, {type, payload}) => {
    switch(type) {
        case types.SET_SCENIC_SPOT_LIST:{
            let newlist = payload
            return {
                ...state,
                scenicSpotList: newlist
            }
        }
        default:
            return state
    }
}

export default reducer