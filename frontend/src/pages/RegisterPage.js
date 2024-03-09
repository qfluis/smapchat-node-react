import { useContext, useRef } from "react";
import { useNavigate } from 'react-router-dom';
import { AuthContext } from "../auth/authContext";
import { types } from '../types/types';
import { Link } from "react-router-dom";

function LoginPage() {

    const email = useRef();
    const pass = useRef();
    const nickName = useRef();
    const feedback = useRef();
    const authContext = useContext(AuthContext);
    const {dispatch} = authContext;
    const navigate = useNavigate();

    const submitRegister = async (event) => {
        event.preventDefault();
        feedback.current.innerHTML = "";

        try {
            const response = await fetch('http://localhost:3333/auth/register', {
            method: 'POST',
            body: JSON.stringify({email: email.current.value, pass: pass.current.value, nickName: nickName.current.value}),
            headers:{
                'Content-Type': 'application/json'
              }
            });
            const data = await response.json();
            
            if(!response.ok) {
                feedback.current.innerHTML = "<p>Error al registrar:</p> <ul>";
                if (data.msg) feedback.current.innerHTML += '<li>'+data.msg+'</li>';
                if (data.errors) {
                    for (let error of data.errors) {
                        feedback.current.innerHTML += '<li>'+error.msg+'</li>';
                    }
                }                
                feedback.current.innerHTML += '</ul>';  
                return;              
            }

            dispatch({
                type: types.login,
                payload: {
                    token: data.token,
                    email: data.email,
                    nickName: data.nickName
                }
            });

            navigate("/");
            
            //console.log('token', data.token);
        } catch (err) {
            feedback.current.innerHTML = "Email y/o contraseña incorrectos";
        }
        
    }


    return (
        <div className="container">
            <h3>Registrar nuevo usuario</h3>
            <p>Si ya tienes usuario <Link to="/login">haz login</Link></p>
            <form onSubmit={(event) => submitRegister(event)}>
                <input ref={email} type="email" name="email" className="form-control mb-2" placeholder="email" />
                <input ref={nickName} type="text" name="nickName" className="form-control mb-2" placeholder="nickname" />
                <input ref={pass} type="password" name="pass" className="form-control mb2" placeholder="contraseña" />
                <p ref={feedback} className="warning"></p>
                <input type="submit" className="btn btn-success" />                
            </form>
                
        </div>        
    )

}

export default LoginPage;