var pow = require('../js/app.js');

describe("Function pow", function() {
  it("Positive Exponents", function() {
  	var result;
  	result = pow(2,3);
    expect(result).toBe(8);
  });
    it("Negative Exponents", function() {
  	var result;
  	result = pow(2,-3);
    expect(result).toBe(0.125);
  });
    it("Zero Exponents", function() {
  	var result;
  	result = pow(9,0);
    expect(result).toBe(1);
  });
});
