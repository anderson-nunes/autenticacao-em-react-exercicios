import React from "react";
import { useNavigate } from "react-router-dom";
import { goToFeed, goToSignUp } from "../../routes/coordinator.js";
import { FormContainer, InputContainer } from "./styled.js";
import { useForm } from "../../hooks/useForm.js";
import axios from "axios";
import { baseURL } from "../../constants/baseURL.js";
import { useProtectedPage } from "../../hooks/useProtecdPage.js";


function LoginPage() {

  useProtectedPage()

  const { form, onChange } = useForm({
    email: "",
    password: ""
  })

  const navigate = useNavigate();

  const enviarLogin = (e) => {
    // console.log(enviarLogin)
    e.preventDefault()

    const body = {
      email: form.email,
      password: form.password
    }

    axios.post(`${baseURL}/user/login`, body)
      .then((response) => {
        console.log(response)
        console.log('aquiiiii==>>', response.data.token)

        localStorage.setItem('token', response.data.token)
        goToFeed(navigate)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  return (
    <main>
      <h1>Login</h1>
      <FormContainer onSubmit={enviarLogin}>
        <InputContainer>
          <label htmlFor="email">E-mail:</label>
          <input
            id="email"
            name="email"
            type="email"
            value={form.email}
            onChange={onChange}
            required
          />
        </InputContainer>
        <InputContainer>
          <label htmlFor="password">Senha:</label>
          <input
            id="password"
            name="password"
            type="password"
            value={form.password}
            onChange={onChange}
            required
          />
        </InputContainer>
        <button type="onsubmit">Entrar</button>
        <button onClick={() => goToSignUp(navigate)}>Não tenho cadastro</button>
      </FormContainer>
    </main>
  );
}

export default LoginPage;
