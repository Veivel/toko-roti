import { Button, Card } from "flowbite-react";
import Image from "next/image";
import { useEffect, useState, useRef } from "react";
import useGlobalStore from "./store";

const ItemCard = ({ bread, editHandler }) => {
    // state will contain bread
    const [state, setState] = useState(bread);
    const breadArray = useGlobalStore(state => state.breadArray);

    // update state everytime breadArray gets updated/refreshed/fetched
    useEffect(() => {
        const newBread = breadArray.filter(item => item.id === bread.id);
        setState(newBread[0]);
    }, [breadArray]);
    
    const handleEditButton = (event) => {
        editHandler(bread.id);
    }
    
    if (!state) {
        return<></>;  
    }  
    return (
        <div className="ItemCard p-4">
            <Card className="bg-clip-border max-w-sm bg-gradient-to-br from-zinc-50 to-stone-100 shadow-xl">
                <Image src={state.image} className="object-cover h-48 max-w-sm rounded-lg shadow-lg" width={310} height={200}/>
                <div className="grid grid-cols-2">
                    <div>
                        <h4 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
                            {state.name}
                        </h4>
                        <p className="text-gray-600 text-xs">Expiring: {state.expired_date}</p>
                    </div>
                    <div rowSpan={2} className="row-span-2 py-2 my-5 self-center place-self-end">
                        <Button color="dark" onClick={event => handleEditButton(event)}>
                            <img src="/icons/pencil-white.svg" width="20" height="20"/>
                            <p className="px-2 text text-m"> Edit</p>
                        </Button>
                    </div>
                    <div>
                    <p className="font-normal text-gray-800 dark:text-gray-700">
                        {state.description}
                    </p>
                    </div>
                </div>
            </Card>
        </div>
    );
}

export default ItemCard;