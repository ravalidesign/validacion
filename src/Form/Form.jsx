import React, { useState } from "react";
import "./Form.css";
import Input from "../Input/Input";

// inicializacion del estado
const initialState = {
  username: "",
  password: "",
  confirmPass: "",
  email: "",
  errors: {
    username: undefined,
    password: undefined,
    confirmPass: undefined,
    email: undefined
  },
  messageErrors: {
    username: undefined,
    password: undefined,
    confirmPass: undefined,
    email: undefined
  }
};

//El estado empieza con el objeto fields
const Form = () => {
  const [fields, setFields] = useState(initialState);

  //función para validar la longitud de caracteres
  const validationLength = (fieldName, min, max) => {
    if (fields[fieldName].length < min) {
      return {
        error: true,
        msg: `must be at least ${min} characters`
      };
    } else if (fields[fieldName].length > max) {
      return {
        error: true,
        msg: `must be less than ${max} characters`
      };
    } else {
      return {
        error: false,
        msg: null
      };
    }
  };

  //Funciòn para validación del email
  const validationEmail = () => {
    const re = /^[^@]+@[^@]+\.[a-zA-Z]{2,}$/;
    if (re.test(fields.email)) {
      return {
        error: false,
        msg: null
      };
    }

    return {
      error: true,
      msg: `email is not valid`
    };
  };

  //Funcion validar que las contraseñas sean iguales
  const validConfirmpass = () => {
    const samePassword = fields.password === fields.confirmPass;

    if (fields.confirmPass !== null) {
      const confirmPass = validationLength("confirmPass", 6, 15);
      if (confirmPass.error) {
        return confirmPass;
      }

      if (samePassword) {
        return {
          error: false,
          msg: null
        };
      }

      return {
        error: true,
        msg: "Passowrd do not match"
      };
    }
  };

  //Función que se aplica al dar click en el boton de submit

  function handleSubmit(e) {
    e.preventDefault();
    const username = validationLength("username", 6, 15);
    const password = validationLength("password", 6, 15);
    const email = validationEmail();
    const confirmPassErrors = validConfirmpass();

    setFields({
      ...fields,
      errors: {
        ...fields.errors,
        username: username.error,
        password: password.error,
        confirmPass: confirmPassErrors.error,
        email: fields.confirmPass !== null ? email.error : false
      },
      messageErrors: {
        ...fields.messageErrors,
        username: username.msg,
        password: password.msg,
        confirmPass: confirmPassErrors.msg,
        email: email.msg
      }
    });
  }

  const handlerFields = (name, value) => {
    setFields({ ...fields, [name]: value });
  };

  return (
    <div className="form-container">
      <form className="form" id="form" onSubmit={handleSubmit}>
        <h2> Register with us </h2>
        <Input
          value={fields.username}
          onChange={handlerFields}
          label="Username"
          name="username"
          placeholder="Enter username"
          type="text"
          error={fields.errors.username}
          messageError={fields.messageErrors.username}
        />
        <Input
          value={fields.email}
          onChange={handlerFields}
          label="Email"
          name="email"
          placeholder="Enter  email"
          type="text"
          error={fields.errors.email}
          messageError={fields.messageErrors.email}
        />
        <Input
          value={fields.password}
          onChange={handlerFields}
          label="Password"
          name="password"
          placeholder="Enter password"
          type="teext"
          error={fields.errors.password}
          messageError={fields.messageErrors.password}
        />
        <Input
          value={fields.confirmPass}
          onChange={handlerFields}
          label="Confirmar password"
          name="confirmPass"
          placeholder="Enter confirm password"
          type="text"
          error={fields.errors.confirmPass}
          messageError={fields.messageErrors.confirmPass}
        />
        <button className="button" type="submit">
          {" "}
          Submit{" "}
        </button>
      </form>
    </div>
  );
};
export default Form;
