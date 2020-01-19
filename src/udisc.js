/* Scott Clayton 2020 */
/* Disc Golf Stats */

const UDiscFormat = {
    Csv_PlayerName: 0,
    Csv_CourseName: 1,
    Csv_LayoutName: 2,
    Csv_Date: 3,
    Csv_Total: 4,
    Csv_OverUnderPar: 5,
    Csv_ValidHeader: "PlayerName,CourseName,LayoutName,Date,Total,+/-",
    ParPlayerName: "Par",
    DuplicateTimeDiff: 5
}

export const UDisc = {
    methods: {
        parseScores: (data, parser) => {
            var allData = parser(data).data;
            var scores = [];
            var duplicates = 0;
            var distinctCourses = [];
            var overallRounds = 0;

            // Parse score data for every player
            if (allData && allData.length) {
                // Header row
                if (allData[0][UDiscFormat.Csv_PlayerName].toLowerCase() + "," +
                    allData[0][UDiscFormat.Csv_CourseName].toLowerCase() + "," +
                    allData[0][UDiscFormat.Csv_LayoutName].toLowerCase() + "," +
                    allData[0][UDiscFormat.Csv_Date].toLowerCase() + "," +
                    allData[0][UDiscFormat.Csv_Total].toLowerCase() + "," +
                    allData[0][UDiscFormat.Csv_OverUnderPar].toLowerCase() != UDiscFormat.Csv_ValidHeader.toLowerCase()) {
                    return false;
                }

                for (let i = 1; i < allData.length; i++) {
                    var playerName = allData[i][UDiscFormat.Csv_PlayerName];
                    var courseName = allData[i][UDiscFormat.Csv_CourseName] + " - " + allData[i][UDiscFormat.Csv_LayoutName];
                    var scoreDate = new Date(allData[i][UDiscFormat.Csv_Date]);
                    var scoreTotal = allData[i][UDiscFormat.Csv_Total];
                    var scoreOverUnder = allData[i][UDiscFormat.Csv_OverUnderPar];

                    // Verify that this is a valid UDisc record
                    if (!playerName || !courseName || !scoreDate || !scoreTotal || !scoreOverUnder) {
                        continue;
                    }

                    var distinctCourseIndex = distinctCourses.findIndex(x => x == courseName);
                    if (distinctCourseIndex < 0) {
                        distinctCourses.push(courseName);
                    }

                    // Par for a course in UDisc is stored as a pseudo-player named "Par" on every card
                    if (playerName != UDiscFormat.ParPlayerName) {
                        // If this is a new player we haven't seen yet, add them
                        var playerIndex = scores.findIndex(x => x.playerName == playerName);
                        if (playerIndex < 0) {
                            // Create a new player
                            var player = {
                                playerName: playerName,
                                courses: [],
                                totalRounds: 0
                            };
                            scores.push(player);
                            playerIndex = scores.findIndex(x => x.playerName == playerName);
                        }

                        // If this player hasn't played this course before, add it
                        var courseIndex = scores[playerIndex].courses.findIndex(x => x.courseName == courseName);
                        if (courseIndex < 0) {
                            // Create a new course
                            var course = {
                                courseName: courseName,
                                scores: []
                            };
                            scores[playerIndex].courses.push(course);
                            courseIndex = scores[playerIndex].courses.findIndex(x => x.courseName == courseName);
                        }

                        // Add a score for this player and this course (if it's not a duplicate)
                        var nonDuplicate = scores[playerIndex].courses[courseIndex].scores.every(x => {
                            var sameTime = Math.abs(x.date - scoreDate) < UDiscFormat.DuplicateTimeDiff * 60 * 1000;
                            return !sameTime;
                        });
                        if (nonDuplicate) {
                            var score = {
                                date: scoreDate,
                                total: scoreTotal,
                                score: scoreOverUnder
                            };
                            scores[playerIndex].courses[courseIndex].scores.push(score);
                            scores[playerIndex].totalRounds++;
                            overallRounds++;
                        } else {
                            // UDisk allows other players to link scores to your profile even if you're recording the same game yourself, so duplicates happen
                            duplicates++;
                        }
                    }
                }
            }

            if (scores && scores.length > 0) {
                scores.sort((a, b) => a.totalRounds > b.totalRounds ? -1 : 1);
            }

            return {
                players: scores,
                duplicates: duplicates,
                courseCount: distinctCourses.length,
                roundsCount: overallRounds
            };
        }
    }
}