declare global {
    type LayoutProps = {
        layoutName: number
        zIndex: number

    }
    
    type LayoutCollectionBase = Array<[React.FC, string]>

    type LayoutSet = {
        order: number[];
        [key: string]: {
            layoutName: number
            layoutTag: string
            component: React.FC | React.ExoticComponent
        };
    }

    /* Images under different categories */
    interface ImageSet {
        [key: string]: Array<[StaticImageData, StaticImageData, string]> | null
        background: StaticImageData,
        backgroundStyling: string
    };    

    interface VariationsImageSet extends ImageSet {
        top: Array<[StaticImageData, StaticImageData, string, StaticImageData, StaticImageData]>  // Main Image, blurred, Description, Hover Image, blurred

    }
}

export {};