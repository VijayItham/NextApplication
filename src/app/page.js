import Image from "next/image";
import AddAppRole from "./components/AddAppRole";
import DisplayAppRole from "./components/DisplayAppRole";

export default function Home() {
  return (
    <main>
      <AddAppRole/>
      <DisplayAppRole/>
    </main>
  );
}
