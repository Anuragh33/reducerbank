import { useSelector } from "react-redux"
import CreateCustomer from "./Features/Customers/CreateCustomer"
import Customer from "./Features/Customers/Customer"
import AccountOperations from "./Features/accounts/AccountOperations"
import BalanceDisplay from "./Features/accounts/BalanceDisplay"

function App() {
  const fullName = useSelector((state) => state.customer.fullName)

  return (
    <div>
      <h1>🏦 The React-Redux Bank ⚛️</h1>
      {fullName === "" ? (
        <CreateCustomer />
      ) : (
        <>
          <Customer />
          <AccountOperations />
          <BalanceDisplay />
        </>
      )}
    </div>
  )
}

export default App
