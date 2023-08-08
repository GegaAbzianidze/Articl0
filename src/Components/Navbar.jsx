import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { supabase } from "../SupabaseClient";

const Navbar = ({ user }) => {
  const navigate = useNavigate();

  const hideOnSignIn = location.pathname === "/signIn";

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    console.log(error);
    window.location.reload();
  };

  return (
    <div>
      <div className={hideOnSignIn ? "hidden" : "navbar bg-base-100"}>
        <div className="navbar-start">
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li>
                <a>About</a>
              </li>
              <li>
                <a>Writers</a>
              </li>
              <li>
                <a>Guidelines</a>
              </li>
            </ul>
          </div>
          <a
            className="btn btn-ghost normal-case text-xl"
            onClick={() => navigate("/")}
          >
            Articl0
          </a>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            <li>
              <a onClick={() => window.my_modal_2.showModal()}>About</a>
            </li>
            <li>
              <a onClick={() => window.my_modal_2.showModal()}>Writers</a>
            </li>
            <li>
              <a onClick={() => window.my_modal_2.showModal()}>Guidelines</a>
            </li>
          </ul>
        </div>
        <div className="navbar-end">
          {(user && user.aud === "authenticated") || user !== null ? (
            <div className="flex gap-3">
              <a className="btn" onClick={() => navigate("/editor")}>
                Write
              </a>
              <button onClick={handleLogout} className="btn btn-neutral">
                Logout
              </button>
            </div>
          ) : (
            <a className="btn" onClick={() => navigate("/signIn")}>
              SignIn
            </a>
          )}
        </div>
      </div>
      <dialog id="my_modal_2" className="modal">
        <form method="dialog" className="modal-box">
          <h3 className="font-bold text-lg">Hello there!</h3>
          <p className="py-4">Those pages are simple static pages</p>
        </form>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </div>
  );
};

export default Navbar;

Navbar.propTypes = {
  user: PropTypes.object,
};
