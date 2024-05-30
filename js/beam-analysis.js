'use strict';

/** ============================ Beam Analysis Data Type ============================ */

/**
 * Beam material specification.
 *
 * @param {String} name         Material name
 * @param {Object} properties   Material properties {EI : 0, GA : 0, ....}
 */
function Material(name, properties) {
    this.name = name;
    this.properties = properties;
}

/**
 *
 * @param {Number} primarySpan          Beam primary span length
 * @param {Number} secondarySpan        Beam secondary span length
 * @param {Material} material           Beam material object
 */
function Beam(primarySpan, secondarySpan, material) {
    this.primarySpan = primarySpan;
    this.secondarySpan = secondarySpan;
    this.material = material;
}

/** ============================ Beam Analysis Class ============================ */

function BeamAnalysis() {
    this.options = {
        condition: 'simply-supported'
    };

    this.analyzer = {
        'simply-supported': new BeamAnalysis.analyzer.simplySupported(),
        'two-span-unequal': new BeamAnalysis.analyzer.twoSpanUnequal()
    };
}

BeamAnalysis.prototype = {
    /**
     *
     * @param {Beam} beam
     * @param {Number} load
     * @param {String} condition
     */
    getDeflection: function (beam, load, condition) {
        var analyzer = this.analyzer[condition];

        if (analyzer) {
            return {
                beam: beam,
                load: load,
                equation: analyzer.getDeflectionEquation(beam, load)
            };
        } else {
            throw new Error('Invalid condition');
        }
    },

    getBendingMoment: function (beam, load, condition) {
        var analyzer = this.analyzer[condition];

        if (analyzer) {
            return {
                beam: beam,
                load: load,
                equation: analyzer.getBendingMomentEquation(beam, load)
            };
        } else {
            throw new Error('Invalid condition');
        }
    },

    getShearForce: function (beam, load, condition) {
        var analyzer = this.analyzer[condition];

        if (analyzer) {
            return {
                beam: beam,
                load: load,
                equation: analyzer.getShearForceEquation(beam, load)
            };
        } else {
            throw new Error('Invalid condition');
        }
    }
};

/** ============================ Beam Analysis Analyzer ============================ */

/**
 * Available analyzers for different conditions
 */
BeamAnalysis.analyzer = {};

/**
 * Calculate deflection, bending stress and shear stress for a simply supported beam
 *
 * @param {Beam}   beam   The beam object
 * @param {Number}  load    The applied load
 */
BeamAnalysis.analyzer.simplySupported = function () { };

BeamAnalysis.analyzer.simplySupported.prototype = {
    getDeflectionEquation: function (beam, load) {
        return function (x, j2 = 2) {
            if (x >= 0 || x <= beam.primarySpan) {
                var w = load;
                var L = beam.primarySpan;
                var EI = beam.material.properties.EI;

                var deflection = -((w * x) / (24 * (EI / Math.pow(1000, 3)))) * (Math.pow(L, 3) - 2 * L * Math.pow(x, 2) + Math.pow(x, 3)) * j2 * 1000;
                return {
                    x: x,
                    y: deflection
                };
            } else {
                throw new Error('x is out of bounds');
            }
        }
    },

    getBendingMomentEquation: function (beam, load) {
        return function (x) {
            if (x >= 0 && x <= beam.primarySpan) {
                var w = load;
                var L = beam.primarySpan;
                var bendingMoment = -((w * x / 2) * (L - x));
                return {
                    x: x,
                    y: bendingMoment
                };
            } else {
                throw new Error('x is out of bounds');
            }
        }
    },

    getShearForceEquation: function (beam, load) {
        return function (x) {
            if (x >= 0 && x <= beam.primarySpan) {
                var shearForce = load * ((beam.primarySpan / 2) - x);
                return {
                    x: x,
                    y: shearForce
                };
            } else {
                throw new Error('x is out of bounds');
            }
        }
    }
};

