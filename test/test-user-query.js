const request = require("supertest");
const app = require ('../src/app.js')
const assert = require("assert");

describe("User Query", ()=>{
    describe("Query test on User",()=> {
        it("Users-seqQueryOptions", async () =>{
            let usersQuery = {
                "query":`
                query Users($seqQueryOptions: Object) {
                  Users(seqQueryOptions: $seqQueryOptions) {
                    id
                    full_names
                    created_at
                    organization_id
                    updated_at
                    status
                  }
                }
                `,"variables":{
                    "seqQueryOptions": {
                        "where":{
                            "organization_id":2
                        }
                    }
                }};
            const {body} = await request(app).post('/graphql')
                .set('content-type', 'application/json')
                .send(usersQuery)
                .expect(200);
            assert.ok(!('errors' in body));
        })

        it("User-userId", async () =>{
            let userQuery = {
                "query":`
                query User($userId: Int) {
                  User(id: $userId) {
                    full_names
                    organization_id
                    created_at
                    id
                    updated_at
                    status
                  }
                }
                `,"variables":{
                    "userId": 1
                }
            };
            const {body} = await request(app).post('/graphql')
                .set('content-type', 'application/json')
                .send(userQuery)
                .expect(200);
            assert.ok(!('errors' in body));
        })
    })
})
