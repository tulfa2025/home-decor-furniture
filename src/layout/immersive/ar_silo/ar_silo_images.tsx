import siloOneImage from "../../../assets/images/immersive/silo/1/Dining-table-design-for-home-interiors.jpg";
import siloTwoImage from "../../../assets/images/immersive/silo/2/High-quality-sofa-set-3D-model-for-furniture-stores.jpg";
import siloThreeImage from "../../../assets/images/immersive/silo/3/3D-Christmas-tree-interactive-rendering.jpg";
import siloFourImage from "../../../assets/images/immersive/silo/4/3D-office-chair-for-home-office.png";
import siloFiveImage from "../../../assets/images/immersive/silo/5/Closet-3D-modeling.jpg";
import siloSixImage from "../../../assets/images/immersive/silo/6/3D-beach-chair.jpg";


import qrSiloTwoImage from "../../../assets/images/immersive/silo/2/tulfa-sofa-set-AR-QR-code-link.png";
import qrSiloThreeImage from "../../../assets/images/immersive/silo/3/tulfa-christmas-tree-AR-QR-code-link.png";
import qrSiloFourImage from "../../../assets/images/immersive/silo/4/tulfa-office-chair-AR-QR-code-link.png";
import qrSiloFiveImage from "../../../assets/images/immersive/silo/5/tulfa-closet-AR-QR-code-link.png";
import qrSiloSixImage from "../../../assets/images/immersive/silo/6/tulfa-beach-chair-AR-QR-code-link.png";

/* Images under different categories */
type ARModalImageSet = {
  [key: string]: Array<[StaticImageData, StaticImageData,  StaticImageData, string, string]>; // Normal image / blurred version / vectary link /glb file path
};

const modalImageSet = {
  background: '',
  top: [
    [siloTwoImage, '', qrSiloTwoImage, 'https://xr.tulfa.com/p/5AUBwtEKmUn8BkK7mFi52h/', 'glb/popup/garden.glb'],
    [siloThreeImage, '', qrSiloThreeImage, 'https://xr.tulfa.com/p/07FpvlfdavtSDCxBdDxqrU', 'glb/popup/xmas.glb'],
    [siloFourImage, '', qrSiloFourImage, 'https://xr.tulfa.com/p/5cgUtEEDBCMdX37JmjGCaP', 'glb/popup/gaming_chair.glb'],
    [siloFiveImage, '', qrSiloFiveImage, 'https://xr.tulfa.com/p/6FZRFe2SRPGsTi4UMXL1o8', 'glb/popup/drawers;glb'],
    [siloSixImage, '', qrSiloSixImage, 'https://xr.tulfa.com/p/1BMMG5u0IaNxvNbZucCtGu', 'glb/popup/lounger.glb'],
    
  ],
};

export default modalImageSet;
