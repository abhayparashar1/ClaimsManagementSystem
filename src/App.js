
import React from 'react'
import Login from './Login'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Signup from './Signup'
import Home from './Home'
import Policy from './Policy'
import ClaimForm from './ClaimForm'
import Claims from './ClaimList'






function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Policy />}></Route>
      <Route path='/signup' element={<Signup />}></Route>
      {/* <Route path='/home' element={<Home />}></Route> */}
      <Route path="/file-claim/:policyId" element={<ClaimForm />} />
      <Route path='/claim-list' element={<Claims />}></Route>

    </Routes>


    </BrowserRouter>
      
    
    
  );
}

export default App;
