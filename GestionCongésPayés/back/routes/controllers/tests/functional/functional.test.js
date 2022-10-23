require('../../../../config/db');
require('dotenv').config();
const request = require("supertest");
const jwt = require('jsonwebtoken');
const ap = "http://api:9090";

// salarie1 and her tests with different scenario
let token;
describe("create a user salarie1 who worked for more than 6 months, so holidays available, demande a type 1 congés payés, validate this demande", () => {
    beforeEach(() => {
        const user = { name: "admin", role: 1 };
        token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '300m' });
    });
    
    it("POST create a user salarie1", async () => {
        await request(ap)
            .post("/users/")
            .send({
                "userName": "salarie1",
                "password": "123",
                "firstName": "Lily",
                "lastName": "Doe",
                "email": "lily@gmail.com",
                "role": "3",
                "firstWorkingDay": "2022-01-20"
            })
            .set('Authorization', `Bearer ${token}`)
            .expect(200)
            .then((response) => {
                expect(response.text).toEqual("");
            });
            
    }); 

    
    it("Get salarie1's holidays available is bigger than 0", async () => {
        
        await request(ap)
            .get("/holidays/getByIdUser/2")
            .set('Authorization', `Bearer ${token}`)
            .expect(200)
            .then((response) => {
                expect(response.body.holidaysAvailable).toBeGreaterThan(0);
                expect(response.body.holidaysTaken).toEqual(0);
            });
    });
    

    it("POST a demande for salarie1", async () => {
        await request(ap)
            .post("/demandes/")
            .send({
                "UserId": 2,
                "startingDate": "2022-10-20",
                "endingDate": "2022-10-21",
                "TypeId": 1,
            })
            .set('Authorization', `Bearer ${token}`)
            .expect(201)
            .then((response) => {
                expect(response.text).toEqual("");
            });
    }); 

    it("UPDATE validate demande ", async () => {
        await request(ap)
            .put("/demandes/update")
            .send({
                "id": 1,
                "StatusId": 2
            })
            .set('Authorization', `Bearer ${token}`)
            .expect(200)
            .then((response) => {
                expect(response.text).toEqual("");
            });
    }); 

    it("GET salarie1's holidays taken is 2 days", async () => {
        
        await request(ap)
            .get("/holidays/getByIdUser/2")
            .set('Authorization', `Bearer ${token}`)
            .expect('Content-Type', /json/)
            .expect(200)
            .then((response) => {
                expect(response.body.holidaysTaken).toEqual(2);
            });
    }); 

});  



describe("salari1, demande a type 1 congés payés, but this salarie1 does not have enough holidays as demande", () => {
    
    it("POST a demande", async () => {
        await request(ap)
            .post("/demandes/")
            .send({
                "UserId": 2,
                "startingDate": "2022-11-20",
                "endingDate": "2022-12-21",
                "TypeId": 1
            })
            .set('Authorization', `Bearer ${token}`)
            .expect(400)
            .then((response) => {
                expect(response.text).toEqual("you dont have enough holidays");
            });
    }); 

}); 





describe("salarie1 demande a type 1 congés payés, this demande  being refused without description", () => {

    it("POST a demande", async () => {
        await request(ap)
            .post("/demandes/")
            .send({
                "UserId": 2,
                "startingDate": "2022-11-23",
                "endingDate": "2022-11-25",
                "TypeId": 1
            })
            .set('Authorization', `Bearer ${token}`)
            .expect(201)
            .then((response) => {
                expect(response.text).toEqual("");
            });
    }); 

    it("UPDATE demande", async () => {
        await request(ap)
            .put("/demandes/update")
            .send({
                "id": 2,
                "StatusId": 3
            })
            .set('Authorization', `Bearer ${token}`)
            .expect(400)
            .then((response) => {
                expect(response.text).toEqual("please specify the reason of refuse");
            });
    });

});


describe("salarie1's demande id2 being refused with a description", () => {
    it("UPDATE demande", async () => {
        await request(ap)
            .put("/demandes/update")
            .send({
                "id": 2,
                "description": "to test",
                "StatusId": 3
            })
            .set('Authorization', `Bearer ${token}`)
            .expect(200)
            .then((response) => {
                expect(response.text).toEqual("");
            });
    });

    it("GET salarie1's holidays taken is 2 days", async () => {
        
        await request(ap)
            .get("/holidays/getByIdUser/2")
            .set('Authorization', `Bearer ${token}`)
            .expect('Content-Type', /json/)
            .expect(200)
            .then((response) => {
                expect(response.body.holidaysTaken).toEqual(2);
            });
        
    });

});



