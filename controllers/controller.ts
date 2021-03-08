let cars: Car[] = [];

function createCar(plate: string, brand: string, color: string) {
  cars.push(new Car(plate, color, brand));

  document.getElementById('WheelForm')?.classList.remove('d-none');
  document.getElementById('carForm')?.classList.add('d-none');
}

function sendCarForm(e: any) {
  e.preventDefault();

  const values = e.target;

  if (checkPlateFormat(values[0].value)) {
    createCar(values[0].value, values[1].value, values[2].value);
  } else {
    values[0].classList.add('is-invalid');
  }
}

function printCarInfo() {
  const div = document.getElementById('carInfo');

  if (div) {
    div.innerHTML = '';
  }

  cars.forEach((car) => {
    const child = document.createElement('div');
    child.innerHTML = `CAR: <br/>
    PLATE ${car.plate} COLOR: ${car.color} BRAND: ${car.brand}`;

    div?.appendChild(child);

    if (car.wheels.length > 0) {
      const wheelChild = document.createElement('div');
      let wheelsInfo: string = '';

      car.wheels.forEach(
        (wheel, index) =>
          (wheelsInfo += `Wheel ${index}: Brand: ${wheel.brand} Diameter: ${wheel.diameter}<br/>`)
      );

      wheelChild.innerHTML = `Wheels: <br/>${wheelsInfo}`;

      div?.appendChild(wheelChild);
    }
  });

  const carForm: any = document.getElementById('carForm');
  const wheelForm: any = document.getElementById('WheelForm');

  if (carForm) {
    carForm.reset();
  }
  if (wheelForm) {
    wheelForm.reset();
  }
}

function sendWheelForm(e: any) {
  e.preventDefault();

  const values = e.target;

  const wheelArr: Wheel[] = [
    new Wheel(values[1].value, values[0].value),
    new Wheel(values[3].value, values[2].value),
    new Wheel(values[5].value, values[4].value),
    new Wheel(values[7].value, values[6].value),
  ];

  let errors: boolean = false;

  wheelArr.forEach((wheel, index) => {
    const i = index * 2 + 1;
    if (!checkDiameterFormat(wheel.diameter)) {
      errors = true;
      values[i].classList.add('is-invalid');
    } else {
      values[i].classList.remove('is-invalid');
      values[i].classList.add('is-valid');
    }
  });

  if (!errors && cars.length > 0) {
    wheelArr.forEach((wheel) => cars[cars.length - 1].addWheel(wheel));
    printCarInfo();

    document.getElementById('carForm')?.classList.remove('d-none');
    document.getElementById('WheelForm')?.classList.add('d-none');
  }
}

function checkPlateFormat(value: string) {
  if (value.match(/[0-9]{4}[a-z]{3}/gi) == null) {
    return false;
  }

  return true;
}

function checkDiameterFormat(value: number) {
  if (value < 0.4 || value > 2) {
    return false;
  }

  return true;
}
