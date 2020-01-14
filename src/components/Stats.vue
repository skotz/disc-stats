<template>
  <div class="container">
    <div class="row">
      <div class="col-12 text-left" v-show="step > 1">
        <button class="btn btn-secondary" v-on:click="step--">Back</button>
      </div>
    </div>
    <div class="row">
      <div class="col-12">
        <div v-show="step == 1">
          <h2>Upload UDisc CSV</h2>
          <p>
            You can find this in the UDisc app by going to
            <strong>More</strong> and then
            <strong>Scorecards</strong>, and from the ellipses menu select
            <strong>Export to CSV</strong>.
          </p>
          <p class="error" v-if="error.length > 0">{{ error }}</p>
          <label for="fileUpload" class="btn btn-primary">
            <span>Select a file</span>
            <input type="file" id="fileUpload" v-on:change="onFileChange" />
          </label>
        </div>
        <div v-show="step == 2">
          <h2>Select Granularity</h2>
          <button class="btn btn-primary" v-on:click="onSelectReportType('by-year')">Yearly</button>
          <button class="btn btn-primary" v-on:click="onSelectReportType('by-month')">Monthly</button>
        </div>
        <div v-show="step == 3">
          <h2>Select Players</h2>
          <button
            v-bind:class="['btn', playerNames.some(x => x == player.playerName) ? 'btn-primary' : 'btn-outline-primary']"
            v-on:click="onSelectPlayerName(player.playerName)"
            v-for="player in scores.players"
            v-bind:key="player.playerName"
          >{{ player.playerName }} ({{player.totalRounds}} rounds)</button>
          <div v-if="playerNames && playerNames.length > 0">
            <button class="btn btn-success" v-on:click="onSelectPlayerNameDone()">Next</button>
          </div>
        </div>
        <div v-show="step == 4">
          <h2>Select Course</h2>
          <button class="btn btn-success" v-on:click="onSelectCourseName('')">All Courses</button>
          <button
            class="btn btn-primary"
            v-on:click="onSelectCourseName(course.courseName)"
            v-for="course in allPlayerCourses"
            v-bind:key="course.courseName"
          >{{ course.courseName }} ({{course.totalRounds}} rounds)</button>
        </div>
        <div v-show="step == 5">
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
      allPlayerCourses: []
    };
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
            document.getElementById("fileUpload").value = "";
          } else {
            self.error =
              "Failed to load scores from CSV. Are you sure this is a valid UDisc export?";
          }
        };
        reader.readAsText(files[0]);
      }
    },
    onSelectReportType: function(type) {
      this.reportType = type;
      this.step = 3;
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
    },
    onSelectCourseName: function(course) {
      this.courseName = course;
      this.step = 5;
      this.updateBoxPlot(
        "boxPlot",
        this.scores.players,
        this.playerNames,
        this.courseName,
        this.reportType
      );
    }
  },
  mixins: [UDisc, Plot]
};
</script>

<style scoped>
#fileUpload {
  display: none;
}
.btn {
  margin: 0 7.5px 15px 7.5px;
}
</style>
