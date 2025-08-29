'use client'
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Login() {
    const router = useRouter();
    const [text, setText] = useState("");
    const [pwd, setPwd] = useState("");

    // Check for for the Session Storage key of "IsLoggedIn"
    useEffect(() => {
      const sessionExists = sessionStorage.getItem("IsLoggedIn");

      if (sessionExists === null)
      {
        console.log("Session Doesn't exist\nCreating a new session");
        sessionStorage.setItem("IsLoggedIn", "");
      }
      else
      {
        console.log("There is an active Session")
      }
    },[]);

    //Keep track of The inputs
    // useEffect(() => {
    //     console.log(text)
    // },[text]);
    // useEffect(() => {
    //     console.log(pwd)
    // },[pwd]);

    function collectValues(value1, value2)
    {
        let state = false;
        let storedFirstName = ""
        //Confirm that we are recieving the data
        console.log(`
            Username: ${value1}\n
            Password: ${value2}\n
        `);
        
        const getUSers = JSON.parse(localStorage.getItem("users"));

        for (let i = 0; i < getUSers.length; i++)
        {
            if (getUSers[i].Text === value1 && getUSers[i].Password === value2)
            {
                alert("Successfully logged in");
                storedFirstName = getUSers[i].FullName;
                state = true;
            }
        }

        if (!state){
            alert("Wrong Login Credentials!! Try Again:)");
            return;
        }

        const getLoggedInUsers =  sessionStorage.getItem("IsLoggedIn");
        console.log(getLoggedInUsers);
        
        sessionStorage.setItem("IsLoggedIn", `${value1},${storedFirstName}`);
        console.log("User was Added to Session Storage Successfully -> ", value1);
        router.push("/weather");
        
    }
  return (
    <div className="bg-white shadow-xl rounded-2xl p-8 flex flex-col w-[90%] max-w-md">
      {/* Title */}
      <h1 className="text-3xl font-bold text-center text-blue-900">Givefy</h1>
      <h2 className="text-xl font-semibold text-center mt-2">Login</h2>
      <p className="text-gray-500 text-center text-sm mb-6">
        Sign in to your account
      </p>

      {/* Form */}
      <div className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Enter Your Username"
          className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <input
          type="password"
          placeholder="Enter Your Password"
          className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={pwd}
          onChange={(e) => setPwd(e.target.value)}
        />

        {/* <div className="flex justify-between items-center text-sm">
          <Link
            href="/forgot"
            className="text-blue-600 hover:underline hover:text-blue-800"
        >
            Forgot Password?
          </Link>
        </div> */}

        <button 
            className="bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-800 transition"
            onClick={() => collectValues(text, pwd)}
        >
          Login
        </button>
      </div>

      {/* Register link */}
      <p className="text-center text-gray-600 text-sm mt-6">
        Don&apos;t have an account?{" "}
        <Link
          href="/signup"
          className="text-blue-600 font-medium hover:underline hover:text-blue-800"
        >
          Register here
        </Link>
      </p>
    </div>
  );
}
