"use client"
import BookDemoTemplate from "@/components/demo/BookDemoTemplate";
import scrollTransformValues from "@/utils/scrollTransformValues";

const BookDemo = ({
    layoutName,
    zIndex,
}) => {
    return (<BookDemoTemplate
        layoutName={layoutName}
        zIndex={zIndex}
        scrollMap={scrollTransformValues.immersiveBookDemo}
    />)
}

export default BookDemo;
