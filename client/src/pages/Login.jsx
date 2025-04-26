import { useState } from "react";
import axios from "axios";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("/users/login", { email, password });
            console.log(response.data);

            // Save token to localStorage (for later authenticated requests)

            localStorage.setItem("token", response.data.token);
            alert("Login successful!");
        } catch (err) {
            console.error(err.response?.data?.message || err.message);
            alert("Login failed!");
        }
    };

    return (
        <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        /><br/>
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        /><br/>
        <button type="submit">Login</button>
      </form>
    </div>
    );
}

export default Login;