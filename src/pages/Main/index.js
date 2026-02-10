import { useState, useCallback, useEffect } from 'react';
import {Container, Form, SubmitButton, List, DeleteButton} from './styles'
import {FaGithub, FaPlus, FaSpinner, FaBars, FaTrash} from 'react-icons/fa';
import { Link } from 'react-router-dom';

import api from '../../services/api';

export default function Main() {

    const [newRepositorio, setNewRepositorio] = useState('');
    const [repositorios, setRepositorios] = useState(() => {


    const repoStorage = localStorage.getItem('@repositorios');
    return repoStorage ? JSON.parse(repoStorage) : [];
});

    const [loading, setLoading] = useState(false);
    const [alert, setAlert] = useState(null);



    // Salvar alterações

     useEffect(() => {
        localStorage.setItem('@repositorios', JSON.stringify(repositorios));
    }, [repositorios]);



    const handleSubmit= useCallback((e)=>{
        e.preventDefault(); //não da reload na pagina quando clicar no botão de enviar

        async function submit() {
            setLoading(true);
            setAlert(null);
            try {

                if (newRepositorio === "") {
                    throw new Error("Você precisa indicar um repositório");
                }


                const response = await api.get(`repos/${newRepositorio}`)

                const hasRepo = repositorios.find(repo => repo.name === newRepositorio);

                if (hasRepo) {
                    throw new Error("Registro Duplicado");
                    
                }

                const data = {
                    name: response.data.full_name,
                };
            
                setRepositorios([...repositorios, data]);
                setNewRepositorio('');
            
            }catch(error){
                    setAlert(true);
                    console.log(error);
                }finally {
                    setLoading(false);  
                }
        }

        submit();

    }, [newRepositorio, repositorios]);





    function handleinputChange(e) {
        setNewRepositorio(e.target.value);
        setAlert(null);

    }

    const handleDelete = useCallback((repo) => {
    const find = repositorios.filter(r => r.name !==repo);
    setRepositorios(find);
    }, [(repositorios)]);

    return (
        <Container>
            <h1>
                <FaGithub size={25}/>
                Meus Repositórios
            </h1>

        <Form onSubmit={handleSubmit} error={alert}>
            <input type='text' 
            placeholder='Adiconar Repositórios'
            value={newRepositorio}
            onChange={handleinputChange}
            />
        
            <SubmitButton loading={loading ? 1  : 0}> {

                loading ? (<FaSpinner color='#FFF' size={14} />)  : (
                <FaPlus color='#FFF' size={14} />
                )
            }
            </SubmitButton>
        </Form>



        <List>
            {repositorios.map(repo => (
                <li key={repo.name}>
                    <span>
                    <DeleteButton onClick={()=>{handleDelete(repo.name)}}>
                        <FaTrash size={14}/>
                    </DeleteButton>
                    {repo.name}
                    </span>
                    <Link to={`/repositorio/${encodeURIComponent(repo.name)}`}>
                        <FaBars size={20}/>
                    </Link>
                </li>
            ))}
        </List>

        </Container>





    )
}