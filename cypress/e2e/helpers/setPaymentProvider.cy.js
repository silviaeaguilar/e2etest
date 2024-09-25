export class setPaymentProvider {
    decidir(url, id){
        cy.visit(url + '/admin/payment-provider')
        cy.get('.nav > :nth-child(4) > a').click()
        // cy.get('#search-event').type(event)
        cy.get('#tab_event > [style="float: right;margin-top: 10px;"] > .btn').click()
        cy.get(`option[value="${id}"]`).then($option => {
            if ($option.length) {
                cy.wrap($option).parent().select(id);
            }
        });

        cy.get('#pp-select').select('decidir')
        cy.get('[name="pp[decidir_env]"]').type('dev')
        cy.get('[name="pp[decidir_public_key]"]').type('96e7f0d36a0648fb9a8dcb50ac06d260')
        cy.get('[name="pp[decidir_secret_key]"]').type('1b19bb47507c4a259ca22c12f78e881f')
        cy.get('[name="pp[decidir_site_parent]"]').type('00190117')
        cy.get('.checkbox-group > [value="1"]').check()
        cy.get('#add-pp > [style="display: inline-block"]').click()
    }

    webpay(url, id){
        cy.visit(url + '/admin/payment-provider')
        cy.get('.nav > :nth-child(4) > a').click()
        cy.get('#tab_event > [style="float: right;margin-top: 10px;"] > .btn').click()
        cy.get(`option[value="${id}"]`).then($option => {
            if ($option.length) {
                cy.wrap($option).parent().select(id);
            }
        });

        cy.get('#pp-select').select('webpay')
        cy.get('[name="pp[webpay_env]"]').type('dev')
        cy.get('[name="pp[webpay_mall_code]"]').type('597032494552')
        cy.get('[name="pp[webpay_store_tkt]"]').type('597055555536')
        cy.get('[name="pp[webpay_store_service_charge]"]').type('597032494552')
        cy.get('.checkbox-group > [value="1"]').check()
        cy.get('#add-pp > [style="display: inline-block"]').click()
    }

    redsys(url, id){
        cy.visit(url + '/admin/payment-provider')
        cy.get('.nav > :nth-child(4) > a').click()
        cy.get('#tab_event > [style="float: right;margin-top: 10px;"] > .btn').click()
        cy.get(`option[value="${id}"]`).then($option => {
            if ($option.length) {
                cy.wrap($option).parent().select(id);
            }
        });

        cy.get('#pp-select').select('redsys')
        cy.get('[name="pp[redsys_env]"]').type('dev')
        cy.get('[name="pp[redsys_fuc]"]').type('349509471')
        cy.get('[name="pp[redsys_currency]"]').type('978')
        cy.get('[name="pp[redsys_terminal]"]').type('1')
        cy.get('[name="pp[redsys_version]"]').type('HMAC_SHA256_V1')
        cy.get('[name="pp[redsys_signature]"]').type('sq7HjrUOBfKmC576ILgskD5srU870gJ7')
        cy.get('.checkbox-group > [value="1"]').check()
        cy.get('#add-pp > [style="display: inline-block"]').click()
    }

    stripe(url, id){
        cy.visit(url + '/admin/payment-provider')
        cy.get('.nav > :nth-child(4) > a').click()
        cy.get('#tab_event > [style="float: right;margin-top: 10px;"] > .btn').click()
        cy.get(`option[value="${id}"]`).then($option => {
            if ($option.length) {
                cy.wrap($option).parent().select(id);
            }
        });

        cy.get('#pp-select').select('stripe')
        cy.get('[name="pp[stripe_env]"]').type('dev')
        cy.get('[name="pp[stripe_public_key]"]').type('pk_test_51PidtGRwak0wZyPnr995GgXZA5WX8pr1xDUDM1FXruj2tmEGzECury8DIUXSZAFlmBX2pBPUXANpkFf5SfG83xPW00KqLhUA34')
        cy.get('[name="pp[stripe_secret_key]"]').type('sk_test_51PidtGRwak0wZyPnqLpp5KvnA8KiGdn2YZpu126DbHgjtBsxtgmoFJ2JF8lotocBbD0yDVlYqy70zz6wZNYJOFy8007khW8zgB')
        cy.get('[name="pp[stripe_secret_webhook]"]').type('whsec_Xig6jQsdgYScENssffQOM4Tp0K1vS0su')
        cy.get('.checkbox-group > [value="1"]').check()
        cy.get('#add-pp > [style="display: inline-block"]').click()
    }
}