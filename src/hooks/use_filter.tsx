'use client'
import { useEffect, useRef } from 'react';
import { useSearchParams } from 'next/navigation'

/**
 * Custom hook to parse search params and apply changes to page
 */
const useFilter = (setIsModalOpen, layoutName) => {

    const searchParams = useSearchParams();

    let filterResult = useRef("");

    useEffect(() => {

        if(searchParams){
            const filter = searchParams.get("filter");

            const component = searchParams.get("comp");
            const num = Number(component)

            if(filter && num === layoutName + 1){

                setIsModalOpen(true);
                filterResult.current = filter
                
            } else {
                filterResult.current=""
            }

           
        }
        

    }, []); // Run the effect when any of these change

    return filterResult.current
};

export default useFilter;