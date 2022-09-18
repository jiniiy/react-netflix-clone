import { useState, useEffect } from "react";

export const useDebounce = (value, delay) => {// value: SearchTerm , delay: 05seconds

    const [debounceValue, setDebounceValue] = useState(value);

    useEffect(() => {
       
        const handler = setTimeout(() => {
            setDebounceValue(value)
        }, delay);

        return () => {
            clearTimeout(handler)
        };

    }, [value, delay]);

    return debounceValue;

}