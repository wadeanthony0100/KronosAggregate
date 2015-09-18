/**
 * Created by Wade on 9/17/2015.
 */

function get_time_one(){
    var rows = document.getElementsByTagName("td");
    console.log(rows);
    var seen_blank_row=false;
    var time_stamp;
    var earning_stamp;
    for(var x=0; x<rows.length ; x++ ){
        if(seen_blank_row){
            //TODO assign values
            return (time_stamp, earning_stamp);
        }
        if(rows[x].innerHTML.length<1){
            seen_blank_row=true;
        }
    }
}
get_time_one();