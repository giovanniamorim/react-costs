import styles from './Project.module.css'
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import Loading from '../../layout/Loading/Loading'
import Container from '../../layout/Container/Container'
import ProjectForm from '../Projects/ProjectForm'


const Project = () => {

    const { id } = useParams()
    const [project, setProject] = useState([])
    const [showProjectForm, setShowProjectForm] = useState(false)

    useEffect(() => {
        fetch(`http://localhost:5000/projects/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then((res) => res.json())
            .then((data) => {
                setProject(data)
            })
            .catch(err => console.log(err))
    }, [id])

    const toggleProjectForm = () => {
        setShowProjectForm(true)
    }

    const editProject = (project) => {
        // validation
        if(project.budget < project.cost) {
            // mensagem
        }

        fetch(`http://localhost:5000/projects/${project.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(project)
        })
            .then((res) => res.json())
            .then((data) => {
                setProject(data)
                setShowProjectForm(false)
                // mensagem
            })
            .catch((err) => console.log(err))

    }

    return(
        <>
            {project.name ? (
                <div className={styles.project_details}>
                    <Container customClass="column" >
                        <div className={styles.details_container}>
                            <h1>Projeto: {project.name} </h1>
                            <button className={styles.btn} onClick={toggleProjectForm}>
                                {!showProjectForm ? 'Editar Projeto' : 'Fechar'}
                            </button>

                            {!showProjectForm ? (
                                <div className={styles.project_info}>
                                    <p>
                                        <span>Categoria:</span> { project.category.name}
                                    </p>
                                    <p>
                                        <span>Total do Orçamento:</span> R${ project.budget}
                                    </p>
                                    <p>
                                        <span>Total do Utilizado:</span> R${ project.cost}
                                    </p>
                                    
                                </div>
                            ) : (
                                <div className={styles.project_info}>
                                    <ProjectForm
                                        handleSubmit={editProject}
                                        btnText="Concluir Edição"
                                        projectData={project}    
                                    />
                                </div>
                            )}
                        </div>
                    </Container>
                </div>
            ) : (
                <Loading />
            )}
        </>
    )
}

export default Project