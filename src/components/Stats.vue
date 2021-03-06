<template>
  <div class="container">
    <div class="row">
      <div class="col-sm-8 text-left">
        <h1>Disc Golf Stats</h1>
      </div>
      <div class="col-sm-4 text-right">
        <a
          class="btn btn-lnk btn-margin"
          href="https://github.com/skotz/disc-stats/issues"
          target="_blank"
        >Feedback</a>
        <button class="btn btn-secondary btn-margin" v-show="step > 1" v-on:click="step--">Back</button>
      </div>
    </div>
    <hr />
    <div class="row">
      <div class="col-12">
        <div v-show="step == 1">
          <div class="row">
            <div class="col-md-8">
              <h2>Select Data</h2>
              <p>Upload your disc golf scores (in a UDisc CSV format) to generate a graph of your scores over time.</p>
              <div class="alert alert-danger" role="alert" v-if="error">
                <p>Failed to load scores from CSV. Are you sure this is a valid UDisc export?</p>
                <p>Valid UDisc exports typically look like this:</p>
                <pre>PlayerName,CourseName,LayoutName,Date,Total,+/-,Hole1,Hole2,...
<!--                  -->Par,Yahara Hills Winter Course,Main,2019-12-29 13:03,59,,4,3,...
<!--                  -->Scott,Yahara Hills Winter Course,Main,2019-12-29 13:03,62,3,5,4,...</pre>
              </div>
              <label for="fileUpload" class="btn btn-primary">
                <span>Select a file</span>
                <input type="file" id="fileUpload" v-on:change="onFileChange" />
              </label>
              <br />
              <br />
              <h4>Sample Graph</h4>
              <img :src="exampleImage" class="img-fluid img-example" />
              <p>
                Scott Clayton {{new Date().getFullYear()}} &bull;
                <a
                  href="https://github.com/skotz"
                  target="_blank"
                >GitHub</a>
              </p>
            </div>
            <div class="col-md-4">
              <div class="alert alert-info" role="alert">
                From within the UDisc app, go to
                <strong>More</strong>, and then
                <strong>Scorecards</strong>,
                and then from the ellipses menu select
                <strong>Export to CSV</strong>.
              </div>
              <div class="alert alert-light" role="alert">
                Your data is not saved on our servers.
                Scores are parsed directly by this webpage and only used to generate graphs.
              </div>
            </div>
          </div>
        </div>
        <div v-show="step == 2">
          <div class="row">
            <div class="col-md-8">
              <h2>Select Granularity</h2>
              <p>Choose how to aggregate your scores in the report.</p>
              <button
                class="btn btn-primary btn-spacing"
                v-on:click="onSelectReportType('by-year')"
              >By Year</button>
              <button
                class="btn btn-primary btn-spacing"
                v-on:click="onSelectReportType('by-month')"
              >By Month</button>
              <button
                class="btn btn-primary btn-spacing"
                v-on:click="onSelectReportType('by-week')"
              >By Week</button>
            </div>
            <div class="col-md-4">
              <div
                class="alert alert-success"
                role="alert"
              >Loaded {{totalRounds}} rounds for {{totalPlayers}} players across {{totalCourses}} courses!</div>
              <div
                class="alert alert-warning"
                role="alert"
                v-show="duplicates > 0"
              >Removed {{duplicates}} duplicate rounds. These are caused by multiple UDisc players recording a round for the same user.</div>
            </div>
          </div>
        </div>
        <div v-show="step == 3">
          <h2>Select Players</h2>
          <p>Choose which player(s) to include in the results.</p>
          <div class="row row--players">
            <div class="col-sm-4" v-for="player in scores.players" v-bind:key="player.playerName">
              <button
                v-bind:class="['btn', playerNames.some(x => x == player.playerName) ? 'btn-primary' : 'btn-outline-primary']"
                v-on:click="onSelectPlayerName(player.playerName)"
              >
                <strong>{{ player.playerName }}</strong>
                <br />
                {{player.totalRounds}} rounds
              </button>
            </div>
          </div>
          <div v-if="playerNames && playerNames.length > 0">
            <button class="btn btn-success" v-on:click="onSelectPlayerNameDone()">Next</button>
          </div>
        </div>
        <div v-show="step == 4">
          <h2>Select Course</h2>
          <p>Choose which course to include in the results.</p>
          <div class="row row--players">
            <div class="col-sm-4">
              <button class="btn btn-success" v-on:click="onSelectCourseName('')">All Courses</button>
            </div>
            <div class="col-sm-4" v-for="course in allPlayerCourses" v-bind:key="course.courseName">
              <button class="btn btn-primary" v-on:click="onSelectCourseName(course.courseName)">
                <strong>{{ course.courseName }}</strong>
                <br />
                {{course.totalRounds}} rounds
              </button>
            </div>
          </div>
        </div>
        <div v-show="step == 5">
          <h2>Select Dates</h2>
          <p>Choose a range of dates to include in the results.</p>
          <VueSlider v-if="labels && labels.full" v-model="dateSliderValue" :data="labels.labels" />
          <p v-html="dateSliderRangeText"></p>
          <button class="btn btn-success" v-on:click="onSelectDateRange()">Next</button>
        </div>
        <div v-show="step == 6">
          <h2>Results</h2>
          <div id="boxPlot"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { UDisc } from "./../udisc.js";
import { Plot } from "./../plot.js";
import VueSlider from "vue-slider-component";
import "vue-slider-component/theme/default.css";

