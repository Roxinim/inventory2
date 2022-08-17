import React, {useState, useEffect} from 'react'
import "../../../global.css"
import {useParams} from 'react-router-dom'
import Menu from '../../../components/menu'
import Head from '../../../components/head'
import '../../../components/head/react-confirm-alert.css'
export default function SectorEdit() {
    
    const {id} = useParams();
    const [nome, setNome] = useState('');
    const [msg, setMsg] = useState('');
    useEffect(()=>{
        mostrarDados();
    },[])
    function mostrarDados(){
        let listaSetor = JSON.parse(localStorage.getItem("cd-setor"))
        listaSetor.filter(value => value.id == id).map(value =>{
            setNome(value.nome);
        })
    }
    function salvarDados(e){
        e.preventDefault();
        let index=0;
        if(nome.length<3){
            setMsg("O Nome precisa ter 3 caracteres ou mais.")
            index++
        } else if(nome===""){
            setMsg("Preencha os campos!")
            index++
        }
        if (index===0){          
            let listaSetor = JSON.parse(localStorage.getItem("cd-setor"))
            listaSetor.map((item)=>{
                if(item.id==id){
                    item.nome=nome;
                }
            })
            localStorage.setItem("cd-setor",JSON.stringify(listaSetor))
            window.location.href="/sector"
            }
        }
    return (
        <div className='dashboard-container'>
            <Menu />
            <div className='principal'>
                <Head title="Editar Setor" />
                <section className='form'>
                    <div class="form-cadastro">
                        <form onSubmit={salvarDados}>
                            <label>Nome</label>
                            <input className="input-sign-in" value={nome} onChange={e => setNome(e.target.value)} />
                            <p>{msg}</p>
                            <button className='button-login' type='submit'>Salvar</button>
                        </form>
                    </div>
                </section>
            </div>
        </div>

    )
}