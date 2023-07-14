let uriAll = "http://localhost:2000/api/feedback/report/";
let uriSurvey = "http://localhost:2000/api/survey/";
// getChart(1)


$(document).ready(function () {
  GetallData();

  $("#SurveyList").on('change',function (){
    console.log($("#SurveyList").val());

    getReport($("#SurveyList").val())
  })

 });

function GetallData() {
  $.ajax({
    url: uriSurvey,
    type: "GET",
    dataType: "json",
    success: function (data) {
      
      $.each(data, function (idx, item) {
        $("#SurveyList").append(`
        <option value="${item.id}">${item.survey_name}</option>
        `)
       
      });
      
    },
    error: function (request, msg, error) {
      console.log("Error in Operation");
    },
  });
}

function getReport(id){
  $("#tbodydata").empty();
  var $list = $("#tbodydata");
  $.ajax({
    url: uriAll+id,
    type: "GET",
    dataType: "json",
    success: function (data) {
      console.log(data);
      $.each(data, function (idx, item) {
        var $tr = $("<tr></tr>");
        $tr.append(`<td>${idx + 1} </td>`);
        $tr.append("<td>" + item.question + "</td>");
        $tr.append("<td>" + item.Strongly_agree + "</td>");
        $tr.append("<td>" + item.Agree + "</td>");
        $tr.append("<td>" + item.Neutral + "</td>");
        $tr.append("<td>" + item.Disagree + "</td>");
        $tr.append("<td>" + item.Strongly_disagree + "</td>");
        
        
        
        $list.append($tr);
      });
      $("#table0").DataTable();
    },
    error: function (request, msg, error) {
      console.log("Error in Operation");
    },
  });
}



function getChart(id) {
  let reportDate = [];

  $.ajax({
    url: uriAll + id,
    type: "GET",
    dataType: "json",
    success: function (data) {
    //   console.log(data);
      $.each(data, function (idx, item) {
        reportDate.push(item)
        console.log(item);
      });
    },
    error: function (request, msg, error) {
      swal("sorry", "something went wrong!","warning")
    },
  });

  var ctx = document.getElementById("myChart").getContext("2d");
  var chart = new Chart(ctx, {
    type: "bar",
    data: {
      labels: [
          "Strongly agree",
          "Agree",
          "Neutral",
          "Disagree",
          "Strongly disagree",
      ],
      datasets: [
        {
          label: "Responses",
          data: reportDate,
          backgroundColor: "rgba(54, 162, 235, 0.2)",
          borderColor: "rgba(54, 162, 235, 1)",
          borderWidth: 1,
        },
      ],
    },
    options: {
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true,
            },
          },
        ],
      },
    },
  });
}
