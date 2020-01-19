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
              <p class="error" v-if="error.length > 0">{{ error }}</p>
              <label for="fileUpload" class="btn btn-primary">
                <span>Select a file</span>
                <input type="file" id="fileUpload" v-on:change="onFileChange" />
              </label>
              <br />
              <br />
              <h4>Sample Graph</h4>
              <img :src="exampleImage" class="img-fluid img-example" />
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
              <p>Would you like to aggregate scores by year, month, or week?</p>
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
              >Loaded {{totalRounds}} rounds for {{totalPlayers}} players and {{totalCourses}} courses!</div>
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
          <h2>Results</h2>
          <div id="boxPlot"></div>
        </div>
      </div>
    </div>
    <div class="disclaimer">
      &copy; Scott Clayton {{new Date().getFullYear()}} &bull;
      <a
        href="https://github.com/skotz"
        target="_blank"
      >GitHub</a>
    </div>
  </div>
</template>

<script>
import { UDisc } from "./../udisc.js";
import { Plot } from "./../plot.js";

export default {
  name: "Stats",
  props: {},
  data: () => {
    return {
      scores: [],
      step: 1,
      error: "",
      reportType: "",
      playerNames: [],
      allPlayerCourses: [],
      graphsGenerated: 0,
      duplicates: 0,
      exampleImage: process.env.BASE_URL + "example.png"
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
    }
  },
  methods: {
    onFileChange: function(e) {
      this.error = "";
      var files = e.target.files || e.dataTransfer.files;
      var self = this;
      if (files.length) {
        var reader = new FileReader();
        reader.onload = () => {
          var parsedScores = self.parseScores(reader.result, self.$papa.parse);
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
            self.error =
              "Failed to load scores from CSV. Are you sure this is a valid UDisc export?";
            this.fireEvent("event-error", "file-upload");
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
      this.updateBoxPlot(
        "boxPlot",
        this.scores.players,
        this.playerNames,
        this.courseName,
        this.reportType
      );
      this.graphsGenerated++;
      this.fireEvent("event-view-graph", this.graphsGenerated);
    },
    fireEvent: function(event, info) {
      window.dataLayer.push({
        "event-label": info,
        event: event
      });
    }
  },
  mounted: function() {
    this.fireEvent("event-app-load", "");
  },
  mixins: [UDisc, Plot]
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
.disclaimer {
  position: fixed;
  bottom: 0;
  left: 0;
  opacity: 0.5;
  margin: 0 0 5px 10px;
  font-size: 12px;
}
.btn-margin {
  margin: 8px 0 0 15px;
}
.row--players .btn {
  width: 100%;
}
.img-example {
  margin: 0 0 15px 0;
}
</style>
