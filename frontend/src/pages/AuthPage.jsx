/* eslint-disable no-unused-vars */
import { useRecoilState } from "recoil";
import LoginCard from "../components/LoginCard";
import SignupCard from "../components/SignupCard";
import authScreenAtom from "../atoms/authAtom";
import userAtom from "../atoms/userAtom";
import { useNavigate } from "react-router-dom";

const AuthPage = () => {
    const [authScreenState] = useRecoilState(authScreenAtom);
    const [user, setUser] = useRecoilState(userAtom);
    const navigate = useNavigate();

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
            navigate("/suggested-users");
        } catch (error) {
            // Handle error
        }
    };

    return (
        <>
            {authScreenState === "login" ? (
                <LoginCard />
            ) : (
                <SignupCard onSignup={handleSignup} />
            )}
        </>
    );
};

export default AuthPage;