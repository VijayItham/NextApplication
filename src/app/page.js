//import PersistentDrawerLeft from "./components/Dashboard";
import Link from "next/link";
import addAppRole from "./AppRole/page";
import login from "./login/page";
import about from "./about/page";

export default function Home() {
  // const onNavigation=(page)=>{

  // }
  return (
    <>
      {/* <PersistentDrawerLeft/> */}
      <Link href="/AppRole">App Role</Link>
      <br></br>
      <Link href="/AppUser">App User</Link>
      <br></br>
      <Link href="/Menu">Menu</Link>
      <br></br>
      <Link href="/RoleMenu">Role Menu</Link>
      <br/>
    </>
  );
}
