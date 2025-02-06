import { useEffect, useRef } from "react";
import ThreeDBasic from "./ThreeObject";

const ThreeDScene = ({
    glbRef
}) => {
  const canvasRef = useRef(null);

  const threedScene = useRef(null)


  useEffect(() => {
    // SET UP
    if(canvasRef.current){
        threedScene.current   = new ThreeDBasic(
            canvasRef.current,
            glbRef
        );

        document.body.addEventListener( 'mousemove', ( e )=>{
            threedScene.current.followMouse( e )
        });
    }



    
    
  }, []);

  

  return (<div
  style={{
    height: '100%',
    width: '100%',
  }}
  
  ref={canvasRef} />);
};

export default ThreeDScene;
