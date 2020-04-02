import { combineReducers } from 'redux'

const user = (state = null, action) => {
  switch (action.type) {
    case 'SET_USER':
      return {
        ...state,
        ...action.payload,
      }
    case 'CLEAR_USER':
      return null
    default:
      return state
  }
}

export default combineReducers({
  user,
})