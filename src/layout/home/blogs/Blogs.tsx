'use client'

import BlogsTemplate from "@/components/blogs/BlogsTemplate";


const Blogs: React.FC<LayoutProps> = ({
    layoutName,
    zIndex
}) => {


    return (
       <BlogsTemplate 
        layoutName={layoutName}
        zIndex={zIndex}
        scrollMap={null}
       />
    );
}
export default Blogs;
