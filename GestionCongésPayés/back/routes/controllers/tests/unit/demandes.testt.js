const request = require("supertest");
const ap = "http://localhost:9090";

describe("demandes CRUD", () => {
    it("POST a demande", async () => {
        await request(ap)
            .post("/demandes/create")
            .send({
                "UserId": "345",
                "startingDate": "2022-10-20",
                "endingDate": "2022-10-21",
                "TypeId": "1"
            })
            .expect('Content-Type', /json/)
            .expect(200)
            .then((response) => {
                expect(response.body).toEqual(
                    expect.objectContaining({
                        StatusId: expect.any(Number)
                    })
                );
            });
    });

    it("GET all demandes", async () => {
        await request(ap)
            .get("/demandes/")
            .expect('Content-Type', /json/)
            .expect(200)
            .then((response) => {
                expect(response.body).toEqual(
                    expect.arrayContaining([
                        expect.objectContaining({
                            UserId: expect.any(Number)
                        })
                    ])
                );
            });
    });

    it("GET demande by id ", async () => {
        await request(ap)
            .get("/demandes/getById/" + 10)
            .expect('Content-Type', /json/)
            .expect(200)
            .then((response) => {
                expect(response.body).toEqual(
                    expect.objectContaining({
                        UserId: expect.any(Number)
                    })
                
                );
            });
    });

    it("GET demande by idUser ", async () => {
        await request(ap)
            .get("/demandes/getByIdUser/" + 1)
            .expect('Content-Type', /json/)
            .expect(200)
            .then((response) => {
                expect(response.body).toEqual(
                    expect.arrayContaining([
                        expect.objectContaining({
                            UserId: expect.any(Number)
                        })
                    ])
                );
            });
    });

    it("DELETE demande by id ", async () => {
        await request(ap)
            .delete("/demandes/deleteById/" + 199)
            .expect('Content-Type', /json/)
            .expect(200)
            .then((response) => {
                expect(response.body).toEqual(
                    expect.any(String)
                );
            });
    });

    it("UPDATE demande", async () => {
        await request(ap)
            .put("/demandes/update")
            .send({
                "id": 10,
                "startingDate": "2022-10-20T00:00:00.000Z",
                "endingDate": "2022-10-21T00:00:00.000Z",
                "description": null,
                "createdAt": "2022-09-27T14:36:54.000Z",
                "updatedAt": "2022-09-27T14:36:54.000Z",
                "TypeId": 1,
                "StatusId": 2,
                "UserId": 1
            })
            .expect('Content-Type', /json/)
            .expect(200)
            .then((response) => {
                expect(response.body).toEqual(
                    expect.objectContaining({
                        StatusId: expect.any(Number)
                    })
                    
                );
            });
    });
}); 