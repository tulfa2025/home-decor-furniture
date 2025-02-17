import * as TWEEN from "@tweenjs/tween.js";
import * as THREE from "three";

/**
 *
 */
class MovementPath {
  public pathStartPosition: [number, number, number] | null = null;
  public animationSequence: Array<PathObject> | null = null;
  public animationOptions: AnimationOptions | null = null;
  public animationName: string = "";

  public movingObject: THREE.Object3D | null = null;

  constructor(
    animationName: string,
    pathStartPosition,
    pathObjectArray: Array<PathObject>,
    animationOptions: AnimationOptions
  ) {
    this.animationName = animationName;
    this.pathStartPosition = pathStartPosition;
    this.animationOptions = animationOptions;
    this.animationSequence = pathObjectArray;
  }

  /**
   * Create new path with Path Object
   * @param {PathObject}
   */
  public pushNewPath(pathObject: PathObject) {
    this.animationSequence.push(pathObject);
  }

  /**
   * Update current coordinates along curve and return  coordinates
   * Optionally provide threejs object and update in function
   */
  public update() {
    this._tween.update()
  }

  // initialise animations
  public initialize(threeDObject?: THREE.Object3D) {
    if (threeDObject) this.movingObject = threeDObject;
  
    let previousTween = null;

    let tweens = []
  
    // Iterate over the animation sequence and create tweens
    for (let i = 0; i < this.animationSequence.length; i++) {
      const animation = this.animationSequence[i];
  
      function update (e) {
        // Update position based on `t` and path
        const newPos = animation.path.getPoint(e.t);
        threeDObject.position.set(newPos.x, newPos.y, newPos.z);
      }
      // Create the tween for this animation
      const tweenObj = new TWEEN.Tween({ t: 0  })
        .to({ t: 1 }, animation.duration)
        .easing(TWEEN.Easing.Cubic.InOut)
        .onUpdate(update)
        .onComplete(()=>{

          if(i + 1 === this.animationSequence.length) return
          this._tween = tweens[i+1]
        })
        .delay(animation.delay);  // Apply delay before starting this animation
  
      // Chain the tweens using `onComplete`
      if (previousTween) {
        previousTween.chain(tweenObj)
      }
  
      // Store the current tween to be used as previousTween for the next iteration
      previousTween = tweenObj;

      tweens.push(tweenObj)
      
      if(i === 0){
        this._tween = tweenObj 
        
      }

    }
    this._tween.start()
    
  }
  
  /**
   * Print paths order
   */
  public seeAnimations() {
    console.log(this.animationSequence);
  }

  // Clear for garbage collection
}

export default MovementPath;
