import { Dispatch, SetStateAction, useEffect, useRef } from "react";

function useCloseContainerWhenClickOutside<S,T extends HTMLElement>({setState , property} : {setState: Dispatch<SetStateAction<S>>, property?: string}) {
    const containerRef = useRef<T | null>(null);
    useEffect(() => {
        const handleClickOutside = (event: { target: any; }) => {
            if(containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setState((state) => {
                    if(typeof state === "object" && property && state != null) {
                        return {...state, [property]: false};
                    }
                    return false as S;
                });
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.addEventListener("mousedown", handleClickOutside);
        }
    },[setState]);
    return {containerRef};
}

export default useCloseContainerWhenClickOutside;