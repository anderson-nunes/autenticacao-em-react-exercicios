import { useState } from "react"

export const useForm = (estateInicial) => {

  const [form, setForm] = useState(estateInicial)

  const onChange = (e) => {

    const { value, name } = e.target
    setForm({ ...form, [name]: value })
  }
  return { form, onChange }

}