import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import './App.css';
import Container from './components/layout/Container/Container';
import Footer from './components/layout/Footer/Footer';
import NavBar from './components/layout/NavBar/NavBar';
import Company from './components/pages/Company';
import Contact from './components/pages/Contact';
import Home from './components/pages/Home/Home';
import Project from './components/pages/Project/Project';
import Projects from './components/pages/Projects';
import NewProject from './components/pages/Projects/NewProject';

const App = () => {

  return (
    <Router>
      <NavBar />
      <Container customClass="minHeight">
        <Routes>
            <Route exact path='/' element={<Home />} />
            <Route path='/contact' element={<Contact />} />
            <Route path='/company' element={<Company />} />
            <Route path='/projects' element={<Projects />} />
            <Route path='/new-project' element={<NewProject />} />
            <Route path='/project/:id' element={<Project />} />
        </Routes>
      </Container>
      <Footer />
    </Router>

  )
}

export default App;
