"use client"

import Link from "next/link"
import styles from './menuLink.module.css'

const MenuLink = ({ item }) => {
    return (
            <Link href={item.pageName} style={{ textDecoration: "none", color:"#333333" }} >
                {item.menuName}
            </Link>
    )
}

export default MenuLink