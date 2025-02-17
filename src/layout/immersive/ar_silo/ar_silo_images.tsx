
/* Images under different categories */
type ARModalImageSet = {
  [key: string]: Array<[StaticImageData, StaticImageData,  StaticImageData, string, string]>; // Normal image / blurred version / vectary link /glb file path
};

const modalImageSet = {
  background: '',
  top: [
    ['/images/immersive/silo/2/High-quality-sofa-set-3D-model-for-furniture-stores.jpg', '/glb/blur/blur-image-sofa.webp', '/images/immersive/silo/2/tulfa-sofa-set-AR-QR-code-link.png', 'https://xr.tulfa.com/p/5AUBwtEKmUn8BkK7mFi52h/', 'glb/popup/garden-reduced.glb'],
    ['/images/immersive/silo/3/3D-Christmas-tree-interactive-rendering.jpg', '/glb/blur/blur-imag-tree.webp', '/images/immersive/silo/3/tulfa-christmas-tree-AR-QR-code-link.png', 'https://xr.tulfa.com/p/07FpvlfdavtSDCxBdDxqrU', 'glb/popup/xmas.glb'],
    ['/images/immersive/silo/4/3D-office-chair-for-home-office.png', '/glb/blur/blur-image-chair.webp', '/images/immersive/silo/4/tulfa-office-chair-AR-QR-code-link.png', 'https://xr.tulfa.com/p/5cgUtEEDBCMdX37JmjGCaP', 'glb/popup/gaming_chair.glb'],
    ['/images/immersive/silo/5/Closet-3D-modeling.jpg', '/glb/blur/blur-image-bureau.webp', '/images/immersive/silo/5/tulfa-closet-AR-QR-code-link.png', 'https://xr.tulfa.com/p/6FZRFe2SRPGsTi4UMXL1o8', 'glb/popup/drawers.glb'],
    ['/images/immersive/silo/6/3D-beach-chair.jpg', '/glb/blur/blur-image-beach-chair.webp', '/images/immersive/silo/6/tulfa-beach-chair-AR-QR-code-link.png', 'https://xr.tulfa.com/p/1BMMG5u0IaNxvNbZucCtGu', 'glb/popup/lounger.glb'],
    
  ],
};

export default modalImageSet;
