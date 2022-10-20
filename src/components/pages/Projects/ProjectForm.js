import Input from '../../layout/forms/Input'
import Select from '../../layout/forms/Select'
import SubmitButton from '../../layout/forms/SubmitButton'
import styles from './ProjectForm.module.css'


const ProjectForm = ({btnText}) => {

    return (
        <form className={styles.form}>
            <Input
                type="text"
                text="Nome do projeto"
                name="name"
                placeholder="Insira o nome do Projeto"   
            />
             <Input
                type="number"
                text="Orçamento do projeto"
                name="budget"
                placeholder="Insira o orçamento total"   
            />
            <Select
                name="category_id"
                text="Selecione uma categoria"
            />
            
            <SubmitButton text={btnText} />
        </form>
    )
}

export default ProjectForm