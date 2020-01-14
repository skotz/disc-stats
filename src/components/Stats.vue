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
          <h2>Upload Your UDisc CSV</h2>
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
          <h2>Select Your Time Scale</h2>
          <button class="btn btn-primary" v-on:click="onSelectReportType('by-year')">Yearly</button>
          <button class="btn btn-primary" v-on:click="onSelectReportType('by-month')">Monthly</button>
        </div>
        <div v-show="step == 3">
          <h2>Choose Your Player Name</h2>
          <button
            class="btn btn-primary"
            v-on:click="onSelectPlayerName(player.playerName)"
            v-for="player in scores.players"
            v-bind:key="player.playerName"
          >{{ player.playerName }} ({{player.totalRounds}} rounds)</button>
        </div>
        <div v-show="step == 4">
          <h2>Choose Your Course</h2>
          <button
            class="btn btn-primary"
            v-on:click="onSelectCourseName(course.courseName)"
            v-for="course in allPlayerCourses"
            v-bind:key="course.courseName"
          >{{ course.courseName }} ({{course.totalRounds}} rounds)</button>
        </div>
        <div v-show="step == 5">
          <h2>Your Results</h2>
          <canvas id="boxPlotCanvas"></canvas>
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
      playerName: "",
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
      this.playerName = playerName;
      this.allPlayerCourses = this.scores.players
        .find(x => x.playerName == playerName)
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
        "boxPlotCanvas",
        this.scores.players,
        this.playerName,
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
