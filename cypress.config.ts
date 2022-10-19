import { defineConfig } from 'cypress';

export default defineConfig({
    viewportHeight: 667,
    viewportWidth: 375,
    component: {
        setupNodeEvents(on, config) {},
        specPattern: 'src/**/*.test.{js,ts,jsx,tsx}',
        devServer: {
            framework: 'create-react-app',
            bundler: 'webpack',
        },
    },
    e2e: {
        setupNodeEvents(on, config) {
            // implement node event listeners here
            require('@cypress/code-coverage/task')(on, config);
            return config;
        },
        specPattern: 'src/**/*.cy.{js,ts,jsx,tsx}',
        baseUrl: 'http://localhost:3001/',
    },
});

export {};
