import filterReducer from "./reducers/filterReducer"
import anecdoteReducer, { setAnecdotes } from "./reducers/anecdoteReducer"
import { configureStore } from "@reduxjs/toolkit"
import notificationReducer from "./reducers/notificationReducer"
import anecdoteService from "./services/anecdotes"

const store = configureStore({
  reducer: {
    anecdotes: anecdoteReducer,
    filter: filterReducer,
    notification: notificationReducer,
  },
})

anecdoteService.getAll().then((anecdotes) => {
  store.dispatch(setAnecdotes(anecdotes))
})

export default store
