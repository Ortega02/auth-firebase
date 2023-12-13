import React from "react";
import { getAuth, signOut } from "firebase/auth";
import firebaseApp from "../firebase/credenciales";

const auth = getAuth(firebaseApp);

function Home() {
  return (
    <div>
      <div>Home</div>
      <button onClick={() => signOut(auth)} > Cerrar sesión </button>
    </div>
  );
}

export default Home;
