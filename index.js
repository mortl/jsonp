
    var url = "http://ip-api.com/json";
    var reddit = "https://www.reddit.com/r/cat.json";
    var gh = "https://api.greenhouse.io/v1/boards/indexexchange/offices";

    class Location {

      
        constructor(){
            this.loc = [];
        }

        get locationList(){
            return this.loc;
        }

        set setLocationList(str){
           // this.loc[this.loc.length] = str;
            this.loc.push(str);
        }


    }
    
     var locations = new Location();

    $.ajax({
            url: gh,

            dataType: 'json',

        })
        .done(function(data) {
            //console.log( data);
           checkData(data);

        })
        .fail(function(err) {
            console.log("error", err);
        })
        .always(function() {
            console.log("complete");
        });


        function processJobs(job){

            console.log(job);
        }


        function checkData(data){
             var offices = data.offices;

            offices = offices.filter(function(office) {

                if (office.name !== "No Office") {
                    return office.name;
                }
            });
        
            for(var i = 0; i < offices.length; i++){
                //locations.push(offices[i].name);
                locations.setLocationList = offices[i].name;
                
            }
            console.log("Location Array" ,locations.locationList);
            //console.log(offices);
            offices.forEach(function(office) {
                console.log(office);
                var departments = office.departments;


                departments.forEach(function(dept) {
                    if (dept.name !== "No Department" && dept.jobs.length !== 0) {
                        //console.log(dept);
                        var deptArr = dept;
                        console.log(deptArr);
                        var jobs = dept.jobs;
                        jobs.forEach(function(job){
                            processJobs(job);
                        });
                    }
                });

                
            });
         

        }