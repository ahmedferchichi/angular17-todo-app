describe('Todo Application', () => {
  beforeEach(() => {
    // Visit the application before each test
    cy.visit('http://localhost:4200');
  });

  it('should display the todo application', () => {
    // Check if the main elements are visible
    cy.get('h1').should('contain', 'Todo App');
    cy.get('input[type="text"]').should('exist');
  });

  it('should add a new task', () => {
    const newTask = 'New Test Task';
    
    // Type a new task and submit
    cy.get('input[type="text"]').type(newTask);
    cy.get('button[type="submit"]').click();

    // Verify the task was added
    cy.get('.task-list').should('contain', newTask);
  });

  it('should mark a task as completed', () => {
    const taskText = 'Task to complete';

    // Add a new task
    cy.get('input[type="text"]').type(taskText);
    cy.get('button[type="submit"]').click();

    // Find the task and mark it as completed
    cy.contains('.task-item', taskText)
      .find('input[type="checkbox"]')
      .click();

    // Verify the task is marked as completed
    cy.contains('.task-item', taskText)
      .should('have.class', 'completed');
  });

  it('should delete a task', () => {
    const taskText = 'Task to delete';

    // Add a new task
    cy.get('input[type="text"]').type(taskText);
    cy.get('button[type="submit"]').click();

    // Delete the task
    cy.contains('.task-item', taskText)
      .find('.delete-button')
      .click();

    // Verify the task is removed
    cy.contains('.task-item', taskText)
      .should('not.exist');
  });

  it('should handle empty input', () => {
    // Try to submit empty input
    cy.get('button[type="submit"]').click();

    // Verify that no empty task is added
    cy.get('.task-list').should('not.contain', '');
  });

  it('should persist tasks after page reload', () => {
    const taskText = 'Persistent task';

    // Add a new task
    cy.get('input[type="text"]').type(taskText);
    cy.get('button[type="submit"]').click();

    // Reload the page
    cy.reload();

    // Verify the task still exists
    cy.get('.task-list').should('contain', taskText);
  });
});
