import SignInForm from "./signinview"
import { Suspense } from "react"
const signIn=()=>{


  return(
  <div>
    <Suspense>
      <SignInForm/>
    </Suspense>
  </div>)
}
export default signIn