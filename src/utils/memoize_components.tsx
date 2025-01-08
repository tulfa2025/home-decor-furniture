import React, { memo } from 'react';

/**
 * @params 
 */
const memoizeComponents = (components: Array<[React.FC, number, string]>): Array<[React.ExoticComponent, number, string]> => {

    const memoizedComponents: Array<[React.ExoticComponent, number, string]>= [];
    components.forEach((comp: [React.FC, number, string]) => {
        
        const memoizedComponent = memo(comp[0])
        memoizedComponents.push([memoizedComponent, comp[1], comp[2]]);
    });

    return memoizedComponents;
};

export {
    memoizeComponents
};