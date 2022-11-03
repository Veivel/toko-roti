import { subtleCardClasses } from "../../styles/styles";
import Head from 'next/head'
import Image from 'next/image'
import styles from '../../styles/Home.module.css';
import Link from 'next/link';

const Register = () => {
    return (
        <div className={styles.container}>
            <div className={styles.main}>
                <div className={subtleCardClasses}>
                    <h1 className='text-center font-semibold md:font-large'>register:</h1>
                    <br/>
                    <p>....</p>
                    <form></form>
                </div>
            </div>
        </div>
    )
}

export default Register;