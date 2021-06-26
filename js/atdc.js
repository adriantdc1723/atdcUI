
//a-nav start
$(document).on("click", ".a-nav__menu-item-expand", function(){
    let this_item_expand = $(this);
    let menu = this_item_expand.parent();
    let sub_menus = menu.find(".a-nav__menu-item-sub-menu");
    let this_sub_menu = $(this).find(".a-nav__menu-item-sub-menu");

    sub_menus.css("opacity","0");

    menu.find(".a-nav__menu-item-expand")
    .not(this)
    .removeClass("expanded");

    this_item_expand.toggleClass("expanded");

    if(this_item_expand.hasClass("expanded")){
        this_sub_menu.animate({
            opacity: 1
        }, "fast");
    }else{
        this_sub_menu.css("opacity","0");
    }

});

$(document).on("click", ".a-nav__menu-button", function(e){
    e.preventDefault();
    let a_nav = $(this).parent();
    let menu = a_nav.find(".a-nav__menu");

    a_nav.toggleClass("show-menu");


})

//a-nav end













//a-alert start
class AlertMaster{
    alertType;
    //alertHistoryId;

    constructor(type){
        if(type=="notification"){
            this.alertType = "notification";
        }else{
            this.alertType = "alert";
        }
    }

    fire({title, message}, state){

        let alert_class;

        if(!title){
            title = "Alert!";
        }
        
        if(!message){
            message = "No message";
        }
        
        if(state=="success" || state=="danger" || state=="warning"){
            alert_class = "a-alert--"+state;
        }else{
            alert_class = "";
        }
        

        let alert_container = $(document).find(".a-alert-container");
        let container = "<div class='a-alert-container'></div>";

        //check if container for alert exist
        if(!alert_container.length){
            $("body").prepend(container);
        }


        let random_string = ()=>{
            let chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
            let output = "";
            for(let i=0; i<=10; i++){
                output += chars[Math.floor(Math.random()*chars.length)];
            }
            return output;
        }
        
        let randomString = random_string();
        let alert_id = "aAlert_"+randomString;

       //this.alertHistoryId = alert_id;

        let a_alert_title = "<span class='a-alert__title'>"+title+"</span>";
        let a_alert_message = "<span class='a-alert__message'>"+message+"</span>";

        let a_alert = "<div id='"+alert_id+"' class='a-alert "+alert_class+"' data-alert-type='"+this.alertType+"'>"+
                        "<div class='a-alert__header'><button class='a-alert__close-btn'></button></div>"+
                            "<div class='a-alert__body'>"+
                                a_alert_title+a_alert_message+
                            "</div>"+
                      "</div>";
        
        //if AlertMaster type alert and remove emmediately
        alert_container.find(".a-alert").each(function(){
            let type = $(this).attr("data-alert-type");
            if(type=="alert"){
                $(this).css("height", $(this).height());
                $(this).find(".a-alert__body").css("width", $(this).width());
                $(this).animate({
                    width: 0,
                    opacity: 0
                }, 500, function(){
                    $(this).remove();
                });
            }
        });

         //append new alert to container
         $(document).find(".a-alert-container").append(a_alert);
      

        $("#"+alert_id).trigger("change");

    }//fire method end

}

$(document).on("change", ".a-alert", function(){
    let alertId = $(this).attr("id");
    let timeOutName = "timeout_"+alertId;

    //create function remove alert
    let removeAlert = selector => {
        $(this).css("height", $(this).height());
        $(this).find(".a-alert__body").css("width", $(this).width());
        $(selector).animate({
            width: 0,
            opacity: 0
        }, "slow", function(){
            $(this).remove();
        });
    }


    //assign variable timeOutName value as new Variable name
    let thisAlertTimeout = setTimeout(removeAlert, 10000, "#"+alertId);//10sec orig

    //bind event
    $(this).on("mouseover", function(){
        clearTimeout(thisAlertTimeout);
    });

    $(this).on("mouseleave", function(){
        thisAlertTimeout = setTimeout(removeAlert, 8000, "#"+alertId);//8sec orig
    });

});

$(document).on("click", ".a-alert__close-btn", function(){
    let alert = $(this).parent().parent();
    alert.remove();
});


//a-alert end