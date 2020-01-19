/* Scott Clayton 2020 */
/* Disc Golf Stats */

/*eslint no-undef: 0*/

const GraphColors = [
    ['rgba(255, 0, 0, 1)', 'rgba(255, 0, 0, 0.5)'],
    ['rgba(0, 153, 153, 1)', 'rgba(0, 153, 153, 0.5)'],
    ['rgba(0, 204, 0, 1)', 'rgba(0, 204, 0, 0.5)'],
    ['rgba(255, 116, 0, 1)', 'rgba(255, 116, 0, 0.5)']
];

export const Plot = {
    data: () => {
        return {
            graphData: []
        }
    },
    methods: {
        updateBoxPlot: function (boxPlotDiv, scores, playerNames, courseName, timeSpan) {
            this.updateBoxPlotData(scores, playerNames, courseName, timeSpan);
            var old = document.getElementById(boxPlotDiv + "Canvas");
            if (old) {
                old.remove();
            }
            const canvas = document.createElement('canvas');
            canvas.id = boxPlotDiv + "Canvas";
            const ctx = canvas.getContext("2d");
            document.getElementById(boxPlotDiv).appendChild(canvas);
            window.boxPlotChart = new Chart(ctx, {
                type: 'boxplot',
                data: this.graphData,
                options: {
                    responsive: true,
                    legend: {
                        position: 'top',
                    },
                    title: {
                        display: true,
                        text: 'Disc Golf Scores' + (courseName.length ? " at " + courseName : "")
                    }
                }
            });
        },
        updateBoxPlotData: function (scores, playerNames, courseName, timeSpan) {
            let labels = [];
            let datasets = [];
            let nextColor = 0;

            // Generate all the labels
            let minDate = null;
            let maxDate = null;
            for (let p = 0; p < playerNames.length; p++) {
                let playerData = scores.find(x => x.playerName == playerNames[p]);
                for (let c = 0; c < playerData.courses.length; c++) {
                    if (courseName == "" || playerData.courses[c].courseName == courseName) {
                        for (let s = 0; s < playerData.courses[c].scores.length; s++) {
                            if (minDate == null || playerData.courses[c].scores[s].date < minDate) {
                                minDate = playerData.courses[c].scores[s].date;
                            }
                            if (maxDate == null || playerData.courses[c].scores[s].date > maxDate) {
                                maxDate = playerData.courses[c].scores[s].date;
                            }
                        }
                    }
                }
            }
            minDate = new Date(minDate.getFullYear(), minDate.getMonth(), minDate.getDate());
            maxDate = new Date(maxDate.getFullYear(), maxDate.getMonth(), maxDate.getDate());
            for (var d = new Date(minDate); d <= maxDate; d.setDate(d.getDate() + 1)) {
                let text = "";
                if (timeSpan == "by-year") {
                    text = d.getFullYear().toString();
                } else if (timeSpan == "by-month") {
                    text = (d.getMonth() + 1).toString() + "/" + d.getFullYear().toString();
                } else if (timeSpan == "by-week") {
                    let sun = this.getLastSunday(d);
                    text = (sun.getMonth() + 1).toString() + "/" + sun.getDate().toString() + "/" + sun.getFullYear().toString();
                }
                if (labels.indexOf(text) == -1) {
                    labels.push(text);
                }
            }

            // Generate all the data sets
            for (let p = 0; p < playerNames.length; p++) {
                let rawData = [];
                let playerName = playerNames[p];
                let graphLabel = playerName;

                // Monthly or Yearly for one player
                if (timeSpan == "by-month" || timeSpan == "by-year" || timeSpan == "by-week") {
                    let playerData = scores.find(x => x.playerName == playerName);

                    // Some or all courses
                    for (let c = 0; c < playerData.courses.length; c++) {
                        if (courseName == "" || playerData.courses[c].courseName == courseName) {
                            for (let s = 0; s < playerData.courses[c].scores.length; s++) {
                                let dateLabel = "X";
                                if (timeSpan == "by-year") {
                                    dateLabel = playerData.courses[c].scores[s].date.getFullYear().toString();
                                } else if (timeSpan == "by-month") {
                                    dateLabel = (playerData.courses[c].scores[s].date.getMonth() + 1).toString() + "/" + playerData.courses[c].scores[s].date.getFullYear().toString();
                                } else if (timeSpan == "by-week") {
                                    let sun = this.getLastSunday(playerData.courses[c].scores[s].date);
                                    dateLabel = (sun.getMonth() + 1).toString() + "/" + sun.getDate().toString() + "/" + sun.getFullYear().toString();
                                }
                                rawData.push({
                                    date: playerData.courses[c].scores[s].date,
                                    label: dateLabel,
                                    score: playerData.courses[c].scores[s].score
                                });
                            }
                        }
                    }
                }

                // Extract labels and data
                let data = [];
                for (let i = 0; i < labels.length; i++) {
                    data.push([]);
                }
                rawData.sort((a, b) => a.date > b.date ? 1 : -1);
                for (let i = 0; i < rawData.length; i++) {
                    let index = labels.indexOf(rawData[i].label);
                    data[index].push(+rawData[i].score);
                }

                let color = GraphColors[nextColor++ % GraphColors.length];
                datasets.push({
                    label: graphLabel,
                    backgroundColor: color[1],
                    borderColor: color[0],
                    borderWidth: 1,
                    outlierColor: '#999999',
                    padding: 10,
                    itemRadius: 0,
                    data: data
                });
            }

            // Create the graph data
            this.graphData = {
                labels: labels,
                datasets: datasets
            };
        },
        getLastSunday: function (date) {
            var t = new Date(date);
            t.setDate(t.getDate() - t.getDay());
            return t;
        }
    }
}