import { test, expect } from '@playwright/test'
import userData from '../../test-data/usData'


test.describe.parallel("API Testing", () => {

    test("@smoke,API Test - For GET Single User", async ({ request }) => {
        const response = await request.get(`${process.env.URL}/users/2`)
        const responseBody = JSON.parse(await response.text())

        expect(response.status()).toBe(200)
        expect(responseBody.data.id).toBe(2)
        expect(responseBody.data.first_name).toBe('Janet')
        expect(responseBody.data.last_name).toBe('Weaver')
        expect(responseBody.data.email).toBeTruthy()
        console.log(responseBody)
    })

    test("@Regression, API Test - For GET List Of Users", async({ request }) =>{
        const response = await request.get(`${process.env.URL}/users?page=2`)
        const responseBody = JSON.parse(await response.text())

        expect(response.status()).toBe(200)
        expect(responseBody.page).toBe(2)
        expect(responseBody.data[0].first_name).toBe('Michael')
        expect(responseBody.data[0].last_name).toBe('Lawson')
        expect(responseBody.data[0].email).toBeTruthy()
        console.log(responseBody)
    })

    test(" API Test - For SINGLE USER NOT FOUND", async({ request }) =>{
        const response = await request.get(`${process.env.URL}/users/23`)
        const responseBody = JSON.parse(await response.text())

        expect(response.status()).toBe(404)
        console.log(responseBody)
    })

    test("POST Request - Create New User", async ({ request }) => {
        const response = await request.post(`${process.env.URL}/user`, {
            data: {
                name: userData.create.names,
                job: userData.create.jobs,
            }
        })
        const responseBody = JSON.parse(await response.text())
        expect(response.status()).toBe(201)
        expect(responseBody.name).toBe(userData.create.names)
        expect(responseBody.job).toBe(userData.create.jobs)
        expect(responseBody.id).toBeTruthy()
        expect(responseBody.createdAt).toBeTruthy()
        console.log(responseBody)
        console.log('Response Status:', response.status(), 'is OK')
    })

    test("PUT Request - Update User Info", async ({ request }) => {
        const response = await request.put(`${process.env.URL}/user/2`, {
            data: {
                name: userData.update.uNames,
                job: userData.update.uJobs,
            }
        })
        const responseBody = JSON.parse(await response.text())
        expect(response.status()).toBe(200)
        expect(responseBody.name).toBe(userData.update.uNames)
        expect(responseBody.job).toBe(userData.update.uJobs)
        expect(responseBody.updatedAt).toBeTruthy()
        console.log(responseBody)
        console.log('Response Status:', response.status(), 'is OK')
    })

    test("PATCH Request - Update Single User Info Field", async ({ request }) => {
        const response = await request.patch(`${process.env.URL}/user/2`, {
            data: {
                name: userData.patch.pNames,
            }
        })
        const responseBody = JSON.parse(await response.text())
        expect(response.status()).toBe(200)
        expect(responseBody.name).toBe(userData.patch.pNames)
        expect(responseBody.updatedAt).toBeTruthy()
        console.log(responseBody)
        console.log('Response Status:', response.status(), 'is OK')
    })

    test("POST Request - Register", async ({ request }) => {
        const response = await request.post(`${process.env.URL}/register`, {
            data: {
                email: userData.register.regMail,
                password: userData.register.regPassword,
            }
        })
        const responseBody = JSON.parse(await response.text())
        expect(response.status()).toBe(200)
        expect(responseBody.id).toBeTruthy()
        expect(responseBody.token).toBeTruthy()
        console.log(responseBody)
        console.log('Response Status:', response.status(), 'is OK')
    })

    test("POST Request - Register Unsuccessful", async ({ request }) => {
        const response = await request.post(`${process.env.URL}/register`, {
            data: {
                email: userData.register_unsuccessful.regMail
            }
        })
        const responseBody = JSON.parse(await response.text())
        expect(response.status()).toBe(400)
        expect(responseBody.token).toBeFalsy()
        console.log(responseBody)
        console.log('Response Status:', response.status(), 'is OK')
    })

    test("POST Request - Login", async ({ request }) => {
        const response = await request.post(`${process.env.URL}/login`, {
            data: {
                email: userData.register.regMail,
                password: 'cityslicka',
            }
        })
        const responseBody = JSON.parse(await response.text())
        expect(response.status()).toBe(200)
        expect(responseBody.token).toBeTruthy()
        console.log(responseBody)
        console.log('Response Status:', response.status(), 'is OK')
    })

    test("DELETE Request - To Delete User", async ({request}) =>{
        const response = await request.delete(`{process.env.URL}/users/2`)
        expect(response.status()).toBe(404)
        console.log('Response Status:', response.status(), 'Not Found')
    })
})