/* Scott Clayton 2020 */
/* Disc Golf Stats */

/*eslint no-undef: 0*/

export const Plot = {
    data: () => {
        return {
            graphData: []
        }
    },
    methods: {
        updateBoxPlot: function (canvasId, scores, playerName, courseName, timeSpan) {
            this.updateBoxPlotData(scores, playerName, courseName, timeSpan);
            const ctx = document.getElementById(canvasId).getContext("2d");
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
                        text: 'Disc Golf Scores'
                    }
                }
            });
        },
        updateBoxPlotData: function (scores, playerName, courseName, timeSpan) {
            let rawData = [];
            let graphLabel = playerName + (courseName.length ? " at " + courseName : "");

            // Monthly or Yearly for one player
            if (timeSpan == "by-month" || timeSpan == "by-year") {
                let playerData = scores.find(x => x.playerName == playerName);

                // Some or all courses
                for (let c = 0; c < playerData.courses.length; c++) {
                    if (courseName == "" || playerData.courses[c].courseName == courseName) {
                        for (let s = 0; s < playerData.courses[c].scores.length; s++) {
                            let dateLabel = "X";
                            if (timeSpan == "by-year") {
                                dateLabel = playerData.courses[c].scores[s].date.getFullYear();
                            } else if (timeSpan == "by-month") {
                                dateLabel = (playerData.courses[c].scores[s].date.getMonth() + 1) + "/" + playerData.courses[c].scores[s].date.getFullYear();
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
            let labels = [];
            let data = [];
            let lastLabel = "";
            rawData.sort((a, b) => a.date > b.date ? 1 : -1);
            for (let i = 0; i < rawData.length; i++) {
                if (rawData[i].label != lastLabel) {
                    labels.push(rawData[i].label);
                    data.push([]);
                }
                lastLabel = rawData[i].label;
                data[data.length - 1].push(+rawData[i].score);
            }

            // Create the graph data
            this.graphData = {
                labels: labels,
                datasets: [{
                    label: graphLabel,
                    backgroundColor: 'rgba(255, 0, 0, 0.5)',
                    borderColor: 'rgba(255, 0, 0, 1)',
                    borderWidth: 1,
                    outlierColor: '#999999',
                    padding: 10,
                    itemRadius: 0,
                    data: data
                }]
            };
        }
    }
}