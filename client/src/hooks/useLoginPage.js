import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { login } from "../redux/actions/userActions";
import useValidate from "./useValidate";

export default function useLoginPage() {
  const [loginUser, setLoginUser] = useState({ email: "", password: "" });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loginFields = [
    {
      type: "email",
      onChange,
      labelClassName: "form-label font-weight-bold",
      labelName: "Email address",
      errorClassName: "form-text text-danger",
      className: "form-control",
      value: loginUser.email,
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
      value: loginUser.password,
      autoFocus: false,
      name: "password",
      placeholder: "Password",
    },
  ];
  const onFormSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      setErrorMsg(validationError);
    } else {
      dispatch(login(loginUser.email, loginUser.password, navigate, setToast));
    }
  };
  function setToast(message) {
    toast.error(message, {
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
  const { validate, validationError } = useValidate("login", {
    email: loginUser.email,
    password: loginUser.password,
  });
  const [errorMsg, setErrorMsg] = useState({ email: null, password: null });
  function onChange(e) {
    const { name, value } = e.target;
    setLoginUser({ ...loginUser, [name]: value });
  }
  return { errorMsg, onFormSubmit, loginFields };
}
