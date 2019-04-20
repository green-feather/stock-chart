# Green Feather Stock Chart

> This projects creates the infrastructure for storing 5 price graphs for 10 million unique stock options

## CRUD API
  
  ### 1. Make a new stock option/company - (CREATE)

  ```sh
  POST - /stocks/:stockID
  ```

  ### 2. Show info about all stocks & one stock - (READ)

  ```sh
  GET - /stocks
  ```
  
  ```sh
  GET - /stocks/:stockID
  ```

  ### 3. Update info about one stock - (UPDATE)
  
  ```sh
  PATCH - /stocks/:stockID
  ```
  
  ### 3. Delete info about one stock - (DELETE)
  
  ```sh
  DELETE - /stocks/:stockID
  ```

## Related Projects

  - https://github.com/teamName/repo
  - https://github.com/teamName/repo
  - https://github.com/teamName/repo
  - https://github.com/teamName/repo

## Table of Contents

1. [Usage](#Usage)
1. [Requirements](#requirements)
1. [Development](#development)

## Usage

> Some usage instructions

## Requirements

An `nvmrc` file is included if using [nvm](https://github.com/creationix/nvm).

- Node 6.13.0
- etc

## Development

### Installing Dependencies

From within the root directory:

```sh
npm install -g webpack
npm install
```

