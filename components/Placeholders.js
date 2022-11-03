import { Spinner } from "flowbite-react";

export const LoadingSpinner = () => {
    return (
        <div className="col-span-3 grid grid-cols-1 place-items-center text-center items-center">
            <br /> <br />
            <p>Your bread is being baked...</p>
            <br />
            <div className="flex items-center">
                <Spinner size="xl" aria-label="Loading" />
            </div>
        </div>
    );
}