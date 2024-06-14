let submitMsg = "au cas ou";
const notifications = document.querySelector("#notifications");

if(document.querySelector("#submitBtn") != null)
    submitMsg = document.querySelector("#submitBtn").dataset.toasttext;

 const toastDetails = {
    timer: 5500,
    success: {
        icon: "fa-circle-check",
        text: submitMsg
    },
    error: {
        icon: "fa-circle-xmark",
        text:  document.querySelector("body").dataset.toasttext
    },
    warning: {
        icon: "fa-triangle-exclamation",
        text: "Warning: this is a warning toast."
    },
    info: {
        icon: "fa-circle-info",
        text: "Info: this is a information toast."
    }
 }


const removeToast = (toast) =>{
    
    toast.classList.add("hideT"); 
    setTimeout(() => toast.remove(),500);

    // if(toast.getAttribute('data-idnotification')!=null){
    //     let notification ={
    //         idNotification: toast.getAttribute('data-idNotification')
    //     }

    //      postToServer('/hubstream/update/notification',notification)
    // }
}

const createToast = (id,text1,idNotification,theme) =>{ 
    const {icon} = toastDetails[id];
    const toast = document.createElement("li");
  
    
    toast.setAttribute('data-idNotification',idNotification)
    
    toast.className=`toast ${id}`;
    toast.innerHTML = `<div class="column">
                <i class="fa-solid ${icon}"></i>
                <span style="color:#d4d4d4; font-size:14px;">${text1}</span>
                </div>
            <i class="fa-solid fa-xmark" style="color:#f00; font-size:16px;" onclick="removeToast(this.parentElement)"></i>`;
      if(theme!==null && theme=='light'){
                toast.style.background="#fff";
                toast.querySelector("span").style="color:#202020";
      } else
                toast.style.background="#141414";
            setTimeout(() => notifications.appendChild(toast),500);
    // if(idNotification==null)   
         setTimeout(() => removeToast(toast), toastDetails.timer); 
}