'use client'
import Banner from "@/layout/banner/Banner";
import Blogs from "@/layout/blogs/Blogs";
import BookDemo from "@/layout/book_demo/BookDemo";
// import CloseUpShots from "@/layout/closeup_shots/CloseUpShots";
import NewCloseUpShots from "./closeup_shots/new/NewCloseUpShots";
import CtaTertiary from "@/layout/cta_tertiary/CtaTertiary";
import DimensionImages from "@/layout/dimension_images/DimensionImages";
import FlatLayImages from "@/layout/flatlay_images/FlatLayImages";
import GroupShots from "@/layout/group_shots/GroupShots";
import InstallationImages from "@/layout/installation_images/InstallationImages";
// import LifeStyleScenes from "@/layout/lifestyle_scenes/LifeStyleScenes";
import NewLifeStyleScenes from "./lifestyle_scenes/new/NewLifeStyleScenes";
import MarketingImages from "@/layout/marketing_images/MarketingImages";
import SiloImages from "@/layout/silo_images/SiloImages";
import ProSizeVar from "./size_var/ProSizeVar";
import ProColVar from "./color_var/ProColVar";
import ProTextVar from "./text_var/ProTextVar";
import FlipBook from "./flip_book/FlipBook";

/* Memoize components */
import { memoizeComponents } from "@/utils/memoize_components";

import structureLayouts from "@/utils/structure_layouts";

/* LAYOUT COLLECTION MUST BE IN DESIRED ORDER */
const layoutCollection: Array<[React.FC, number, string]> = [
    [Banner, 2, 'Banner'],
    [SiloImages, 0, 'Product Silos'],
    [CtaTertiary, 0, ''],
    // [LifeStyleScenes, 2],
    [NewLifeStyleScenes, 0, 'LifeStyle Scenes'],
    [ProSizeVar, 0, 'Product Variations'],
    [ProColVar, 0, 'Product Variations'],
    [ProTextVar, 0, 'Product Variations'],
    // [CloseUpShots, 2],
    [NewCloseUpShots, 0, 'Close Up Shots'],
    [GroupShots, 0, 'Group Shots'],
    [DimensionImages, 0, 'Dimension Images'],
    [InstallationImages, 0, 'Installation Images'],
    [FlipBook, 0, ''],
    [FlatLayImages, 0, 'Flat Lay'],
    [MarketingImages, 0, 'Marketing Images'],
    [BookDemo, 0, 'Book a Demo'],
    [Blogs, 0, '']
];

const layoutCollectionMemoized = memoizeComponents(layoutCollection);

const layoutCollectionStructured = structureLayouts(layoutCollectionMemoized);

// Set first comp to rendered
layoutCollectionStructured[0].layoutRendered = true;

export default layoutCollectionStructured;
				
			