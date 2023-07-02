import React, { useEffect, useState } from 'react';
import './styles.css';
import { FiCornerDownLeft, FiUserPlus } from 'react-icons/fi';
import { Link, useParams } from 'react-router-dom';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import api from '../../services/api';


export default function NovoAluno(){
    const {alunoId} = useParams();

    const [id, setId] = useState(null);
    const [nome, setNome]=useState('');
    const [email, setEmail]=useState('');
    const [idade, setIdade]=useState(0);

    const token = localStorage.getItem('token');
    const history = useHistory();
    const authorization = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    useEffect(()=>{
        if(alunoId === '0')
            return;
        else
        loadAluno();
    },alunoId)
    
    async function loadAluno(){
        try
        {
            const response = await api.get(`alunos/${alunoId}`,authorization);

            setId(response.data.id);
            setNome(response.data.nome);
            setEmail(response.data.email);
            setIdade(response.data.idade);

        }catch(error){
            alert('Erro'+error)
            history.push('/alunos');
        }
    }

    async function saveOrUpdate(event){
        const data ={
            nome,
            email,
            idade
        }

        try{
            if(alunoId === '0')
            {
                await api.post('alunos',data,authorization);
            }
            else
            {
                data.id = id;
                await api.put(`alunos/${id}`,data,authorization);
            }
        }catch(e){
            alert("Deu ruim"+e);
        }
        history.push("/alunos");
    }
    return(

        <div className ="novo-aluno-container">
            <div className='content'>
                <section className='form'>
                    <FiUserPlus size={105} color='#17202a'/>
                    <h1>{alunoId === '0' ? 'Incluir Novo Aluno' : 'Atualizar Aluno'}</h1>
                    <Link className="back-link" to="/alunos">
                        <FiCornerDownLeft size={25} color='#17202a'/>
                        Retornar
                    </Link>
                </section>
                <form onSubmit={saveOrUpdate()}>
                    <input placeholder='Nome' value ={nome} onChange={e=>setNome(e.target.value)}/>
                    <input placeholder='Email'value ={email} onChange={e=>setEmail(e.target.value)}/>
                    <input placeholder='Idade'value ={idade} onChange={e=>setIdade(e.target.value)}/>
                    <button className='button' type="submit">{alunoId === '0' ? 'Incluir' : 'Atualizar'}</button>
                </form>
            </div>
        </div>

    );
}