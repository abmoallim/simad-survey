// get users
let uri = "https://bytesotech.cloud/target/api/role/";
let Geturl = "https://bytesotech.cloud/target/api/ads/customers/data/";

let uriAll = "http://localhost:2000/api/anouncment/";

$(document).ready(function () {
  console.log("ready!");
  var currentDate = new Date();

  // Set the minimum date for the start date input to the current date
  var startInput = document.getElementById("aDate");
  startInput.min = currentDate.toISOString().slice(0, 10);
  GetallData();

  $("#editt").on("click", function () {
    editThis();
  });

  $("#addnew").on("click", function () {
    addNew();
  });
});

function GetallData() {
  $("#tbodydata").empty();
  var $list = $("#tbodydata");
  $.ajax({
    url: uriAll,
    type: "GET",
    dataType: "json",
    success: function (data) {
      console.log(data);
      $.each(data, function (idx, item) {
        var $tr = $("<tr></tr>");
        $tr.append(`<td>${idx + 1} </td>`);
        $tr.append("<td>" + item.title + "</td>");

        $tr.append(
          `<td> <img src="${item.image}" alt="IMG" width="80px" > </td>`
        );
        let time = new Date(item.Date);
        let year = time.getFullYear();
        let mo = time.getMonth() + 1;
        let month = mo;
        let day = time.getDate();

        if (mo < 10) {
          month = "0" + month;
        }

        $tr.append(`<td>${day}/${month}/${year}</td>`);
        $tr.append(`<td>
                <button
                      type="button"
                      onclick="moreInfo(${item.id})"
                      class="btn btn-light"
                      data-toggle="modal"
                      data-target="#exampleModal1"
                    >
                      Show Me
                    </button>
                    <button
                      type="button"
                      onclick="edit(${item.id})"
                      class="btn btn-warning ml-4"
                      data-toggle="modal"
                      data-target="#exampleModal2"
                    >
                    <i class="fa fa-edit"></i>
                    </button>
                </td>`);
        $list.append($tr);
      });
      $("#table0").DataTable();
    },
    error: function (request, msg, error) {
      console.log("Error in Operation");
    },
  });
}

function moreInfo(id) {
  $("#moreInfoBody").empty();

  $.ajax({
    url: uriAll + id,
    type: "GET",
    dataType: "json",
    success: function (data) {
      $("#moreInfoBody").append(`
            <div class="form-group">
              <img  width="470px" src="${data[0].image}" alt="" srcset="">
            </div>

            <div class="form-group">
              <h3>${data[0].title}</h3>
            </div>
            <div class="form-group">
              <p>${data[0].text}</p>
            </div>
            
            `);
    },
    error: function (request, msg, error) {
      console.log("Error in Operation");
    },
  });
}

function edit(iD) {
  $("#aID").val(iD);

  $.ajax({
    url: uriAll + iD,
    type: "GET",
    dataType: "json",
    success: function (data) {
      console.log(data);

      $("#uaTitle").val(data[0].title);
      $("#uaDate").val(data[0].data);
      $("#uaDesc").val(data[0].text);
    },
    error: function (request, msg, error) {
      console.log("Error in Operation");
    },
  });
}

function addNew() {
  var file = document.getElementById("ufileToUpload").files[0];
  var formData = new FormData();
  formData.append("fileToUpload", file);

  var xhr = new XMLHttpRequest();
  xhr.open("POST", "upload.php", true);

  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      var response = JSON.parse(xhr.responseText);
      var urls = response.url;
      if (urls != "error") {
        let Announcment = {
          title: $("#aTitle").val(),
          text: $("#aDesc").val(),
          Date: $("#aDate").val(),
          image: urls,
        };

        $.ajax({
          url: uriAll,
          type: "POST",
          contentType: "application/json",
          data: JSON.stringify(Announcment),
          success: function (data) {
            console.log("Successfully added");
            swal({
              title: "DONE!",
              text: "it has been Added!",
              type: "success",
            }).then((okay) => {
              if (okay) {
                window.location.reload();
              }
            });
          },
          error: function (request, msg, error) {
            swal("opps!", "some thing went wrong", "error");
          },
        });
      } else {
        console.log(urls);
        swal(
          "File error!",
          "Allowed size : less the 5mb\nAllowed types : PNG,JPG,JEGP ",
          "error"
        );
      }
    }
  };
  xhr.send(formData);
}


function editThis() {
  var file = document.getElementById("uufileToUpload").files[0];
  var formData = new FormData();
  formData.append("fileToUpload", file);

  var xhr = new XMLHttpRequest();
  xhr.open("POST", "upload.php", true);

  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      var response = JSON.parse(xhr.responseText);
      var urls = response.url;
      if (urls != "error") {
        let iD = $("#aID").val()
        let Announcment = {
          title: $("#uaTitle").val(),
          text: $("#uaDesc").val(),
          Date: $("#uaDate").val(),
          image: urls,
        };

        $.ajax({
          url: uriAll+iD,
          type: "PUT",
          contentType: "application/json",
          data: JSON.stringify(Announcment),
          success: function (data) {
            console.log("Successfully added");
            swal({
              title: "DONE!",
              text: "it has been Added!",
              type: "success",
            }).then((okay) => {
              if (okay) {
                window.location.reload();
              }
            });
          },
          error: function (request, msg, error) {
            swal("opps!", "some thing went wrong", "error");
          },
        });
      } else {
        console.log(urls);
        swal(
          "File error!",
          "Allowed size : less the 5mb\nAllowed types : PNG,JPG,JEGP ",
          "error"
        );
      }
    }
  };
  xhr.send(formData);
}
