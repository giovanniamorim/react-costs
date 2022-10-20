import styles from './Home.module.css'
import savings from '../../../img/savings.svg'
import LinkButton from '../../layout/Button/LinkButton'

const Home = () => {

    return (
        <section className={styles.home_container}>
            <h1>Bem-vindo ao Costs</h1>
            <p>Comece a gerenciar seus projetos agora mesmo!</p>
            <LinkButton to="/new-project" text="Criar Projeto" />
            <img src={savings} alt="Crie seu Projeto" />
        </section>
    )
}

export default Home