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

## Installation and running  

### Prerequisites  

Docker  
Docker compose  


## Getting started
- Clone the repository:  
``` 
git clone https://github.com/HamidOwji/family-accounting.git
```
- Navigate to family accounting:  
```
cd family-accounting
```   

- Before the build process, .env file should be created in core directory beside manage.py and any variable needed to run the project should be introduce in that file. A sample of this file would be as follow:
```python
DEBUG=1  
SECRETE_KEY=a-secrete-key  
DJANGO_ALLOWED_HOSTS=localhost,127.0.0.1,[::1]  
SQL_ENGINE=django.db.backends.postgresql  
SQL_DATABASE=postgres  
SQL_USER=postgres  
SQL_PASSWORD=a-password-for-sql  
SQL_HOST=db  
SQL_POST=5432  
DATABASE=postgress
```

- Build and Run the Containers:  
 ```python
docker-compose --env-file ./core/.env build
```    
 ```python
 docker-compose --env-file ./core/.env up
```  



## Access the Application:  

Visit http://localhost:5173 in your browser to access the application.  
## Stop the Containers:  

Press Ctrl+C or run the following command in another terminal:  
```
docker-compose down
```  

## Contributing
We welcome contributions! Please read CONTRIBUTING.md for details on our code of conduct, and the process for submitting pull requests.

## License  
 This project is licensed under the MIT License - see the LICENSE.md file for details.    

## Acknowledgments  

- React
- Vite  
- MUI
- Django
- Django REST framework
- Docker  

  


