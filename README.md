# async-process-poc

Proof of concept to test how to work with async and batch processing

## What I want to implement

- [ ] create a async process
  - [ ] must be idempotent
  - [ ] has multiple handles to do the processing
  - [ ] if one handle fails, the other handles must be able to continue the process
  - [ ] if a handle fails multiple times that handle should be pause for a while
  - [ ] some handles only can be executed some times per minute

## How to run

> [!IMPORTANT]
> This project uses nodejs, docker and docker-compose to run
> You should have this tools installed in your machine

1. Create a file .env based on .env.example

2. Install dependencies

    ```bash
    npm install
    ```

3. Setup de Infrastructure

    ```bash
    docker-compose up
    ```

4. Run the application

    ```bash
    npm run dev
    ```

> [!NOTE]
> You should turn off the application before turn off the infrastructure at end
> do this running `docker-compose down`
