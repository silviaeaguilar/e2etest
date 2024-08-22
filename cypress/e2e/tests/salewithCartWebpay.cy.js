import {logins} from "../helpers/login.cy";
import {events} from "../cruds/events.cy";
import {setPaymentProvider} from "../helpers/setPaymentProvider.cy"

const login = new logins()
const event = new events();
const provider = new setPaymentProvider();
describe('Create and sale event with cart', function (){
    var url=''
    beforeEach(function (){
        cy.fixture('configuration').then((data) => {
            url = data.baseurl
            login.login()
        })
    })

    it('Create and sale event with cart', ()=> {
        event.new(url).then(({href, event_id}) => {
            //set payment provider
            provider.webpay(url, event_id)
            cy.visit(href)
        });

        // wait from bin/console th-cron:generate-functionsector-tickets
        cy.wait(30000)
        cy.get('.btn-comprar-evento').click()
        cy.wait(2000);
        cy.get('#first_step_cantidad').select('1')
        cy.get('#add-cart').click()
        cy.location('pathname').should('eq', '/cart/detail')
        cy.get('#btn-comprar-checkout').click()

        login.frontLogin()

        cy.location('pathname').should('eq', '/checkout')
        cy.get('#btn-webpay-wm').click()
        cy.wait(5000)
        cy.origin('https://webpay3gint.transbank.cl/webpayserver/dist/#/', () => {
            cy.get('button.payment-options__method-items-option').contains('Débito').click();
            cy.get('button.combobox-button').contains('Selecciona tu banco').click();
            cy.contains('li button span', 'TEST COMMERCE BANK').click();
            cy.get('input[formcontrolname="pan"]').type('4051 8842 3993 7763');
            cy.get('button.submit').contains('Pagar').click();
        });

        cy.origin('https://webpay3gint.transbank.cl/testcommercebank/authenticator.cgi', () => {
            cy.get('#rutClient').type('111111111')
            cy.get('#passwordClient').type('123')
            cy.get('input[type="submit"][value="Aceptar"]').click();
        })

        cy.origin('https://webpay3gint.transbank.cl/testcommercebank/authenticatorProcess.cgi', () => {
            cy.get('input[type="submit"][value="Continuar"]').click();

        })

        cy.location('pathname').should('eq', '/checkout/success')
        cy.get('.codigo-venta').invoke('attr', 'data-value').then(saleId => {
            cy.visit(url+'/admin/transactions')
            cy.get('button.modal-transaction-detail[data-id="'+saleId+'"]').should('exist');
        });
    })
})


