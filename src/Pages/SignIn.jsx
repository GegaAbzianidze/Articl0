import { useEffect } from "react";
import { supabase } from "../SupabaseClient";
import { useNavigate } from "react-router-dom";

function SignIn() {
  const navigate = useNavigate();

  const loginWithGithub = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "github",
    });
  };
  const loginWithDiscord = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "discord",
    });
  };
  const loginWithTwitter = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "twitter",
    });
  };

  async function getSession() {
    const session = await supabase.auth.getSession();

    console.log(session);
  }

  useEffect(() => {
    getSession();
  }, []);

  supabase.auth.onAuthStateChange(async (event) => {
    if (event !== "SIGNED_OUT") {
      navigate("/");
    } else {
      alert("error");
    }
  });

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="grid place-items-center gap-2">
        <h1 className="text-4xl font-bold mb-12">Sign in to your account</h1>
        <button
          onClick={loginWithDiscord}
          className="p-4 border-b border-black bg-gradient-to-r hover:bg-gradient-to-l from-[#0d41b0] to-[#c0cbe4] bg-clip-text text-transparent"
        >
          Sign in with Discord
        </button>
        <div className="flex gap-5">
          <button
            onClick={loginWithGithub}
            className="p-4 border-b border-black bg-gradient-to-r hover:bg-gradient-to-l from-[#24292e] to-[#c9c9c9] bg-clip-text text-transparent"
          >
            Sign in with Github
          </button>
          <button
            onClick={loginWithTwitter}
            className="p-4 border-b border-black bg-gradient-to-r hover:bg-gradient-to-l from-[#1da1f2] to-[#141d26] bg-clip-text text-transparent"
          >
            Sign in with Twitter
          </button>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
