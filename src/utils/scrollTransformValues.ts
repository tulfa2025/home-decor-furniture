type ScrollTransform = {
  input: Array<
    [number, number] // First number is y position factor, second is scroll height
  >;
  transform: Array<
  [number, number] // First number is y position factor, second is scroll height
> 
};

type ScrollTransformValues = {
  [key: string]: {
    desktop: ScrollTransform;
    mobile: ScrollTransform;
  };
};

const scrollTransformValues: ScrollTransformValues = {
  banner: {
    desktop: {
      input: [
        [0, 0],
        [0, 1],
      ],
      transform: [
        [0, 0], 
        [-1.2, 0],
      ]
    },
    mobile: {
      input: [
        [0, 0],
        [0, 1],
      ],
      transform: [
        [0,0],
        [-1.2, 0],
      ]
    },
  },
  silo: {
    desktop: {
      input: [
        [0, 0],
        [0.5, 0],
        [1, 0.5],
        [1, 1.25],
        [1, 1.5],
      ],
      transform: [
        [2, 0], 
        [2, 0], 
        [0, 0],
        [0, 0],
        [-2.4, 0]
    ],
    },
    mobile: {
      input: [
        [0, 0],
        [0.5, 0],
        [1, 0.5],
        [1, 1.25],
        [1, 1.5],
      ],
      transform: [
        [1.2, 0],
        [1.2, 0],
        [0, 0],
        [0, 0],
        [-2.4, 0],
    ],
    },
  },
  tertiary: {
    desktop: {
      input: [
        [0, 0],
        [1, -1],
        [1, -0.9],
        [1, 0.9],
        [1, 1.2],
      ],
      transform: [
        [2.4, 0],
        [2.4, 0],
        [0, 0],
        [0, 0],
        [-2.4,0],
    ],
    },
    mobile: {
      input: [
        [0, 0],
        [1, -1],
        [1, -0.9],
        [1, 0.9],
        [1, 1.2],
      ],
      transform: [
        [2.4,  0 ],
        [2.4,  0 ],
        [0,  0 ],
        [0,  0 ],
        [-2.4, 0 ],
    ],
    },
  },
  // Large Slide Container Template Default
  lscDefault: {
    desktop: {
      input: [
        [0, 0],
        [1, -0.25],
        [1, 0.5],
        [1, 0.7],
        [1, 1.05],
        [1, 1.4],
        [1, 1.5]

    ],
      transform: [
        [2.4, 0],
        [2.4,0],
        [0,0],
        [0,0],
        [-0.4, -60],
        [-0.4,-60],
        [-2.4,0],
      ],
    },
    mobile: {
      input: [
        [0, 0],
        [1, 0],
        [1, 0.25],
        [1, 0.7],
        [1, 0.75],
        [1, 1.05],
        [1, 1.5]
    ],
      transform: [
        [2.4,  0],
        [2.4,0],
        [0,0],
        [0,0],
        [-0.2,-20],
        [-0.2,-20],
        [-2.4,0],
      ],
    },
  },
};

export default scrollTransformValues;
