/**
 * Created by Wade on 9/17/2015.
 * Scrape the Timecard website for information about
 * hours and pay.
*/

var timestamps = [];
var earnings = [];

function get_records(TL, EL){
    /*
    * Add the time worked and the wages earned
    * from the job currently displayed to the lists
    * of wages.
    * */
    var rows = document.getElementsByTagName("td");
    var seen_blank_row=false;
    for(var x=0; x<rows.length ; x++ ){
        if(seen_blank_row){
            TL.push(rows[x].innerHTML);
            EL.push(rows[x+1].innerHTML);
            return;
        }
        if(rows[x].innerHTML.length<1){
            seen_blank_row=true;
        }
    }
}


function load_next_job(){
    //get all radio buttons on the page
    var jobs_rough = document.getElementsByTagName("md-radio-button");
    var jobs = [];

    //isolate those whose labels end in "hr" (jobs should end in hourly rates per /hr)
    for(var x=0 ; x<jobs_rough.length ; x++){
        if (jobs_rough[x].innerText.slice(-2) == "hr"){
            jobs.push(jobs_rough[x]);
        }
    }

}

function main() {
    //window.setTimeout("get_records(timestamps, earnings)", 1500);
    load_next_job();
}

window.setTimeout("main()", 1500);