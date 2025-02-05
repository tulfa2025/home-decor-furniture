'use client'
import Banner from "@/layout/home/banner/Banner";
import Blogs from "@/layout/home/blogs/Blogs";
import BookDemo from "@/layout/home/book_demo/BookDemo";
import NewCloseUpShots from "./closeup_shots/NewCloseUpShots";
import CtaTertiary from "@/layout/home/cta_tertiary/CtaTertiary";
import DimensionImages from "@/layout/home/dimension_images/DimensionImages";
import FlatLayImages from "@/layout/home/flatlay_images/FlatLayImages";
import GroupShots from "@/layout/home/group_shots/GroupShots";
import InstallationImages from "@/layout/home/installation_images/InstallationImages";
import NewLifeStyleScenes from "./lifestyle_scenes/NewLifeStyleScenes";
import NewMarketingImages from "./marketing_images/NewMarketingImages";
import SiloImages from "@/layout/home/silo_images/SiloImages";
import ProSizeVar from "./size_var/ProSizeVar";
import ProColVar from "./color_var/ProColVar";
import ProTextVar from "./text_var/ProTextVar";
import FlipBook from "./flip_book/FlipBook";

/* Memoize components */
import { memoizeComponents } from "@/utils/memoize_components";
import structureLayouts from "@/utils/structure_layouts";

/* LAYOUT COLLECTION MUST BE IN DESIRED ORDER */
const layoutCollection: LayoutCollectionBase = [
    [Banner, 'Banner'],
    [SiloImages, 'Product Silos'],
    // [CtaTertiary, ''],
    [NewLifeStyleScenes, 'LifeStyle Scenes'],
    [ProSizeVar, 'Product Variations'],
    [ProColVar, 'Product Variations'],
    [ProTextVar, 'Product Variations'],
    [NewCloseUpShots, 'Close Up Shots'],
    [GroupShots, 'Group Shots'],
    [DimensionImages, 'Dimension Images'],
    [InstallationImages, 'Installation Images'],
    // [FlipBook, ''],
    [FlatLayImages, 'Flat Lay'],
    [NewMarketingImages, 'Marketing Images'],
    // [BookDemo, 'Book a Demo'],
    // [Blogs, '']
];

const layoutCollectionMemoized = memoizeComponents(layoutCollection);

const layoutCollectionStructured = structureLayouts(layoutCollectionMemoized);

export default layoutCollectionStructured;
				
			