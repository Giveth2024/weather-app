'use client'
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function SignUp() {
    const router = useRouter()
    const [text, setText] = useState("");
    const [fullname, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [pwd, setPwd] = useState("");
    const [data, setData] = useState([]);

    //Check If Local Storage exists. Create one
    useEffect(() => {
        let found = false
        for (let i = 0; i < localStorage.length; i++)
        {
            if(localStorage.key(i) === "users")
            {
                console.log("Users Object exits")
                console.log(`${localStorage.key(i)}/Users Object exits`);
                found = true;
                break;
            }
        }
        
        if (!found)
        {
            console.log("Users Object doesn't exist.\nCreating Object");       
            localStorage.setItem("users", JSON.stringify([]));
            console.log("Users Object has been created Successfully");       
        }
    },[]);

    function addUser( data1, data2, data3, data4)
    {
    
        if(data1 === "" || data2 === "" || data3 === "" || data4 === "")
        {
            alert("No Spaces Allowed");
            return; // Do nothing
        }

        if (data1.includes(" "))
        {
            alert(`There is a Space in your Username -> ${data1}...\nNo Spaces are allowed...`);
            return; // Do nothing
        }

        //create an object and print it into the console
        const getUSers = JSON.parse(localStorage.getItem("users"));

        for (let i = 0; i < getUSers.length; i++)
        {
            if (getUSers[i].Text === data1){
                alert("User already exits. Create a new account ot Login");
                return;
            }
        }
    
        // create new user data Template
        const newUser = {
            Text : data1,
            Email : data2,
            Password: data3,
            FullName: data4
        }
    
        const newSavedUser = [...getUSers, newUser];
        setData(newSavedUser);
        localStorage.setItem("users", JSON.stringify(newSavedUser));
        console.log("New Account has been Saved Successfully", data1);
        router.push('/login')
    }

  return (
    <div className="bg-white shadow-xl rounded-2xl p-8 flex flex-col w-[90%] max-w-md">
      {/* Title */}
      <h1 className="text-3xl font-bold text-center text-blue-900">Create Account</h1>
      <p className="text-gray-500 text-center text-sm mb-6">
        Fill in your details to get started
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
          type="text"
          placeholder="Enter Your Full Name"
          className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={fullname}
          onChange={(e) => setFullName(e.target.value)}
        />
        <input
          type="email"
          placeholder="Enter Your Email"
          className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Enter Your Password"
          className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={pwd}
          onChange={(e) => setPwd(e.target.value)}
        />

        <button onClick={() => addUser(text, email, pwd, fullname)} className="bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-800 transition">
          Sign Up
        </button>
      </div>

      {/* Login link */}
      <p className="text-center text-gray-600 text-sm mt-6">
        Already have an account?{" "}
        <Link
          href="/login"
          className="text-blue-600 font-medium hover:underline hover:text-blue-800"
        >
          Login here
        </Link>
      </p>
    </div>
  );
}
