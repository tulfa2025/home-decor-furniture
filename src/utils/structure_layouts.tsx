/* Take in array of layouts and output object to keep track of rendered layouts */

import React from "react";



const structureLayouts = (layoutCollection: Array<[React.FC | React.ExoticComponent, number, string]>): LayoutSet =>{

    const layoutStructure: LayoutSet = {
        order: []        
    };

    for(let i = 0; i < layoutCollection.length; i++){
        layoutStructure.order.push(i);
        layoutStructure[i] = {
            layoutName: i,
            layoutRendered: false,
            component: layoutCollection[i][0],
            subheaderStyle: layoutCollection[i][1],
            layoutTag: layoutCollection[i][2]
        }
    }

    return layoutStructure;
};

export default structureLayouts;