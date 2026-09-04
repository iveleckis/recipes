import { useState, type SubmitEvent } from "react";
import { Navigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { login } from "../api/login";
import { useAuth } from "../../../providers/auth/useAuth";

export default function Login() {
  const authContext = useAuth();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { mutateAsync } = useMutation({
    mutationFn: login,
  });

  const handleSubmit = async (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const result = await mutateAsync({ username, password });
      authContext?.setToken("Bearer " + result.token);
    } catch (err) {
      if (err instanceof Error) {
        console.error(err.message);
      } else if (typeof err === "string") {
        console.error(err);
      } else {
        console.error("Something went wrong");
      }
    }
  };

  if (authContext?.token) {
    return <Navigate to="/recipes" replace />;
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Username
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </label>

      <label>
        Password
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </label>

      <button type="submit">Log in</button>
    </form>
  );
}
