function pow(base, exponent) {
    var power=1;
    var i;
    if (base == 0 & exponent == 0) {
           power = 'Результат не определён';
        }
        else if (exponent > 0){
                    for (i = 0; i < exponent; i++) {
                        power *= base;
                    }
             }
             else if (exponent < 0) {
                        for (i = 0; i > exponent; i--) {
                            power *= 1/base;
                        }
                  }
     return power
}
try {
  module.exports = pow;
}
catch (e) {
  var varBase = prompt('Введите основание степени', 0);
  var varExponent = prompt('Показатель степени', 0);
  console.log(pow(varBase, varExponent)); 
};
