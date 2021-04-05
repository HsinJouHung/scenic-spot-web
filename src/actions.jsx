import * as types from './types'

export function setScenicSpotList(data) {
    return {
        type: types.SET_SCENIC_SPOT_LIST,
        payload: data
    }
}

export function addScenicSpotList(data) {
    return {
        type: types.ADD_SCENIC_SPOT_LIST,
        payload: data
    }
}

export function setCurrCity(city) {
    return {
        type: types.SET_CURR_CITY,
        payload: city
    }
}