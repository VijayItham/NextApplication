"use client"

import Link from "next/link"

const MenuLink = ({ item }) => {
    return (
            <Link href={item?.pageName??''} style={{ textDecoration: "none", color:"#333333" }} >
                {item?.menuName??''}
            </Link>
    )
}

export default MenuLink