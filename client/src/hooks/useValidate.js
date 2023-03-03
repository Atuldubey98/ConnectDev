const useValidate = (schemaType, schema) => {
  const check = {
    signUp: validateSignUp,
    login: validateLogin,
  };
  const error = {};
  function validateSignUp() {
    const { email, name, password } = schema;
    error.email = email.length <= 3 ? "Email should be greater than 3" : null;
    error.password =
      password.length <= 6 ? "Password should be greater than 6" : null;
    error.name = name.length <= 3 ? "Name should be greater than 6" : null;
    return (
      Object.values(error).filter((val) => typeof val === "string").length > 0
    );
  }
  function validateLogin() {
    const { email, password } = schema;
    error.email = email.length <= 3 ? "Email should be greater than 3" : null;
    error.password =
      password.length <= 6 ? "Password should be greater than 6" : null;
    console.log(error);
    return (
      Object.values(error).filter((val) => typeof val === "string").length > 0
    );
  }
  return { validate: check[schemaType], validationError: error };
};

export default useValidate;
