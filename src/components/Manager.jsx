import React, { useEffect } from "react";
import { useRef, useState } from 'react';
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { v4 as uuidv4 } from 'uuid';

const Manager = () => {
    const ref = useRef()
    const passwordRef = useRef()
    const [form, setForm] = useState({site: "", username: "", password: ""})
    const [passwordArray, setPasswordArray] = useState([])

    const getPasswords = async () => {
        let req = await fetch("https://localhost:3000/")
        let passwords = await req.json();
        setPasswordArray(passwords)
        
    }
    useEffect(()=> {
        
        getPasswords()

    }, [])

    const copyText = (text)=> {
        toast('Copied to clipboard!', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            });            
        navigator.clipboard.writeText(text)
    }
   const showPassword = ()=> {
        
        if(ref.current.src.includes("icons/eye.png")){
            passwordRef.current.type = "password"
            ref.current.src = "icons/eyecross.png"
        }
        else{
            passwordRef.current.type = "text"
            ref.current.src = "icons/eye.png"
        }
        
   }

   const savePassword = async () => {
        if(form.site.length > 3 && form.username.length > 3 && form.password.length > 3){
           
            // If any such id exists in the db, delete it
            await fetch("http://localhost:3000/", {method: "DELETE", headers: {"Content-Type": "application/json"}, body: JSON.stringify({id: form.id})})
            
            // Step 1: Create a new array with existing passwords and the new form data
           
            const newPasswordArray = [...passwordArray, {...form, id:uuidv4()}];
            // Step 2: Update the state with the new array
            setPasswordArray(newPasswordArray);

            await fetch("http://localhost:3000/", {method: "POST", headers: {"Content-Type": "application/json"}, body: JSON.stringify({ ...form, id: uuidv4() })})

            setForm({site: "", username: "", password: ""})
            toast('Password saved!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });      
        }
        else{
            toast('Error: Password not saved!');
        }

   
          
    };

   const deletePassword = async (id) => {
        let c = confirm("Do you really want to delete this info?")
        if(c){
            setPasswordArray(passwordArray.filter(item=>item.id!==id))
            // localStorage.setItem("passwords", JSON.stringify(passwordArray.filter(item=>item.id!==id)))
            let res = await fetch("http://localhost:3000/", {method: "DELETE", headers: {"Content-Type": "application/json"}, body: JSON.stringify({id})})
            toast('Password Deleted!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });            
        }
        
   }

   const editPassword = (id)=> {
        setForm({...passwordArray.filter(i=>i.id===id)[0], id: id})
        setPasswordArray(passwordArray.filter(item=>item.id!==id))

   }

   const handleChange = (e)=> {
    setForm({...form, [e.target.name]: e.target.value})
   }
  return (
    <>
    <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition= "Bounce"
    />
    {/* Same as */}
    <ToastContainer />
      {/* bg.ibeclick backgrounds */}
      <div className="absolute inset-0 -z-10 h-full w-full bg-green-50 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]">
        <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-green-400 opacity-20 blur-[100px]"></div>
      </div>
      <div className=" p-3 md:mycontainer min-h-[88.2vh]">
        <h1 className="text-4xl font-bold text-center">
            <span className='text-green-500'>&lt;</span>
            <span>Pass</span>
            <span className='text-green-500'>OP/&gt;</span>
        </h1>
        <p className="text-green-900 text-lg text-center">Your own Password Manager</p>
        <div className="text-black flex flex-col items-center p-4 gap-8">
            <input name="site" value={form.site} onChange={handleChange} placeholder="Enter website URL" className="rounded-full border border-green-500 w-full py-1 px-4" type="text" id="site" />
            <div className="flex-col md:flex-row justify-between flex w-full gap-4">
                <input name="username" value={form.username} onChange={handleChange} placeholder="Enter Username" className="rounded-full border border-green-500 p-4 py-1 md:w-2/3" type="text" id="username"/>
                <div className="relative md:w-1/3">
                    <input ref={passwordRef} name="password" value={form.password} onChange={handleChange} placeholder="Enter Password" className="rounded-full border border-green-500 p-4 py-1 w-full" type="password" id="password"/>
                    <span className="absolute right-[3px] top-[4px] cursor-pointer" onClick={showPassword}>
                        <img ref={ref} className="p-1" width={26} src="icons/eyecross.png" alt="eye" />
                    </span>
                </div>  
            </div>
            <button onClick={savePassword} className="flex gap-2 justify-center items-center bg-green-400 hover:bg-green-300 rounded-full px-8 py-2 w-fit border border-green-900">
                <lord-icon src="https://cdn.lordicon.com/jgnvfzqg.json" trigger="hover"></lord-icon>
                Save
            </button>
        </div>
        <div className="passwords">
            <h2 className="font-bold text-2xl py-4">Your Passwords</h2>
            <div className="overflow-x-auto">
            {passwordArray.length === 0 && <div>No passwords to show</div>}
            {passwordArray.length != 0 && <table className="table-auto min-w-full rounded-md overflow-hidden mb-10">
                <thead className="bg-green-800 text-white">
                    <tr>
                        <th className="py-2">Site</th>
                        <th className="py-2">Username</th>
                        <th className="py-2">Password</th>
                        <th className="py-2">Actions</th>
                    </tr>
                </thead>
                <tbody className="bg-green-100">
                    {passwordArray.map((item)=>{
                        return <tr key={item.id}>
                        <td  className="py-2 border border-white text-center">
                            <div className="flex items-center justify-center">
                                <a href="{item.site}" target="_blank">{item.site}</a>
                                <div className="lordiconcopy size-7 cursor-pointer" onClick={()=>  {copyText(item.site)}}>
                                    <lord-icon style={{"width": "25px", "height": "25px", "paddingTop": "3px", "paddingLeft": "3px"}} src="http://cdn.lordicon.com/iykgtsbt.json" trigger="hover" ></lord-icon>
                                </div>
                            </div>
                            
                        </td>
                        <td className="py-2 border border-white text-center">
                            <div className="flex items-center justify-center">
                                <span>{item.username}</span>
                                <div className="lordiconcopy size-7 cursor-pointer" onClick={()=> {copyText(item.username)}}>
                                    <lord-icon style={{"width": "25px", "height": "25px", "paddingTop": "3px", "paddingLeft": "3px"}} src="http://cdn.lordicon.com/iykgtsbt.json" trigger="hover" ></lord-icon>
                                </div>
                            </div>
                            
                        </td>
                        <td className="py-2 border border-white text-center">
                            <div className="flex items-center justify-center">
                                <span>{"*".repeat(item.password.length)}</span>
                                <div className="lordiconcopy size-7 cursor-pointer" onClick={()=> {copyText(item.password)}}>
                                    <lord-icon style={{"width": "25px", "height": "25px", "paddingTop": "3px", "paddingLeft": "3px"}} src="http://cdn.lordicon.com/iykgtsbt.json" trigger="hover" ></lord-icon>
                                </div>
                            </div>
                           
                        </td>
                        <td className="py-2 border border-white text-center">
                            <span className="cursor-pointer mx-1" onClick={()=> {editPassword(item.id)}}>
                                <lord-icon src="https://cdn.lordicon.com/gwlusjdu.json" trigger="hover" style={{"width":"25px", "height":"25px"}}></lord-icon>
                            </span>
                            <span className="cursor-pointer mx-1" onClick={()=> {deletePassword(item.id)}}>
                                <lord-icon src="https://cdn.lordicon.com/skkahier.json" trigger="hover" style={{"width":"25px", "height":"25px"}}></lord-icon>
                            </span>
                        </td>
                    </tr>
                    })}
                </tbody>

            </table>}
            </div>
        </div>
       
      </div>
      
    </>
  );
};

export default Manager;
