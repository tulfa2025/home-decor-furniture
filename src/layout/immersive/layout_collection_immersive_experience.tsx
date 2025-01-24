'use client'
/* Memoize components */
import { memoizeComponents } from "@/utils/memoize_components";
import structureLayouts from "@/utils/structure_layouts";
import Blogs from "@/layout/home/blogs/Blogs";
import BookDemo from "@/layout/home/book_demo/BookDemo";
import Banner from "./banner/banner";
import Devices from "./devices/devices";
import Functionality from "./functionality/functionality";
import ProductConfigBanner from "./product_config_banner/ProductConfigBanner";
import ProductConfig from "./product_config/ProductConfig";
import PhoneDemo from "./phone_1/PhoneDemo";
import FriendsSofa from "./friends_sofa/FriendsSofa";
import SofaCode from "./sofa_code/SofaCode";
import ARSilo from "./ar_silo/ARSilo";


/* LAYOUT COLLECTION MUST BE IN DESIRED ORDER */
const layoutCollection: LayoutCollectionBase = [
    [Banner, 'Immersive Experience'],
    [Devices, 'Devices'],
    [Functionality, 'Functionality'],
    [ProductConfigBanner, ''],
    [ProductConfig, 'Configurator'],
    [FriendsSofa, 'Space'],
    [PhoneDemo, ''],
    [ARSilo, 'TBA'],
    [SofaCode, 'TBA'],
    [BookDemo, ''],
    [Blogs, '']

];

const layoutCollectionMemoized = memoizeComponents(layoutCollection);

const layoutCollectionStructured = structureLayouts(layoutCollectionMemoized);

export default layoutCollectionStructured;
				
			