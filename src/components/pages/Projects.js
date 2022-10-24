import { useLocation } from "react-router-dom"
import Message from "../layout/Message/Message"
import Container from "../layout/Container/Container"
import LinkButton from '../layout/Button/LinkButton'
import styles from './Projects.module.css'


const Projects = () => {

    let location = useLocation()
    let message = ''

    console.log("vai o location", location);

    if(location.state){
        message = location.state.message
    }

    return (
        <div className={styles.project_container}>
            <div className={styles.title_container}>
                <h1>My Projects</h1>
                <LinkButton to="/new-project" text="Criar Projeto" />
            </div>
            {message && <Message type="success" msg={message} />}
            <Container className="start" >
                <p>my projects list</p>
            </Container>

        </div>
    )
}

export default Projects