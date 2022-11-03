import create from 'zustand';

const useGlobalStore = create(set => ({
    accessToken: 'none',
    user: {},
    breadArray: [],
    //
    targetBread: {},
    showEditModal: false,
    showNewModal: false,
}));

export const addBread = (bread) => {
    useGlobalStore.setState({breadArray: [...breadArray, bread]});
}

export const setBreadArray = (array) => {
    useGlobalStore.setState({breadArray: array});
}

export const setAccessToken = (token) => {
    useGlobalStore.setState({accessToken: token});
}

export const setTargetBread = (bread) => {
    useGlobalStore.setState({targetBread: bread});
}

export const toggleEditModal = () => {
    useGlobalStore.setState(prev => ({showEditModal: !prev.showEditModal}))
}

export const toggleNewModal = () => {
    useGlobalStore.setState({showNewModal: !showNewModal})
}

export default useGlobalStore;