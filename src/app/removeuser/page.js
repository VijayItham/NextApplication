"use client"
import { useSelector } from "react-redux"

export default function page(){

    const data = useSelector((data)=>data.usersData.users)
    console.log('data1111', data)
    return(
        <div>Remove User page</div>
    )
}