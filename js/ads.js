// get users
let uri = "https://bytesotech.cloud/target/api/role/";
let Geturl = "https://bytesotech.cloud/target/api/ads/customers/data/";

let uriAll = "https://bytesotech.cloud/target/api/user/all";

let screenURL = "https://bytesotech.cloud/target/api/screen/";

let local = window.localStorage;

let cust_Id = local.getItem("cust_Id");

$(document).ready(function () {
  //   let cust_Id = local.getItem("cust_Id");
  getAddingIfo();
  console.log(cust_Id);

  console.log("ready!");
  GetallData();

  $("#editt").on("click", function () {
    editThis();
  });

  $("#addnew").on("click", function () {
    ComformPayment();
  });
});

function getAddingIfo() {
  $("#adScreen").empty();
  // blood
  $.ajax({
    url: screenURL,
    type: "GET",
    dataType: "json",
    success: function (data) {
      //console.log(data);
      $("#adScreen").append(`
            <option value="" selected disabled>select Screen location   </option>
                `);
      $.each(data, function (idx, item) {
        // console.log(item);
        $("#adScreen").append(`
                <option value="${item.id}" > ${item.location_name}   </option>
                `);
      });
    },
    error: function (request, msg, error) {
      console.log("Error in Operation");
    },
  });
}

function GetallData() {
  $("#tData").empty();
  var $list = $("#tData");

  $.ajax({
    url: Geturl + cust_Id,
    type: "GET",
    dataType: "json",
    success: function (data) {
      //console.log(data);
      $.each(data, function (idx, item) {
        var $tr = $("<tr></tr>");
        $tr.append(`<td>${idx + 1} </td>`);
        $tr.append("<td>" + item.location + "</td>");
        $tr.append("<td>" + item.duration + "</td>");
        $tr.append("<td>" + item.statred + "</td>");
        if (item.status === "Running") {
          $tr.append(
            `<td><span class="badge badge-success">${item.status}</span></td>`
          );
        } else if (item.status === "Pending") {
          $tr.append(
            `<td><span class="badge badge-warning">${item.status}</span></td>`
          );
        } else if (item.status === "Ended") {
          $tr.append(
            `<td><span class="badge badge-secondary">${item.status}</span></td>`
          );
        } else {
          $tr.append(
            `<td><span class="badge badge-danger">${item.status}</span></td>`
          );
        }

        // $tr.append(`
        //             <td>
        //                 <button onclick="updateRecord(${item.id})" class="btn btn-warning" data-toggle="modal" data-target="#exampleModa"><i class="fa fa-edit"></i></button>
        //             </td>
        //           `);

        $list.append($tr);
      });
      $("#dataTable").DataTable();
    },
    error: function (request, msg, error) {
      console.log("Error in Operation");
    },
  });
}

function ComformPayment() {
  let price = 0;
  let durationInput = parseInt($("#adDuration").val());
  let durationtype = parseInt($("#durationType").val());

  let duration = durationInput * durationtype;
  let adDate = $("#adDate").val();

  if (duration <= 125) {
    price = 3 * duration;
  } else if (duration >= 125 && duration <= 336) {
    price = 1.5 * duration;
  } else if (duration >= 336) {
    price = 1 * duration;
  }
  swal({
    title: "Comform Submition",
    text: `The Duration : ${duration}\nThe Date : ${adDate}\The Total Price : ${price}`,
    type: "success",
  }).then((okay) => {
    if (okay) {
      console.log("call EVC API");
      Swal.fire("Please check your Phone");
      Swal.showLoading();
      
    }
  });
}

function AddNew() {
  let price = 0;
  let durationInput = parseInt($("#adDuration").val());
  let durationtype = parseInt($("#durationType").val());
  let videoLink = $("#adVideo").val();
  let screen = $("#adScreen").val();
  let duration = durationInput * durationtype;
  let adDate = $("#adDate").val();
  let adCampaing = {
    customer: cust_Id,
    video: videoLink,
    duration: duration.toString(),
    screen: screen.toString(),
    statred: adDate,
    status: 2,
  };

  $.ajax({
    url: uri,
    type: "POST",
    contentType: "application/json",
    data: JSON.stringify(adCampaing),
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
      console.log("Can not post");

      GetallData();
    },
  });
}
