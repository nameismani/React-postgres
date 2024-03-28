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
  Select,
  Option,
} from "@material-tailwind/react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser, selectCurrentUser } from "../redux/userSlice";
import axios from "axios";

export function LoginCard() {
  let designation = [
    {
      id: 1,
      value: "1",
      text: "Front end Developer",
    },
    {
      id: 2,
      value: "2",
      text: "Back End Developer",
    },
    {
      id: 3,
      value: "3",
      text: "Full stack Developer",
    },
  ];
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    pic: "",
    designation: "",
  });
  const USERS_URL = "http://localhost:8000/api/auth/";
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  let [error, setError] = useState(false);

  const handleSubmit = async (e) => {
    // console.log(error);
    e.preventDefault();
    setLoading(true);
    let formData1 = new FormData();
    formData1.append("pic", formData.pic);
    formData1.append("name", formData.name);
    formData1.append("email", formData.email);
    formData1.append("password", formData.password);
    formData1.append("designation", formData.designation);
    try {
      // wait for the action to complete successfully
      const response = await axios.post(USERS_URL, formData1);
      console.log(response);
      // then navigate
      if (response.data.success) {
        navigate("/sign-in");
      } else {
        setError(response.data.message);
      }
    } catch (error) {
      // do something
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  };
  //   https://dev.to/przpiw/file-upload-with-react-nodejs-2ho7
  const handleFileChange = (e) => {
    // const img = {
    // //   preview: URL.createObjectURL(e.target.files[0]),
    //   data: e.target.files[0],
    // };
    setFormData((prev) => ({ ...prev, pic: e.target.files[0] }));
  };
  const handleChange = (e) => {
    console.log(e.target);
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
            Sign Up
          </Typography>
        </CardHeader>
        <CardBody>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <Input
              label="Name"
              size="lg"
              value={formData.name}
              type="text"
              onChange={handleChange}
              name="name"
            />
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
            <Input
              label="upload inage"
              size="lg"
              name="pic"
              type="file"
              //   value={formData.password}
              onChange={handleFileChange}
            />
            {/* <Select
              label="Select Designiation"
              name="designation"
              selected={(element) =>
                element &&
                React.cloneElement(element, {
                  disabled: true,
                  className:
                    "flex items-center opacity-100 px-0 gap-2 pointer-events-none",
                })
              }
              value={formData.designation}
              onChange={handleChange}
            >
              <Option value="" name="designation">
                Select value
              </Option>
              <Option value="1" name="designation">
                Front end developer
              </Option>
              <Option value="2" name="designation">
                Back end developer
              </Option>
              <Option value="3" name="designation">
                Full stack developer
              </Option>

              {designation.map((item) => (
                <Option key={item.title} value={item.title} required>
                  {item.title}
                </Option>
              ))}
            </Select> */}
            <div className="mb-4">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                Designation
              </label>
              <div className="relative">
                <select
                  className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  name="designation"
                  value={formData.designation}
                  onChange={handleChange}
                >
                  <option value="">Select dropdown</option>

                  {designation.map((item) => (
                    <option key={item.id} value={item.value}>
                      {item.text}
                    </option>
                  ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <svg
                    className="fill-current h-4 w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                  </svg>
                </div>
              </div>
            </div>
            <div className="-ml-2.5">
              <Checkbox label="Remember Me" />
            </div>
            <Button
              type="submit"
              variant="gradient"
              loading={loading}
              fullWidth
            >
              Sign Up
            </Button>
          </form>
        </CardBody>
        <CardFooter className="pt-0">
          <Typography variant="small" className="mt-6 flex justify-center">
            Already have an account?
            <Link to="/sign-in">
              <Typography
                as="small"
                variant="small"
                color="blue-gray"
                className="ml-1 font-bold"
              >
                Sign In
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

const SignUp = () => {
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
    <div className="flex justify-center items-center h-screen">
      <LoginCard />
    </div>
  );
};

export default SignUp;
