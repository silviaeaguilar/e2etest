export class setPaymentProvider {
    decidir(url, event){
        cy.visit(url + '/admin/payment-provider')
        cy.get('.nav > :nth-child(4) > a').click()
        cy.get('#search-event').type(event)
        cy.get('#tab_event > [style="float: right;margin-top: 10px;"] > .btn').click()
        cy.get('#container-event > .form-control').select(event)
        cy.get('#pp-select').select('decidir')
    }
}