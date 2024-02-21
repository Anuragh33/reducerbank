import { applyMiddleware, combineReducers, createStore } from "redux"
import reducerAccount from "./Features/accounts/accountSlice"
import reducerCustomer from "./Features/Customers/customerSlice"
import { thunk } from "redux-thunk"
import { composeWithDevTools } from "@redux-devtools/extension"

const rootReducer = combineReducers({
  account: reducerAccount,
  customer: reducerCustomer,
})

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
)

export default store
