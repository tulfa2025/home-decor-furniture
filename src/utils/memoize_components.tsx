import React, { memo } from 'react';

/**
 * @params 
 */
const memoizeComponents = (components: Array<[React.FC, string]>): Array<[React.ExoticComponent, string]> => {

    const memoizedComponents: Array<[React.ExoticComponent, string]>= [];
    components.forEach((comp: [React.FC, string]) => {
        
        // const memoizedComponent = memo(comp[0])
        memoizedComponents.push([comp[0], comp[1]]);
    });

    return memoizedComponents;
};

export {
    memoizeComponents
};