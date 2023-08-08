import "./App.css";
import Navbar from "./Components/Navbar";
import { lazy, Suspense, useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { supabase } from "./SupabaseClient";

const Editor = lazy(() => import("./Pages/Editor"));
const Article = lazy(() => import("./Pages/Article"));
const SingleArticle = lazy(() => import("./Pages/SingleArticle"));
const SignIn = lazy(() => import("./Pages/SignIn"));

function App() {
  const [user, setUser] = useState(null);
  useEffect(() => {
    async function getUserData() {
      await supabase.auth.getUser().then((value) => {
        if (value.data?.user) {
          console.log(value.data.user);
          setUser(value.data.user);
        }
      });
    }
    getUserData();
  }, []);

  return (
    <div>
      <Router>
        <Navbar user={user} />
        <Suspense Suspence={<h1>Loading..</h1>}>
          <Routes>
            <Route path="/" element={<Article />} exact />
            <Route path="/editor" element={<Editor user={user} />} />
            <Route path="/article/:id" element={<SingleArticle />} />
            <Route path="/signIn" element={<SignIn />} />
            {/* <Route path="/profile" element={<Profile />} /> */}
          </Routes>
        </Suspense>
      </Router>
    </div>
  );
}

export default App;
