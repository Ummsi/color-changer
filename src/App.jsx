import { useState, useCallback, useEffect, useRef } from 'react'
import './App.css'

function App() {

const [length, setLength] = useState(16)
const [numberAllowed, setNumberAllowed] = useState(false);
const [charAllowed , setCharAllowed] = useState(false)
const [password, setPassword] = useState("")

//useRef hook 
// koi bhi element hai apke web page per use ka ref le sakte ho us ke sath manipulation kar sakte ho  

const passwordRef = useRef(null)






//useCallBack hook 
//function ko memorised karta hai jitana b kar sake 

const passwordGenerator = useCallback(() => {
  
let pass =""
let str ="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

if (numberAllowed) str += "0123456789"

if (charAllowed) str += " ~!@#$%^&*()_+[}{}()<>?| "

for (let i = 1; i <= length; i++){
  let char = Math.floor(Math.random() * str.length + 1)
  pass += str.charAt(char)
}
setPassword(pass)

}, [length, numberAllowed, charAllowed, setPassword])


const copyPasswordToClipboard = useCallback(()=>{
  passwordRef.current?.select();
  passwordRef.current?.setSelectionRange(0 , 999);
  window.navigator.clipboard.writeText(password)
},[password])

//useEffect 
// jab b hamara page load hota hai aur agar dependecy mai kuch bhi change hota hai to dubara run karta hai shuru se 

useEffect(() => {
  passwordGenerator()
}, [length, numberAllowed, charAllowed, passwordGenerator])

  return (

  <div className='w-full max-w-xl mx-auto shadow-md 
  rounded-3xl px-10 py-10 my-8 text-orange-500 bg-gray-800'>

    <h1 className='text-white text-center mb-4 text-3xl'>
      Password Generator</h1>

    <div className="flex shadow rounded-lg overflow-hidden px-1 mb-8">
    <input 
    type="text" 
    value={password}
    className='outLine-none w-full rounded-sm py-3 px-3'
    placeholder='Password'
    readOnly
    ref={passwordRef}
    />
      <button 
      onClick={copyPasswordToClipboard}
      className='outLine-none bg-blue-700 text-white px-4 py-0.5 shrink-0'>Copy</button>
    </div>
    <div className='flex text-sm gap-x-2'>
      <div className='flex items-center gap-x-2'>
        <input type="range"
        min={10}
        max={100}
        value={length}
        className='cursor-pointer'
        onChange={(e) => (setLength(e.target.value))}
        />
        <label htmlFor='lengthInput'>Length: {length}</label>
      </div>
      <div className='flex items-center gap-x-2'>
        <input 
        type="checkbox"
        defaultChecked={numberAllowed}
        id='numberInput'
        onChange={() => {
        setNumberAllowed((prev) => !prev)
        }}
        />
        <label htmlFor='numberInput'>Numbers: </label>
      </div>
      <div className='flex items-center gap-x-2'>
      <input 
        type="checkbox"
        defaultChecked={charAllowed}
        id='characterInput'
        onChange={() => {
        setCharAllowed((prev) => !prev );
        }}
        />
        <label htmlFor='characterInput'>Characters:</label>
      </div>
    </div>
   </div>

  )
}

export default App
