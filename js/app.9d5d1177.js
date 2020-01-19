(function(e){function t(t){for(var r,o,l=t[0],i=t[1],u=t[2],d=0,p=[];d<l.length;d++)o=l[d],Object.prototype.hasOwnProperty.call(s,o)&&s[o]&&p.push(s[o][0]),s[o]=0;for(r in i)Object.prototype.hasOwnProperty.call(i,r)&&(e[r]=i[r]);c&&c(t);while(p.length)p.shift()();return n.push.apply(n,u||[]),a()}function a(){for(var e,t=0;t<n.length;t++){for(var a=n[t],r=!0,l=1;l<a.length;l++){var i=a[l];0!==s[i]&&(r=!1)}r&&(n.splice(t--,1),e=o(o.s=a[0]))}return e}var r={},s={app:0},n=[];function o(t){if(r[t])return r[t].exports;var a=r[t]={i:t,l:!1,exports:{}};return e[t].call(a.exports,a,a.exports,o),a.l=!0,a.exports}o.m=e,o.c=r,o.d=function(e,t,a){o.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:a})},o.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},o.t=function(e,t){if(1&t&&(e=o(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var a=Object.create(null);if(o.r(a),Object.defineProperty(a,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)o.d(a,r,function(t){return e[t]}.bind(null,r));return a},o.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return o.d(t,"a",t),t},o.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},o.p="/disc-stats/";var l=window["webpackJsonp"]=window["webpackJsonp"]||[],i=l.push.bind(l);l.push=t,l=l.slice();for(var u=0;u<l.length;u++)t(l[u]);var c=i;n.push([0,"chunk-vendors"]),a()})({0:function(e,t,a){e.exports=a("56d7")},"034f":function(e,t,a){"use strict";var r=a("85ec"),s=a.n(r);s.a},"56d7":function(e,t,a){"use strict";a.r(t);a("e260"),a("e6cf"),a("cca6"),a("a79d");var r=a("2b0e"),s=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{attrs:{id:"app"}},[a("Stats")],1)},n=[],o=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"container"},[a("div",{staticClass:"row"},[e._m(0),a("div",{staticClass:"col-sm-4 text-right"},[a("a",{staticClass:"btn btn-lnk btn-margin",attrs:{href:"https://github.com/skotz/disc-stats/issues",target:"_blank"}},[e._v("Feedback")]),a("button",{directives:[{name:"show",rawName:"v-show",value:e.step>1,expression:"step > 1"}],staticClass:"btn btn-secondary btn-margin",on:{click:function(t){e.step--}}},[e._v("Back")])])]),a("hr"),a("div",{staticClass:"row"},[a("div",{staticClass:"col-12"},[a("div",{directives:[{name:"show",rawName:"v-show",value:1==e.step,expression:"step == 1"}]},[a("div",{staticClass:"row"},[a("div",{staticClass:"col-md-8"},[a("h2",[e._v("Select Data")]),a("p",[e._v("Upload your disc golf scores (in a UDisc CSV format) to generate a graph of your scores over time.")]),e.error?a("div",{staticClass:"alert alert-danger",attrs:{role:"alert"}},[a("p",[e._v("Failed to load scores from CSV. Are you sure this is a valid UDisc export?")]),a("p",[e._v("Valid UDisc exports typically look like this:")]),e._m(1)]):e._e(),a("label",{staticClass:"btn btn-primary",attrs:{for:"fileUpload"}},[a("span",[e._v("Select a file")]),a("input",{attrs:{type:"file",id:"fileUpload"},on:{change:e.onFileChange}})]),a("br"),a("br"),a("h4",[e._v("Sample Graph")]),a("img",{staticClass:"img-fluid img-example",attrs:{src:e.exampleImage}}),a("p",[e._v(" Scott Clayton "+e._s((new Date).getFullYear())+" • "),a("a",{attrs:{href:"https://github.com/skotz",target:"_blank"}},[e._v("GitHub")])])]),e._m(2)])]),a("div",{directives:[{name:"show",rawName:"v-show",value:2==e.step,expression:"step == 2"}]},[a("div",{staticClass:"row"},[a("div",{staticClass:"col-md-8"},[a("h2",[e._v("Select Granularity")]),a("p",[e._v("Choose how to aggregate your scores in the report.")]),a("button",{staticClass:"btn btn-primary btn-spacing",on:{click:function(t){return e.onSelectReportType("by-year")}}},[e._v("By Year")]),a("button",{staticClass:"btn btn-primary btn-spacing",on:{click:function(t){return e.onSelectReportType("by-month")}}},[e._v("By Month")]),a("button",{staticClass:"btn btn-primary btn-spacing",on:{click:function(t){return e.onSelectReportType("by-week")}}},[e._v("By Week")])]),a("div",{staticClass:"col-md-4"},[a("div",{staticClass:"alert alert-success",attrs:{role:"alert"}},[e._v("Loaded "+e._s(e.totalRounds)+" rounds for "+e._s(e.totalPlayers)+" players across "+e._s(e.totalCourses)+" courses!")]),a("div",{directives:[{name:"show",rawName:"v-show",value:e.duplicates>0,expression:"duplicates > 0"}],staticClass:"alert alert-warning",attrs:{role:"alert"}},[e._v("Removed "+e._s(e.duplicates)+" duplicate rounds. These are caused by multiple UDisc players recording a round for the same user.")])])])]),a("div",{directives:[{name:"show",rawName:"v-show",value:3==e.step,expression:"step == 3"}]},[a("h2",[e._v("Select Players")]),a("p",[e._v("Choose which player(s) to include in the results.")]),a("div",{staticClass:"row row--players"},e._l(e.scores.players,(function(t){return a("div",{key:t.playerName,staticClass:"col-sm-4"},[a("button",{class:["btn",e.playerNames.some((function(e){return e==t.playerName}))?"btn-primary":"btn-outline-primary"],on:{click:function(a){return e.onSelectPlayerName(t.playerName)}}},[a("strong",[e._v(e._s(t.playerName))]),a("br"),e._v(" "+e._s(t.totalRounds)+" rounds ")])])})),0),e.playerNames&&e.playerNames.length>0?a("div",[a("button",{staticClass:"btn btn-success",on:{click:function(t){return e.onSelectPlayerNameDone()}}},[e._v("Next")])]):e._e()]),a("div",{directives:[{name:"show",rawName:"v-show",value:4==e.step,expression:"step == 4"}]},[a("h2",[e._v("Select Course")]),a("p",[e._v("Choose which course to include in the results.")]),a("div",{staticClass:"row row--players"},[a("div",{staticClass:"col-sm-4"},[a("button",{staticClass:"btn btn-success",on:{click:function(t){return e.onSelectCourseName("")}}},[e._v("All Courses")])]),e._l(e.allPlayerCourses,(function(t){return a("div",{key:t.courseName,staticClass:"col-sm-4"},[a("button",{staticClass:"btn btn-primary",on:{click:function(a){return e.onSelectCourseName(t.courseName)}}},[a("strong",[e._v(e._s(t.courseName))]),a("br"),e._v(" "+e._s(t.totalRounds)+" rounds ")])])}))],2)]),a("div",{directives:[{name:"show",rawName:"v-show",value:5==e.step,expression:"step == 5"}]},[a("h2",[e._v("Select Dates")]),a("p",[e._v("Choose a range of dates to include in the results.")]),e.labels&&e.labels.full?a("VueSlider",{attrs:{data:e.labels.labels},model:{value:e.dateSliderValue,callback:function(t){e.dateSliderValue=t},expression:"dateSliderValue"}}):e._e(),a("p",{domProps:{innerHTML:e._s(e.dateSliderRangeText)}}),a("button",{staticClass:"btn btn-success",on:{click:function(t){return e.onSelectDateRange()}}},[e._v("Next")])],1),a("div",{directives:[{name:"show",rawName:"v-show",value:6==e.step,expression:"step == 6"}]},[a("h2",[e._v("Results")]),a("div",{attrs:{id:"boxPlot"}})])])])])},l=[function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"col-sm-8 text-left"},[a("h1",[e._v("Disc Golf Stats")])])},function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("pre",[e._v("PlayerName,CourseName,LayoutName,Date,Total,+/-,Hole1,Hole2,...\n"),e._v("Par,Yahara Hills Winter Course,Main,2019-12-29 13:03,59,,4,3,...\n"),e._v("Scott,Yahara Hills Winter Course,Main,2019-12-29 13:03,62,3,5,4,...")])},function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"col-md-4"},[a("div",{staticClass:"alert alert-info",attrs:{role:"alert"}},[e._v(" From within the UDisc app, go to "),a("strong",[e._v("More")]),e._v(", and then "),a("strong",[e._v("Scorecards")]),e._v(", and then from the ellipses menu select "),a("strong",[e._v("Export to CSV")]),e._v(". ")]),a("div",{staticClass:"alert alert-light",attrs:{role:"alert"}},[e._v(" Your data is not saved on our servers. Scores are parsed directly by this webpage and only used to generate graphs. ")])])}],i=(a("4de4"),a("7db0"),a("d81d"),a("45fc"),a("a623"),a("c740"),{Csv_PlayerName:0,Csv_CourseName:1,Csv_LayoutName:2,Csv_Date:3,Csv_Total:4,Csv_OverUnderPar:5,Csv_ValidHeader:"PlayerName,CourseName,LayoutName,Date,Total,+/-",ParPlayerName:"Par",DuplicateTimeDiff:5}),u={methods:{parseScores:function(e,t){var a=t(e).data,r=[],s=0,n=[],o=0;if(a&&a.length){if(a[0][i.Csv_PlayerName].toLowerCase()+","+a[0][i.Csv_CourseName].toLowerCase()+","+a[0][i.Csv_LayoutName].toLowerCase()+","+a[0][i.Csv_Date].toLowerCase()+","+a[0][i.Csv_Total].toLowerCase()+","+a[0][i.Csv_OverUnderPar].toLowerCase()!=i.Csv_ValidHeader.toLowerCase())return!1;for(var l=1;l<a.length;l++){var u=a[l][i.Csv_PlayerName],c=a[l][i.Csv_CourseName]+" - "+a[l][i.Csv_LayoutName],d=new Date(a[l][i.Csv_Date]),p=a[l][i.Csv_Total],h=a[l][i.Csv_OverUnderPar];if(u&&c&&d&&p&&h){var v=n.findIndex((function(e){return e==c}));if(v<0&&n.push(c),u!=i.ParPlayerName){var f=r.findIndex((function(e){return e.playerName==u}));if(f<0){var g={playerName:u,courses:[],totalRounds:0};r.push(g),f=r.findIndex((function(e){return e.playerName==u}))}var m=r[f].courses.findIndex((function(e){return e.courseName==c}));if(m<0){var y={courseName:c,scores:[]};r[f].courses.push(y),m=r[f].courses.findIndex((function(e){return e.courseName==c}))}var b=r[f].courses[m].scores.every((function(e){var t=Math.abs(e.date-d)<60*i.DuplicateTimeDiff*1e3;return!t}));if(b){var C={date:d,total:p,score:h};r[f].courses[m].scores.push(C),r[f].totalRounds++,o++}else s++}}}}return r&&r.length>0&&r.sort((function(e,t){return e.totalRounds>t.totalRounds?-1:1})),{players:r,duplicates:s,courseCount:n.length,roundsCount:o}}}},c=(a("c975"),a("d3b7"),a("25f0"),[["rgba(255, 0, 0, 1)","rgba(255, 0, 0, 0.5)"],["rgba(0, 153, 153, 1)","rgba(0, 153, 153, 0.5)"],["rgba(0, 204, 0, 1)","rgba(0, 204, 0, 0.5)"],["rgba(255, 116, 0, 1)","rgba(255, 116, 0, 0.5)"]]),d={data:function(){return{graphData:[]}},methods:{updateBoxPlot:function(e,t,a,r,s,n,o){this.updateBoxPlotData(t,a,r,s,n,o);var l=document.getElementById(e+"Canvas");l&&l.remove();var i=document.createElement("canvas");i.id=e+"Canvas";var u=i.getContext("2d");document.getElementById(e).appendChild(i),window.boxPlotChart=new Chart(u,{type:"boxplot",data:this.graphData,options:{responsive:!0,legend:{position:"top"},title:{display:!0,text:"Disc Golf Scores"+(r.length?" at "+r:"")}}})},getLabels:function(e,t,a,r){var s=arguments.length>4&&void 0!==arguments[4]?arguments[4]:null,n=arguments.length>5&&void 0!==arguments[5]?arguments[5]:null,o=[],l=[],i=[],u=[],c=[];if(null==s||null==n)for(var d=function(r){for(var o=e.find((function(e){return e.playerName==t[r]})),l=0;l<o.courses.length;l++)if(""==a||o.courses[l].courseName==a)for(var i=0;i<o.courses[l].scores.length;i++)(null==s||o.courses[l].scores[i].date<s)&&(s=o.courses[l].scores[i].date),(null==n||o.courses[l].scores[i].date>n)&&(n=o.courses[l].scores[i].date)},p=0;p<t.length;p++)d(p);s=new Date(s.getFullYear(),s.getMonth(),s.getDate()),n=new Date(n.getFullYear(),n.getMonth(),n.getDate());for(var h=new Date(s);h<=n;h.setDate(h.getDate()+1)){var v="",f="",g=new Date(h),m=new Date(h),y=!1;if("by-year"==r)v=h.getFullYear().toString(),g=new Date(h.getFullYear(),0,1),m=new Date(g),m=new Date(m.setFullYear(m.getFullYear()+1)),m.setDate(m.getDate()-1),f=(m.getMonth()+1).toString()+"/"+m.getDate().toString()+"/"+m.getFullYear().toString();else if("by-month"==r)v=(h.getMonth()+1).toString()+"/"+h.getFullYear().toString(),g=new Date(h.getFullYear(),h.getMonth(),1),m=new Date(g),m=new Date(m.setMonth(m.getMonth()+1)),m.setDate(m.getDate()-1),f=(m.getMonth()+1).toString()+"/"+m.getDate().toString()+"/"+m.getFullYear().toString();else if("by-week"==r){var b=this.getLastSunday(h);v=(b.getMonth()+1).toString()+"/"+b.getDate().toString()+"/"+b.getFullYear().toString(),g=new Date(b.getFullYear(),b.getMonth(),b.getDate()),m=new Date(g),m.setDate(m.getDate()+6),f=(m.getMonth()+1).toString()+"/"+m.getDate().toString()+"/"+m.getFullYear().toString(),y=!0}-1==o.indexOf(v)&&(o.push(v),l.push(g),u.push(m),i.push(v+(f?" - "+f:"")),c.push({label:v,start:g,end:m,full:v+(y?" - "+f:"")}))}return{labels:o,dates:l,full:i,min:s,max:n,all:c}},updateBoxPlotData:function(e,t,a,r,s,n){for(var o=this,l=[],i=0,u=this.getLabels(e,t,a,r,s,n).labels,d=function(s){var n=[],d=t[s],p=d;if("by-month"==r||"by-year"==r||"by-week"==r)for(var h=e.find((function(e){return e.playerName==d})),v=0;v<h.courses.length;v++)if(""==a||h.courses[v].courseName==a)for(var f=0;f<h.courses[v].scores.length;f++){var g="X";if("by-year"==r)g=h.courses[v].scores[f].date.getFullYear().toString();else if("by-month"==r)g=(h.courses[v].scores[f].date.getMonth()+1).toString()+"/"+h.courses[v].scores[f].date.getFullYear().toString();else if("by-week"==r){var m=o.getLastSunday(h.courses[v].scores[f].date);g=(m.getMonth()+1).toString()+"/"+m.getDate().toString()+"/"+m.getFullYear().toString()}n.push({date:h.courses[v].scores[f].date,label:g,score:h.courses[v].scores[f].score})}for(var y=[],b=0;b<u.length;b++)y.push([]);n.sort((function(e,t){return e.date>t.date?1:-1}));for(var C=0;C<n.length;C++){var _=u.indexOf(n[C].label);_>=0&&y[_].push(+n[C].score)}var S=c[i++%c.length];l.push({label:p,backgroundColor:S[1],borderColor:S[0],borderWidth:1,outlierColor:"#999999",padding:10,itemRadius:0,data:y})},p=0;p<t.length;p++)d(p);this.graphData={labels:u,datasets:l}},getLastSunday:function(e){var t=new Date(e);return t.setDate(t.getDate()-t.getDay()),t}}},p=a("4971"),h=a.n(p),v=(a("24df"),{name:"Stats",props:{},data:function(){return{scores:[],step:1,error:!1,reportType:"",playerNames:[],allPlayerCourses:[],graphsGenerated:0,duplicates:0,exampleImage:"/disc-stats/example.png",labels:null,dateSliderValue:[]}},computed:{totalPlayers:function(){return this.scores&&this.scores.players?this.scores.players.length:0},totalCourses:function(){return this.scores?this.scores.courseCount:0},totalRounds:function(){return this.scores?this.scores.roundsCount:0},dateSliderRange:function(){var e=this;if(this.dateSliderValue&&2==this.dateSliderValue.length){var t=this.labels.all.find((function(t){return t.label==e.dateSliderValue[0]})),a=this.labels.all.find((function(t){return t.label==e.dateSliderValue[1]}));return t.date>a.date?[a,t]:t.label==a.label?[t]:[t,a]}return[]},dateSliderRangeText:function(){return 1==this.dateSliderRange.length?this.dateSliderRange[0].start.toLocaleDateString()+"&ndash;"+this.dateSliderRange[0].end.toLocaleDateString():2==this.dateSliderRange.length?this.dateSliderRange[0].start.toLocaleDateString()+"&ndash;"+this.dateSliderRange[1].end.toLocaleDateString():""}},methods:{onFileChange:function(e){var t=this;this.error=!1;var a=e.target.files||e.dataTransfer.files,r=this;if(a.length){var s=new FileReader;s.onload=function(){try{var e=r.parseScores(s.result,r.$papa.parse);e&&e.players&&e.players.length?(r.scores=e,r.step=2,r.duplicates=e.duplicates,document.getElementById("fileUpload").value="",t.fireEvent("event-file-upload",e.players.length+" players, "+e.courseCount+" courses, "+e.roundsCount+" rounds")):(r.error=!0,t.fireEvent("event-error","file-upload"))}catch(a){r.error=!0,t.fireEvent("event-error","file-upload-exception "+a)}},s.readAsText(a[0])}},onSelectReportType:function(e){this.reportType=e,this.step=3,this.fireEvent("event-report-type",e)},onSelectPlayerName:function(e){this.playerNames.some((function(t){return t==e}))?this.playerNames=this.playerNames.filter((function(t){return t!=e})):this.playerNames.push(e)},onSelectPlayerNameDone:function(){var e=this;this.allPlayerCourses=this.scores.players.find((function(t){return e.playerNames.some((function(e){return e==t.playerName}))})).courses.map((function(e){return{courseName:e.courseName,totalRounds:e.scores.length}})),this.allPlayerCourses.sort((function(e,t){return e.courseName>t.courseName?1:-1})),this.step=4,this.fireEvent("event-select-players",this.playerNames.length)},onSelectCourseName:function(e){this.courseName=e,this.step=5,this.fireEvent("event-select-course",this.courseName?this.courseName:"all"),this.labels=this.getLabels(this.scores.players,this.playerNames,this.courseName,this.reportType),this.dateSliderValue=[this.labels.labels[0],this.labels.labels[this.labels.labels.length-1]]},onSelectDateRange:function(){this.step=6,this.fireEvent("event-select-dates",this.dateSliderRange[0].start.toLocaleDateString()+" - "+this.dateSliderRange[this.dateSliderRange.length-1].end.toLocaleDateString()),this.updateBoxPlot("boxPlot",this.scores.players,this.playerNames,this.courseName,this.reportType,this.dateSliderRange[0].start,this.dateSliderRange[this.dateSliderRange.length-1].end),this.graphsGenerated++,this.fireEvent("event-view-graph",this.graphsGenerated)},fireEvent:function(e,t){window.dataLayer.push({"event-label":t,event:e})},prettify:function(e){return new Date(e).toLocaleDateString("en",{year:"numeric",month:"short",day:"numeric"})}},mounted:function(){this.fireEvent("event-app-load","")},mixins:[u,d],components:{VueSlider:h.a}}),f=v,g=(a("abfb"),a("2877")),m=Object(g["a"])(f,o,l,!1,null,"62181468",null),y=m.exports,b={name:"app",components:{Stats:y}},C=b,_=(a("034f"),Object(g["a"])(C,s,n,!1,null,null,null)),S=_.exports,w=a("f751");r["default"].use(w["a"]),r["default"].config.productionTip=!1,new r["default"]({render:function(e){return e(S)}}).$mount("#app")},6111:function(e,t,a){},"85ec":function(e,t,a){},abfb:function(e,t,a){"use strict";var r=a("6111"),s=a.n(r);s.a}});
//# sourceMappingURL=app.9d5d1177.js.map