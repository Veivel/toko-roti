import { Button, Modal } from "flowbite-react";
import { useEffect, useState, useRef } from "react";
import useGlobalStore, { toggleEditModal, setBreadArray } from "./store";
import axios from "axios";
import Image from "next/image";

const EditorModal = () => {
    const token = useGlobalStore(state => state.accessToken);
    const bread = useGlobalStore(state => state.targetBread);
    const isShow = useGlobalStore(state => state.showEditModal);

    // local modal state
    const [displayedImgSrc, setDisplayedImgSrc] = useState(bread.image);
    const [errorMsg, setErrorMsg] = useState("....");

    const ax = axios.create({
        baseURL: 'https://betis23-oprec.herokuapp.com',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });

    const initialState = {
        'name': bread.name, 
        'description': bread.description, 
        'expired_date': bread.expired_date, 
        'image': undefined,
    };
    const [formData, setFormData] = useState(initialState);


    // display correct initial data for each bread
    useEffect(() => {
        setFormData(initialState);
        setDisplayedImgSrc(bread.image);
    }, [bread]);

    // change displayed image everytime formData.image changes
    useEffect(() => {
        setDisplayedImgSrc(formData.image ? URL.createObjectURL(formData.image) : bread.image)
    }, [formData.image]);

    const updateBreadData = () => {
        ax.get('/roti/')
        .then(res => {
            setBreadArray(res.data.data);
            console.log("bread array updated by editorModal")
        })
        toggleEditModal();
    }

    // delete bread with pk 'id'
    function handleDelete(event, id) {
        ax.delete(`/roti/${id}`)
        .then(response => {
            console.log("deleted", id, response);
            updateBreadData();
        });

    }

    const handleFormChange = (e) => {
        setFormData({
            ...formData, 
            [e.target.name]: e.target.value,
            image: e.target.files ? e.target.files[0] : formData.image
        });
    }

    const handleFormSubmit = (e) => {
        e.preventDefault();
        
        var submitData = new FormData();
        submitData.set("name", formData.name);
        submitData.set("description", formData.description);
        submitData.set("expired_date", formData.expired_date);
        if (formData.image) {
            submitData.set("image", formData.image);
        }

        ax.patch(`/roti/${bread.id}`, submitData)
        .then(r => {
            console.log("patch request finished", r);
            updateBreadData();
        })
        .catch(err => {
            console.log("error patching", err.response.data)
            setErrorMsg("Invalid data.")
        });

    }

    return (
        <div>
            <Modal size="xl" show={isShow} onClose={toggleEditModal}>
                <Modal.Header>Edit {bread.name}</Modal.Header>

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
                            src={displayedImgSrc ? displayedImgSrc: "/../public/placeholder.jpeg"} 
                            width={200}
                            height={200}
                            placeholder="empty"
                            alt="current bread picture"
                        ></Image>
                    </Modal.Body>
                    <Modal.Footer className="flex place-content-between">
                        <Button color="failure" onClick={e => handleDelete(e, bread.id)}>
                            <Image src="/icons/trashcan-white.svg" width={20} height={20}></Image>
                            <p className="px-2">Delete</p>
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

export default EditorModal;