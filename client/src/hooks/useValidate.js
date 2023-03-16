const useValidate = (schemaType, schema) => {
  const check = {
    signUp: validateSignUp,
    login: validateLogin,
    compose: validateCompose,
  };
  const error = {};
  function validateCompose() {
    const { header, text } = schema;
    error.header =
      header.length <= 3 ? "Header length cannot be less than 3" : null;
    error.text = text.length <= 3 ? "Text length cannot be less than 3" : null;
    return (
      Object.values(error).filter((val) => typeof val === "string").length > 0
    );
  }
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
    return (
      Object.values(error).filter((val) => typeof val === "string").length > 0
    );
  }
  return { validate: check[schemaType], validationError: error };
};

export default useValidate;
