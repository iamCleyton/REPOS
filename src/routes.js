
import {BrowserRouter, Route, Routes} from 'react-router-dom';

import Main from './pages/Main'
import Repositorio from './pages/Repositorio'


export default function routes() {
    return(
        <BrowserRouter>
        <Routes>
            <Route path='/' element={<Main/>}> </Route>
            <Route path='/repositorio/:repositorio' element={<Repositorio/>}> </Route>
        </Routes>
        
        </BrowserRouter>



    )
}

