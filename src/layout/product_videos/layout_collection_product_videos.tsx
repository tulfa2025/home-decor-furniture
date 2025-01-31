'use client'
/* Memoize components */
import { memoizeComponents } from "@/utils/memoize_components";
import structureLayouts from "@/utils/structure_layouts";
import ProductVideosBanner from "./banner/ProductVideosBanner";
import VideoOne from "./video_1/VideoOne";
import VideoTwo from "./video_2/VideoTwo";
import VideoThree from "./video_3/VideoThree";
import VideoFour from "./video_4/VideoFour";
import VideoSix from "./video_6/VideoSix";
import VideoNine from "./video_9/VideoNine";
import Blogs from "./blogs/Blogs";
import BookDemo from "./book_demo/BookDemo";
import ARVid from "./ar_vid/ARVid";

/* LAYOUT COLLECTION MUST BE IN DESIRED ORDER */
const layoutCollection: LayoutCollectionBase = [
    [ProductVideosBanner, 'Banner'],
    [VideoSix, 'Sofa'],
    [VideoThree, 'Chair'],
    [VideoTwo, 'Exploded View'],
    [VideoNine, 'Baby Crib'],
    [VideoOne, 'Build'],
    [VideoFour, 'Dining'],
    [ARVid, 'TBC'],
    [BookDemo, ''],
    [Blogs, '']

];

const layoutCollectionMemoized = memoizeComponents(layoutCollection);

const layoutCollectionStructured = structureLayouts(layoutCollectionMemoized);

export default layoutCollectionStructured;
				
			