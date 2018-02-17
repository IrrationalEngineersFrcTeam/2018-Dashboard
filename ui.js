



var ui = {


    timer: document.getElementById('timer'),
    robotConnection: document.getElementById('robotConnection'),
    Test: document.getElementById('Test'),




    Minimap: {

        container: document.getElementById('fieldDisplay'),
        indicator: document.getElementById('triOne'),
        Value: 0,
        visualValue: 0,
        resetValue: 0
    }

};




NetworkTables.addGlobalListener(onValueChanged, true);
NetworkTables.addRobotConnectionListener(onRobotConnection, true);





NetworkTables.setValue(key, false);



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




            case '/SmartDashboard/Yaw':

                ui.Minimap.Value = value ;
                ui.Minimap.visualValue = Math.floor(ui.Minimap.Value - ui.Minimap.resetValue);
                if (ui.Minimap.visualValue < 0) { // Corrects for negative values
                    ui.Minimap.visualValue += 360;
                }
                ui.Minimap.indicator.style.transform = ('rotate(' + ui.Minimap.visualValue + 'deg)');

                break;

            case '/SmartDashboard/timeRunning':


                var s = 150;

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

                        } else if (s <= 75) {

                            ui.timer.style.color = 'yellow';
                        }
                        ui.timer.innerHTML = m + ':' + visualS;
                    }, 1000);
                } else {
                    s = 150;
                }


                NetworkTables.setValue(key, false);

                break;
        }



    }


    ui.Minimap.fieldDisplay.onclick = function () {

        ui.Minimap.offset = ui.Minimap.Value;

        onValueChanged('/SmartDashboard/drive/navX/yaw', ui.Minimap.Value);




};


