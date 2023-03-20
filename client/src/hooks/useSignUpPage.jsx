import { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { register } from "../redux/actions/userActions";
import useValidate from "./useValidate";

export default function useSignUpPage() {
  const [signUpUser, setSignUpUser] = useState({
    name: "",
    email: "",
    password: "",
  });
  const signUpFields = [
    {
      type: "name",
      onChange,
      labelClassName: "form-label font-weight-bold",
      labelName: "Name",
      errorClassName: "form-text text-danger",
      className: "form-control",
      value: signUpUser.name,
      autoFocus: true,
      name: "name",
      placeholder: "First Name +  Last Name",
    },
    {
      type: "email",
      onChange,
      labelClassName: "form-label font-weight-bold",
      labelName: "Email address",
      errorClassName: "form-text text-danger",
      className: "form-control",
      value: signUpUser.email,
      autoFocus: true,
      name: "email",
      placeholder: "user@example.com",
    },
    {
      type: "password",
      onChange,
      className: "form-control",
      errorClassName: "form-text text-danger",
      labelClassName: "form-label font-weight-bold",
      labelName: "Password",
      value: signUpUser.password,
      autoFocus: false,
      name: "password",
      placeholder: "Password",
    },
  ];
  function onChange(e) {
    const { name, value } = e.target;
    setSignUpUser({ ...signUpUser, [name]: [value] });
  }

  const dispatch = useDispatch();
  const defaultError = {
    email: null,
    password: null,
    name: null,
  };
  const [errorMsg, setErrorMsg] = useState(defaultError);
  const { validate, validationError } = useValidate("signUp", {
    name: signUpUser.name,
    email: signUpUser.email,
    password: signUpUser.password,
  });
  const onFormSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      setErrorMsg(validationError);
      setTimeout(() => {
        setErrorMsg(defaultError);
      }, 2000);
    } else {
      dispatch(
        register(
          signUpUser.name,
          signUpUser.email,
          signUpUser.password,
          handleToast
        )
      );
    }
  };
  function handleToast(info) {
    if (info.error) {
      toast.error(info.message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } else {
      toast.success(info.message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  }
  return { onFormSubmit, errorMsg, signUpFields };
}
