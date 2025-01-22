'use client'
import { createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
import { useAuth } from "@/app/lib/AuthContext";
import { useState } from "react";
import { auth } from "@/app/lib/firebase";
import { useRouter } from "next/navigation";

function Register() {
    const { user } = useAuth();
    const router=useRouter();
    

    const [registerError, setRegisterError] = useState(""); // stan błędów rejestracji
    const [showPassword, setShowPassword] = useState(false); // kontrola widoczności hasła
    const [showRepeatPassword, setShowRepeatPassword] = useState(false); // kontrola widoczności powtórzonego hasła

    if (user) {
        return null;
    }
    const onSubmit = (data) => {
        data.preventDefault();
        const email = data.target['email'].value;
        const password = data.target['password'].value;

        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                //console.log("User registered!");
                sendEmailVerification(auth.currentUser)
                    .then(() => {
                        console.log("Email verification sent!");
                        router.push("/user/verify");
                    });
            })
            .catch((error) => {
                setRegisterError(error.message);
                console.dir(error);
            });
    };

    return (
        <div className="flex flex-col max-w-md p-6 rounded-md sm:p-10 dark:bg-gray-50 dark:text-gray-800">
            <div className="mb-8 text-center">
                <h1 className="my-3 text-4xl font-bold">Register</h1>
                <p className="text-sm dark:text-gray-600">Register to create an Account</p>
            </div>
            <form onSubmit={onSubmit} className="space-y-12">
                <div className="space-y-4">
                    <div>
                        <label htmlFor="email" className="block mb-2 text-sm">Email address</label>
                        <input
                            type="email"
                            name="email"
                            id="email"
                            placeholder="leroy@jenkins.com"
                            className="w-full px-3 py-2 border rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800"
                        />
                    </div>
                    <div>
                        <div className="flex justify-between mb-2">
                            <label htmlFor="password" className="text-sm">Password</label>
                        </div>
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                name="password"
                                id="password"
                                placeholder="*****"
                                className="w-full px-3 py-2 border rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute inset-y-0 right-3 flex items-center text-sm"
                            >
                                {showPassword ? "Hide" : "Show"}
                            </button>
                        </div>
                    </div>
                    <div>
                        <div className="flex justify-between mb-2">
                            <label htmlFor="repeat-password" className="text-sm">Repeat Password</label>
                        </div>
                        <div className="relative">
                            <input
                                type={showRepeatPassword ? "text" : "password"}
                                name="repeat-password"
                                id="repeat-password"
                                placeholder="*****"
                                className="w-full px-3 py-2 border rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800"
                            />
                            <button
                                type="button"
                                onClick={() => setShowRepeatPassword(!showRepeatPassword)}
                                className="absolute inset-y-0 right-3 flex items-center text-sm"
                            >
                                {showRepeatPassword ? "Hide" : "Show"}
                            </button>
                        </div>
                    </div>
                </div>
                {registerError &&(<div className="text-red-500 text-sm">{registerError}</div>)}
                <div className="space-y-2">
                    <div>
                        <button type="submit" className="btn w-full px-8 py-3 bg-slate-600 text-white">
                            Register
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default Register;
