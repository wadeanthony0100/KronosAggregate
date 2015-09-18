/**
 * Created by Wade on 9/17/2015.
 * Scrape the Timecard website for information about
 * hours and pay.
*/

var script = document.createElement('script');
script.src = 'https://code.jquery.com/jquery-1.11.0.min.js';
script.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(script);

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


function get_number_of_jobs(){
    /*
    * return the number of jobs listed on the Timecard
    * */

    //get all radio buttons on the page
    var jobs_rough = document.getElementsByTagName("md-radio-button");
    var jobs = [];

    //isolate those whose labels end in "hr" (jobs should end in hourly rates per /hr)
    for(var x=0 ; x<jobs_rough.length ; x++){
        if (jobs_rough[x].innerText.slice(-2) == "hr"){
            jobs.push(jobs_rough[x]);
        }
    }
    return jobs.length;
}

function load_next_job(){
    //get all radio buttons on the page
    var jobs_rough = document.getElementsByTagName("md-radio-button");
    var jobs = [];
    var curr_job;

    //isolate those whose labels end in "hr" (jobs should end in hourly rates per /hr)
    for(var x=0 ; x<jobs_rough.length ; x++){
        if (jobs_rough[x].innerText.slice(-2) == "hr"){
            jobs.push(jobs_rough[x]);
        }
    }

    //find the currently selected job, and select the next one
    for(var x=0 ; x<jobs.length-1 ; x++){
        if(jobs[x].getAttribute("aria-checked") == "true"){
            jobs[x+1].click();
            return;
        }
    }

}


function sum_time(){
    var sum = 0;
    for (var time in timestamps){
        var min = parseInt(timestamps[time].slice(-2));
        var hr = 0;
        if(timestamps[time].length <= 4){
            hr = parseInt(timestamps[time].slice(0,1));
        }else{
            hr = parseInt(timestamps[time].slice(0,2));
        }
        console.log(hr, min);
        sum += hr*3600000;
        sum += min*60000;
    }
    return sum;
}


function sum_wages(){
    for(var payment in earnings){
        var sum = 0.0;
        sum += parseFloat(earnings[payment].slice(1));
        console.log("wages sum is " +sum);
    }
    return sum;
}


function main() {
    var num_jobs = get_number_of_jobs();
    var wait_time = 1000;
    get_records(timestamps, earnings);
    for(var x=1 ; x<num_jobs ; x++){
        window.setTimeout("load_next_job()", wait_time);
        wait_time += 500;
        window.setTimeout("get_records(timestamps, earnings)",wait_time);
        console.log(wait_time)
    }
    window.setTimeout('document.addEventListener("hello", function(data) {chrome.runtime.sendMessage([sum_time(), sum_wages()]);}); var event = document.createEvent("Event"); event.initEvent("hello"); document.dispatchEvent(event);', 2000);//(sum_time(), sum_wages())
}

chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
    console.log(message);
    window.setTimeout("main()", 1500);
});
