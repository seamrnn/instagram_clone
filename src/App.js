import { useState, useEffect } from "react";
import Navigation from "./components/Navigation";
import Content from "./components/Content";
import Login from "./components/Login";
import Create from "./components/Create";
import "./App.css";

import { auth } from "./firebase";

function App() {
  const [notLogged, setNotLogged] = useState(true);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user?.emailVerified) setNotLogged(false);
    });
  }, []);

  function logOut() {
    auth.signOut();
    setNotLogged(true);
  }

  return (
    <>
      <Navigation logOut={logOut} notLogged={notLogged} />
      <section>
        {notLogged ? <Login setNotLogged={setNotLogged} /> : <Content />}
      </section>
      {notLogged ? "" : <Create />}

      <footer>
        Developed with ❤️ by{" "}
        <a
          href="https://www.linkedin.com/in/akash-singh8/"
          target="_blank"
          rel="noreferrer"
        >
          ~Akash
        </a>
      </footer>
    </>
  );
}

export default App;
