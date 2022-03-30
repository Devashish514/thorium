const userModel = require("../models/userModel");
const reviewModel = require("../models/reviewModel");
const bookModel = require("../models/bookModel");
const emailValidator = require("email-validator");
const jwt = require("jsonwebtoken");
const { find } = require("../models/userModel");
const moment = require("moment");
const { response } = require("express");


const createUser = async function (req, res) {
    try {
        let data = req.body;
        if (Object.keys(data).length == 0) {
            return res.status(404).send({ status: false, err: "Body Not Found!!" });
        }
        const mobile = Number(data.phone);
        const email = emailValidator.validate(data.email);
        const check = "12345".split("");
        let firstN = data.phone[0];

        if (data) {
            if (!data.title) {
                return res.status(400).send({ status: false, message: "Title is required!" });
            }
            if (!data.name) {
                return res.status(404).send({ status: false, message: "Name is Required" });
            } else {
                if (typeof data.name != "string") {
                    return res.status(400).send({ status: false, message: "invalid name" });
                }
                const name = data.name.split(" ").join("");
                if (name.length == 0) {
                    return res.status(400).send({ status: false, message: "invalid name" });
                }
            }
            if (!data.phone) {
                return res.status(400).send({ status: false, message: "phone is Required" });
            }

            if (data.phone) {
                if (isNaN(mobile)) {
                    return res.status(400).send({ status: false, message: "Invalid Phone " });
                }
                // validating for Indian Mobile No.
                const check3 = (arr) => {
                    for (var element of arr) {
                        if (firstN[0] == element) {
                            return true
                        }
                    }
                }
                if (data.phone.length < 10 || data.phone.length > 10) {
                    return res.status(400).send({ status: false, message: "invalid Mobile No." });
                }
                if (check3(check)) {
                    return res.status(400).send({ status: false, message: "Invalid Mobile Number" });
                }
            }
            if (!email) {
                return res.send({ status: false, message: "No email or invalid Email" });
            }
            if (!data.password) {
                return res.status(400).send({ status: false, message: "Password Required" });
            }
            if (data.password) {
                if (data.password.length < 8 || data.password.length > 15) {
                    return res.status(400).send({ status: false, message: "Password Format Invalid" });
                }
            }

        }
        let savedData = await userModel.create(data);
        res.status(201).send({ status: true, message: "Data successfully created", data: savedData });
    } catch (err) {
        console.log(err);
        res.status(500).send({ status: false, message: err });
    }
}

const login = async function (req, res) {
    try {
        let data = req.body;
        if (Object.keys(data).length == 0) {
            return res.status(400).send({ status: false, message: "Require login Credentials !" });
        }
        let email = data.email;
        let password = data.password;
        if (!email || !password) {
            return res.status(400).send({ status: false, message: "Email or Password required to log In" });
        }

        let result = await userModel.findOne({ email: email, password: password });
        if (!result) {
            return res.status(400).send({ status: false, message: "Invalid Userid or Password" });

        }
        let payload = { userId: result._id };
        let token = jwt.sign(payload, "SecretKey", { expiresIn: "10h" });
        if (token) {
            res.setHeader("x-auth-token", token);
        }
        res.status(200).send({ status: true, message: "User Logged In successfully..", data: token });
    } catch (err) {
        console.log(err);
        res.status(500).send({ status: false, message: err });
    }
}

/**
 * phase -II
*/

