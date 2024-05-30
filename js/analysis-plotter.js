class AnalysisPlotter {
    constructor(canvasId) {
        this.ctx = document.getElementById(canvasId).getContext('2d');
    }

    plot(data) {
        const labels = data.map(point => point.x.toFixed(2));
        const values = data.map(point => point.y.toFixed(2));

        new Chart(this.ctx, {
            type: 'line',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Value',
                    data: values,
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 1,
                    fill: false
                }]
            },
            options: {
                responsive: true,
                scales: {
                    xAxes: [{
                        scaleLabel: {
                            display: true,
                            labelString: 'Position (m)'
                        }
                    }],
                    yAxes: [{
                        scaleLabel: {
                            display: true,
                            labelString: 'Value'
                        }
                    }]
                }
            }
        });
    }
}

/**
 * Get float value of specified field
 */
function floatVal(id) {
    return parseFloat(
        document.getElementById(id).value
    );
}

function stringVal(id) {
    return document.getElementById(id).value;
}

document.getElementById('calculate').addEventListener('click', function (e) {
    var beam = new Beam();

    beam.primarySpan = floatVal('primarySpan');
    beam.secondarySpan = floatVal('secondarySpan');
    beam.material = new Material('No Name', {
        EI: floatVal('EI')
    });

    var j2 = floatVal('j2');
    var load = floatVal('w');
    var condition = stringVal('condition');

    var plotter = {
        deflection: new AnalysisPlotter('deflection_plot'),
        shearForce: new AnalysisPlotter('shear_force_plot'),
        bendingMoment: new AnalysisPlotter('bending_moment_plot')
    };

    var beamAnalysis = new BeamAnalysis();
    var deflectionEquation = beamAnalysis.getDeflection(beam, load, condition).equation;
    var bendingMomentEquation = beamAnalysis.getBendingMoment(beam, load, condition).equation;
    var shearForceEquation = beamAnalysis.getShearForce(beam, load, condition).equation;

    var deflectionData = [];
    var bendingMomentData = [];
    var shearForceData = [];

    for (var x = 0; x <= beam.primarySpan; x += 0.1) {
        deflectionData.push(deflectionEquation(x, j2));
        bendingMomentData.push(bendingMomentEquation(x));
        shearForceData.push(shearForceEquation(x));
    }

    plotter.deflection.plot(deflectionData);
    plotter.shearForce.plot(shearForceData);
    plotter.bendingMoment.plot(bendingMomentData);
});
