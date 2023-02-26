import React from "react";
import "../CSS/Navigation.css";
import instaLogo from "../images/logo.svg";
import logout from "../images/logout.svg";
import create from "../images/create.svg";
import home from "../images/home.png";

function Navigation({ logOut, notLogged }) {
  function popUpCreate() {
    const popUp = document.querySelector("#createPost");
    popUp.style.display = "flex";
    function hidePop(e) {
      const clicked = popUp.firstChild.contains(e.target);
      if (!clicked) {
        popUp.style.display = "none";
        document.removeEventListener("click", hidePop);
      }
    }
    setTimeout(() => {
      document.addEventListener("click", hidePop);
    }, 1000);
  }

  return (
    <nav>
      <img src={instaLogo} alt="Instagram" height={40} />
      {notLogged ? (
        ""
      ) : (
        <div>
          <img
            src={home}
            alt="home icon"
            height={27}
            title="Home"
            onClick={() => {
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          />
          <img
            id="create"
            src={create}
            alt="create icon"
            title="Upload post"
            onClick={popUpCreate}
          />
          <img
            id="logout"
            src={logout}
            alt="logout icon"
            title="Log out"
            onClick={logOut}
          />
        </div>
      )}
    </nav>
  );
}

export default Navigation;
