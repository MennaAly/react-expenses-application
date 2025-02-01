import { Dispatch, SetStateAction, useEffect, useRef } from "react";

function useCloseContainerWhenClickOutside(setCloseContainer: Dispatch<SetStateAction<boolean | undefined>>) {
    const containerRef = useRef<HTMLDivElement | null>(null); // Explicitly define the type
    useEffect(() => {
        const handleClickOutside = (event: { target: any; }) => {
            if(containerRef.current && !containerRef.current.contains(event.target)) {
                setCloseContainer(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.addEventListener("mousedown", handleClickOutside);
        }
    },[]);
    return {containerRef};
}

export default useCloseContainerWhenClickOutside;