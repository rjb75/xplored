import { firebaseAuth } from "../firebase/FirebaseConfig"
import { clearCookie } from "./CookieUtils"

// helper function to handle logout
export const handleLogout = () => {
    firebaseAuth.signOut().then(() => clearCookie())
}