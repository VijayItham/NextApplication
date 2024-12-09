"use client"
import { usePathname } from "next/navigation"
import styles from './navbar.module.css'
import { Box } from "@mui/material"
import GridViewIcon from '@mui/icons-material/GridView';
import { MdSearch, MdNotifications, MdOutlineChat, MdPublic } from 'react-icons/md'

const Navbar = () => {
    const pathName = usePathname();
    return (
        // <Box className={styles.container} sx={{width:"100vw", position:"relative", right:"1.5rem", backgroundColor:"#FBF8F3"}} >
        //     <div className={styles.title}>{pathName.split('/').pop()}</div>
        //     <div className={styles.menu}></div>
        //     <div className={styles.icons}>
        //         <MdOutlineChat size={20}/>
        //         <MdNotifications size={20}/>
        //         <MdPublic size={20}/>
        //     </div>
        // </Box>

        <Box sx={{  width: "100vw",  display:"flex",alignItems:'center', backgroundColor: "#FBF8F3", padding:"1.5rem", borderBottom:"2px solid #EFDCBA" }} >
            <GridViewIcon/>
            <Box sx={{marginLeft:"1rem", color:"#784800", fontFamily:"#784800"}} >Dashboard</Box>
        </Box>
    )
}

export default Navbar