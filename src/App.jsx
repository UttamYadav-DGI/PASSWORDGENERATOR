import React from "react";
import { useEffect } from "react";
import { useCallback } from "react";
import { useState } from "react";
import { useRef } from "react";

function App(){
  const [length,setLength]=useState(8)
  const [numberAllowed,setnumberAllowed]=useState(false);
  const [characterAllowed,setcharacterAllowed]=useState(false);
  const [password,setpassword]=useState("")

  //useRef hook
  const PasswordRef=useRef(null)


  const passwordGenerator=useCallback(()=>{
    let pass=""
    let str="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if(numberAllowed) str+="0123456789"
    if(characterAllowed) str+="!@#$%^&*-_+=[]{}~`"
    for(let i=1;i<=length;i++){
      let char=Math.floor((Math.random()*str.length+1))
      pass+=str.charAt(char);
    }
    setpassword(pass);
  },[length,numberAllowed,characterAllowed,setpassword])

  const copyPasswordToClipboard=useCallback(()=>{
    PasswordRef.current?.select()
    window.navigator.clipboard.writeText(password)
  },[password])

  useEffect(()=>{passwordGenerator()},[length,numberAllowed,characterAllowed,passwordGenerator])
  return (
   <>
   <div
   className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 bg-gray-800 text-orange-500">
   <h1
   className="text-4xl text-center text-orange-600"
   >Password Generator</h1>
   <div className="flex shadow rounded-lg overflow-hidden mb-4">
    <input type="text"
     value={password}
     className="outline-none w-full py-1 px-3"
     placeholder="Password"
     readOnly
     ref={PasswordRef}
    />
    <button
    className="outline-none bg-blue-600 text-white px-3 py-0.5 shrink-0"
    onClick={copyPasswordToClipboard}
    >Copy</button>
   </div>
   <div className="flex-text-sm gap-x-2">
    <div className="flex items-center gap-x-1">
      <input type="range"
      max={100}
      min={6}
      value={length}
      className="cursor-pointer"
      onChange={(e)=>{setLength(e.target.value)}}
      />
      <label> length:{length}</label>
    </div>
    <div className="flex items-center gap-x-1">
    <input type="checkbox"
    defaultChecked={numberAllowed}
    id="numberinput"
    onChange={()=>{setnumberAllowed((prev)=>!prev);}}
    />
     <label htmlFor="numberInput">Numbers</label>
      </div>
      <div className="flex items-center gap-x-1">
          <input
              type="checkbox"
              defaultChecked={characterAllowed}
              id="characterInput"
              onChange={() => {
                setcharacterAllowed((prev) => !prev )
              }}
          />
          <label htmlFor="characterInput">Characters</label>
      </div>
    </div>
</div>
</>
  )
}
export default App;