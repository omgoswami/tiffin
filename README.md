# tiffin
## Dev Setup:  
&nbsp;&nbsp;&nbsp;&nbsp;1. create your virtual environment: ```python -m venv .venv``` OR ```python3 -m venv .venv```  
&nbsp;&nbsp;&nbsp;&nbsp;2. activate virtual environment:  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;a. macOS/Linux: ```source venv/bin/activate```  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;b. Windows: ```venv\Scripts\activate```  
&nbsp;&nbsp;&nbsp;&nbsp;3. install necessary packages: ```pip install -r requirements.txt```  
&nbsp;&nbsp;&nbsp;&nbsp;4. check what packages have been installed with ```pip list``` or ```pip freeze```  
&nbsp;&nbsp;&nbsp;&nbsp;5. run ```npm install``` in frontend directory

## Running the Application:
&nbsp;&nbsp;&nbsp;&nbsp;1. Ensure virtual environment is running  
&nbsp;&nbsp;&nbsp;&nbsp;2. ```python app.py``` in top level directory  
&nbsp;&nbsp;&nbsp;&nbsp;3. cd into frontend  
&nbsp;&nbsp;&nbsp;&nbsp;4. run ```npm start```  
&nbsp;&nbsp;&nbsp;&nbsp;5. This should open localhost:3000 in browser, where app can be used  

## Dev Overview  
### Working Features  
&nbsp;&nbsp;&nbsp;&nbsp;1. user login, with type of user saved in session, and logout  
&nbsp;&nbsp;&nbsp;&nbsp;2. create user  
&nbsp;&nbsp;&nbsp;&nbsp;3. post listing (seller can add item to database)  
&nbsp;&nbsp;&nbsp;&nbsp;4. seller's items currently displayed on seller profile  
### In-progress Features  
&nbsp;&nbsp;&nbsp;&nbsp;1. stateful UX -- buyers and sellers should only see what is relevant to them  
&nbsp;&nbsp;&nbsp;&nbsp;2. make sure that only items marked "available" are displayed (tweak SQL query in /sellers/items)  
### Next-up  
&nbsp;&nbsp;&nbsp;&nbsp;1. allow buyers to view sellers and place orders  
<<<<<<< HEAD

hello testing
=======
>>>>>>> 3cc8970035c1529585873d4798e6d035d5f9dd8c
