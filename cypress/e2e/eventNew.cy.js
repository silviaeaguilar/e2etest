import {DashboardLogin} from "./dashboardLogin.cy";

const login = new DashboardLogin()

//Describe = conjunto de tests
describe('Dashboard Steps', function (){
    var url=''
    beforeEach(function (){
        cy.fixture('configuration').then((data) => {
            url = data.baseurl
            login.login()
        })
    })

    it('Create Event', ()=> {
        cy.visit(url+'/admin/events/')
        cy.wait(10000)
        cy.get('#event-new').should('have.class','btn')
        cy.get('#event-new').click()
        cy.get('#tickethoy_adminbundle_events_nombre').type('Event Test Cypress')
        cy.get('#tickethoy_adminbundle_events_categoria').select('169')
        cy.get('#tickethoy_adminbundle_events_place').select('312')
        cy.wait(6000)
        cy.get('#form-event > :nth-child(6) > .btn').click()

        const today = new Date();
        const year = today.getFullYear();
        const month = (today.getMonth() + 1).toString().padStart(2, '0');
        const day = today.getDate().toString().padStart(2, '0');

        const formatToday = `${day}${month}${year}`;

        cy.get('#from-date').type(formatToday)
        cy.get('#hour').type('22')
        cy.get('#add-event-show-submit').click()
        cy.get('#show-id').select('Jueves 8 de Agosto 22:00 hs.')
        cy.get(':nth-child(1) > :nth-child(2) > #Entradas').type('100')
        cy.get(':nth-child(1) > :nth-child(3) > #Importe').type('1000')
        cy.get('#form-prices > .col-md-12 > .btn').click()
        cy.get('#publish-button').click()
        cy.get('#modal-btn-yes-publish').click()
        cy.get('#tab-seo-element').click()

        //Front with cart
        cy.get('#event_url > a').then($a => {
            const href = $a.attr('href');
            cy.visit(href);
        });
        cy.wait(60000)
        cy.get('.btn-comprar-evento').click()
        cy.get('#first_step_cantidad').select('1')
        cy.get('#add-cart').click()
        cy.location('pathname').should('eq', '/cart/detail')
        cy.get('#btn-comprar-checkout').click()

        login.frontLogin()

        cy.location('pathname').should('eq', '/checkout')
        cy.get('#decidir2-submit').click()
        cy.location('pathname').should('eq', '/checkout/success')
        cy.get('.codigo-venta').invoke('attr', 'data-value').then(saleId => {
            cy.visit(url+'/admin/transactions')
            cy.get('button.modal-transaction-detail[data-id="'+saleId+'"]').should('exist');
        });
    })
})


