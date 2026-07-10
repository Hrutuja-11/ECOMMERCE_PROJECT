import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {saveToken} from "../utils/auth";

function Login() {
    const BASEURL = import.meta.env.VITE_DJANGO_BASE_URL;
    const [form, setForm] = useState({username: "", password: ""});
    const [msg, setMsg] = useState("");
    const navigate = useNavigate();

    const handleChange = (e) => {
        setForm({...form, [e.target.name]: e.target.value});
    }
    const handleSubmit = async (e) => {
        
        e.preventDefault();
        setMsg("");
        try {
            const res = await fetch(`${BASEURL}/api/token/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(form),
            });
            const data = await res.json();
            if (res.ok) {
                saveToken(data);
                setMsg("Login successful! Redirecting.....");
                setTimeout(() => {
                    navigate("/");
                }, 800);
                
            } else {
                setMsg(data.detail ||"Invalid credentials");
            }
        } catch (error) {
            setMsg("An error occurred");
        }
    }
    return (
        <div className="min-h-screen flex items-center justify-center p-6">
            <div className="max-w-md w-full bg-white rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-bold mb-4">Login</h2>
                <form onSubmit={handleSubmit} className="space-y-3">
                    <input name="username" onChange={handleChange} value={form.username} placeholder="Username" className="w-full p-2 border rounded" />
                    <input name="password" onChange={handleChange} value={form.password} type="password" placeholder="Password" className="w-full p-2 border rounded" />
                    <button className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">Login</button>
                </form>
                {msg && <p className="mt-4 text-sm">{msg}</p>}
                <div className="mt-4 text-sm">
                    Don't have an account?{""} <a href="/register" className="text-blue-600 hover:underline">Register</a>
                </div>
            </div>
        </div>
    )
}

export default Login;