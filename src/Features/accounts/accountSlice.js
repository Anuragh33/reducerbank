import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  balance: 0,
  loan: 0,
  loanPurpose: "",
  isLoading: false,
}

const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    deposit(state, action) {
      state.balance = state.balance + action.payload
      state.isLoading = false
    },
    withdraw(state, action) {
      state.balance = state.balance - action.payload
    },
    loan: {
      prepare(amount, purpose) {
        return {
          payload: { amount, purpose },
        }
      },

      reducer(state, action) {
        if (state.loan > 0) return
        state.loan = action.payload.amount
        state.loanPurpose = action.payload.loanPurpose
        state.balance = state.balance + action.payload.amount
      },
    },
    payloan(state, action) {
      state.balance = state.balance - state.loan
      state.loan = 0
      state.loanPurpose = ""
    },
    convertingCurrency(state) {
      state.isLoading = true
    },
  },
})

export const { withdraw, loan, payloan } = accountSlice.actions

export function deposit(amount, currency) {
  if (currency === "USD") return { type: "account/deposit", payload: amount }

  return async function (dispatch, getState) {
    dispatch({ type: "account/convertingCurrency" })

    const res = await fetch(
      `https://api.frankfurter.app/latest?amount=${amount}&from=${currency}&to=USD`
    )
    const data = await res.json()
    const convertedAmount = data.rates.USD

    dispatch({ type: "account/deposit", payload: convertedAmount })
  }
}

export default accountSlice.reducer

/////////////////////////////////////////////////////////////////////

/*

OLD REDUX METHOD

export default function reducerAccount(state = INITIALSTATE_ACCOUNT, action) {
  switch (action.type) {
    case "account/deposit":
      return {
        ...state,
        balance: state.balance + action.payload,
        isLoading: false,
      }
    case "account/withdraw":
      return {
        ...state,
        balance: state.balance - action.payload,
      }
    case "account/loan":
      if (state.loan > 0) return
      return {
        ...state,
        loan: action.payload.amount,
        loanPurpose: action.payload.loanPurpose,
        balance: state.balance + action.payload.amount,
      }
    case "account/payloan":
      return {
        ...state,
        loan: 0,
        loanPurpose: "",
        balance: state.balance - state.loan,
      }
    case "account/convertingCurrency":
      return {
        ...state,
        isLoading: true,
      }

    default:
      return state
  }
}



export function withdraw(amount) {
  return { type: "account/withdraw", payload: amount }
}

export function loan(amount, purpose) {
  return {
    type: "account/loan",
    payload: {
      amount: amount,
      loanPurpose: purpose,
    },
  }
}

export function payloan() {
  return { type: "account/payloan" }
}
*/
