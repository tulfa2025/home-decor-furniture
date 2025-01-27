'use client'
/* Memoize components */
import { memoizeComponents } from "@/utils/memoize_components";
import structureLayouts from "@/utils/structure_layouts";
import ProductVideosBanner from "./banner/ProductVideosBanner";
import VideoOne from "./video_1/VideoOne";
import VideoTwo from "./video_2/VideoTwo";
import VideoThree from "./video_3/VideoThree";
import VideoFour from "./video_4/VideoFour";
import VideoSeven from "./video_7/VideoSeven";
import VideoSix from "./video_6/VideoSix";
import VideoEight from "./video_8/VideoEight";
import Blogs from "./blogs/Blogs";
import BookDemo from "./book_demo/BookDemo";
import ARVid from "./ar_vid/ARVid";

/* LAYOUT COLLECTION MUST BE IN DESIRED ORDER */
const layoutCollection: LayoutCollectionBase = [
    [ProductVideosBanner, 'Banner'],
    [VideoEight, 'Video Seven'],
    [VideoSix, 'Video One'],
    [VideoThree, 'Video Two'],
    [VideoTwo, 'Video Three'],
    [VideoSeven, 'Video Four'],
    [VideoOne, 'Video Five'],
    [VideoFour, 'Video Six'],
    [ARVid, 'TBC'],
    [BookDemo, ''],
    [Blogs, '']

];

const layoutCollectionMemoized = memoizeComponents(layoutCollection);

const layoutCollectionStructured = structureLayouts(layoutCollectionMemoized);

export default layoutCollectionStructured;
				
			