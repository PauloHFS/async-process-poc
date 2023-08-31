# idempotency-poc

Proof of concept to test how to work with idempotency

## What I want to implement

- [] create a async process
  - [] must be idempotent
  - [] has multiple handles to do the processing
  - [] if one handle fails, the other handles must be able to continue the process
  - [] if a handle fails multiple times that handle should be pause for a while
  - [] some handles only can be executed some times per minute
