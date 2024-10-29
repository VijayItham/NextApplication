"use client"
import styles from './sidebar.module.css'
import MenuLink from './MenuLink/menuLink'
import { MdLogout } from 'react-icons/md'
import { useRouter } from 'next/navigation'
import { useSelector } from 'react-redux'
import { doLogout, getUserDetails } from "../../../common/auth"

const menuItems=[
    {
        title:"Pages",
        list:[
            {
                title:"dashboard",
                path:"/dashboard",
            },
            {
                title:"App Role",
                path:"/dashboard/AppRole",
            },
            {
                title:"App User",
                path:"/dashboard/AppUser",
            },
            {
                title:"Menu",
                path:"/dashboard/Menu",
            },
            {
                title:"Role Menu",
                path:"/dashboard/RoleMenu",
            },
           
        ]
    },
]
const Sidebar=()=>{
    const user = getUserDetails()
    const router = useRouter()
    console.log('UserDetails111', )
    const onLogout=()=>{
        doLogout();
        router.push('/')      
    }
    return(
        <div className={styles.container}>
            <div className={styles.user}>
                <div className={styles.userDetail}>
                    <span className={styles.userName}>{user.userName}</span>
                    <span className={styles.userTitle}>{user.roleName}</span>
                </div>
            </div>
            <ul className={styles.list}>
                {
                    menuItems.map((cat)=>(
                        <li key={cat.title}>
                            <span className={styles.cat}>{cat.title}</span>
                            {cat.list.map((item)=>(
                                <MenuLink item={item} key={item.title}/>
                            ))}
                        </li>
                    ))
                }
            </ul>
            <button onClick={onLogout} className={styles.logout}>Logout
                <MdLogout/>
            </button>
        </div>
    )
}

export default Sidebar