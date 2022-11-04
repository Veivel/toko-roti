import Head from 'next/head'
import Image from 'next/image'
import axios from 'axios';
import { use, useEffect, useState } from 'react';
import styles from '../styles/Home.module.css';

import { LoadingSpinner } from '../components/Placeholders';
import ItemCard from '../components/ItemCard';
import EditorModal from '../components/EditorModal';
import NewModal from '../components/NewModal';
import useGlobalStore, { 
    setAccessToken, 
    setBreadArray, 
    setTargetBread, 
    toggleEditModal, 
    toggleNewModal
} from '../components/store';

const Home = () => {
    // global states
    const token = useGlobalStore(state => state.accessToken);
    const breadArray = useGlobalStore(state => state.breadArray);

    // load accessToken 
    function loadLocalToken() {
        const token = localStorage.getItem('accessToken');
        return token;
    }

    const ax = axios.create({
        baseURL: 'https://betis23-oprec.herokuapp.com',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });

    const updateBreadData = () => {
        ax.get('/roti/')
        .then(res => {
            setBreadArray(res.data.data);
        })
    }

    // show the Edit Modal, with 'targetBread' as the card which called this function
    const handleEditButton = (targetId) => {
        const target = {};
        for (const bread of breadArray) {
            if (bread.id === targetId) {
                setTargetBread(bread);
            }
        }

        toggleEditModal();
    }

    // client-side effect, because server cannot access localStorage.
    useEffect(() => {
        if (token === "none") {
            setAccessToken(loadLocalToken())
        }

    }, []);

    useEffect(() => {
        if (token !== "none") {
            const data = updateBreadData();
        }

    }, [token]);

    const gridClass = "grid md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3";
    return (
        <div className={styles.container}>
            <Head>
                <title>Toko Roti</title>
                <meta name="description" content="Dashboard untuk sebuah toko roti." />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            
            <main className={styles.main}>
                <h1 className="font-bold text-5xl">selamat datang di toko rotiku</h1>
                {breadArray && breadArray.length == 0 ? <p>belum ada roti :(</p> : <></>}
                <EditorModal />
                <NewModal />
                <div>
                    <div className={gridClass}>
                        {token ? 
                            Array.isArray(breadArray) ? 
                                breadArray
                                .sort((a, b) => a.id - b.id)
                                .map(item => <ItemCard key={item.id} bread={item} editHandler={handleEditButton}/>) 
                            : <LoadingSpinner />
                        : <p className='col-span-3 place-items-center'>Login first!{window.location.replace("/login/")}</p>}
                    </div>
                </div>
            </main>
        </div>
  )
}

export default Home;
