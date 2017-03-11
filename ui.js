 
var ui = {

    robotConnection: document.getElementById('robotConnection'),
    drive: document.getElementById('driveSelect'),
    control: document.getElementById('controlSelect'),
    autoMonitor: document.getElementById('autoMonitor'),
    timer: document.getElementById('timer'),

autoSelect: {

    autoSelect: document.getElementById('button-group1'),
    button1: document.getElementById('button1'),
    button2: document.getElementById('button2'),
    button3: document.getElementById('button3'),
        buttonVal1: false,
        buttonVal2: false,
        buttonVal3: false,
},


DriveMonitor: {

     autoL: false,
     autoR: false,
     autoM: false,
},

    Dial: {
        container: document.getElementById('rotationDisplay'),
        indicator: document.getElementById('rotationDial'),
        Value: 0,
        visualValue: 0,
        resetValue: 0,
    },

}


NetworkTables.addRobotConnectionListener(onRobotConnection, true);
NetworkTables.addGlobalListener(onValueChanged, true);



function onRobotConnection(connected) {
    var state = connected ? '[ Robot connected ]' : '[ Robot disconnected ]';
    console.log(state);
    ui.robotConnection.innerHTML = state;

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

            case '/SmartDashboard/autoSelect':
                ui.button1.onclick = function () {
                    ui.buttonVal1 = true;
                }
                break;

            case '/SmartDashboard/autoSelect':
                ui.button2.onclick = function () {
                    ui.buttonVal2 = true;
                }
                break;

            case '/SmartDashboard/autoSelect':
                ui.button3.onclick = function () {
                    ui.buttonVal3 = true;
                }
                break;

            case '/SmartDashboard/autoMonitor/DriveSubsystem | autoL | autoR | autoM' :

                if (ui.autoL = true) {
                    ui.autoMonitor.innerHTML = '[Left autonomous program running]';
                } else if (ui.autoR = true) {
                    ui.autoMonitor.innerHTML = '[Right autonomous program running]';
                } else if (ui.autoM = true) {
                    ui.autoMonitor.innerHTML = '[Center autonomous program running]';
                } else {
                    ui.autoMonitor.innerHTML = '[No autonomous program running]';
                }

                break;

            case '/SmartDashboard /DriveSubsystem/ NavX | Yaw':
                ui.Dial.Value = value;
                ui.Dial.visualValue = Math.floor(ui.Dial.Value - ui.Dial.resetValue);
                if (ui.Dial.visualValue < 0) { // Corrects for negative values
                    ui.Dial.visualValue += 360;
                }
                ui.Dial.indicator.style.transform = ('rotate(' + ui.Dial.visualValue + 'deg)');

            case '/SmartDashboard/timeRunning':

                var s = 135;
                if (value < 0) {

                    ui.timer.style.color = "#00d500";

                    var countdown = setInterval(function () {
                        s--; // Subtracts one second

                        var m = Math.floor(s / 60);
                        // Create seconds number that will actually be displayed after minutes are subtracted
                        var visualS = (s % 60);

                        // Add leading zero if seconds is one digit long, for proper time formatting.
                        visualS = visualS < 10 ? '0' + visualS : visualS;

                        if (s < 0) {
                            // Stop countdown when timer reaches zero
                            clearTimeout(countdown);
                            return;
                        } else if (s <= 15) {
                            // Flash timer if less than 15 seconds left
                            ui.timer.style.color = 'red';
                        } else if (s <= 60) {
                            // Solid red timer when less than 30 seconds left.
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

    };


    ui.Dial.container.onclick = function () {

        ui.Dial.offset = ui.Dial.Value;

        onValueChanged('/SmartDashboard/drive/navX/yaw', ui.Dial.Value);
    }

}



