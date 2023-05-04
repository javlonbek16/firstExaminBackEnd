const http = require('http');
const Todo = require('./Todo');
const Io = require("./Io")
const Worker = new Io("./todo.json")
const parser = require("./parser")

const request = async (req, res) => {
    if (req.url === "/get" && req.method === "GET") {
        try {
            const todoR = await Worker.read()
            res.end(JSON.stringify(todoR))
        } catch (err) {
            if (err) new Error(err)
        }
    }
    else if (req.url === "/post" && req.method === "POST") {
        try {
            req.body = await parser(req);
            const { title, text, failorSuccess } = req.body
            const todoR = await Worker.read()
            const id = (todoR[todoR.length - 1]?.id || 0) + 1;
            const date = new Date()
            const newTodo = new Todo(title, text, id, date, failorSuccess);
            const newTodos = todoR.length ? [...todoR, newTodo] : [newTodo];
            Worker.write(newTodos);
            res.writeHead(201)
            res.end(JSON.stringify({ succes: true }))
        } catch (err) {
            if (err) new Error(err)
        }
    }
    else if (req.url === "/put" && req.method === "PUT") {
        try {
            req.body = await parser(req);
            const { title, text, id } = req.body
            const todoR = await Worker.read()
            const changeTodo = todoR.find((e) => e.id == id);
            changeTodo.title = title
            changeTodo.text = text
            Worker.write(todoR);
            res.end(JSON.stringify(changeTodo));
            res.writeHead(201)
        } catch (error) {
            if (err) new Error(err)
        }
    } else if (req.url === "/putt" && req.method == "PUT") {
        try {
            req.body = await parser(req);
            const { id, failorSuccess } = req.body
            const todoR = await Worker.read()
            const changeTodo = todoR.find((e) => e.id == id);
            changeTodo.failorSuccess = failorSuccess
            res.end(JSON.stringify(changeTodo));
            Worker.write(todoR);
            res.writeHead(201);
        } catch (error) {
            if (err) new Error(err)
        }
    }
    else if (req.url === "/delete" && req.method === "DELETE") {
        try {
            req.body = await parser(req);
            const { id } = req.body
            const todoR = await Worker.read()
            const changeFilter = todoR.filter((e) => e.id != id)
            res.end(JSON.stringify("successfuly deleted"));
            Worker.write(changeFilter);
        } catch (error) {
            if (err) new Error(err)
        }
    }
    else if (req.url === "/id" && req.method === "POST") {
        try {
            const todoR = await Worker.read()
            req.body = await parser(req);
            const { id } = req.body;
            const changeTodo = todoR.find((e) => e.id == id);
            res.end(JSON.stringify(changeTodo))
        } catch (err) {
            if (err) new Error(err)
        }
    }
}


http.createServer(request).listen(1234)