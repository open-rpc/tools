# Node Version Management with NVM

This project utilizes [nvm](https://github.com/nvm-sh/nvm) (Node Version Manager) to manage Node.js versions efficiently. Follow the instructions below to ensure you're using the correct Node.js version.

## Prerequisites

Make sure you have `nvm` installed. You can follow the installation instructions on the [nvm GitHub page](https://github.com/nvm-sh/nvm#installing-and-updating).

## Usage

### Setting the Node.js Version

To use the correct Node.js version for this project, navigate to the root of the repository and run:

```sh
nvm use
```

This command will switch to the version specified in the project's `.nvmrc` file.

### Installing the Required Node.js Version

If the required Node.js version is not installed, you can easily install it with the following command:

```sh
nvm install
```

This will install the version specified in the `.nvmrc` file.

## Summary

By using `nvm`, you can ensure that your development environment matches the project's requirements, leading to smoother development and fewer compatibility issues.