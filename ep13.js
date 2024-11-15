//creating review apis intrested or accepted
//POST/reqeust/review/:accepted/:requestId
//POST/reqeust/review/:rejected/:requestId

//but i dont have to create two different APIS ,i can make one api and make status dynmaic because logic is same for both .

//POST/reqeust/review/:status/:requestId

requestRouter.post(
  "/request/review/:status?:requestId",
  userAuth,
  async (req, res) => {
    try {
      const loggedInUser = req.user; //this is done by userAuth

      //validate the status

      //validate the requestId
      //status = intrested
      //requestId should be valid presnt in the database.

      //lets write accepting logic before writing any logic think about all corner cases
      //suppose jatin is sending request to setu ,now what thinks we need to check
      //1)is tousedId id is logged in person because receiver person is must be logged in person. apan samne wale ki accept to kar nahi skatey h
      //only the toUserId person can accept it.
      //the status can be only 4 status -> so i'm accepting or rejecting request this only can be happen in ths intrested status.only
      //so the status must be intrested
    } catch (err) {
      res.status(400).send("Error" + err.message);
    }
  }
);
