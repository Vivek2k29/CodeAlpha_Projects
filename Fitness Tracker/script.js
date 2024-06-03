document.getElementById("loginButton").addEventListener("click", function() {
    document.getElementById("loginModal").style.display = "block";
});

document.getElementById("closeButton").addEventListener("click", function() {
    document.getElementById("loginModal").style.display = "none";
});

window.addEventListener("click", function(event) {
    if (event.target === document.getElementById("loginModal")) {
        document.getElementById("loginModal").style.display = "none";
    }
});
document.addEventListener('DOMContentLoaded', () => {
    loadProgress();
    loadCurrentGoal();
});

function recordWorkout() {
    const workoutType = document.getElementById('workout-type').value;
    const duration = document.getElementById('duration').value;
    const calories = document.getElementById('calories').value;

    let workouts = JSON.parse(localStorage.getItem('workouts')) || [];
    workouts.push({ workoutType, duration, calories });
    localStorage.setItem('workouts', JSON.stringify(workouts));

    alert('Workout recorded successfully!');
    loadProgress();
}

function setGoal() {
    const goal = document.getElementById('goal').value;
    localStorage.setItem('fitnessGoal', goal);

    alert('Goal set successfully!');
    loadCurrentGoal();
}

function loadCurrentGoal() {
    const goal = localStorage.getItem('fitnessGoal');
    const currentGoalDiv = document.getElementById('current-goal');
    currentGoalDiv.innerHTML = goal ? `<p>Current Goal: ${goal}</p>` : '<p>No goal set.</p>';
}

function loadProgress() {
    const workouts = JSON.parse(localStorage.getItem('workouts')) || [];
    const progressContent = document.getElementById('progress-content');

    if (workouts.length === 0) {
        progressContent.innerHTML = '<p>No workouts recorded yet.</p>';
        return;
    }

    let progressHTML = '<table>';
    progressHTML += '<tr><th>Workout Type</th><th>Duration (minutes)</th><th>Calories Burned</th></tr>';

    workouts.forEach(workout => {
        progressHTML += `<tr><td>${workout.workoutType}</td><td>${workout.duration}</td><td>${workout.calories}</td></tr>`;
    });

    progressHTML += '</table>';
    progressContent.innerHTML = progressHTML;
    
    

}