describe("salarie1 demande a type 3 congés payés(maternité), demande id3, being accepted", () => {
    it("POST a demande", async () => {
        await request(ap)
            .post("/demandes/")
            .send({
                "UserId": 2,
                "startingDate": "2022-11-23",
                "endingDate": "2023-03-22",
                "TypeId": 3
            })
            .set('Authorization', `Bearer ${token}`)
            .expect(201)
            .then((response) => {
                expect(response.text).toEqual("Created");
            });
    }); 

    it("UPDATE demande", async () => {
        await request(ap)
            .put("/demandes/update")
            .send({
                "id": 3,
                "StatusId": 2
            })
            .set('Authorization', `Bearer ${token}`)
            .expect(200)
            .then((response) => {
                expect(response.text).toEqual("");
            });
    });

    it("Get salarie1's holidays taken is 2 days", async () => {       
        await request(ap)
            .get("/holidays/getByIdUser/2")
            .set('Authorization', `Bearer ${token}`)
            .expect(200)
            .then((response) => {
                expect(response.body.holidaysTaken).toEqual(2);
            });
    });

});



// salarie2 and her tests with different scenario
describe("create a user salarie2, who worked for less than 6 month, so no holiday available, demande a type 1 congés payés, which is not possible", () => {
    it("POST create a salarie", async () => {
        await request(ap)
            .post("/users/")
            .send({
                "userName": "salarie2",
                "password": "123",
                "firstName": "Lily2",
                "lastName": "Doe2",
                "email": "lily2@gmail.com",
                "role": "3",
                "firstWorkingDay": "2022-08-20"
            })
            .set('Authorization', `Bearer ${token}`)
            .expect(200)
            .then((response) => {
                expect(response.text).toEqual("");
            });
    }); 

    
    it("GET salarie2's holidays available is 0", async () => {
        
        await request(ap)
            .get("/holidays/getByIdUser/3")
            .set('Authorization', `Bearer ${token}`)
            .expect('Content-Type', /json/)
            .expect(200)
            .then((response) => {
                expect(response.body.holidaysAvailable).toEqual(0);
            });
    });
    

    it("POST a demande type1", async () => {
        await request(ap)
            .post("/demandes/")
            .set('Authorization', `Bearer ${token}`)
            .send({
                "UserId": 3,
                "startingDate": "2022-10-20",
                "endingDate": "2022-10-21",
                "TypeId": 1
            })
            .expect(400) 
            .then((response) => {
                expect(response.text).toEqual("you dont have enough holidays");
            });
    }); 
});  

describe("salarie2, demande a type 2 congés payés, and valide", () => {
    it("POST a demande", async () => {
        await request(ap)
            .post("/demandes/")
            .set('Authorization', `Bearer ${token}`)
            .send({
                "UserId": 3,
                "startingDate": "2022-10-20",
                "endingDate": "2022-10-21",
                "TypeId": 2
            })
            .expect(201)
            .then((response) => {
                expect(response.text).toEqual("Created");
            });
    }); 

    it("UPDATE demande", async () => {
        await request(ap)
            .put("/demandes/update")
            .set('Authorization', `Bearer ${token}`)
            .send({
                "id": 4,
                "StatusId": 2
            })
            .expect(200)
            .then((response) => {
                expect(response.text).toEqual("");
            });
    });

    it("Get salarie2's holidays taken is 0 days", async () => {       
        await request(ap)
            .get("/holidays/getByIdUser/3")
            .set('Authorization', `Bearer ${token}`)
            .expect(200)
            .then((response) => {
                expect(response.body.holidaysAvailable).toEqual(0);
                expect(response.body.holidaysTaken).toEqual(0);
            });
    });

}); 


describe("salarie2, demande a type 3 congés payés, and refuse without description", () => {
    it("POST a demande", async () => {
        await request(ap)
            .post("/demandes/")
            .set('Authorization', `Bearer ${token}`)
            .send({
                "UserId": 3,
                "startingDate": "2023-01-20",
                "endingDate": "2022-02-21",
                "TypeId": 3
            })
            .expect(201)
            .then((response) => {
                expect(response.text).toEqual("Created");
            });
    });

    it("UPDATE demande", async () => {
        await request(ap)
            .put("/demandes/update")
            .set('Authorization', `Bearer ${token}`)
            .send({
                "id": 5,
                "StatusId": 3
            })
            .expect(400)
            .then((response) => {
                expect(response.text).toEqual("please specify the reason of refuse");
            });
    });

});

describe("salarie2, demande id5, and refuse with a description", () => {

    it("UPDATE demande", async () => {
        await request(ap)
            .put("/demandes/update")
            .set('Authorization', `Bearer ${token}`)
            .send({
                "id": 5,
                "description": "you are not sick",
                "StatusId": 3
            })
            .expect(200)
            .then((response) => {
                expect(response.text).toEqual("");
            });
    });

    it("GET salarie2's holidays taken is 0 days", async () => {
        await request(ap)
            .get("/holidays/getByIdUser/3")
            .set('Authorization', `Bearer ${token}`)
            .expect(200)
            .then((response) => {
                expect(response.body.holidaysAvailable).toEqual(0);
                expect(response.body.holidaysTaken).toEqual(0);
            });
    });

});