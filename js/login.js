const logURL = "https://bytesotech.cloud/target/api/customer/login"
local = window.localStorage




// A $( document ).ready() block.
$( document ).ready(function() {
    console.log("login Ready")
  
    $("#btlog").on('click',function(){
      let user = ($("#user").val()).trim()
      let pass = ($("#pass").val()).trim()
      $.ajax({  
        url: `${logURL}/${user}/${pass}`,  
        type: 'get',  
        dataType: 'json', 
        success: function (data ) { 
          if(data.status == 300){
            swal("Sorry", "phone or password is incorrect", "error");
          }else{
            if(local.getItem(user)){
              local.removeItem(user)
            }
            local.setItem("user",JSON.stringify(data))
            local.setItem("cust_Id",JSON.stringify(data.id))

            window.location.replace("./index.html")
          }
        },
        error: function(request , msg , error){
          swal("opps", "something went wrong", "error");
          console.log(error);
        }
      })

    })
});