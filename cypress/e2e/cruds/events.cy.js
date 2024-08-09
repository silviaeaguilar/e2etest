export class events {
    new(url) {
        return new Promise((resolve) => {
            cy.visit(url + '/admin/events/')
            cy.wait(10000)
            cy.get('#event-new').should('have.class', 'btn')
            cy.get('#event-new').click()

            const max = 10000;
            const random = Math.random() * max;
            cy.get('#tickethoy_adminbundle_events_nombre').type('Event Test Cypress '+ random)
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
            cy.get('#text').type(formatToday + '22 Hs')
            cy.get('#add-event-show-submit').click()
            cy.get('#show-id').select(formatToday + '22 Hs')
            cy.get(':nth-child(1) > :nth-child(2) > #Entradas').type('100')
            cy.get(':nth-child(1) > :nth-child(3) > #Importe').type('1000')
            cy.get('#form-prices > .col-md-12 > .btn').click()
            cy.get('#publish-button').click()
            cy.get('#modal-btn-yes-publish').click()
            cy.get('#tab-seo-element').click()

            cy.get('#event_url > a').then($a => {
                const href = $a.attr('href');
                resolve(href);
            });
        });
    }
}
