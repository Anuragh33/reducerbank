import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  fullName: "",
  nationalID: "",
  createdAt: "",
}

const customerSlice = createSlice({
  name: "customer",
  initialState,
  reducers: {
    createCustomer: {
      prepare(fullName, nationalID) {
        return {
          payload: {
            fullName,
            nationalID,
            createdAt: new Date().toISOString(),
          },
        }
      },
      reducer(state, action) {
        state.fullName = action.payload.fullName
        state.nationalID = action.payload.nationalID
        state.createdAt = action.payload.createdAt
      },
    },
    updateName(state, action) {
      state.fullName = action.payload
    },
  },
})

export const { createCustomer, updateName } = customerSlice.actions

export default customerSlice.reducer

/*
export default function reducerCustomer(state = INITIALSTATE_CUSTOMER, action) {
  switch (action.type) {
    case "customer/createCustomer":
      return {
        ...state,
        name: action.payload.name,
        nationalID: action.payload.nationalID,
        createdAt: action.payload.createdAt,
      }
    case "customer/updateName":
      return {
        ...state,
        name: action.payload,
      }
    default:
      return state
  }
}

export function createCustomer(name, nationalID) {
  return {
    type: "customer/createCustomer",
    payload: {
      name,
      nationalID,
      createdAt: new Date().toISOString(),
    },
  }
}

export function updateName(name) {
  return {
    type: "customer/updateName",
    payloan: name,
  }
}
*/
