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
            login.login(url)
        })
    })

    it('Create and sale event with cart', ()=> {
        event.new(url).then(({href, event_id}) => {
            //set payment provider
            provider.decidir(url, event_id)
            cy.visit(href)
        });

        // wait from bin/console th-cron:generate-functionsector-tickets
        cy.wait(60000);
        cy.get('.btn-comprar-evento').click()
        cy.get('#first_step_cantidad').select('1')
        cy.wait(10000);
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


