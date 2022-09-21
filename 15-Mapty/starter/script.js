'use strict';

// prettier-ignore
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const form = document.querySelector('.form');
const containerWorkouts = document.querySelector('.workouts');
const inputType = document.querySelector('.form__input--type');
const inputDistance = document.querySelector('.form__input--distance');
const inputDuration = document.querySelector('.form__input--duration');
const inputCadence = document.querySelector('.form__input--cadence');
const inputElevation = document.querySelector('.form__input--elevation');

console.log(Date.now());
class Workout{
    clicks = 0;
    date = new Date();
    id = Date.now();
    constructor(distance, duration, coords){
        this.distance = distance;
        this.duration = duration; //
        this.coords = coords;    //[lat, lng]
    }
    _setDescription() {
        // prettier-ignore
        const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    
        this.description = `${this.type[0].toUpperCase()}${this.type.slice(1)} on ${
          months[this.date.getMonth()]
        } ${this.date.getDate()}`;
    }
    click() {
        this.clicks++;
      }
}

class Running extends Workout{
    type = 'running'
    constructor(distance, duration, coords, cadence){
        super(distance, duration, coords);
        this.cadence = cadence;
        this.calcPace();
        this._setDescription();
    }
    calcPace(){
        this.pace = this.duration / this.distance;
        return this.pace;
    }
}

class Cycling extends Workout{
    type = 'cycling'
    constructor(distance, duration, coords, elevationGain){
        super(distance,duration,coords);
        this.elevationGain = elevationGain;
        this.calcSpeed();
        this._setDescription();
    }
    calcSpeed(){
        this.speed = this.distance /(this.duration /60);
        return this.speed;
    }

}

class App{
    #map;
    #mapZoomLevel = 13;
    #mapEvent;
    #workouts = [];
    constructor(){
        this._getPosition();
        // this.#map.on('click',this._showForm.bind(this));       //can't call becuse this.#map is undefine
        this._toggleElevationField();
        form.addEventListener('submit', this._newWorkout.bind(this));
        containerWorkouts.addEventListener('click', this._moveToPopup.bind(this));
    }
    _getPosition(){                              //loadMap is function inside function this = undefine hence we have to bind it
        if(navigator.geolocation){
            navigator.geolocation.getCurrentPosition(this._loadMap.bind(this),function(){
                alert("can't find your loaction");
            });
        }
    }
    _loadMap(position){
        const {latitude} = position.coords;
        const {longitude} = position.coords;
        let coords = [latitude, longitude];
        
        this.#map = L.map('map').setView(coords, 13);
        console.log(this.#map);
        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '© OpenStreetMap'
        }).addTo(this.#map);

        this.#map.on('click',this._showForm.bind(this));
    }
    _showForm(mapE){
            this.#mapEvent = mapE;
            //form visible
            form.classList.remove('hidden');
    }
    _hideForm() {
        // Empty inputs
        inputDistance.value = inputDuration.value = inputCadence.value = inputElevation.value =
          '';
    
        form.style.display = 'none';
        form.classList.add('hidden');
        setTimeout(() => (form.style.display = 'grid'), 1000);
      }
    _toggleElevationField(){
        inputType.addEventListener('change', function(){
            inputCadence.closest('.form__row').classList.toggle('form__row--hidden');
            inputElevation.closest('.form__row').classList.toggle('form__row--hidden');
        })
    }
    _newWorkout(event){
         //page reload
         event.preventDefault();
        
         
         
         //getting data
         const type = inputType.value;
         const distance = +inputDistance.value;
         const duration = +inputDuration.value;
         const {lat, lng} = this.#mapEvent.latlng;
         let workout;

         //validation functionality
         const validInput = function(...inputs){
            return inputs.every(input => Number.isFinite(input));
         }
         const allPositive = function(...inputs){
            return inputs.every(input=> input > 0);
         }

         //creation of the object and validating data
         if(type === "running"){
            const cadence = +inputCadence.value;
            console.log(distance, duration, cadence);
            if(!validInput(distance, duration, cadence) || !allPositive(distance, duration, cadence))
                return alert('inputs are wrong');
            workout = new Running(distance, duration, [lat, lng], cadence);
         }

         if(type === "cycling"){
            const elevation = +inputElevation.value;
            if(!validInput(distance, duration, elevation) || !allPositive(distance, duration, elevation))
                return alert('inputs are wrong');
            workout = new Cycling(distance, duration, [lat, lng], elevation);
         }
         console.log(workout);
         
         this.#workouts.push(workout);

         //adding marker on map
         this._renderWorkoutMarker(workout);

         // Render workout on list
        this._renderWorkout(workout);

        // Hide form + clear input fields
        this._hideForm();

         //clear the form
         inputDistance.value = inputDuration.value = inputCadence.value = '';
         
    }
    _renderWorkoutMarker(workout){
        L.marker(workout.coords).addTo(this.#map).bindPopup(
            L.popup({
                maxWidth: 250,
                minWidth: 100,
                autoClose: false,
                closeOnClick: false,
                className: `${workout.type}-popup`
        }).setContent('workout')
        ).openPopup();
    }
    _renderWorkout(workout) {
        let html = `
          <li class="workout workout--${workout.type}" data-id="${workout.id}">
            <h2 class="workout__title">${workout.description}</h2>
            <div class="workout__details">
              <span class="workout__icon">${
                workout.type === 'running' ? '🏃‍♂️' : '🚴‍♀️'
              }</span>
              <span class="workout__value">${workout.distance}</span>
              <span class="workout__unit">km</span>
            </div>
            <div class="workout__details">
              <span class="workout__icon">⏱</span>
              <span class="workout__value">${workout.duration}</span>
              <span class="workout__unit">min</span>
            </div>
        `;
    
        if (workout.type === 'running')
          html += `
            <div class="workout__details">
              <span class="workout__icon">⚡️</span>
              <span class="workout__value">${workout.pace.toFixed(1)}</span>
              <span class="workout__unit">min/km</span>
            </div>
            <div class="workout__details">
              <span class="workout__icon">🦶🏼</span>
              <span class="workout__value">${workout.cadence}</span>
              <span class="workout__unit">spm</span>
            </div>
          </li>
          `;
    
        if (workout.type === 'cycling')
          html += `
            <div class="workout__details">
              <span class="workout__icon">⚡️</span>
              <span class="workout__value">${workout.speed.toFixed(1)}</span>
              <span class="workout__unit">km/h</span>
            </div>
            <div class="workout__details">
              <span class="workout__icon">⛰</span>
              <span class="workout__value">${workout.elevationGain}</span>
              <span class="workout__unit">m</span>
            </div>
          </li>
          `;
    
        form.insertAdjacentHTML('afterend', html);
      }
      _moveToPopup(e) {
        // BUGFIX: When we click on a workout before the map has loaded, we get an error. But there is an easy fix:
        if (!this.#map) return;
    
        const workoutEl = e.target.closest('.workout');
    
        if (!workoutEl) return;
        
        const workout = this.#workouts.find(
          work => work.id == workoutEl.dataset.id
        );
    
        this.#map.setView(workout.coords, this.#mapZoomLevel, {
          animate: true,
          pan: {
            duration: 1,
          },
        });
    
        // using the public interface
        workout.click();
      }
}

