'use client'
import React, { useEffect } from 'react'
import { loginSuccess } from '@/services/auth'
import { useParams, useRouter } from 'next/navigation'
import { toast } from 'react-toastify'
export default function page() {
  const userId = useParams().userId
  const router=useRouter()
  useEffect(() => { 
    loginSuccess(userId)
    .then((response) => {
      console.log("response", response);
      if (response?.errCode === 0) {
      
        localStorage.setItem("access_token", response.access_token);
        localStorage.setItem("user", JSON.stringify(response.user));
        localStorage.setItem("isLogin", "true");
        router.push("/");

      } else {
        toast.error(response?.message);
      }
    });

    }, [])
       
  return (
    <div></div>
  )
}