const createBook = async function (req, res) {
    try {
        //Authorize Route
        if (req.validate != req.query.userId) {
            return res.status(404).send({ status: false, message: "Not Authorize" });
        }
        let data = req.body;
        if (Object.keys(data).length == 0) {
            return res.status(400).send({ status: false, message: "No body Found" });
        }
        if (data) {
            if (!data.title || typeof data.title != "string") {
                return res.status(400).send({ status: false, message: "Missing title or Invalid Title.." });
            } else {
                if (data.title.split(" ").join("").length == 0) {
                    return res.status(400).send({ status: false, message: 'title cannot be empty...' });
                }
            }
            if (!data.excerpt) {
                return res.status(400).send({ status: false, message: "excerpt is Mandatory..!!" });
            } if (!data.userId) {
                return res.status(400).send({ status: false, message: "userId is Mandatory..!!" });

            } else {
                let findUser = await userModel.findOne({ _id: data.userId });
                if (!findUser) {
                    return res.status(400).send({ status: false, message: "Invalid User !!" });
                }

            }
            if (data.ISBN) {
                const isbn = data.ISBN.split("");
                for (var i in isbn) {
                    const indexof = isbn.indexOf("-");
                    if (isbn[i] === "-") {
                        isbn.splice(indexof, 1);
                        continue
                    }
                }
                const check = isbn.join("");
                if (check.length != 13) {
                    return res.status(400).send({ status: false, message: "Invalid ISBN.." })
                }
                // console.log(check)
                const check2 = Number(check);
                if (isNaN(check2)) {
                    return res.status(400).send({ status: false, message: "Invalid ISBN" });
                }

            } else {
                if (data.ISBN.split(" ").join("").length == 0) return response.status(400).send({ status: false, message: "Cannot be empty" });
                else {
                    return res.status(400).send({ status: false, message: "ISBN is required...!" });
                }
            }
            if (!data.category) {
                return res.status(400).send({ status: false, message: "category is required...!" });
            }
            if (!data.subcategory) {
                return res.status(400).send({ status: false, message: "subcategory is required...!" });
            }
            if (data.reviews) {
                if (!(typeof data.reviews == "number")) {
                    return res.status(400).send({ status: false, message: "Looking for Number, given Unknown!!" })
                }
            }

        }
        // console.log(data)
        // const latestData={...data,releasedAt : moment().format('MMMM Do YYYY, h:mm:ss a')}
        let savedData = await bookModel.create(data);
        res.status(201).send({ status: true, message: "Book Successfully created ..", data: savedData });
    } catch (err) {
        console.log(err)
        return res.status(500).send({ status: false, message: err });
    }
}

const getFilteredBooks = async function (req, res) {
    try {
        let data = req.query;
        let findData = { isDeleted: false }
        if (data) {
            if (data.userId) {
                let findUser = await bookModel.findOne({ userId: { $eq: data.userId } });
                //findOne returns object...
                if (!findUser) {
                    return res.status(400).send({ status: false, message: "No Books by this User" });
                }
                findData.userId = data.userId;

            } if (data.category) {
                findData.category = data.category;
            } if (data.subcategory) {
                findData.subcategory = data.subcategory;
            }
        }
        // console.log(findData)

        let result = await bookModel.find(findData).select({ _id: 1, title: 1, excerpt: 1, userId: 1, category: 1, releasedAt: 1, reviews: 1 });
        //Sorting Array in alphabetical Order as per BOOks Title.....
        result.sort(function (a, b) {
            const titleA = a.title.toUpperCase();
            const titleB = b.title.toUpperCase();
            if (titleA < titleB) {
                return -1;
            }
            if (titleA > titleB) {
                return 1;
            }
            return 0;
        });
        //find  returns  array of objects...
        if (result.length == 0) {
            return res.status(404).send({ status: false, message: "No Books Found" });
        }
        res.status(200).send({ status: true, message: "Book List..", data: result });
    } catch (err) {
        console.log(err);
        res.status(500).send({ status: false, err: message });
    }
}


const getBooksById = async function (req, res) {
    try {
        let bookId = req.params.bookId;
        if (!bookId) {
            return res.status(400).send({ status: false, message: "BookId is required.." });
        }
        let data = await bookModel.findById(bookId);
        if (!data) {
            return res.status(404).send({ status: false, message: "No Book By this Id.." });
        }
        let review = await reviewModel.find({ bookId: bookId }).select({ _id: 1, bookId: 1, reviewedBy: 1, reviewedAt: 1, rating: 1, review: 1 });
        if (data.reviewsData) {
            for (let i = 0; i < review.length; i++) {
                data.reviewsData.push(review[i]);
            }
        }
        res.status(200).send({ status: true, message: "Succesfull", data: data });


    } catch (err) {
        console.log(err);
        res.status(500).send({ status: false, message: err });
    }
}


