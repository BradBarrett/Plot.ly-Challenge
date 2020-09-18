function buildData(sample) {
    d3.json("samples.json").then((data) => {
        console.log(data)
        var metadata = data.metadata;
        var resultArray = metadata.filter(sampleObj => sampleObj.id == sample);
        var result = resultArray[0];
        var CHART = d3.select("#sample-metadata");

        CHART.html("");

        Object.entries(result).forEach(([key, value]) => {
            CHART.append("h6").text(`${key.toUpperCase()}: ${value}`);
        });
    });
}

function buildCharts(sample){
    d3.json('samples.json').then((data) => {
        var samples = data.samples;
        var resultArray = samples.filter(sampleObj => sampleObj.id == sample);
        var result = resultArray[0];
        var otu_ids = result.otu_ids;
        var otu_labels = result.otu_labels;
        var sample_values = result.sample_values;

        var layout_b = {
            title: "Bacterias per Sample",
            margin: { t: 0},
            xaxis: { title: "OTU ID"},
            margin: {t: 30}

        };

        var data_b = [
            {
                x: otu_ids,
                y: sample_values,
                text: otu_labels,
                mode: "markers",
                marker: {
                    size: sample_values,
                    color: otu_ids,
                    colorscale: 'Electric'

                }
            }
        ];

        Plotly.newPlot("bubble", data_b, layout_b);

        var yvalues = otu_ids.slice(0, 10).map(otuID => `OTU ${otuID}`).reverse();

        var barData = [
            {
                y: yvalues,
                x: sample_values.slice(0, 10).reverse(),
                type: "bar",
                orientation: "h",
            }
        ];

        var barLayout = {
            title: "Top 10 Bacterias",
            margin: { t:30, 1:159}
        };

        Plotly.newPlot("bar", barData, barLayout);

    });
}

function getInfo() {
    var selector = d3.select("#selDataset");

    d3.json("samples.json").then((data) => {
        var sampleNames = data.names;

        sampleNames.forEach((sample) => {
            selector
                .append("option")
                .text(sample)
                .property("value", sample);
        });

        var firstvalue = sampleNames[0];
        buildCharts(firstvalue);
        buildData(firstvalue);

    });
}


function optionChanged(othersample) {
    buildCharts(othersample);
    buildData(othersample);
}

getInfo();

