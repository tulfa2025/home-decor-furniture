"use client"
import BookDemoTemplate from "@/components/demo/BookDemoTemplate";

const BookDemo = ({
    layoutName,
    zIndex,
    scrollMap = null
}) => {
    return (<BookDemoTemplate
        layoutName={layoutName}
        zIndex={zIndex}
        scrollMap={scrollMap}
    />)
}

export default BookDemo;
