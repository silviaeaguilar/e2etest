export class logins{
    login(){
        cy.fixture('configuration').then((data) => {
            cy.visit(data.baseurl+'/admin/login')
            cy.get('#username').type(data.userdashboard)
            cy.get('#_password').type(data.passworddashboard)
            cy.get('#admin-login-button').click()
            cy.location('pathname').should('eq', '/admin/dashboard')
        })
    }

    frontLogin(){
        cy.fixture('configuration').then((data) => {
            cy.get('#email').type(data.userfront)
            cy.get('#submit-login-form').click()
            cy.get('#password2').type(data.passwordfront)
            cy.get('#btn-login-ajax').click()

        })
    }
}
