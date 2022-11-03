import Head from 'next/head'
import Image from 'next/image'
import styles from '../../styles/Home.module.css';
import { subtleCardClasses } from '../../styles/styles';
import Link from 'next/link';

import useGlobalStore, { setAccessToken } from '../../components/store';
import { useState } from 'react';
import { Button } from 'flowbite-react';

const Login = () => {
  // global state
  const currentToken = useGlobalStore(state => state.accessToken);

  // local form state
  const initialState = {
    'username': '', 'email': '', 'password': '', 'id': ''
  }
  const myState = {
    'username': 'dummyguy3', 'email': 'test1234@gmail.com', 'password': 'betisbetis', 'id': '17'
  }
  const [form, setForm] = useState(initialState);

  // save token to local storage (probably not secure) for user access
  const saveToLocalStorage = (accessToken) => {
    try {
      localStorage.setItem('accessToken', accessToken);
    } catch (e) {
      console.error(e);
    }
  };

  const autoFillForm = () => {
    setForm(prev => (myState));
  }

  const handleFormChange = (event) => {
    setForm(prev => ({...prev, [event.target.name]: event.target.value}));
  }

  const handleFormSubmit = (event) => {
    event.preventDefault()
    // submit credentials
    fetch('https://betis23-oprec.herokuapp.com/auth/login/', {
      method: 'POST',
      body: JSON.stringify({
          'id': form.id,
          'username': form.username,
          'email': form.email,
          'password': form.password,
      }),
      headers: {
          'Content-type': 'application/json;',
      },  
    })
    .then(response => response.json()) // receive access token
    .then(data => {
      setAccessToken(data.access_token);
      saveToLocalStorage(data.access_token);
    });
  }

  const labelClasses = "text-white my-3";
  const inputClasses = "text-black my-3 rounded-xl";

  return (
    <div className={styles.container}>
      <Head>
        <title>Login</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        {/* <h1 className={styles.title}> */}
          {/* selamat datang di toko rotiku */}
        {/* </h1> */}

        {currentToken !== "none" ? <h2>Login success! Loading...{window.location.replace("/")}</h2> : <h2></h2>}
        <div className={subtleCardClasses}>
          <h1 className='text-center font-semibold md:font-large'>login:</h1>
          <br/>
          <div className='flex flex-row-reverse my-1'>
            <Button size="xs" color="warning" onClick={autoFillForm}>AUTOFILL</Button>
          </div>
          <form 
            id="login"
            onChange={event => handleFormChange(event)} 
            onSubmit={event => handleFormSubmit(event)}  
            className="text-black"
          >
            <div className="grid grid-cols-2">
              <label className={labelClasses}> ID: </label>
              <input className={inputClasses} type="text" name="id" value={form.id} />
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
        <br />
        <Link href="/register/" className='hover:text-sky-600'>atau daftar akun dulu...</Link>
      </main>

      <footer className={styles.footer}>
        Tugas Khusus Webdev - BETIS 2023
      </footer>
    </div>
  )
}

export default Login;
