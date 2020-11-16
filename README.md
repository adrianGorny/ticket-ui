# TicketUi - "Train Ticket Machine" code challenge

* This project simulates the basic user interface of a train ticket machine.
* In the project, I relay on redux pattern, all the business logic is inside effects.
* That's the reason there are tests only for effects and reducers. 
* I use the services only to make request to a specific endpoint.
* For this code challenge, I added mock connection error logic to the restapi service.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. 

## Build

Run `ng build` to build the project. 

## Running unit tests

Run `ng test` to execute the unit tests via Jest.

## Docker
Docker image: https://hub.docker.com/repository/docker/templar13/ticketui
`docker pull templar13/ticketui:latest`
