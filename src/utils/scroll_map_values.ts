/**
 * VALUES ASSIGNED TO SCROLL-BASED ANIMATIONS
 * 
 * xs = up to 768px screen width
 * md = up to 960px screen width
 * lg = above 968px sceen width
 * */
interface ViewportSize {
    width: number;
    height: number;
}

interface ScrollMappings {
    scrollV: Array<number | string | boolean>;  // Adjust this based on actual mapping structure
    mappedV: Array<number | string | boolean>;
}

interface InternallyMappedV {
    type: string
    value: number
}

interface InternalScrollMappings {
    scrollV: Array<InternallyMappedV>;  // Adjust this based on actual mapping structure
    mappedV: Array<InternallyMappedV>;
}

class ScrollBasedValues {
    private static viewportWidth: number = 0;
    private static viewportHeight: number = 0;
    private static largeScreenSize: number = 968;
    private static mediumScreenSize: number = 768;
    private static smallScreenSize: 0;


    public xs: InternalScrollMappings;
    public md: InternalScrollMappings;
    public lg: InternalScrollMappings;

    constructor(xs: ScrollMappings, md: ScrollMappings, lg: ScrollMappings) {
        this.xs = ScrollBasedValues._convertViewportPlaceholders(xs);
        this.md = ScrollBasedValues._convertViewportPlaceholders(md);
        this.lg = ScrollBasedValues._convertViewportPlaceholders(lg);
    }

    /**
     * User provides placeholders representing viewport sizes or other respnsive sizes,
     * 
     * @param scrollMappings 
     */
    static _convertViewportPlaceholders(scrollMappings: ScrollMappings): InternalScrollMappings{
        const internalMap: InternalScrollMappings = {
            scrollV: [],
            mappedV: []
        }

        /* Map scrollV mappings */
        for(let value of scrollMappings.scrollV){
            const internallyMappedV = {
                type: '',
                value: 0,
                operator: '',
                rhs: 0
            }
            
            if (typeof value === 'number' && !isNaN(value)) {
                // If pure value
                internallyMappedV.type = 'number'
                internallyMappedV.value = value
            } else if (value === 'vh' && !isNaN(value)){
                // 
                internallyMappedV.type = 'vh'
                internallyMappedV.value = ScrollBasedValues.viewportHeight
            } else if (value === 'string' && !isNaN(value)){
                // Parse expression
                const { lhs, operator, rhs } = ScrollBasedValues._parseExpression(value);

                let leftHandSide = 0;
                if(lhs === 'vh') leftHandSide = ScrollBasedValues.viewportHeight;

                switch(operator){
                    case '*':
                        internallyMappedV.value = leftHandSide * rhs;
                        break
                    case '+':
                        internallyMappedV.value = leftHandSide + rhs;
                        break
                    case '/':
                        internallyMappedV.value = leftHandSide / rhs;
                        break
                    case '-':
                        internallyMappedV.value = leftHandSide - rhs;
                        break
                    default:
                        break

                }
                internallyMappedV.type = 'vhx'  // vh expression
                internallyMappedV.operator = operator;
                internallyMappedV.rhs = rhs;
            }

            internalMap.scrollV.push(internallyMappedV)
        }

         /* Map mappedV mappings */
         for(let value of scrollMappings.mappedV){
            const internallyMappedV = {
                type: '',
                value: 0,
                operator: '',
                rhs: 0
            }
            
            if (typeof value === 'number' && !isNaN(value)) {
                // If pure value
                internallyMappedV.type = 'number'
                internallyMappedV.value = value
            } else if (value === 'vh' && !isNaN(value)){
                // 
                internallyMappedV.type = 'vh'
                internallyMappedV.value = ScrollBasedValues.viewportHeight
            } else if (value === 'string' && !isNaN(value)){
                // Parse expression
                const { lhs, operator, rhs } = ScrollBasedValues._parseExpression(value);

                let leftHandSide = 0;
                if(lhs === 'vh') leftHandSide = ScrollBasedValues.viewportHeight;

                switch(operator){
                    case '*':
                        internallyMappedV.value = leftHandSide * rhs;
                        break
                    case '+':
                        internallyMappedV.value = leftHandSide + rhs;
                        break
                    case '/':
                        internallyMappedV.value = leftHandSide / rhs;
                        break
                    case '-':
                        internallyMappedV.value = leftHandSide - rhs;
                        break
                    default:
                        break

                }
                internallyMappedV.type = 'vhx'  // vh expression
                internallyMappedV.operator = operator;
                internallyMappedV.rhs = rhs;
            }

            internalMap.mappedV.push(internallyMappedV)
        }

        return internalMap

    };

    static _parseExpression(expression: string): { lhs: string; operator: string; rhs: string } | null {
        const regex = /^\s*([\w.%]+)\s*([\+\-\*/])\s*([\w.%]+)\s*$/;
        const match = expression.match(regex);
    
        if (match) {
            const [, lhs, operator, rhs] = match;
            return { lhs, operator, rhs };
        }
    
        return null;  // Invalid format
    }

    static updateViewportSize(viewportSize: ViewportSize): void {
        ScrollBasedValues.viewportWidth = viewportSize.width;
        ScrollBasedValues.viewportHeight = viewportSize.height;


    }

    // updateMappings(){
    //     // Update small screen mappings
    //     const { scrollV, mappedV } = this.xs;

    //     for(let internallyMappedValue of scrollV){
    //         if(internallyMappedValue.type === 'vh'){
    //             internallyMappedValue.value = internallyMappedValue
    //         }
    //     }
    // }

    getScrollMapping(){
        let returnArray = []

        if(ScrollBasedValues.viewportWidth > ScrollBasedValues.largeScreenSize){
            returnArray = this.lg;
        } else if(ScrollBasedValues.viewportWidth > ScrollBasedValues.mediumScreenSize){
            returnArray = this.md;
        } else {
            returnArray = this.xs
        }
        return returnArray;
    }
}

export default ScrollBasedValues;
