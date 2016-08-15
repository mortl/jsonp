

(function () {
     /* Particle Library */
     /*window.onload = function(){
        Particles.init({
            selector:'#myCanvas',
            maxParticles:300,
            sizeVariations:5,
            speed:0.9,
            minDistance:200
        });
     };
*/
var gh = "https://api.greenhouse.io/v1/boards/indexexchange/offices";






$.ajax({
        url: gh,

        dataType: 'json',

    })
    .done(function(data) {

        checkData(data);

    })
    .fail(function(err) {
        console.log("error", err);
    })
    .always(function() {
        console.log("complete");
    });




function checkData(data) {
    var offices = data.offices;

    offices = offices.filter(function(office) {

        if (office.name !== "No Office") {
            return office.name;
        }
    });

    


    offices.forEach(function(office) {
        console.log(office);

        var departments = office.departments;
           $('.careers-dept-listing').append($('<ul>').attr("id",office.id.toString()));
           $('#'+office.id.toString()).append($('<h1>').text(office.name));

        departments.forEach(function(dept) {
            if (dept.name !== "No Department" && dept.jobs.length !== 0) {
                //console.log(dept);
                
             $('#'+office.id.toString()).append($('<h2>').text(dept.name).addClass(dept.id));
                var deptArr = dept;
                //console.log(deptArr);
                var jobs = dept.jobs;

                jobs.forEach(function(job) {

                    $('#'+office.id.toString()).append($('<li>').append($('<a>').text(job.title).attr("href",job.absolute_url)));
                    
                   // console.log(job);
                });
            }
        });

    });


}
})(); 