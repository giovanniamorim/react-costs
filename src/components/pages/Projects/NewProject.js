import styles from './NewProject.module.css'
import ProjectForm from './ProjectForm'
import { useNavigate } from 'react-router-dom'

const NewProject = () => {

    const navigate = useNavigate()

    const createProject = (project) => {
        // iniciatlize costs and services
        project.cost = 0
        project.services = []

        fetch('http://localhost:5000/projects', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(project)
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                navigate('/projects', {state:{ message: 'Project criado com sucesso!' }})
            })
            .catch((err) => console.log(err))
    }

    return (
        <div className={styles.newproject_container}>
            <h1>Criar Projeto</h1>
            <p>Crie seu projeto e depois adicione os serviços</p>
            <p>Forlulário</p>
            <ProjectForm handleSubmit={createProject} btnText="Criar Projeto" />
        </div>

    )
}

export default NewProject