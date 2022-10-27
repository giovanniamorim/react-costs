import { useState } from 'react'
import Input from '../../layout/forms/Input'
import SubmitButton from '../../layout/forms/SubmitButton'
import styles from './ServiceForm.module.css'

const ServiceForm = ({handleSubmit, btnText, projectData}) => {

    const [service, setService] = useState({})

    const submit = (e) => {
        e.preventDefault()
        projectData.services.push(service)
        handleSubmit(projectData)
    }

    const handleChange = (e) => {
        setService({...service, [e.target.name]: e.target.value})
    }

    return (
        <form onSubmit={submit} className={styles.form}>
            <Input
                type="text"
                text="Nome do Serviço"
                name="name"
                placeholder="Insira o nome do serviço"
                handleOnChange={handleChange}
            />
            <Input
                type="text"
                text="Custo"
                name="cost"
                placeholder="Insira o custo do serviço"
                handleOnChange={handleChange}
            />
            <Input
                type="text"
                text="Descrição do Serviço"
                name="description"
                placeholder="Insira o descrição do serviço"
                handleOnChange={handleChange}
            />

            <SubmitButton text={btnText} />
        </form>
    )
}


export default ServiceForm