# PUCMM Advanced Web Programming Test Suite.
Test suite to validate homework requirements.

1. Clone the repository:

        git clone https://github.com/rroa/WA_tests

2. Checkout the development branch
    
        git checkout development

3. Restore the dependencies

        npm install or yarn install
        
4. Run all the tests for all the PORTS defined

        ./tester.sh

5. Run the tests for a single target

        HOST={hostname} PORT={port} make test
        
6. Run the a single test for a single target

        PORT={port} HOST={hostname} node_modules/mocha/bin/mocha {path/to/test/file} --ui tdd
