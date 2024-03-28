import React, { useEffect, useState } from "react";

import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Input,
  Checkbox,
  Button,
  Alert,
} from "@material-tailwind/react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser, selectCurrentUser } from "../redux/userSlice";

export function LoginCard() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const { loading } = useSelector(selectCurrentUser);
  const [loading, setLoading] = useState(false);
  let [error, setError] = useState(false);

  const handleSubmit = async (e) => {
    console.log(error);
    e.preventDefault();
    setLoading(true);
    try {
      // wait for the action to complete successfully
      const response = await dispatch(fetchUser(formData)).unwrap();
      console.log(response);
      // then navigate
      if (response.success) {
        navigate("/");
      } else {
        setError(response.message);
      }
    } catch (error) {
      // do something
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  return (
    <div>
      <Card className="w-96 relative">
        <CardHeader
          variant="gradient"
          color="gray"
          className=" grid h-28 place-items-center"
        >
          <Typography variant="h3" color="white">
            Sign In
          </Typography>
        </CardHeader>
        <CardBody>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <Input
              label="Email"
              size="lg"
              value={formData.email}
              type="email"
              onChange={handleChange}
              name="email"
            />
            <Input
              label="Password"
              size="lg"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
            />
            <div className="-ml-2.5">
              <Checkbox label="Remember Me" />
            </div>
            <Button
              type="submit"
              variant="gradient"
              loading={loading}
              fullWidth
            >
              Sign In
            </Button>
          </form>
        </CardBody>
        <CardFooter className="pt-0">
          <Typography variant="small" className="mt-6 flex justify-center">
            Don&apos;t have an account?
            <Link to="/sign-up">
              <Typography
                as="small"
                variant="small"
                color="blue-gray"
                className="ml-1 font-bold"
              >
                Sign up
              </Typography>
            </Link>
          </Typography>
        </CardFooter>
        <Alert
          open={error}
          color="red"
          className={`${
            error ? "visible" : "invisible"
          } absolute bottom-0 left-0 right-0`}
          onClose={() => setError(false)}
          animate={{
            mount: { y: 0 },
            unmount: { y: 100 },
          }}
        >
          {error}
        </Alert>
      </Card>
    </div>
  );
}
const SignIn = () => {
  const { currentUser } = useSelector(selectCurrentUser);
  let location = useLocation();
  let navigate = useNavigate();
  let from = location?.state?.from?.pathname || "/";

  useEffect(() => {
    if (currentUser) {
      // If user is logged in redirect to home page.
      navigate(from, { replace: true });
    }
  }, []);
  return (
    <div className="flex justify-center felx-col items-center h-screen">
      <LoginCard />
    </div>
  );
};

export default SignIn;
