const logURL = "https://bytesotech.cloud/target/api/customer/login";
const URLs = "https://bytesotech.cloud/target/api/customer/";
local = window.localStorage;
let passMa = 1;
let UUID = 0;

function validatePass() {
  let pass = $("#cPassword").val();
  let rep = $("#RepeatPassword").val();

  if (rep != pass) {
    $("#RepeatPassword").css("border", "1px solid red");
    passMa = 1;
  } else {
    $("#RepeatPassword").css("border", "1px solid gray");
    passMa = 0;
  }
}

function getUUID() {
  // blood
  $.ajax({
    url: URLs,
    type: "GET",
    dataType: "json",
    success: function (data) {
      $.each(data, function (idx, item) {
        UUID = item.uuid + 1;
      });
    },
    error: function (request, msg, error) {
      console.log("Error in Operation");
    },
  });
}

// A $( document ).ready() block.
$(document).ready(function () {
  console.log("Sign Up Ready");

  getUUID();
  $("#btnSignUp").on("click", function () {
    if (passMa == 1) {
      validatePass();
      console.log(UUID);
    } else {
      let name = $("#cName").val().trim();
      let country = $("#cCountry").val().trim();
      let phone = $("#cPhone").val().trim();
      let email = $("#cEmail").val().trim();
      let password = $("#cPassword").val().trim();

      let NewCustomer = {
        name: name,
        phone: country + phone,
        email: email,
        uuid: UUID,
        password: password,
        status: 1,
      };

      $.ajax({
        url: URLs,
        type: "POST",
        contentType: "application/json",
        data: JSON.stringify(NewCustomer),
        success: function (data) {
          if (data.status == 300) {
            swal("Sorry", "Something is wrong \nPlease try again", "error");
          } else {
            swal({
              title: "DONE!",
              text: "Welcome to Target Marketing.",
              type: "success",
            }).then((okay) => {
              if (okay) {
                window.location.replace("./login.html");
              }
            });
          }
        },
        error: function (request, msg, error) {
          swal("opps", "something went wrong", "error");
          console.log(error);
        },
      });
    }
  });
});