export default {
  name: "Stats",
  props: {},
  data: () => {
    return {
      scores: [],
      step: 1,
      error: false,
      reportType: "",
      playerNames: [],
      allPlayerCourses: [],
      graphsGenerated: 0,
      duplicates: 0,
      exampleImage: process.env.BASE_URL + "example.png",
      labels: null,
      dateSliderValue: []
    };
  },
  computed: {
    totalPlayers: function() {
      return this.scores && this.scores.players
        ? this.scores.players.length
        : 0;
    },
    totalCourses: function() {
      return this.scores ? this.scores.courseCount : 0;
    },
    totalRounds: function() {
      return this.scores ? this.scores.roundsCount : 0;
    },
    dateSliderRange: function() {
      if (this.dateSliderValue && this.dateSliderValue.length == 2) {
        let first = this.labels.all.find(
          x => x.label == this.dateSliderValue[0]
        );
        let second = this.labels.all.find(
          x => x.label == this.dateSliderValue[1]
        );

        if (first.date > second.date) {
          return [second, first];
        } else if (first.label == second.label) {
          return [first];
        } else {
          return [first, second];
        }
      }
      return [];
    },
    dateSliderRangeText: function() {
      if (this.dateSliderRange.length == 1) {
        return (
          this.dateSliderRange[0].start.toLocaleDateString() +
          "&ndash;" +
          this.dateSliderRange[0].end.toLocaleDateString()
        );
      } else if (this.dateSliderRange.length == 2) {
        return (
          this.dateSliderRange[0].start.toLocaleDateString() +
          "&ndash;" +
          this.dateSliderRange[1].end.toLocaleDateString()
        );
      } else {
        return "";
      }
    }
  },
  methods: {
    onFileChange: function(e) {
      this.error = false;
      var files = e.target.files || e.dataTransfer.files;
      var self = this;
      if (files.length) {
        var reader = new FileReader();
        reader.onload = () => {
          try {
            var parsedScores = self.parseScores(
              reader.result,
              self.$papa.parse
            );
            if (
              parsedScores &&
              parsedScores.players &&
              parsedScores.players.length
            ) {
              self.scores = parsedScores;
              self.step = 2;
              self.duplicates = parsedScores.duplicates;
              document.getElementById("fileUpload").value = "";
              this.fireEvent(
                "event-file-upload",
                parsedScores.players.length +
                  " players, " +
                  parsedScores.courseCount +
                  " courses, " +
                  parsedScores.roundsCount +
                  " rounds"
              );
            } else {
              self.error = true;
              this.fireEvent("event-error", "file-upload");
            }
          } catch (ex) {
            self.error = true;
            this.fireEvent("event-error", "file-upload-exception " + ex);
          }
        };
        reader.readAsText(files[0]);
      }
    },
    onSelectReportType: function(type) {
      this.reportType = type;
      this.step = 3;
      this.fireEvent("event-report-type", type);
    },
    onSelectPlayerName: function(playerName) {
      if (this.playerNames.some(x => x == playerName)) {
        this.playerNames = this.playerNames.filter(x => x != playerName);
      } else {
        this.playerNames.push(playerName);
      }
    },
    onSelectPlayerNameDone: function() {
      this.allPlayerCourses = this.scores.players
        .find(x => this.playerNames.some(y => y == x.playerName))
        .courses.map(x => {
          return {
            courseName: x.courseName,
            totalRounds: x.scores.length
          };
        });
      this.allPlayerCourses.sort((a, b) =>
        a.courseName > b.courseName ? 1 : -1
      );
      this.step = 4;
      this.fireEvent("event-select-players", this.playerNames.length);
    },
    onSelectCourseName: function(course) {
      this.courseName = course;
      this.step = 5;
      this.fireEvent(
        "event-select-course",
        this.courseName ? this.courseName : "all"
      );
      this.labels = this.getLabels(
        this.scores.players,
        this.playerNames,
        this.courseName,
        this.reportType
      );
      this.dateSliderValue = [
        this.labels.labels[0],
        this.labels.labels[this.labels.labels.length - 1]
      ];
    },
    onSelectDateRange: function() {
      this.step = 6;
      this.fireEvent(
        "event-select-dates",
        this.dateSliderRange[0].start.toLocaleDateString() +
          " - " +
          this.dateSliderRange[
            this.dateSliderRange.length - 1
          ].end.toLocaleDateString()
      );
      this.updateBoxPlot(
        "boxPlot",
        this.scores.players,
        this.playerNames,
        this.courseName,
        this.reportType,
        this.dateSliderRange[0].start,
        this.dateSliderRange[this.dateSliderRange.length - 1].end
      );
      this.graphsGenerated++;
      this.fireEvent("event-view-graph", this.graphsGenerated);
    },
    fireEvent: function(event, info) {
      window.dataLayer.push({
        "event-label": info,
        event: event
      });
    },
    prettify: function(ts) {
      return new Date(ts).toLocaleDateString("en", {
        year: "numeric",
        month: "short",
        day: "numeric"
      });
    }
  },
  mounted: function() {
    this.fireEvent("event-app-load", "");
  },
  mixins: [UDisc, Plot],
  components: {
    VueSlider: VueSlider
  }
};
</script>

<style scoped>
#fileUpload {
  display: none;
}
.btn {
  margin-bottom: 15px;
}
.btn-spacing {
  margin: 0 15px 15px 0;
}
/*.disclaimer {
  position: fixed;
  bottom: 0;
  left: 0;
  opacity: 0.5;
  margin: 0 0 5px 10px;
  font-size: 12px;
}*/
.btn-margin {
  margin: 8px 0 0 15px;
}
.row--players .btn {
  width: 100%;
}
.img-example {
  margin: 0 0 15px 0;
}
pre {
  margin: 0;
  border: 1px solid #aaa;
  background-color: #ddd;
  border-radius: 0.25em;
  padding: 15px;
}
</style>
