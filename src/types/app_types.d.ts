import MovementPath from "@/components/3dscene/AnimationHelper";
import { Vector3 } from "three";

declare global {
  type LayoutProps = {
    layoutName: number;
    zIndex: number;
  };

  type LayoutCollectionBase = Array<[React.FC, string]>;

  type LayoutSet = {
    order: number[];
    [key: string]: {
      layoutName: number;
      layoutTag: string;
      component: React.FC | React.ExoticComponent;
    };
  };

  /* Images under different categories */
  interface ImageSet {
    [key: string]: Array<[StaticImageData, StaticImageData, string]> | null;
    background: StaticImageData;
    backgroundStyling: string;
  }

  interface VariationsImageSet extends ImageSet {
    top: Array<
      [
        StaticImageData,
        StaticImageData,
        string,
        StaticImageData,
        StaticImageData
      ]
    >; // Main Image, blurred, Description, Hover Image, blurred
  }

  interface AnimationDetailsList {
    [key: string]: AnimationDetails;
  }

  interface AnimationDetails {
    name: string;
    animationLength: number;
    animation: MovementPath | null;
    startDelay: number
  }

  type LightingArray = Array<any>;

  interface ThreeDSceneProps {
    glbRef: string;
    followMouse: boolean;
    cameraPosition: [number, number, number];
    modelPosition: [number, number, number];
    modelRotation: [number, number, number];
    initialPosition: [number, number, number];
    animationList: AnimationDetailsList;
    playAnimation: boolean;
    defaultAnimationName: string;
    enableRotateMouse: boolean;
    enableZoom: boolean;
    pathToBackground: string;
    blurSrc: string;
    lightingArray: LightingArray;
    modelShadow: boolean;
  }

  /*
   *  Object holds information on start and end position,
   */
  interface PathObject {
    /**
     * Name of animation section
     */
    name?: string;
    /**
     * Object start position
     */
    duration: number;
    path: THREE.Curve<THREE.Vector3>;
    delay: number;

    lookAtPosition?: Vector3;
  }

  interface AnimationOptions {
    /**
     * Return to initial position on end. Default linear curve
     */
    toStartOnEnd: boolean;
  }
}

export {};
