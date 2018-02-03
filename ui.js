
/* to start the Dashboard:  py -3.6 -m pynetworktables2js --robot [IP address]   */


var ui = {


    timer: document.getElementById('timer'),

};


NetworkTables.addGlobalListener(onValueChanged, true);
NetworkTables.addRobotConnectionListener(onRobotConnection, true);




function onRobotConnection(connected) {
    var state = connected ?   'Robot connected' : 'Robot disconnected'   ;
    console.log(state);
    ui.robotConnection.innerHTML = state;
}







    function onValueChanged(key, value) {
        // Sometimes, NetworkTables will pass booleans as strings. This corrects for that.
        if (value === 'true') value = true;
        if (value === 'false') value = false;



        switch (key) {



            case '/SmartDashboard/driveSelect':
                ui.drive.value = value;
                break;

            case '/SmartDashboard/controlSelect':
                ui.control.value = value;
                break;



            case '/SmartDashboard/button1':
                ui.name.innerHTML = "test";



                break;

            case '/SmartDashboard/autoSelect/input2':
                ui.button2.onclick = function () {
                    ui.input2 = true;

                };
                break;

            case '/SmartDashboard/autoSelect/input3':
                ui.button3.onclick = function () {
                    ui.input3 = true;
                };
                break;

            case '/SmartDashboard/autoL' :

                if (value === true) {
                    ui.autoMonitor.innerHTML = '[Left autonomous program running]';
                } else if (value === true) {
                    ui.autoMonitor.innerHTML = '[Right autonomous program running]';
                } else if (value === true) {
                    ui.autoMonitor.innerHTML = '[Center autonomous program running]';
                } else {
                    ui.autoMonitor.innerHTML = '[No autonomous program running]';
                }

                break;

            case '/SmartDashboard/Yaw':

                ui.Dial.Value = value ;
                ui.Dial.visualValue = Math.floor(ui.Dial.Value - ui.Dial.resetValue);
                if (ui.Dial.visualValue < 0) { // Corrects for negative values
                    ui.Dial.visualValue += 360;
                }
                ui.Dial.indicator.style.transform = ('rotate(' + ui.Dial.visualValue + 'deg)');

            case '/SmartDashboard/timeRunning':



                var s = 135;

                if (value === true) {

                    ui.timer.style.color = "#00d500";

                    var countdown = setInterval(function () {
                        s--; // Subtracts one second

                        var m = Math.floor(s / 60);

                        var visualS = (s % 60);


                        visualS = visualS < 10 ? '0' + visualS : visualS;

                        if (s < 0) {
                            // Stop countdown when timer reaches zero
                            clearTimeout(countdown);
                            return;
                        } else if (s <= 30) {

                            ui.timer.style.color = 'red';

                            ui.timeWarning.innerHTML = "Go for the Climb!"
                            ui.timeWarning.style.color = (s % 2 === 0) ? 'red' : 'transparent';

                        } else if (s <= 75) {

                            ui.timer.style.color = 'yellow';
                        }
                        ui.timer.innerHTML = m + ':' + visualS;
                    }, 1000);
                } else {
                    s = 135;
                }


                NetworkTables.setValue(key, false);

                break;
        }



    }


    ui.Dial.container.onclick = function () {

        ui.Dial.offset = ui.Dial.Value;

        onValueChanged('/SmartDashboard/drive/navX/yaw', ui.Dial.Value);
    };

ui.button1.onclick = function () {
    //   ui.input1 = true;

    NetworkTables.setValue('/SmartDashboard/input1', true);
};


