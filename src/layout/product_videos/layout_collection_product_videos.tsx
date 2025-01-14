'use client'
/* Memoize components */
import { memoizeComponents } from "@/utils/memoize_components";
import structureLayouts from "@/utils/structure_layouts";
import ProductVideosBanner from "./banner/ProductVideosBanner";
import VideoOne from "./video_1/VideoOne";

/* LAYOUT COLLECTION MUST BE IN DESIRED ORDER */
const layoutCollection: LayoutCollectionBase = [
    [ProductVideosBanner, 'Banner'],
    [VideoOne, 'Video One'],
    [VideoOne, 'Video Two'],
    [VideoOne, 'Video Three'],
    
];

const layoutCollectionMemoized = memoizeComponents(layoutCollection);

const layoutCollectionStructured = structureLayouts(layoutCollectionMemoized);

export default layoutCollectionStructured;
				
			