import { useContext, useRef, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { AuthContext } from "../auth/authContext";
import { types } from '../types/types';
import { Link } from "react-router-dom";


// TODO:SING IN GOOGLE
// https://www.youtube.com/watch?v=OhS0wN5Y6mE
// https://developers.google.com/identity/gsi/web/guides/display-button#javascript

// Para el backend ¿? https://github.com/googleapis/google-api-nodejs-client
// OJO ahora es google identity



function LoginPage() {

    const email = useRef();
    const pass = useRef();
    const feedback = useRef();
    const authContext = useContext(AuthContext);
    const {dispatch} = authContext;
    const navigate = useNavigate();

    /*
    const handleCredentialResponse = (response) => {
        console.log("Encoded JWT ID token: " + response.credential);
    }

    useState(()=>{
        google.accounts.id.initialize({
            client_id: "YOUR_GOOGLE_CLIENT_ID",
            callback: this.handleCredentialResponse
          });
          google.accounts.id.renderButton(
            document.getElementById("buttonDiv"),
            { theme: "outline", size: "large" }  // customization attributes
          );
          google.accounts.id.prompt(); // also display the One Tap dialog
    },[]);
    */

    const submitLogin = async (event) => {
        event.preventDefault();
        feedback.current.innerHTML = "";

        try {
            const response = await fetch('http://localhost:3333/auth/login', {
            method: 'POST',
            body: JSON.stringify({email: email.current.value, pass: pass.current.value}),
            headers:{
                'Content-Type': 'application/json'
              }
            });
            const data = await response.json();
            
            if(!response.ok) {
                feedback.current.innerHTML = "<p>Error en el login:</p> <ul>";
                for (let error of data.errors) {
                    feedback.current.innerHTML += '<li>'+error.msg+'</li>';
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
            <h3>Login</h3>
            {/*}
            <div id="g_id_onload"
                data-client_id="506924854352-a5ek884s129e9cp1eohfjo09sivivsdr.apps.googleusercontent.com"
                data-login_uri="https://localhost:3000/auth/google-login"
                data-auto_prompt="false">
            </div>
            <div class="g_id_signin"
                data-type="standard"
                data-size="large"
                data-theme="outline"
                data-text="sign_in_with"
                data-shape="rectangular"
                data-logo_alignment="left">
            </div>
            */}
            <p>Si no tienes usuario <Link to="/register">registrate</Link></p>
            <form onSubmit={(event) => submitLogin(event)}>
                <input ref={email} type="email" name="email" className="form-control mb-2" placeholder="email" />
                <input ref={pass} type="password" name="pass" className="form-control mb2" placeholder="contraseña" />
                <p ref={feedback} className="warning"></p>
                <input type="submit" className="btn btn-success" />                
            </form>
                
        </div>        
    )

}

export default LoginPage;