import { useLocation } from "react-router-dom"
import Message from "../layout/Message/Message"
import Container from "../layout/Container/Container"
import LinkButton from '../layout/Button/LinkButton'
import styles from './Projects.module.css'
import { useState, useEffect } from "react"
import ProjectCard from "./Projects/ProjectCard"
import Loading from "../layout/Loading/Loading"


const Projects = () => {

    const [projects, setProjects] = useState([])
    const [removeLoading, setRemoveLoading ] = useState(false)

    let location = useLocation()
    let message = ''

    if(location.state){
        message = location.state.message
    }
useEffect(() => {
    setTimeout(() => {
        fetch('http://localhost:5000/projects', {
            method: 'GET',
            headers: {
                'Contenty-Type': 'application/json'
            },
        })
            .then((res) => res.json())
            .then( data => {
                console.log(data)
                setProjects(data)
                setRemoveLoading(true)
            })
            .catch((err) => console.log(err)) 
    }, 1500);
}, [])

    return (
        <div className={styles.project_container}>
            <div className={styles.title_container}>
                <h1>My Projects</h1>
                <LinkButton to="/new-project" text="Criar Projeto" />
            </div>
            {message && <Message type="success" msg={message} />}
            <Container className="start" >
                {projects.length > 0 && 
                    projects.map((project) => (
                        <ProjectCard 
                            id={project.id}
                            name={project.name}
                            budget={project.budget}
                            category={project.category ? project.category.name : 'Categoria não definida'}
                            key={project.id}
                        />
                    ))
                }
                {!removeLoading && <Loading />}
                {removeLoading && projects.length === 0 && (
                    <p>Não há projetos cadastrados</p>
                )}
            </Container>

        </div>
    )
}

export default Projects