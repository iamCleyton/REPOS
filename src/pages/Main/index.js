import { useState, useCallback } from 'react';
import {Container, Form, SubmitButton} from './styles'
import {FaGithub, FaPlus} from 'react-icons/fa';

import api from '../../services/api';

export default function Main() {

    const [newRepositorio, setNewRepositorio] = useState('');
    const [repositorios, setRepositorios] = useState([]);
    

     const handleSubmit= useCallback((e)=>{
        e.preventDefault(); //não da reload na pagina quando clicar no botão de enviar

        async function submit() {
            
            const response = await api.get(`repos/${newRepositorio}`)

            const data = {
                name: response.data.full_name,
            }

            setRepositorios([...repositorios, data]);
            setNewRepositorio('');

        }

        submit();

     }, [newRepositorio, repositorios]);





    function handleinputChange(e) {
        setNewRepositorio(e.target.value);

    }


    return (
        <Container>
            <h1>
                <FaGithub size={25}/>
                Meus Repositórios
            </h1>

        <Form onSubmit={handleSubmit}>
            <input type='text' 
            placeholder='Adiconar Repositórios'
            value={newRepositorio}
            onChange={handleinputChange}
            />
        
            <SubmitButton>
                <FaPlus color='#FFF' size={14} />
            </SubmitButton>
        </Form>

        </Container>





    )
}