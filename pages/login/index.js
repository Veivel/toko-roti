import Head from 'next/head'
import Image from 'next/image'
import styles from '../../styles/Home.module.css';
import Link from 'next/link';

import { useGlobalStore } from '../../components/store';
import { useState } from 'react';

const Login = () => {
  // zustand global state
  const currentToken = useGlobalStore(state => state.accessToken);
  const setAccessToken = token => useGlobalStore.setState({ accessToken: token });

  // local form state
  const initialState = {
    'username': 'dummyguy3', 'email': 'test1234@gmail.com', 'password': '', 'id': '17'
  }
  const [form, setForm] = useState(initialState);

  // save token to local storage (probably not secure) for user access
  const saveToLocalStorage = (accessToken) => {
    try {
      localStorage.setItem('accessToken', JSON.stringify(accessToken));
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

  return (
    <div className={styles.container}>
      <Head>
        <title>Login</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          selamat datang di toko rotiku
        </h1>

        {/* {window.location.replace("/")} */}
        {currentToken !== "none" ? <h2>Login success! Loading...</h2> : <h2></h2>}
        <div className={styles.grid}>
          <div className={styles.card}>
            <h2>yuk login &rarr;</h2>
            <form onChange={event => handleFormChange(event)} onSubmit={event => handleFormSubmit(event)}>
              <label> ID: </label>
              <input type="text" name="id" value={form.id} />
              <label> Username: </label>
              <input type="text" name="username" value={form.username}/>
              <label> E-mail: </label>
              <input type="text" name="email" value={form.email}/>
              <label> Password: </label>
              <input type="password" name="password" value={form.password}/>
              <input type="submit" />
            </form>
          </div>
        </div>
        <Link href="/register/">atau daftar akun dulu...</Link>
      </main>

      <footer className={styles.footer}>
        Tugas Khusus Webdev - BETIS 2023
      </footer>
    </div>
  )
}

export default Login;
