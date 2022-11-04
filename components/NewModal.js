import { Modal, Button } from "flowbite-react";
import { toggleNewModal } from "./store";
import useGlobalStore, { setBreadArray } from "./store";
import { useState, useRef, useEffect } from "react";
import axios from "axios";
import Image from "next/image";

const NewModal = () => {
    const isShow = useGlobalStore(state => state.showNewModal);
    const token = useGlobalStore(state => state.accessToken);
    const initialState = {
        name: '', description: '', expired_date: '', image: undefined,
    }
    
    // local modal state
    const [formData, setFormData] = useState(initialState);
    const [errorMsg, setErrorMsg] = useState("");

    const ax = axios.create({
        baseURL: 'https://betis23-oprec.herokuapp.com',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
    
    const handleFormChange = (e) => {
        setFormData({
            ...formData, 
            [e.target.name]: e.target.value,
            image: e.target.files ? e.target.files[0] : formData.image
        });
    }

    const updateBreadData = () => {
        ax.get('/roti/')
        .then(res => {
            setBreadArray(res.data.data);
            console.log("bread array updated!");
        })

    }

    const handleFormSubmit = (e) => {
        e.preventDefault();
        var submitData = new FormData();
        submitData.set("name", formData.name);
        submitData.set("description", formData.description);
        submitData.set("expired_date", formData.expired_date);
        submitData.set("image", formData.image);

        ax.post('https://betis23-oprec.herokuapp.com/roti/', submitData)
        .then(r => {
            console.log(r);
            updateBreadData();
            toggleNewModal();
        })
        .catch(err => {
            console.log(err.response.data)
            setErrorMsg("Invalid data.")
        });

    }

    // reset modal everytime it's closed/opened
    useEffect(() => {
        setFormData(initialState);
        setErrorMsg("");
    }, [isShow]);

    return (
        <div>
            <Modal size="xl" show={isShow} onClose={toggleNewModal}>
                <Modal.Header>
                    fresh bread from the oven!
                </Modal.Header>

                <form onSubmit={e => handleFormSubmit(e)} encType='multipart/form-data'>
                    <Modal.Body className="text-black grid grid-cols-2">
                        <label>Name: </label>
                        <input
                            type="text" 
                            name="name" 
                            value={formData.name}
                            onChange={e => handleFormChange(e)}
                        />
                        <label>Description: </label>
                        <input
                            type="text" 
                            name="description" 
                            value={formData.description}
                            onChange={e => handleFormChange(e)}
                        />
                        <label>Expiring Date: </label>
                        <input
                            type="date" 
                            name="expired_date" 
                            value={formData.expired_date}
                            onChange={e => handleFormChange(e)}   
                        />
                        <input
                            className="flex items-stretch py-10"
                            type="file"
                            name="image"
                            accept="image/*"
                            ref={useRef(formData.image)}
                            onChange={e => handleFormChange(e)}
                        />        
                        <Image 
                            src={formData.image ? URL.createObjectURL(formData.image) : "/../public/placeholder.jpeg"} 
                            width={200} 
                            height={200}
                            alt="uploaded picture"
                        ></Image>
                    </Modal.Body>
                    <p className="text-black text-center">{errorMsg}</p>

                    <Modal.Footer className="flex place-content-between">
                        <Button color="dark" onClick={toggleNewModal}>
                            <p className="px-2">Cancel</p>
                        </Button>
                        <Button type="submit" color="success"> 
                            <p className="px-2">Submit</p>
                            <Image src="/icons/submit.svg" width={20} height={20}></Image>
                        </Button>
                    </Modal.Footer>
                </form>

            </Modal>
        </div>
    );
}

export default NewModal;