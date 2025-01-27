'use client'

import BlogsTemplate from "@/components/blogs/BlogsTemplate";
import scrollTransformValues from "@/utils/scrollTransformValues";


const Blogs: React.FC<LayoutProps> = ({
    layoutName,
    zIndex
}) => {


    return (
       <BlogsTemplate 
        layoutName={layoutName}
        zIndex={zIndex}
        scrollMap={scrollTransformValues.vidsBlogs}
       />
    );
}
export default Blogs;
