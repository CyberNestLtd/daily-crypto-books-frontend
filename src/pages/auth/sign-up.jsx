import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Card, Input, Checkbox, Button, Typography } from "@material-tailwind/react";
import { Link } from "react-router-dom";

export function SignUp() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  let baseUrl = import.meta.env.VITE_BACKEND_BASE_URL;
  const handleSignUp = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.post(`${baseUrl}/api/auth/register`, {
        name,
        email,
        password,
      });

      console.log("response:: ", response)

      // Store token and user data
      const { token, user } = response.data;
      localStorage.setItem("authToken", token);
      localStorage.setItem("user", JSON.stringify(user));

      // Redirect to dashboard
      navigate("/dashboard/home");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed. Try again.");
    }
  };

  return (
    <section className="m-8 flex">
      <div className="w-2/5 h-full hidden lg:block">
        <img src="/img/pattern.png" className="h-full w-full object-cover rounded-3xl" />
      </div>
      <div className="w-full lg:w-3/5 flex flex-col items-center justify-center">
        <div className="text-center">
          <Typography variant="h2" className="font-bold mb-4">Join Us Today</Typography>
          <Typography variant="paragraph" color="blue-gray" className="text-lg font-normal">Enter your email and password to register.</Typography>
        </div>
        <form className="mt-8 mb-2 mx-auto w-80 max-w-screen-lg lg:w-1/2" onSubmit={handleSignUp}>
          <div className="mb-1 flex flex-col gap-6">
            <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
              Your name
            </Typography>
            <Input
              size="lg"
              type="text"
              placeholder="John Doe"
              className="!border-t-blue-gray-200 focus:!border-t-gray-900"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
              Your email
            </Typography>
            <Input
              size="lg"
              type="email"
              placeholder="name@mail.com"
              className="!border-t-blue-gray-200 focus:!border-t-gray-900"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
              Password
            </Typography>
            <Input
              type="password"
              size="lg"
              placeholder="********"
              className="!border-t-blue-gray-200 focus:!border-t-gray-900"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {error && (
            <Typography variant="small" color="red" className="mt-2 text-center">
              {error}
            </Typography>
          )}

          <Checkbox
            label={
              <Typography variant="small" color="gray" className="flex items-center justify-start font-medium">
                I agree to the&nbsp;
                <a href="#" className="font-normal text-black transition-colors hover:text-gray-900 underline">
                  Terms and Conditions
                </a>
              </Typography>
            }
            containerProps={{ className: "-ml-2.5" }}
          />
          <Button className="mt-6" fullWidth type="submit">
            Register Now
          </Button>

          <Typography variant="paragraph" className="text-center text-blue-gray-500 font-medium mt-4">
            Already have an account?
            <Link to="/auth/sign-in" className="text-gray-900 ml-1">Sign in</Link>
          </Typography>
        </form>
      </div>
    </section>
  );
}

export default SignUp;