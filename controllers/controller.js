"use strict";
var cars = [];
function createCar(plate, brand, color) {
    var _a, _b;
    cars.push(new Car(plate, color, brand));
    (_a = document.getElementById('WheelForm')) === null || _a === void 0 ? void 0 : _a.classList.remove('d-none');
    (_b = document.getElementById('carForm')) === null || _b === void 0 ? void 0 : _b.classList.add('d-none');
}
function sendCarForm(e) {
    e.preventDefault();
    var values = e.target;
    if (checkPlateFormat(values[0].value)) {
        createCar(values[0].value, values[1].value, values[2].value);
    }
    else {
        values[0].classList.add('is-invalid');
    }
}
function printCarInfo() {
    var div = document.getElementById('carInfo');
    if (div) {
        div.innerHTML = '';
    }
    cars.forEach(function (car) {
        var child = document.createElement('div');
        child.innerHTML = "CAR: <br/>\n    PLATE " + car.plate + " COLOR: " + car.color + " BRAND: " + car.brand;
        div === null || div === void 0 ? void 0 : div.appendChild(child);
        if (car.wheels.length > 0) {
            var wheelChild = document.createElement('div');
            var wheelsInfo_1 = '';
            car.wheels.forEach(function (wheel, index) {
                return (wheelsInfo_1 += "Wheel " + index + ": Brand: " + wheel.brand + " Diameter: " + wheel.diameter + "<br/>");
            });
            wheelChild.innerHTML = "Wheels: <br/>" + wheelsInfo_1;
            div === null || div === void 0 ? void 0 : div.appendChild(wheelChild);
        }
    });
    var carForm = document.getElementById('carForm');
    var wheelForm = document.getElementById('WheelForm');
    if (carForm) {
        carForm.reset();
    }
    if (wheelForm) {
        wheelForm.reset();
    }
}
function sendWheelForm(e) {
    var _a, _b;
    e.preventDefault();
    var values = e.target;
    var wheelArr = [
        new Wheel(values[1].value, values[0].value),
        new Wheel(values[3].value, values[2].value),
        new Wheel(values[5].value, values[4].value),
        new Wheel(values[7].value, values[6].value),
    ];
    var errors = false;
    wheelArr.forEach(function (wheel, index) {
        var i = index * 2 + 1;
        if (!checkDiameterFormat(wheel.diameter)) {
            errors = true;
            values[i].classList.add('is-invalid');
        }
        else {
            values[i].classList.remove('is-invalid');
            values[i].classList.add('is-valid');
        }
    });
    if (!errors && cars.length > 0) {
        wheelArr.forEach(function (wheel) { return cars[cars.length - 1].addWheel(wheel); });
        printCarInfo();
        (_a = document.getElementById('carForm')) === null || _a === void 0 ? void 0 : _a.classList.remove('d-none');
        (_b = document.getElementById('WheelForm')) === null || _b === void 0 ? void 0 : _b.classList.add('d-none');
    }
}
function checkPlateFormat(value) {
    if (value.match(/[0-9]{4}[a-z]{3}/gi) == null) {
        return false;
    }
    return true;
}
function checkDiameterFormat(value) {
    if (value < 0.4 || value > 2) {
        return false;
    }
    return true;
}
