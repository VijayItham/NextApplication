"use client"

import { useDispatch, useSelector } from "react-redux"
import { fetchAPIUser } from "../redux/AppRoleSlice";
import { useEffect } from "react";


export default function page(){
    const dispatch = useDispatch();
    const data = useSelector((data)=>data.usersData.userApiData)
    console.log('ddddd', data)
    useEffect(()=>{
        dispatch(fetchAPIUser())
    },[])
    return (
        <div>
        <div>user List from API</div>
        {
                data.map((item)=>{
                    return(
                        <h1>{item.name}</h1>
                    )
                })
        }
        </div>
    )
}