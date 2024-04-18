# Tax Calculator WebApp

Welcome to the Tax Calculator WebApp! This project showcases my ability to create a fully functional tax calculator using vanilla JavaScript and CSS. With just a few simple inputs, users can estimate their tax liability with ease.

## Features

- **Effortless Tax Estimation:** Input your Gross Annual Income, Extra Income, Age Group, and Total Deductions to get instant tax estimates.
- **Dynamic Tags:** Dynamic tags and data from our array object ensure a user-friendly experience.
- **Solely Vanilla JS and CSS:** Crafted solely with vanilla JS and CSS, showcasing rapid development and problem-solving abilities.

## Getting Started

Clone the repository:

bash
...

git clone https://github.com/devbarot22/TaxCalculator.git

...



Navigate to the project directory:

bash
...

cd TaxCalculator

...

Open the index.html file:
You can do this by double-clicking on the index.html file in your file explorer or by opening it through your code editor.

View the application in your web browser:
Once you've opened the index.html file, your default web browser should launch automatically and display the web application. If it doesn't, you can manually open your web browser and enter the following URL in the address bar:

ruby

'''

start index.html //for window users

open index.html //for mac users

...

Interact with the application:
You should now be able to interact with the web application in your browser. Explore its features and functionalities as desired.

## Usage

1. Enter your Gross Annual Income.
2. Input any Extra Income.
3. Select your Age Group from the provided options.
4. Provide Total Applicable Deductions.
5. Click 'Submit' to get your tax estimate.

## Technologies Used

- HTML
- CSS
- JavaScript

## Test Case 

Enter gross income below 8 lakhs (e.g., 6 lakhs).
Click "Calculate Tax".
Expected: No tax applied, overall income reflects gross income.
Tax Calculation (Age < 40):

Enter gross income exceeding 8 lakhs (e.g., 10 lakhs).
Select age group "< 40".
Click "Calculate Tax".
Expected: 30% tax applied on income exceeding 8 lakh limit, overall income reflects deduction after tax.
Empty Age Selection:cause error and will ask for select age

Enter valid values in other fields.
Leave age group selection empty.
Click "Calculate Tax".
Expected: Error icon appears on select input asking 'please select age group'.

Have Added M and K representing Million and Thousand for user Convenience.


## Contributing

Contributions are welcome! Feel free to fork this repository and submit pull requests to suggest improvements or fix any issues.

## License

This project is licensed under the [MIT License](LICENSE).

Enjoy using the Tax Calculator WebApp and feel free to reach out with any questions or feedback!
