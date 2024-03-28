import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectCurrentUser, updateUser } from "../redux/userSlice";
import { Alert, Button, Chip, Input } from "@material-tailwind/react";
import { format } from "date-fns";

const Home = () => {
  const { currentUser } = useSelector(selectCurrentUser);
  const filePickerRef = useRef();
  const dispatch = useDispatch();
  const [error, setError] = useState(false);
  const keys = ["password", "pic"];
  const [formData, setFormData] = useState({
    name: currentUser.name,
    password: "",
    pic: "",
    preview: "",
  });
  const disabled =
    keys.some((item) => formData[item] != "") ||
    formData.name != currentUser.name;
  // keys.some((item) => formData[item] != "") &&
  // formData.name != currentUser.name;
  // const disabled = formData.password !== "" || formData.pic !== "" &&;
  console.log(disabled);
  const handleChange = (e) => {
    console.log(e.target);
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  //   https://dev.to/przpiw/file-upload-with-react-nodejs-2ho7
  const handleFileChange = (e) => {
    // const img = {
    // //   preview: URL.createObjectURL(e.target.files[0]),
    //   data: e.target.files[0],
    // };
    setFormData((prev) => ({
      ...prev,
      pic: e.target.files[0],
      preview: URL.createObjectURL(e.target.files[0]),
    }));
  };
  const handleSubmit = async (e) => {
    // console.log(error);
    e.preventDefault();

    let formData1 = new FormData();
    formData1.append("pic", formData.pic);
    formData1.append("name", formData.name);
    formData1.append("password", formData.password);
    // formData1.append("designation", formData.designation);
    try {
      // wait for the action to complete successfully
      const response = await dispatch(updateUser(formData1)).unwrap();
      console.log(response);
      // then navigate
      if (response.data.success) {
        // navigate("/sign-in");
      } else {
        setError(response.data.message);
      }
    } catch (error) {
      // do something
      console.log(error.message);
    }
  };
  return (
    <div className="flex justify-center items-center h-screen ">
      <form onSubmit={handleSubmit} className="relative">
        <input
          name="file"
          type="file"
          ref={filePickerRef}
          // value={formData.pic}
          onChange={handleFileChange}
          className="hidden"
        />
        <div
          className="h-24 w-24 mx-auto rounded-full mb-3 overflow-hidden cursor-pointer"
          onClick={() => filePickerRef.current.click()}
        >
          <img
            src={
              formData.preview ||
              `http://localhost:8000/images/${currentUser.profile}`
            }
            alt={currentUser.name}
            className="w-full h-full object-cover"
          />
        </div>
        <Chip
          color="amber"
          className="text-white"
          value={currentUser.designation}
        />
        <div className="mt-3">
          <Input
            label="Name"
            size="lg"
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
          />
        </div>
        <div className="mt-2">
          <Input
            label="password"
            size="lg"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
          />
        </div>
        <Button
          type="submit"
          variant="gradient"
          color="green"
          disabled={!disabled}
          className="mt-2"
          // loading={loading}
          fullWidth
        >
          submit
        </Button>
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
      </form>
      {currentUser.created_at && (
        <p>
          {format(new Date(currentUser.created_at), "dd//MM /yyyy HH:mm:ss")}
        </p>
      )}
      {currentUser.updated_at && (
        <p className="ms-2">
          {" "}
          {format(new Date(currentUser.updated_at), "dd//MM /yyy HH:mm:ss")}
        </p>
      )}
    </div>
  );
};

export default Home;
