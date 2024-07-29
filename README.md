# Vault Hephaestus

<img src='src/images/icon.png' />

Vault Hephaestus is a credential manager that securely manages and stores your account credentials, such as usernames, emails, and passwords. It also generates strong passwords for users and allows exporting credentials to a CSV file for backup purposes.

> Built using Electron, React, Tailwind, and TypeScript.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Features

- **Secure Credential Storage**: Securely store account credentials and credential history.
- **Password Generation**: Generate strong passwords according to the user's needs.
- **Data Export**: Export all saved data to a CSV file for backups.

## Installation

To install and set up Vault Hephaestus, follow these steps:

1. Clone the repository:
   `bash git clone https://github.com/speedyibbi/vault-hephaestus.git`
   `cd vault-hephaestus`

2. Install dependencies: `npm install`

3. Start the development environment: `npm start`

4. Package the application: `npm package`

5. Create distributable: `npm make`

## Usage

Vault Hephaestus helps users store and manage the credentials used in various accounts. Users do not need to remember specific details; they can simply look up the credentials used for a particular account. The application also maintains a history of the credentials, such as previously used passwords.

- **Secure and Isolated**: All user data is stored on the machine where the app runs and is not backed up or stored on any web server or database. The data exists only on the user's machine as securely encrypted data.
- **Credential History**: Keep track of the history of credentials used for each account.
- **Password Generation**: Create strong, user-defined passwords.

## Contributing

We welcome contributions to Vault Hephaestus! If you have any suggestions or improvements, please follow these steps:

1. Fork the repository.
2. Create a new branch: `git checkout -b my-feature-branch`.
3. Make your changes and commit them: `git commit -m 'Add my feature'`.
4. Push to the branch: `git push origin my-feature-branch`.
5. Create a pull request.

Please ensure your code follows the project's coding standards and includes relevant tests.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
