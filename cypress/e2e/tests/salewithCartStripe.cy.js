import {logins} from "../helpers/login.cy";
import {events} from "../cruds/events.cy";
import {setPaymentProvider} from "../helpers/setPaymentProvider.cy";
import 'cypress-iframe';

const login = new logins()
const event = new events();
const provider = new setPaymentProvider();
describe('Create and sale event with cart', function (){
    var url=''
    beforeEach(function (){
        cy.fixture('configuration').then((data) => {
            url = 'bue-dev.tickethoy.org'; //data.baseurl
            // url = 'bue.tickethoy.test'; //data.baseurl
            login.login(url)
        })
    })

    it('Create and sale event with cart', ()=> {
        event.new(url).then(({href, event_id}) => {
            //set payment provider
            provider.stripe(url, event_id)
            cy.visit(href)
        });
        // cy.visit('http://bue.tickethoy.test/automovilismo/evento-test-jhnijdqdt');
        // wait from bin/console th-cron:generate-functionsector-tickets
        cy.wait(50000)
        cy.get('.btn-comprar-evento').click();
        cy.wait(10000);
        cy.get('#first_step_cantidad').select('1')
        cy.get('#add-cart').click()
        cy.location('pathname').should('eq', '/cart/detail')
        cy.get('#btn-comprar-checkout').click()

        login.frontLogin()

        cy.location('pathname').should('eq', '/checkout')
        cy.wait(60000);

        // cy.frameLoaded('.__PrivateStripeElement > iframe');

        // Accede al contenido del iframe y escribe en el input de número de tarjeta
        // cy.iframe('.__PrivateStripeElement > iframe')
        //     .find('#Field-numberInput') // Selecciona el campo de entrada dentro del iframe
        //     .type('4242 4242 4242 4242'); // Escribe el número de tarjeta


        // cy.get('.__PrivateStripeElement > iframe').then($iframe => {
        //     // Accede al contenido del iframe usando el método 'contents()'
        //     const iframeContent = $iframe.contents().find('#Field-numberInput');
        //
        //     // Usar Cypress para interactuar con el contenido del iframe
        //     cy.wrap(iframeContent).type('4242 4242 4242 4242');
        // });

        // cy.get('#Field-numberInput').type('4000000320000021');
        // cy.get('#Field-expiryInput').type('1234');
        // cy.get('#Field-cvcInput').type('123')
        // cy.get('#btn-stripe-submit').click()
        //
        //
        // cy.location('pathname').should('eq', '/checkout/success')
        // cy.get('.codigo-venta').invoke('attr', 'data-value').then(saleId => {
        //     cy.visit(url+'/admin/transactions')
        //     cy.get('button.modal-transaction-detail[data-id="'+saleId+'"]').should('exist');
        // });
    })
})