const newApp = new App();




date = new Date();
id = Date.now();
#mapZoomLevel = 13;


//Prompt user for there geographical location  
/*
if (navigator.geolocation){
      navigator.geolocation.getCurrentPosition(                //accept two callback function
        this._loadMap.bind(this),                              
        function () {
          alert('Could not get your position');
        }
        );
    }
*/


_loadMap(position) {
    const { latitude } = position.coords;
    const { longitude } = position.coords;
    const coords = [latitude, longitude];
    this.#map = L.map('map').setView(coords, this.#mapZoomLevel);
    L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(this.#map);
      
      const { lat, lng } = this.#mapEvent.latlng; 

      _showForm(mapE) {
        this.#mapEvent = mapE;
        
      }
      this.#map.on('click', this._showForm.bind(this));

      
      



//to set the marker 
L.marker(workout.coords)
      .addTo(this.#map)
      .bindPopup(
        L.popup({
          maxWidth: 250,
          minWidth: 100,
          autoClose: false,
          closeOnClick: false,
          className: `${workout.type}-popup`,
        })
      )
      .setPopupContent(
        `${workout.type === 'running' ? '🏃‍♂️' : '🚴‍♀️'} ${workout.description}`
      )
      .openPopup();


      this.#map.setView(workout.coords, this.#mapZoomLevel, {
        animate: true,
        pan: {
          duration: 1,
        },
      });






//local storage API
/*
    //store data on local storage
    localStorage.setItem('keyName', JSON.stringify(varibaleName));
    //retrive data from local storage
    const data = JSON.parse(localStorage.getItem('keyName'));
    //remove from local storage
    localStorage.removeItem('KeyName');
    //page reload
    location.reload();
*/