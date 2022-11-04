import { Modal, Button } from "flowbite-react";
import { toggleNewModal } from "./store";
import useGlobalStore from "./store";
import { useState, useRef, useEffect } from "react";

const NewModal = () => {
    const isShow = useGlobalStore(state => state.showNewModal);
    const token = useGlobalStore(state => state.accessToken);
    const initialState = {
        name: '', description: '', expired_date: '', image: undefined,
    }
    const [formData, setFormData] = useState(initialState);
    
    const handleFormChange = (e) => {
        setFormData({
            ...formData, 
            [e.target.name]: e.target.value,
            image: e.target.files ? e.target.files[0] : formData.image
        });
    }

    const handleFormSubmit = (e) => {
        e.preventDefault();
        
        const raw = {
            "name": formData.name,
            "description": formData.description,
            "expired_date": formData.expired_date,
            "image": formData.image
        };
        var submitData = new FormData();
        submitData.set("name", formData.name);
        submitData.set("description", formData.description);
        submitData.set("expired_date", formData.expired_date);
        submitData.set("image", formData.image);

        fetch('https://betis23-oprec.herokuapp.com/roti/', {
            method: 'POST',
            body: submitData,
            headers: {
                'Authorization': `Bearer ${token}`,
            },  
        })
        .then(response => console.log(`request made to server:`, submitData, response.text().then(a => console.log(a))))
        .catch(err => console.log(err));
    }

    useEffect(() => {
        setFormData(initialState);
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
                        <img src={formData.image ? URL.createObjectURL(formData.image) : ""}></img>
                    </Modal.Body>
                    <Modal.Footer className="flex place-content-between">
                        <Button color="dark" onClick={toggleNewModal}>
                            <p className="px-2">Cancel</p>
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

export default NewModal;