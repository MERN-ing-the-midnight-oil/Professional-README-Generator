const inquirer = require("inquirer");
const fs = require("fs");

const generateBadge = (license) => {
	//How can I get the result of this code, badge, to appear in generateMarkdown?
	let badge = "";
	// return `![MIT License](https://img.shields.io/badge/License-MIT-yellow.svg)`
	console.log("license is,", license);
	if (license[0] === `MIT`) {
		badge = `![MIT License](https://img.shields.io/badge/License-MIT-yellow.svg)`;
	}
	// else if (license === `asdf`) {
	//     badge = `![asdf License](https://asdf.svg)`
	// }
	// else if (license === `asdf`) {
	//     badge = `![asdf License](https://asdf.svg)`
	// }
	// else if (license === `asdf`) {
	//     badge = `![asdf License](https://asdf.svg)`
	// }
	// else if (license === `asdf`) {
	//     badge = `![asdf License](https://asdf.svg)`
	// }
	// else if (license === `asdf`) {
	//     badge = `![asdf License](https://asdf.svg)`
	// }
	return badge;
};

const generateNotice = (thelicense) => {
	let notice = "";
	if (thelicense[0] === `MIT`) {
		notice = `
    Copyright (c) 2012-2022 Scott Chacon and others

    Permission is hereby granted, free of charge, to any person obtaining
    a copy of this software and associated documentation files (the
    "Software"), to deal in the Software without restriction, including
    without limitation the rights to use, copy, modify, merge, publish,
    distribute, sublicense, and/or sell copies of the Software, and to
    permit persons to whom the Software is furnished to do so, subject to
    the following conditions:

    The above copyright notice and this permission notice shall be
    included in all copies or substantial portions of the Software.

    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
    EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
    MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
    NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
    LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
    OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
    WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
        `;
	}
	return notice;
};

// I was really hoping thtat puting  ${generateBadge(title)} after the project name  here in the generateMarkdown would inject the badge URL that generateBadge should make.
const generateMarkdown = (
	{
		projectname,
		description,
		installation,
		license,
		githubUsername,
		usage,
		screenshot,
		explain,
		contributions,
		email,
	} //we are telling generateMarkdown what parts of the return object we need
) =>
	`# ${projectname}

 ${generateBadge(license)}

## Table of Contents

[Description](#description)


[Installation](#installation)


[Usage](#usage)


[License](##license)
${generateNotice(license)}

[Contributing](#contributing)


[Tests](#tests)


[Questions](#questions)


## Description
### ${description} 

## Installation 
### ${installation}

## Usage
### ${usage}
###  Here is a screenshot: <${screenshot}> Screenshot explanation:  ${explain}

## License
### This project is licensed under the terms of the ${license} license.

## Contributing
### Here is how to contribute.  ${contributions}

## Questions?
### Find me on GitHub at : <https://github.com/${githubUsername}>
### Or contact me at ${email} if you have any further questions. 
`;

inquirer
	.prompt([
		{
			type: "input",
			message:
				"Enter your project title. This title should describe your whole project in one sentence, and explain the main purpose of the project",
			name: "projectname",
		},
		{
			type: "input",
			message:
				"Enter your project description. A good desription of the project tells what the application does, what technology you used, some of the challenges you faced, and some feature you hope to add in the future.",
			name: "description",
		},
		{
			type: "input",
			message:
				"Enter your installation instructions. If your project needs to run locally, include installation steps. Include any reqired dependencies. ",
			name: "installation",
		},
		{
			type: "input",
			message: "Give instructions and examples for use. ",
			name: "usage",
		},
		{
			type: "input",
			message:
				"You may include a screenshot to help explain usage. Where is your sreenshot? For example: ** assets/images/screenshot.png ** (hit enter to skip)",
			name: "screenshot",
		},
		{
			type: "input",
			message: "What does your screenshot demostrate? (hit enter to skip)",
			name: "explain",
		},

		{
			type: "checkbox",
			message:
				"What license are you using? This will generate a license notice in your README.",
			choices: [
				"MIT",
				"Apache License 2.0",
				"BSD Licenses",
				`The 3-Clause BSD License`,
				`General Public License version 3`,
				`Mozilla Public License 2.0`,
			],
			name: "license",
		},

		{
			type: "input",
			message: "At what email should users contact you with questions?",
			name: "email",
		},

		{
			type: "input",
			message:
				"What is your GitHub username?  A link to that GitHub profile will be added to the README.",
			name: "githubUsername",
		},
	])
	.then((response) => {
		generateBadge(response);
		const readMeContent = generateMarkdown(response); // How can I also send (response.license) to generateBadge?
		fs.writeFile("YOURREADME.md", readMeContent, (err) =>
			err
				? console.error(err)
				: console.log('Success! Your file is called "YOURREADME"')
		);
	});
