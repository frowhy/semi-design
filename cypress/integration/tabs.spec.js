describe('tabs', () => {
    it('activeKey', () => {
        cy.visit('http://127.0.0.1:6006/iframe.html?id=tabs--active-key&args=&viewMode=story');

        cy.get('.semi-tabs').contains('帮助').click();
        cy.get('.semi-tabs-pane-active').contains('帮助');
        cy.get('.semi-tabs').contains('关于').click();
        cy.get('.semi-tabs-pane-active').contains('关于');
    });

    it('tab list change', () => {
        cy.visit('http://127.0.0.1:6006/iframe.html?id=tabs--tab-list-change&args=&viewMode=story');
        cy.get('.semi-tabs').contains('帮助').click();
        cy.get('.semi-tabs-bar').should('have.length', 1);
    });

    it('current pane render', () => {
        cy.visit('http://127.0.0.1:6006/iframe.html?id=tabs--render-current-pane&args=&viewMode=story');
        cy.get('.semi-tabs-content').contains('文档');
        cy.get('.semi-tabs').contains('帮助').click();
        cy.get('.semi-tabs-content').contains('帮助');
        cy.get('.semi-tabs').contains('关于').click();
        cy.get('.semi-tabs-content').contains('关于');
    });

    it('collapse', () => {
        cy.visit('http://127.0.0.1:6006/iframe.html?id=tabs--collapse-tabs&args=&viewMode=story');
        cy.viewport(800, 800);
        cy.get('.semi-tabs-content').eq(0).contains('Content of card tab 0');
        cy.get('.semi-button').eq(1).trigger('mouseover');
        cy.get('.semi-dropdown').contains('Tab-6').click();
        cy.get('.semi-tabs-content').eq(0).contains('Content of card tab 6');

        // Tab-10 visible
        cy.get('.semi-button').eq(0).click({ force: true });
        cy.get('.semi-tabs-tab').contains('Tab-10').click({ force: true });
        cy.get('.semi-tabs-content').eq(0).contains('Content of card tab 10');
    });

    it('keyboard test when the tabs is horizontal', () => {
        cy.visit('http://127.0.0.1:6006/iframe.html?id=tabs--disabled-tab&args=&viewMode=story');
        cy.get('[id=semiTab2]').click();
        cy.get('[id=semiTab2]').should('be.focused');

        cy.get('[id=semiTab2]').type('{rightArrow}');
        cy.get('[id=semiTab5]').should('be.focused');

        cy.get('[id=semiTab5]').type('{home}');
        cy.get('[id=semiTab1]').should('be.focused');

        cy.get('[id=semiTab1]').type('{leftArrow}');
        cy.get('[id=semiTab5]').should('be.focused');

        cy.get('[id=semiTab5]').type('{rightArrow}');
        cy.get('[id=semiTab1]').should('be.focused');

        cy.get('[id=semiTab1]').type('{end}');
        cy.get('[id=semiTab5]').should('be.focused');

        cy.get('[id=semiTab5]').type('{enter}');
        cy.get('[id=semiTab5]').tab();
        cy.get("[id=semiTabPanel5]").should('be.focused');
    });

    it('keyboard test when the tabs is vertical', () => {
        cy.visit('http://127.0.0.1:6006/iframe.html?id=tabs--vertical-tabs&args=&viewMode=story');
        cy.get('[id=semiTab1]').click();
        cy.get('[id=semiTab1]').should('be.focused');

        cy.get('[id=semiTab1]').type('{downArrow}');
        cy.get('[id=semiTab2]').should('be.focused');

        cy.get('[id=semiTab2]').type('{upArrow}');
        cy.get('[id=semiTab1]').should('be.focused');
    });

    it('keyboard test when the tabs is closable', () => {
        cy.visit('http://127.0.0.1:6006/iframe.html?id=tabs--tab-closable&args=&viewMode=story');
        cy.get('[id=semiTab1]').click();
        cy.get('[id=semiTab1]').should('be.focused');

        cy.get('[id=semiTab1]').type('{backspace}');
        cy.get('[id=semiTab1]').should('not.exist');
    });
});