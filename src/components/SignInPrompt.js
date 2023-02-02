import React from "react";
import { Link } from "react-router-dom";

function SignInPrompt() {
  return (
    <div>
      You need to <Link to="/signin">SignIn</Link>
    </div>
  );
}

export default SignInPrompt;
