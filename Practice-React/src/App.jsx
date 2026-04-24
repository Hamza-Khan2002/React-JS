import {Route, Routes} from 'react-router-dom'
import Home from './Pages/Home'
import About from './Pages/About'
import Gallery from './Pages/Gallery'
import Contact from './Pages/Contact'
import Navbar from './Components/Navbar'
import Notfound from './Pages/Notfound'
import FamilyGallery from './Pages/FamilyGallery'
import MyGallery from './Pages/MyGallery'
import GalleryLayout from './Pages/GalleryLayout'

const App = () => {

  return (
    <div>
      <Navbar />
      <Routes>
        <Route path='/' element = {<Home />}/>
        <Route path='/gallery' element = {<Gallery />}>
          
          <Route index element = {<GalleryLayout />} />
          <Route path='family' element = {<FamilyGallery />} />
          <Route path='My' element = {<MyGallery />} />
        </Route>
        <Route path='/about' element = {<About />}/>
        <Route path='/contact' element = {<Contact />}/>
        <Route path='*' element = {<Notfound />}/>
      </Routes>
    </div>
  )
}

export default App