/**
 * Calculate deflection, bending stress and shear stress for a beam with two spans of unequal condition
 *
 * @param {Beam}   beam   The beam object
 * @param {Number}  load    The applied load
 */
BeamAnalysis.analyzer.twoSpanUnequal = function () { };

BeamAnalysis.analyzer.twoSpanUnequal.prototype = {
    getDeflectionEquation: function (beam, load) {
        return function (x, j2) {
            var w = load;
            var L1 = beam.primarySpan;
            var L2 = beam.secondarySpan;
            var EI = beam.material.properties.EI;

            var m = -((w * Math.pow(L2, 3)) + (w * Math.pow(L1, 3))) / (8 * (L1 + L2));
            var R1 = (m / L1) + (w * L1 * 0.5);
            var R3 = (m / L2) + (w * L2 * 0.5);
            var R2 = (w * (L1 + L2)) - R1 - R3;

            var deflection;

            var EI_kNm2 = EI / Math.pow(1000, 4);

            if (x <= L1) {
                deflection = ((x / (24 * EI_kNm2)) * (
                    (4 * R1 * Math.pow(x, 2)) -
                    (w * Math.pow(x, 3)) +
                    (w * Math.pow(L1, 3)) -
                    (4 * R1 * Math.pow(L1, 2))
                ) * 1000 * j2) * 1000;
            } else {
                deflection = (((R1 * x / 6) * (Math.pow(x, 2) - Math.pow(L1, 2))) +
                    ((R2 * x / 6) * (Math.pow(x, 2) - (3 * L1 * x) + 3 * Math.pow(L1, 2))) -
                    (R2 * Math.pow(L1, 3) / 6) -
                    ((w * x / 24) * (Math.pow(x, 3) - Math.pow(L1, 3)))) / EI_kNm2 * 1000 * j2;
            }

            return {
                x: x,
                EI: EI_kNm2,
                y: deflection / 1000000  // Convert deflection to meters
            };
        };
    },


    getBendingMomentEquation: function (beam, load) {
        return function (x) {
            var w = load;
            var L1 = beam.primarySpan;
            var L2 = beam.secondarySpan;
            var totalLength = L1 + L2;

            var m = -((w * Math.pow(L2, 3)) + (w * Math.pow(L1, 3))) / (8 * (L1 + L2));
            var R1 = (m / L1) + ((w * L1) * 0.5);
            var R3 = ((m / L2) + ((w * L2) / 2));
            var R2 = ((w * L1) + (w * L2) - R1 - R3);

            // Calculate bending moment
            var bendingMoment;
            if (x == 0 || x == totalLength) {
                bendingMoment = 0;
            } else if (x < L1) {
                bendingMoment = -(R1 * x - 0.5 * w * Math.pow(x, 2));
            } else if (x > L1) {
                bendingMoment = -((R1 * x + R2 * (x - L1)) - (0.5 * w * (Math.pow(x, 2))));
            } else {
                bendingMoment = -(R1 * L1 - (0.5 * w * (Math.pow(L1, 2))));

            }

            return {
                x: x,
                R1: R1,
                M: m,
                y: bendingMoment
            };
        };
    },


    getShearForceEquation: function (beam, load) {
        return function (x) {
            var w = load;
            var L1 = beam.primarySpan;
            var L2 = beam.secondarySpan;

            var m = -((w * Math.pow(L2, 3)) + (w * Math.pow(L1, 3))) / (8 * (L1 + L2));
            var R1 = (m / L1) + ((w * L1) * 0.5);
            var R3 = ((m / L2) + ((w * L2) / 2));
            var R2 = ((w * L1) + (w * L2) - R1 - R3);

            var shearForce;
            if (x <= L1) {
                shearForce = R1 - w * x;
            } else {
                shearForce = (R1 + R2) - w * x;
            }

            return {
                x: x,
                y: shearForce
            };
        };
    }
};

