describe("cy.realHover", () => {
  it('adds realHover command', () => {
    expect(cy)
        .property('realHover')
        .to.be.a('function')
  })
  context('realHover tests', () => {
    context('basic-tests', () => {
      beforeEach(() => {
        cy.visit('cypress/static/realHover/basic-tests.html');
      })

      it('should trigger :hover CSS pseudo class', () => {
        cy.get('#hoverButton').should('have.css', 'background-color', 'rgb(0, 0, 255)');
        cy.get('#hoverButton')
            .realHover()
            .should('have.css', 'background-color', 'rgb(255, 0, 0)');
      });
      it('should call javascript listener events', () => {
        cy.get('#hoverButton').realHover();
        cy.get('#logging').contains('onmouseenter on #hoverButton');
        cy.get('#logging').contains('onmouseover on #hoverButton');
        cy.get('#logging').contains('onmousemove on #hoverButton');
        cy.get('#logging').contains('onmouseout on #hoverButton').should('not.exist');
        cy.get('#logging').contains('onmouseleave on #hoverButton').should('not.exist');
      });
    });
    context('complex-tests', () => {
      beforeEach(() => {
        cy.visit('cypress/static/realHover/complex-tests.html');
      })

      it('should scroll to the element and hover it', () => {
        cy.get('#scrolledButton').should('have.css', 'background-color', 'rgb(0, 0, 255)');
        cy.get('#scrolledButton')
            .realHover()
            .should('have.css', 'background-color', 'rgb(255, 0, 0)');
      });
      it('should call javascript listener on scrolled button events', () => {
        cy.get('#scrolledButton').realHover();
        cy.get('#logging').contains('onmouseenter on #scrolledButton');
        cy.get('#logging').contains('onmouseover on #scrolledButton');
        cy.get('#logging').contains('onmousemove on #scrolledButton');
        cy.get('#logging').contains('onmouseout on #scrolledButton').should('not.exist');
        cy.get('#logging').contains('onmouseleave on #scrolledButton').should('not.exist');
      });
      it('should not send javascript event to parent container since the mouse teleport', () => {
        cy.get('#scrolledButton').realHover();
        cy.get('#logging').contains('onmouseenter on #scrolledButton');
        cy.get('#logging').contains('onmouseover on #scrolledButton');
        cy.get('#logging').contains('onmousemove on #scrolledButton');
        cy.get('#logging').contains('onmouseenter on #containerScrolledButton').should('not.exist');
        cy.get('#logging').contains('onmousemove on #containerScrolledButton').should('not.exist');
        cy.get('#logging').contains('onmouseover on #containerScrolledButton').should('not.exist');
        cy.get('#logging').contains('onmouseout on #scrolledButton').should('not.exist');
        cy.get('#logging').contains('onmouseleave on #scrolledButton').should('not.exist');
      });
      it('should return fail to hover an non visible element', () => {
        cy.get('#nonVisibleButton')
            .should('have.css', 'background-color', 'rgb(0, 0, 255)');
        // Hover shouldn't have changed the css since the element cannot be hovered
        cy.get('#nonVisibleButton').realHover()
            .should('have.css', 'background-color', 'rgb(0, 0, 255)');
      });
      it('should return fail to hover an 0px element', () => {
        cy.get('#tooSmallButton')
            .should('have.css', 'background-color', 'rgb(0, 0, 255)');
        // Hover shouldn't have changed the css since the element cannot be hovered
        cy.get('#tooSmallButton').realHover()
            .should('have.css', 'background-color', 'rgb(0, 0, 255)');
      });
    });
    context('shadowdom-tests', () => {
      beforeEach(() => {
        cy.visit('cypress/static/realHover/shadowdom-tests.html');
      })

      it('should hover element trough shadowDOM', () => {
        cy.get('#hoverme', {includeShadowDom: true}).first()
            .should('have.css', 'background-color', 'rgb(0, 0, 255)');
        cy.get('#hoverme', {includeShadowDom: true}).first()
            .realHover()
            .should('have.css', 'background-color', 'rgb(255, 0, 0)');
      });
      it('should hover element recursively trough shadowDOM', () => {
        cy.get('#recursivehoverme', {includeShadowDom: true}).first()
            .should('have.css', 'background-color', 'rgb(0, 0, 255)');
        cy.get('#recursivehoverme', {includeShadowDom: true}).first()
            .realHover()
            .should('have.css', 'background-color', 'rgb(255, 0, 0)');
      })
      it('should scroll then hover element trough shadowDOM', () => {
        cy.get('#hoverme', {includeShadowDom: true}).last()
            .should('have.css', 'background-color', 'rgb(0, 0, 255)');
        cy.get('#hoverme', {includeShadowDom: true}).last()
            .realHover()
            .should('have.css', 'background-color', 'rgb(255, 0, 0)');
      });
    });
  })
});
