const express = require("express");
const router = express.Router();
const mongoose = require("mongoose")
const Todo = mongoose.model("Todo")

router.get('/getchecked', (req, res) => {
    const { date } = req.query;

    Todo.find({
        status: "completed", createdAt: {
            $eq: date
        }
    })
        .then(todos => {
            res.json(todos)

        }
        )
        .catch(err => console.log(err))
})

router.get('/unchecked', (req, res) => {
    const { date } = req.query;

    Todo.find({
        status: "pending", createdAt: {
            $eq: date
        }
    })
        .then(todos => {
            res.json(todos)

        })
        .catch(err => console.log(err))
})
//getting todos from specific dates
router.get('/getFromDates', (req, res) => {
    const { date } = req.query;
    Todo.find({
        createdAt: {
            $eq: date
        }
    })
        .then(filtered => {
            if (filtered) {
                console.log(date)
                res.json(filtered);
            }
            else { console.log("No Todos") }
        })
        .catch(err => res.send(err));
});



//editing 
router.put("/edit", (req, res) => {
    const { id, description, updatedAt } = req.body;
    Todo.findByIdAndUpdate(id, {
        description: description,
        updatedAt: updatedAt
    },
        { new: true }).then(updatedTodo => {
            res.json(updatedTodo)
        }).catch(err => res.send(err))
})

//checking 
router.put("/check", (req, res) => {
    const { id } = req.body;
    Todo.findByIdAndUpdate(id, {
        status: "completed"
    },
        { new: true }).then(checkedTodo => {
            res.json(checkedTodo)
        }).catch(err => res.send(err))
})
router.put("/uncheck", (req, res) => {
    const { id } = req.body;
    Todo.findByIdAndUpdate(id, {
        status: "pending"
    },
        { new: true }).then(checkedTodo => {
            res.json(checkedTodo)
        }).catch(err => res.send(err))
})

router.post("/postTodo", (req, res) => {
    const { description, status, createdAt } = req.body;


    const newTodo = new Todo({
        description,
        status,
        createdAt
    });

    newTodo
        .save()
        .then((postedTodo) => {
            res.status(201).json({ postedTodo: postedTodo, message: "Added Todo" });
        })
        .catch((error) => {
            res.status(500).json({ error: 'An error occurred while saving the todo' });
        });
});

//deleting
router.delete('/delete', (req, res) => {
    const { id } = req.body;
    Todo.findByIdAndDelete(id)
        .then(deletedTodo => {
            return res.json({ deletedTodo: deletedTodo, message: 'Todo is Deleted' });
        })
        .catch(err => {
            res.status(500).json({ error: "Error while deleting." });
        });
});


module.exports = router;