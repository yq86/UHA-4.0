const request = require("supertest");
const ap = "http://localhost:9090";

describe("holidays crud", () => {
    it("GET holiday by userid", async () => {
        
        await request(ap)
            .get("/holidays/getById/" + 1)
            .expect('Content-Type', /json/)
            .expect(200)
            .then((response) => {
                expect(response.body).toEqual(
                    expect.objectContaining({
                        holidaysAvailable: expect.any(Number)
                    })
                );
            });
    });

    it("GET holiday by userid which do not exist", async () => {
        await request(ap)
            .get("/holidays/getById/" + 1700)
            .expect('Content-Type', /json/)
            .expect(200)
            .then((response) => {
                expect(response.body).toEqual('holiday does not exist');
            });
            
    });

    it("should return a list of objects", async () => {
    
        await request(ap)
            .get("/holidays/")
            .expect('Content-Type', /json/)
            .expect(200)
            .then((response) => {
                expect(response.body).toEqual(
                    expect.arrayContaining([
                        expect.objectContaining({
                            User: expect.objectContaining({
                                userName: expect.any(String)
                            })
                        })
                    ])
                );
            });
        
    });


}); 