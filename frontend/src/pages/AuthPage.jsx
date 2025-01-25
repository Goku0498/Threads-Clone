/* eslint-disable no-unused-vars */
import { useRecoilState } from "recoil";
import userAtom from "../atoms/userAtom";
import LoginCard from "../components/LoginCard";
import SignupCard from "../components/SignupCard";
import authScreenAtom from "../atoms/authAtom";

const AuthPage = () => {
    const [authScreenState] = useRecoilState(authScreenAtom);
    const [user, setUser] = useRecoilState(userAtom);

    const handleLogin = async (credentials) => {
        try {
            const res = await fetch("/api/users/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(credentials),
            });
            const data = await res.json();
            if (data.error) {
                // Handle error
                return;
            }
            setUser(data);
        } catch (error) {
            // Handle error
        }
    };

    const handleSignup = async (userInfo) => {
        try {
            const res = await fetch("/api/users/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(userInfo),
            });
            const data = await res.json();
            if (data.error) {
                // Handle error
                return;
            }
            setUser(data);
        } catch (error) {
            // Handle error
        }
    };

    return (
        <>
            {authScreenState === "login" ? (
                <LoginCard onLogin={handleLogin} />
            ) : (
                <SignupCard onSignup={handleSignup} />
            )}
        </>
    );
};

export default AuthPage;