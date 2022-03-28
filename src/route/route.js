const express = require('express');
const router = express.Router();
const mainController =require("../controller/mainController");
const middleware= require("../middleWare/middleware")


router.post("/createUser",mainController.createUser);
router.post("/login",mainController.login);

router.post("/createbook",middleware.authorize,mainController.createBook);  //protected routes
router.get("/getBooks",mainController.getFilteredBooks);

router.get("/getBooksById/:bookId",mainController.getBooksById);
router.put("/updateBook/:bookId",middleware.authorize,mainController.updateBooks);//protected routes

router.delete("/deleteBook/:bookId",middleware.authorize,mainController.deleteBooks);//protected routes
router.post("/books/:bookId/review",mainController.createReview);

router.put("/books/:bookId/review/:reviewId",mainController.updateReview);
router.delete("/books/:bookId/review/:reviewId",mainController.deleteReview);



module.exports=router;