import { Button, Modal } from "flowbite-react";
import { useEffect, useState, useRef } from "react";
import useGlobalStore, { toggleEditModal } from "./store";

const EditorModal = () => {
    const bread = useGlobalStore(state => state.targetBread);
    const isShow = useGlobalStore(state => state.showEditModal);

    const initialState = {
        'name': bread.name, 
        'description': bread.description, 
        'expired_date': bread.expired_date, 
        'image': bread.image,
    };
    const [formData, setFormData] = useState(initialState);

    useEffect(() => {
        setFormData(initialState);
    }, [bread]);

    const handleFormChange = () => {
        return;
    }

    return (
        <div>
            <Modal size="xl" show={isShow} onClose={toggleEditModal}>
                <Modal.Header>Edit {bread.name}</Modal.Header>
                <form>
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
                        className="col-span-2 flex flex-row-reverse"
                        type="file"
                        name="file_upload"
                        accept="image/*"
                        ref={useRef(formData.image)}
                        onChange={e => handleFormChange(e)}
                    />
                    <input 
                        type="submit" 
                        value="Submit Bread!"
                    />                     
                    {formData.image ? <p>file: {formData.image.name} {formData.image.size}</p> : <p>File not uploaded.</p>}
                    {/* {formData.image ? <img src={URL.createObjectURL(formData.image)}></img> : <p>None</p>} */}
                </Modal.Body>
                <Modal.Footer className="flex place-content-between">
                    <Button color="failure">
                        <img src="/icons/"></img>
                        <p className="px-2">Delete</p>
                    </Button>
                    {/* TODO */}
                    <Button type="submit" color="success"> 
                        <p className="px-2">Submit</p>
                        <img src="/icons/"></img>
                    </Button>
                </Modal.Footer>
                </form>
            </Modal>
        </div>
    );
}

export default EditorModal;