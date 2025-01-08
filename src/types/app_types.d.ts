declare global {
    type LayoutProps = {
        layoutName: number
        handleLayoutLoad: () => void
        handleChangeSlide: (direction:number)=>void
    }

    type LayoutSet = {
        order: number[];
        [key: string]: {
            layoutName: number
            layoutTag: string
            layoutRendered: boolean
            component: React.FC | React.ExoticComponent
            subHeaderStyle: 0 | 1
        };
    }
}

export {};