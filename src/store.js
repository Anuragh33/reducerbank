import reducerAccount from "./Features/accounts/accountSlice"
import reducerCustomer from "./Features/Customers/customerSlice"

import { configureStore } from "@reduxjs/toolkit"

const store = configureStore({
  reducer: {
    account: reducerAccount,
    customer: reducerCustomer,
  },
})

export default store