const updateBooks = async function (req, res) {
    try {
        //Authorize Route
        if (req.validate != req.query.userId) {
            return res.status(404).send({ status: false, message: "Not Authorize" });
        }
        let bookId = req.params.bookId;
        let bookData = await bookModel.findById(bookId);
        if (!bookData) {
            return res.status(404).send({ status: false, message: "BookId is Invalid" });
        }
        if (bookData.isDeleted) {
            return res.status(404).send({ status: false, message: "Book is Deleted" });
        }
        let dataToUpdate = req.body;
        if (Object.keys(dataToUpdate).length == 0) {
            return res.status(400).send({ status: false, message: "Need Data To Update..!" });
        }
        if (dataToUpdate) {
            if (dataToUpdate.title) {
                if (typeof dataToUpdate.title != "string") return res.status(400).send({ status: false, message: 'Invalid Title.' });

                if (dataToUpdate.title === bookData.title) {
                    return res.status(400).send({ status: false, message: "Book is already present with this title" });
                }
                if (dataToUpdate.title.split(" ").join("").length == 0) {
                    return res.status(400).send({ status: false, message: 'Invalid Title' });
                }

                bookData.title = dataToUpdate.title;
            } if (dataToUpdate.excerpt) {
                if (typeof dataToUpdate.excerpt != "string") return res.status(400).send({ status: false, message: 'Invalid excerpt...' });

                if (dataToUpdate.excerpt.split(" ").join("").length == 0) {
                    return res.status(400).send({ status: false, message: 'either "excerpt empty" or "invalid format"' });
                }
                bookData.excerpt = dataToUpdate.excerpt;
            } if (dataToUpdate.releasedAt) {
                bookData.releasedAt = moment().format('MMMM Do YYYY, h:mm:ss a');

            } if (dataToUpdate.ISBN ) {
                dataToUpdate.ISBN=dataToUpdate.ISBN.split(" ").join("");
                if (dataToUpdate.ISBN === bookData.ISBN) {
                    return res.status(400).send({ status: false, message: "Book is already present with this ISBN" });
                } 
                if (dataToUpdate.ISBN.split(" ").join("").length == 0) {
                    return res.status(400).send({ status: false, message: "Invalid ISBN.." });
                }
                const isbn = dataToUpdate.ISBN.split("");
                for (var i in isbn) {
                    const indexof = isbn.indexOf("-");
                    if (isbn[i] === "-") {
                        isbn.splice(indexof, 1);
                        continue
                    }
                }
                const check = isbn.join("");
                if (check.length != 13) {
                    return res.status(400).send({ status: false, message: "Invalid ISBN length...(must be 13)", note: "exclude -" })
                }
                // console.log(check)
                const check2 = Number(check);
                if (isNaN(check2)) {
                    return res.status(400).send({ status: false, message: "Invalid ISBN" });
                }
                bookData.ISBN = dataToUpdate.ISBN;

            } else {
                return res.status(400).sned({ status: false, message: "Invalid ISBN.." });
            }

            bookData.isUpdated = true
            bookData.updatedAt = moment().format('MMMM Do YYYY, h:mm:ss a');//working)
            bookData.save();
            res.status(200).send({ status: true, message: "data Updated", data: bookData });
        }
    } catch (err) {
        console.log(err);
        res.status(500).send({ status: false, message: err });
    }
}

const deleteBooks = async function (req, res) {
    try {
        //Authorize Route
        if (req.validate != req.query.userId) {
            return res.status(404).send({ status: false, message: "Not Authorize" });
        }
        let bookId = req.params.bookId;
        if (!bookId) {
            return res.status(400).send({ status: false, message: "required BookId" });
        }
        let data = await bookModel.findById(bookId);
        if (!data) {
            return res.status(404).send({ status: false, message: "No Book found" });
        }
        if (data.isDeleted) {
            return res.status(400).send({ status: false, message: "Book already Deleted" });
        }
        data.isDeleted = true;
        data.save();
        res.status(200).send({ status: true, message: "Data Successfully Deleted" });
    } catch (err) {
        res.status(500).send({ status: false, err: message });
    }
}



/**
 * reviews API"S
 */


