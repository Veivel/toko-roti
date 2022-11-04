import { subtleCardClasses } from "../../styles/styles";
import Image from 'next/image'
import { Button } from "flowbite-react";
import styles from '../../styles/Home.module.css';
import { useState } from "react";


const Register = () => {
    
    // local form state
    const initialState = {
        'username': '', 'email': '', 'password': ''
    }
    const [form, setForm] = useState(initialState);
    const [currentId, setCurrentId] = useState();

    const saveToLocalStorage = (accessToken) => {
        try {
          localStorage.setItem('accessToken', accessToken);
        } catch (e) {
          console.error(e);
        }
    };


    const handleFormChange = (event) => {
        setForm(prev => ({...prev, [event.target.name]: event.target.value}));
    }
    
    const handleFormSubmit = (event) => {
        event.preventDefault()
        // submit credentials
        fetch('https://betis23-oprec.herokuapp.com/auth/registration/', {
          method: 'POST',
          body: JSON.stringify({
              'username': form.username,
              'email': form.email,
              'password1': form.password,
              'password2': form.password,
          }),
          headers: {
              'Content-type': 'application/json;',
          },  
        })
        .then(response => response.json()) // receive access token
        .then(data => {
            console.log(data);
            setCurrentId(data.user.pk);
            saveToLocalStorage(data.access_token);
        });
    }

    const labelClasses = "text-white my-3";
    const inputClasses = "text-black my-3 rounded-xl";
    return (
        <div className={styles.container}>
            <div className={styles.main}>
            {currentId ? <h2>Register success! Your ID is: {currentId}</h2> : <h2></h2>}
                <div className={subtleCardClasses}>
                    <h1 className='text-center font-semibold md:font-large'>register now!</h1>
                    <br/>
                <form 
                    id="login"
                    onChange={event => handleFormChange(event)} 
                    onSubmit={event => handleFormSubmit(event)}  
                    className="text-black"
                >
                    <div className="grid grid-cols-2">
                        <label className={labelClasses}> Username: </label>
                        <input className={inputClasses} type="text" name="username" value={form.username}/>
                        <label className={labelClasses}> E-mail: </label>
                        <input className={inputClasses} type="text" name="email" value={form.email}/>
                        <label className={labelClasses}> Password: </label>
                        <input className={inputClasses} type="password" name="password" value={form.password}/>
                        <Button type="submit" className='col-span-2 my-5'>Submit</Button>
                    </div>
                </form>
                </div>
            </div>
        </div>
    )
}

export default Register;