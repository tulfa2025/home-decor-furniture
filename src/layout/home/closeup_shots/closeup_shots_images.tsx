import ImageOne from "../../../assets/images/closeup_shots/nitavparikh_A_close-up_of_a_contemporary_desk_made_of_smooth_wa_50dbd209-57e6-4232-82b7-37a01d79d237.png"
import ImageTwo from "../../../assets/images/closeup_shots/nitavparikh_A_close-up_of_a_contemporary_platform_bed_frame_cra_a2077f82-4bc3-4b3b-b056-3ff2bceb608e.png";
import ImageThree from "../../../assets/images/closeup_shots/nitavparikh_A_close-up_of_a_geometric_candle_holder_crafted_fro_3a69f949-13a1-4759-8264-c94ae385fa53.png";
import ImageFour from "../../../assets/images/closeup_shots/nitavparikh_A_close-up_of_a_handwoven_storage_basket_crafted_fr_2da81f2b-7cb1-4464-9a46-cb3342e2bd03 (1).png";
import ImageFive from "../../../assets/images/closeup_shots/nitavparikh_A_close-up_of_a_minimalist_ceramic_vase_with_a_smoo_e58ecb1e-91f4-4aee-8791-1ffa5ed53bae.png";
import ImageSix from "../../../assets/images/closeup_shots/nitavparikh_A_close-up_of_a_minimalist_planter_with_a_smooth_ce_6d221b18-8fa4-4535-bf0c-9c5dee2f19ee.png";
import ImageSeven from "../../../assets/images/closeup_shots/nitavparikh_A_close-up_of_a_modern_area_rug_featuring_a_plush_t_ebbb1785-a5e5-4fad-9673-9bc4dfa8c237.png";
import imageEight from "../../../assets/images/closeup_shots/nitavparikh_A_close-up_of_a_modern_area_rug_featuring_a_subtle__eb8baa54-0be7-4170-a025-d14b638671af.png";
import ImageNine from "../../../assets/images/closeup_shots/nitavparikh_A_close-up_of_a_modern_bar_stool_featuring_a_smooth_ae8cc07b-1bda-49f4-b380-5f8995d32045.png";
import ImageTen from "../../../assets/images/closeup_shots/nitavparikh_A_close-up_of_a_modern_dining_table_crafted_from_sm_fda1e166-d7dc-4895-99bb-ead7c5bdceb1.png";
import ImageEleven from "../../../assets/images/closeup_shots/nitavparikh_A_close-up_of_a_modern_dining_table_featuring_a_scu_0c03c9e9-e0e3-47ba-b308-ff3d60d2b354.png";
import ImageTwelve from "../../../assets/images/closeup_shots/nitavparikh_A_close-up_of_a_modern_geometric_pendant_light_feat_9b2af5be-6102-4dbb-9510-d2e952f0b402.png";
import ImageThirteen from "../../../assets/images/closeup_shots/nitavparikh_A_close-up_of_a_modern_multi-functional_bench_featu_f95b9d9f-78ab-43f5-bea6-76d0f5dd641a.png";
import ImageFourteen from "../../../assets/images/closeup_shots/nitavparikh_A_close-up_of_a_modern_sculptural_coffee_table_with_fa3647c4-9b09-4900-9d46-f0fe7e5fab13.png";
import ImageFifteen from "../../../assets/images/closeup_shots/nitavparikh_A_close-up_of_a_modern_upholstered_bench_with_a_bou_994561ab-86f9-4cc7-9c20-4bb3963ae26b.png";
import ImageSixteen from "../../../assets/images/closeup_shots/nitavparikh_A_close-up_of_a_sculptural_table_lamp_featuring_an__eda45ccd-b352-4e48-9dc9-d9875f838a94.png";
import ImageSeventeen from "../../../assets/images/closeup_shots/nitavparikh_A_close-up_of_a_sleek_bar_cart_featuring_a_brushed__7fea0e58-7550-4a67-b62f-e0aa711225d6.png";
import ImageEighteen from "../../../assets/images/closeup_shots/nitavparikh_A_close-up_of_a_sleek_pendant_lamp_with_a_smooth_do_fe98aa0b-5861-41be-9b81-89581ec0774f.png";
import ImageNineteen from "../../../assets/images/closeup_shots/nitavparikh_A_close-up_of_a_sleek_storage_bench_featuring_a_lig_a2d99f19-5875-4276-8be1-ffa885621b18.png";


/* Images under different categories */
type ModalImageSet = {
    [key: string]: Array<StaticImageData>;
  };

  const modalImageSet = {
    background: ImageOne,
    top: [
      ImageOne, 
      ImageThree, 
      ImageTwo,
      ImageFour,
      ImageFive,
      ImageSix,
      ImageSeven,
      imageEight,
      ImageNine,
      ImageTen,
      ImageEleven,
      ImageTwelve,
      ImageThirteen,
      ImageFourteen,
      ImageFifteen,
      ImageSixteen,
      ImageSeventeen,
      ImageEighteen,
      ImageNineteen
    ],
  };

  export default modalImageSet;