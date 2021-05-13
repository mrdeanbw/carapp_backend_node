// jest.mock("nodemailer");

// const nodemailer = require("nodemailer"); //doesn't work with import. idk why
// nodemailer.createTransport.mockReturnValue({ "sendMail": sendMailMock });

// beforeEach(() => {
//     sendMailMock.mockClear();
//     nodemailer.createTransport.mockClear();
// });

// describe("", () => {
// ...

//     test("", async () => {
//         // 1 - 200 status code; 2 - check email was sent
//         expect.assertions(2);

//         const response = await request(router)
//             .post("/login")
//             // global variable
//             .send({ "email": email })
//             .set("Accept", "application/json")
//             .expect("Content-Type", /json/);

//         // should complete successfully
//         expect(response.status).toBe(200);

//         // TODO not sure how to express the expect statement here
//         expect(sendMailMock).toHaveBeenCalled();
//     });
// });