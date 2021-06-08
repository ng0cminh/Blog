module.exports = {
   multi: (arrays) => {
      return arrays.map((array) => array.toObject());
   },
   simple: (array) => {
      return array ? array.toObject() : array;
   },
};