const createReview = async function (req, res) {
    try {
        let bookid = req.params.bookId;
        let data = req.body;
        if (Object.keys(data).length == 0) {
            return res.status(400).send({ status: false, message: "No data Found" });
        }
        if (data) {
            if (!data.bookId) {
                return res.status(400).send({ status: false, message: "bookId required..." });
            } else {
                let findId = await bookModel.findById(data.bookId);
                if (!findId) {
                    return res.status(400).send({ status: false, message: "Invalid BookId" });
                }
            }
            if (data.reviewedBy) {
                if (typeof data.reviewedBy != "string") {
                    return res.status(400).send({ status: false, message: "Invalid Format.." });
                } else {
                    if (data.reviewedBy.split(" ").join("").length == 0) {
                        return res.status(400).send({ status: false, message: "Required reviewer's name or review as a guest" });
                    }
                }
            }
            if (!data.rating || typeof data.rating != "number") {
                return res.status(400).send({ status: false, message: "Missing Rating or Invalid syntax.." });
            } else {
                if (data.rating <= 0 || data.rating > 5) {
                    return res.status(400).send({ status: false, message: "Invalid Ratings" });
                }
            }
        }
        let result = await reviewModel.create(data);
        //Destructuring  the result object...
        const { _id, bookId, reviewedBy, reviewedAt, rating, review } = result;
        const finalData = {
            _id: _id,
            bookId: bookId,
            reviewedBy: reviewedBy,
            reviewedAt: reviewedAt,
            rating: rating,
            review: review
        }
        let countReviewBook = await bookModel.findById(bookid);
        countReviewBook.reviews += 1;
        countReviewBook.reviewsData.push(finalData)
        countReviewBook.save();


        res.status(201).send({ status: true, message: "review Succesfully created..", data: finalData, bookData: countReviewBook });
    } catch (err) {
        console.log(err);
        res.status(500).send({ status: false, message: err });
    }
}

const updateReview = async function (req, res) {
    let reviewId = req.params.reviewId;
    let bookId = req.params.bookId;
    let updateData = req.body;
    if (Object.keys(updateData).length == 0) {
        return res.status(400).send({ status: false, message: "Require data to update.." });
    }
    let checkBook = await bookModel.findById(bookId);
    if (!checkBook) {
        return res.status(400).send({ status: false, message: "No such book with bookId." });
    }
    let reviewData = await reviewModel.findById(reviewId);
    if (!reviewData) {
        return res.status(400).send({ status: false, message: "Invalid review Id" });
    }
    if (reviewData.isDeleted) {
        return res.status(400).send({ status: false, message: "review Deleted." });
    }

    if (updateData) {
        if (updateData.review && typeof updateData.review == "string") {
            reviewData.review = updateData.review;
        } if (updateData.rating && typeof updateData.review == "number") {
            reviewData.rating = updateData.rating;
        } if (updateData.reviewedBy && typeof updateData.reviewedBy == "string") {
            if (updateData.reviewedBy.split(" ").join("").length == 0) {
                return res.status(400).send({ status: false, message: "Required reviewer's name or review as a guest" });
            }
            reviewData.reviewedBy = updateData.reviewedBy;
        }
        reviewData.isUpdated = true;
        reviewData.updatedAt = moment().format('MMMM Do YYYY, h:mm:ss a');
        reviewData.save();
    }
    res.status(200).send({ status: true, message: "Updated Successfully", data: reviewData });
}

const deleteReview = async function (req, res) {
    let reviewId = req.params.reviewId;
    let bookId = req.params.bookId;
    if (reviewId && bookId) {
        let reviewData = await reviewModel.findById(reviewId);
        if (!reviewData) {
            return res.status(400).send({ status: false, message: "no reviews found" });
        }
        if (reviewData.isDeleted) {
            return res.status(400).send({ status: false, message: "review already deleted" });
        }
        let bookData = await bookModel.findById(bookId);
        if (!bookData) {
            return res.status(400).send({ status: false, message: "no book found" });
        }
        reviewData.isDeleted = true;
        bookData.reviews -= 1;
        reviewData.save();
        bookData.save();
        res.status(200).send({ status: true, message: "Data successfully Deleted.." }); //review: reviewData, book: bookData });
    } else {
        return res.status(404).send({ status: false, message: "params are required" });
    }
}



module.exports = { createUser, login, createBook, getFilteredBooks, createReview, getBooksById, updateBooks, deleteBooks, updateReview, deleteReview };