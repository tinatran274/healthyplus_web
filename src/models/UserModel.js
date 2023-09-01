class User {
    constructor (id, name, age, gender, height, weight, aim, exercise, premium) {
        this.id = id;
        this.name = name;
        this.age = age;
        this.gender = gender;
        this.height = height
        this.weight = weight;
        this.aim = aim;
        this.exercise = exercise;
        this.premium = premium; //0:free 1:premium
    }
    toString() {
        return this.id + ', ' + this.name;
    }
    getName() {
        return this.name;
    }
    getAge() {
        return this.age;
    }
    getGender() {
        return this.gender;
    }
    getHeight() {
        return this.height;
    }
    getWeight() {
        return this.weight;
    }
    getAim() {
        return this.aim;
    }
    getExercise() {
        return this.exercise;
    }
    getPremium() {
        return this.premium;
    }
    getBMI(){
        const bmi = this.weight / ((this.height/100) * (this.height/100));
        return bmi.toFixed(2);
    }
    getTDEE(){
        let bmr = 1;
        let tdee = 1;
        if (this.gender === 'Nam') 
            bmr = 88.362 + (13.397 * this.weight) + (4.799 * this.height) - (5.677 * this.age);
        else if (this.gender === 'Nữ')
            bmr = 447.593 + (9.247 * this.weight) + (3.098 * this.height) - (4.330 * this.age);
        switch (this.exercise) {
            case 'Không vận động':
            tdee = bmr * 1.2;
            break;
            case '1-2 buổi/tuần':
            tdee = bmr * 1.375;
            break;
            case '3-5 buổi/tuần':
            tdee = bmr * 1.55;
            break;
            case '5-7 buổi/tuần':
            tdee = bmr * 1.725;
            break;
        }
        return tdee.toFixed(2);
    }
    getWater(){
        const necessaryWater = this.weight * 0.033;
        return necessaryWater.toFixed(2);
    }
    getCalories(){
        let aim = "";
        if (this.aim === 'Tăng cân') 
            aim = "nhiều hơn "+this.getTDEE().toString();
        else if (this.aim === 'Giảm cân')
            aim = "ít hơn "+this.getTDEE().toString();
        else if (this.aim === 'Giữ cân')
            aim = "khoảng "+this.getTDEE().toString();

        return aim;
    }
}
// Firestore data converter
const UserConverter = {
    toFirestore: (user) => {
        return {
            id: user.id,
            name: user.name,
            age: user.age,
            gender: user.gender,
            heigth: user.height,
            weight: user.weight,
            aim: user.aim,
            exercise: user.exercise,
            premium: user.premium,
            };
    },
    fromFirestore: (snapshot, options) => {
        const data = snapshot.data(options);
        return new User(data.id, data.name, data.age, data.gender,data.height, data.weight, data.aim, data.exercise, data.premium);
    }
};
export default UserConverter;