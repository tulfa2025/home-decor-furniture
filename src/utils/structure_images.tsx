import { StaticImageData } from "next/image";

type ImageSet = {
    order: number[];
    [key: string]: {
        imageName: number
        imageData: StaticImageData
    };
}

const structureImages = (imageCollection: Array<StaticImageData>): ImageSet =>{

    const imageStructure: ImageSet = {
        order: []        
    };

    for(let i = 0; i < imageCollection.length; i++){
        imageStructure.order.push(i);
        imageStructure[i] = {
            imageName: i,
            imageData: imageCollection[i]
        }
    }

    return imageStructure;
};

export default structureImages;