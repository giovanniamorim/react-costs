import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import './App.css';
import Container from './components/layout/Container/Container';
import Footer from './components/layout/Footer/Footer';
import NavBar from './components/layout/NavBar/NavBar';
import Company from './components/pages/Company';
import Contact from './components/pages/Contact';
import Home from './components/pages/Home/Home';
import Projects from './components/pages/Projects';
import NewProject from './components/pages/Projects/NewProject';

const App = () => {

  return (
    <Router>
      <NavBar />
      <Container customClass="minHeight">
        <Routes>
            <Route exact path='/' element={<Home />} />
            <Route exact path='/contact' element={<Contact />} />
            <Route exact path='/company' element={<Company />} />
            <Route exact path='/projects' element={<Projects />} />
            <Route exact path='/new-project' element={<NewProject />} />
        </Routes>
      </Container>
      <Footer />
    </Router>

  )
}

export default App;
