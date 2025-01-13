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
        [key: string]: Array<[StaticImageData, string]> | null
        background: StaticImageData,
        backgroundStyling: string
    };    

    interface VariationsImageSet extends ImageSet {
        top: Array<[StaticImageData, string, StaticImageData]>  // Main Image, Description, Hover Image

    }
}

export {};