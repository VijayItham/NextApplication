"use client"

import Link from "next/link"
import styles from './menuLink.module.css'
import { usePathname } from "next/navigation"

const MenuLink = ({ item }) => {
    console.log("item", item);
    return (
            <Link href={item.pageName} style={{ textDecoration: "none", color:"#333333" }} >
                {item.menuName}
            </Link>
    )
}

export default MenuLink