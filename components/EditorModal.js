import { Button, Modal } from "flowbite-react";
import { useEffect, useState, useRef } from "react";
import useGlobalStore, { toggleEditModal, setBreadArray } from "./store";
import axios from "axios";
import { getDisplayName } from "next/dist/shared/lib/utils";

const EditorModal = () => {
    const token = useGlobalStore(state => state.accessToken);
    const bread = useGlobalStore(state => state.targetBread);
    const isShow = useGlobalStore(state => state.showEditModal);
    const accessToken = useGlobalStore(state => state.accessToken);

    const [displayedImgSrc, setDisplayedImgSrc] = useState(bread.image);

    useEffect(() => {
        console.log('toggling modal');
    }, [isShow]);

    const initialState = {
        'name': bread.name, 
        'description': bread.description, 
        'expired_date': bread.expired_date, 
        'image': undefined,
    };

    const [formData, setFormData] = useState(initialState);

    useEffect(() => {
        setFormData(initialState);
        setDisplayedImgSrc(bread.image);
    }, [bread]);

    useEffect(() => {
        // console.log(formData.image)
        setDisplayedImgSrc(formData.image ? URL.createObjectURL(formData.image) : bread.image)
    }, [formData.image]);

    const updateBreadData = () => {
        fetch('https://betis23-oprec.herokuapp.com/roti/', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then(response => response.json())
        .then(res => {
            setBreadArray(res.data);
            console.log("bread array updated by editorModal")
        })
        toggleEditModal();
    }

    function handleDelete(event, id) {
        console.log("deleting", id);
        ax.delete(`https://betis23-oprec.herokuapp.com/roti/${id}`)
        .then(response => console.log(response));

        updateBreadData();
    }

    const handleFormChange = (e) => {
        setFormData({
            ...formData, 
            [e.target.name]: e.target.value,
            image: e.target.files ? e.target.files[0] : formData.image
        });
    }

    const ax = axios.create({
        baseURL: 'https://betis23-oprec.herokuapp.com',
        headers: {
            'Authorization': `Bearer ${accessToken}`
        }
    });

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
        .catch(err => console.log(err));

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
                        <img src={displayedImgSrc}></img>
                    </Modal.Body>
                    <Modal.Footer className="flex place-content-between">
                        <Button color="failure" onClick={e => handleDelete(e, bread.id)}>
                            <img src="/icons/trashcan-white.svg" width={20} height={20}></img>
                            <p className="px-2">Delete</p>
                        </Button>
                        <Button type="submit" color="success"> 
                            <p className="px-2">Submit</p>
                            <img src="/icons/submit.svg"></img>
                        </Button>
                    </Modal.Footer>
                </form>
            </Modal>
        </div>
    );
}

export default EditorModal;