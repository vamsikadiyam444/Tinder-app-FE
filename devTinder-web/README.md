# DevTinder

- Create a Vite + React Application
- Remove Unecessary code and create a Hello
- Install Tailwind CSS
- Install Daisy UI
- Add Navbar Component to App.jsx
- Create Navbar.jsx seperate Component file.
- Install react router dom
- Create BrowserRouter > Routes > Route=/Body > RouteChildren
- Create an Outlet in your Body Component
- Create a Footer

- Create a login page
- Install axios
- CORS - Install cors in backend - add middleware to with configurations: origin, crendentials:true
- Whenever you're making API calls so pass axios => {withCrendentials:true}
- Install react-redux + @reactjs/toolkit => https://redux-toolkit.js.org/tutorials/quick-start
- ConfigureStore => Provider => createSlice => add reducer to store
- Add redux devtools in chrome
- Login and see if your data is coming properly in the store
- Navbar should update as soon as user logs in
- Add useNavgate in login.jsx with path "/feed"
- Refactor your code to add constants file + create a components folder

- You should not be access other routes without login
- If token is not present or active, redirect to login page
- Logout Feature Added
- Create UserCard & feedSlice & feed
- Edit Profile Feature
- Show Toast Message on save of profile
- New Page - See all my Connections
- New Page - See all my Requests
- Feature - Accept/Reject Connection Request
- Intersted/Ignore the user card from the feed
- Created Sign Up and E2E test

Body
Navbar
Route=/feed => Feed
Route=/login => Login
Route=/profile => Profile

# Deployment

- Sign up in aws
- Launch Instances
- Do powershell or cmd
  - chmod 400 <secret>.pem
  - ssh -i .\devTinder-secret.pem ubuntu@ec2-54-90-119-40.compute-1.amazonaws.com
  - Install node.js version (in which nodejs version your running - check with node -v)
  - git clone both frontend and backend
  - go to frontend (cd/devTinder-web/devTinder-web)
    - npm install => dependencies install
    - npm run build
    - sudo apt update
    - sudo apt install nginx
    - sudo systemctl start nginx
    - sudo systemctl enable nginx
    - copy code from dist(build files) to /var/www/html/
    - sudo scp -r dist/\* /var/www/html/
    - Enable port :80 of your instances
