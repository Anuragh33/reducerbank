import { combineReducers, createStore } from "redux"

const INITIALSTATE_ACCOUNT = {
  balance: 0,
  loan: 0,
  loanPurpose: "",
}

const INITIALSTATE_CUSTOMER = {
  name: "",
  nationalID: "",
  createdAt: "",
}

function reducerAccount(state = INITIALSTATE_ACCOUNT, action) {
  switch (action.type) {
    case "account/deposit":
      return {
        ...state,
        balance: state.balance + action.payload,
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

    default:
      return state
  }
}

function deposit(amount) {
  return { type: "account/deposit", payload: amount }
}

function withdraw(amount) {
  return { type: "account/withdraw", payload: amount }
}

function loan(amount, purpose) {
  return {
    type: "account/loan",
    payload: {
      amount: amount,
      loanPurpose: purpose,
    },
  }
}

function payloan() {
  return { type: "account/payloan" }
}

function reducerCustomer(state = INITIALSTATE_CUSTOMER, action) {
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

function createCustomer(name, nationalID) {
  return {
    type: "customer/createCustomer",
    payload: {
      name,
      nationalID,
      createdAt: new Date().toISOString(),
    },
  }
}

function updateName(name) {
  return {
    type: "customer/updateName",
    payloan: name,
  }
}

const rootReducer = combineReducers({
  account: reducerAccount,
  customer: reducerCustomer,
})

const store = createStore(rootReducer)

store.dispatch(deposit(500))
store.dispatch(withdraw(200))

store.dispatch(loan(20000, "to buy a phone"))

store.dispatch(payloan())

store.dispatch(createCustomer("Anuragh", "A5123"))

console.log(store.getState())
