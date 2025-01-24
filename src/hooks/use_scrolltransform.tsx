'use client'
import { useEffect, useState } from "react";

type ScrollTransform = {
    input: [
      [number, number], // first pair of numbers
      [number, number]  // second pair of numbers
    ];
    transform: number[]; // array of numbers for transformation
  };
  
  type ScrollTransformValues = {
    [key: string]: {
      desktop: ScrollTransform;
      mobile: ScrollTransform;
    };
  };

const useScrollTransform = (
    scrollHeight: number,
    viewportSize: {height: number, width:number},
    yPosition: number,
    transformMaps: ScrollTransformValues
)=>{

    const [input, setInput] = useState([0]);
    const [transform, setTransform] = useState([0]);

    useEffect(()=>{

        const isDesktop = viewportSize.width >= 960;

        
        const transformMappings: ScrollTransform = isDesktop ? transformMaps.desktop : transformMaps.mobile;

        const inputMapNew = []
        // Generate input map
        for(const inputValues of transformMappings.input){
            inputMapNew.push((yPosition * inputValues[0]) + (scrollHeight * inputValues[1]))
        }

        // Generate transform map
        const transformMapNew = []
        for(const transformValue of transformMappings.transform){
            transformMapNew.push((viewportSize.height * transformValue[0]) + transformValue[1])
        }

        setInput(inputMapNew);
        setTransform(transformMapNew)

    }, [yPosition, scrollHeight, viewportSize])

    return [input, transform]
}

export default useScrollTransform;