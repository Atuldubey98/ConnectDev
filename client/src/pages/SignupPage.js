import React from "react";
import { useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoadingIndicator from "../components/LoadingIndicator";
import LoginSignUpButtons from "../components/LoginSignUpButtons";
import useSignUpPage from "../hooks/useSignUpPage";
const SignupPage = () => {
  const { onFormSubmit, errorMsg, signUpFields } = useSignUpPage();
  const { loading, error } = useSelector((state) => state.user);

  return (
    <div
      style={{
        height: "100vh",
        backgroundColor: "#a3ebb1",
      }}
      className="container-fluid d-flex justify-content-center align-items-center"
    >
      {loading ? (
        <LoadingIndicator />
      ) : (
        <form
          onSubmit={onFormSubmit}
          className="d-flex-column col-md-5 justify-content-center align-items-center border border-secondary p-5 bg-light rounded"
        >
          {signUpFields.map((field) => {
            const { labelClassName, labelName, errorClassName, ...input } =
              field;
            return (
              <div key={input.name} className="mb-3">
                <label className={labelClassName}>{labelName}</label>
                <input {...input} />
                {errorMsg[input.name] ? (
                  <small className={errorClassName}>
                    {errorMsg[input.name]}
                  </small>
                ) : null}
              </div>
            );
          })}
          <LoginSignUpButtons
            linkName={"Already have an Account ? Login !"}
            buttonName={"SignUp"}
            to={"/login"}
          />
          {error && error.data && (
            <div className="alert alert-danger" role="alert">
              {error.data.message}
            </div>
          )}
        </form>
      )}
      <ToastContainer />
    </div>
  );
};

export default SignupPage;
