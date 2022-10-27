import styles from './Project.module.css'
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import Loading from '../../layout/Loading/Loading'
import Container from '../../layout/Container/Container'
import ProjectForm from '../Projects/ProjectForm'
import Message from '../../layout/Message/Message'
import ServiceForm from '../Service/ServiceForm'
import { v4 as uuidv4 } from 'uuid';
import ServiceCard from '../Service/ServiceCard'

const Project = () => {

    const { id } = useParams()
    const [project, setProject] = useState([])
    const [services, setServices] = useState([])
    const [showProjectForm, setShowProjectForm] = useState(false)
    const [showServiceForm, setShowServiceForm] = useState(false)
    const [message, setMessage] = useState()
    const [type, setType] = useState()

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
                setServices(data.services)
            })
            .catch(err => console.log("Erro aqui no get:", err))
    }, [id])

    const toggleProjectForm = () => {
        setShowProjectForm(true)
    }

    const toggleServiceForm = () => {
        setShowServiceForm(true)
    }

    const editProject = (project) => {
        
        setMessage('')
        if(project.budget < project.cost) {
            setMessage('O orçamento não pode ser superiorao custo do projeto')
            setType('error')
            return false
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
                setMessage(`O projeto de id ${project.id} foi atualizado com sucesso!`)
                setType('success')
                
            })
            .catch((err) => console.log("erro aqui:", err))

    }


    const createService = () => {
        // last service
        const lastService = project.services[project.services.length -1]
        lastService.id = uuidv4()

        const lastServiceCost = lastService.cost
        const newCost = parseFloat(project.cost) + parseFloat(lastServiceCost)

        // maximun validation
        if(newCost > parseFloat(project.budget)){
            setMessage('Orçamento ultrapassado, verifique o valor do serviço')
            setType('error')
            project.services.pop()
            return false
        }

        project.cost = newCost

        // update project

        fetch(`http://localhost:5000/projects/${project.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(project)
        })
            .then((res) => res.json())
            .then((data)=> {
                setProject(data)
                setShowServiceForm(false)
                setMessage('Serviço adicionado com sucesso ao projeto.')
                setType('success')
            })
            .catch((err) => console.log(err))
    }

    const removeService = (id, cost) => {
        const servicesUpdate = project.services.filter(
            (service) => service.id !== id
        )

        const projectUpdate = project

        projectUpdate.services = servicesUpdate
        projectUpdate.cost = parseFloat(projectUpdate.cost) - parseFloat(cost)

        fetch(`http://localhost:5000/projects/${projectUpdate.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(projectUpdate)
        })
            .then((res) => res.json())
            .then((data) => {
                setProject(projectUpdate)
                setServices(servicesUpdate)
                setMessage('Serviço removido com sucesso!')
                setType('success')
            })  
            .catch((err) => console.log(err))
    }

    return(
        <>
            {project.name ? (
                <div className={styles.project_details}>
                    <Container customClass="column" >
                        { message && <Message type={type} msg={message} />}
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
                        <div className={styles.service_form_container} >
                            <h2>Adicione um serviço:</h2>
                            <button className={styles.btn} onClick={toggleServiceForm}>
                                {!showServiceForm ? 'Adicionar Serviço' : 'Fechar'}
                            </button>
                            <div className={styles.project_info} >
                                {showServiceForm && (
                                    <ServiceForm
                                        handleSubmit={createService}
                                        btnText="Adicionar Serviço"
                                        projectData={project}
                                    />
                                ) }
                            </div>
                        </div>
                        <h2>Serviços</h2>
                        <Container customClass="start">
                                    { services.length > 0 &&
                                        services.map((service) => (
                                            <ServiceCard
                                                id={service.id}
                                                name={service.name}
                                                cost={service.cost}
                                                description={service.description}
                                                key={service.id}
                                                handleRemove={removeService}
                                            />
                                        ))
                                    }

                                    { services.length === 0 && <p> Não há serviços cadastrados</p>}
                        </Container>
                    </Container>
                </div>
            ) : (
                <Loading />
            )}
        </>
    )
}

export default Project