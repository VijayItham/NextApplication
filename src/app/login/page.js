"use client"
import Link from "next/link";
import { useRouter } from "next/navigation";
const Login = () => {
  const router = useRouter();
  const onSubmit = ()=>{
    router.push('/about')
  }
  return (
    <div>
      <h1>LOGIN</h1>
      <Link href="/">GO To HOME PAGE</Link>
      <button onClick={onSubmit}>GOT TO HOME</button>
    </div>
  );
};

export default Login;
