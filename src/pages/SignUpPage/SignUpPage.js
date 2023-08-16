import { useNavigate } from "react-router-dom";
import { goToFeed, goToLogin } from "../../routes/coordinator";
import { FormContainer, InputContainer } from "./styled";
import { useForm } from "../../hooks/useForm";
import axios from "axios";
import { baseURL } from "../../constants/baseURL";

function SignUpPage() {

  const { form, onChange } = useForm({
    name: "",
    email: "",
    password: ""
  })

  const navigate = useNavigate();

  const enviarCadastro = (e) => {
    e.preventDefault()

    const body = {
      name: form.name,
      email: form.email,
      password: form.password
    }

    console.log(body)

    axios.post(`${baseURL}/user/signup`, body)
      .then((response) => {

        console.log('aquiiiii==>>', response.data.token)

        localStorage.setItem('token', response.data.token)

        goToFeed(navigate)

      })
      .catch((err) => {
        console.log(err)
      })
  }

  return (
    <main>
      <h1>Cadastro</h1>
      <FormContainer onSubmit={enviarCadastro}>
        <InputContainer>
          <label htmlFor="name">Nome:</label>
          <input
            id="name"
            name="name"
            pattern='[a-zA-Z\u00C0-\u00FF ]{3,}'
            title='Nome de usuário deve ter no mínimo 3 caracteres. Podendo conter letras, acentos e espaço'
            value={form.name}
            onChange={onChange}
            placeholder="username"
            required
          />
        </InputContainer>
        <InputContainer>
          <label htmlFor="email">E-mail:</label>
          <input
            id="email"
            name="email"
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
            value={form.password}
            onChange={onChange}
            required
          />
        </InputContainer>

        <button>Cadastrar</button>

        <button onClick={() => goToLogin(navigate)}>Já sou cadastrado</button>
      </FormContainer>
    </main>
  );
}

export default SignUpPage;