class Todo {
    constructor(title, text, id, date, failorSuccess) {
        this.title = title;
        this.text = text;
        this.id = id;
        this.date = date;
        this.failorSuccess = failorSuccess;
    }
}
module.exports = Todo;