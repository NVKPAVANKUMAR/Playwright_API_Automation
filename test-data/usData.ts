const { faker } = require('@faker-js/faker');


const userData = ({
    create: {
        names: faker.internet.userName(),
        jobs: faker.name.jobTitle(),
    },
    update: {
        uNames: faker.internet.userName(),
        uJobs: faker.name.jobTitle(),
    },
    patch: {
        pNames: faker.internet.userName(),
    },
    register:{
        regMail: "eve.holt@reqres.in",
        regPassword: "pistol",
    },
    register_unsuccessful: {
        regMail: faker.internet.email(),
        regPassword: faker.internet.password(),
    },
});
export default userData;