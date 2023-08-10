# family-accounting

Family Accounting is a comprehensive tool designed to manage family finances in an easy, collaborative way.
Leveraging React for the frontend with MUI (Material-UI) for an attractive, user-friendly appearance, and Django for a
robust backend using Django REST Framework, it aims to simplify household accounting.

## Features  
Family Management: Add and manage family members and set individual permissions.  
Expense Tracking: Keep track of all your family's expenses, including bills, groceries, and personal expenses.  
Income Tracking: Monitor income from different sources.  
Budgeting: Set budgeting goals and track progress.  
Reports and Analysis: Analyze spending habits with easy-to-understand graphs and reports.

## Installation  
### Prerequisites 

Node.js (v14.0 or higher)  
Python (v3.7 or higher)  
PostgreSQL (v12.0 or higher)  

## Frontend

- Clone the repository:  
git clone https://github.com/hamidowji/family-accounting.git
- Navigate to the frontend directory:  
  cd family-accounting/frontend
- Install the dependencies:  
  npm install
- Start the development server:  
  npm start

## Backend  
- Navigate to the backend directory:  
cd family-accounting/backend  
- Create a virtual environment and activate it:  
    python3 -m venv venv    
  source venv/bin/activate
- Install the required packages:
  pip install -r requirements.txt
- Apply the migrations:  
  python manage.py migrate
- Start the development server:
  python manage.py runserver

## Usage
Visit http://localhost:3000 in your browser to access the application.

## Contributing
We welcome contributions! Please read CONTRIBUTING.md for details on our code of conduct, and the process for submitting pull requests.

## License  
 This project is licensed under the MIT License - see the LICENSE.md file for details.    

## Acknowledgments  

    - React
    - MUI
    - Django
    - Django REST framework

  


