import React, { useEffect } from 'react'
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import HomePage from './pages/HomePage/HomePage'
import {routes} from './routes'
import axios from 'axios'
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'


function App() {

  // useEffect(() => {
  //   fetchAPI()
  // }, [])

//   console.log(process.env.REACT_APP_API_KEY)
//   const fetchAPI = async() => {
//     const res = await axios.get('http://localhost:3001/api/product/get_all')
//     return res.data;
// }

// const query = useQuery({ queryKey: ['app_product'], queryFn: fetchAPI })
// console.log(query.data)

  return (
    <div>
      <Router>
        <Routes>
          {routes.map((route) => {
            const Page = route.page 
            return(
              <Route key={route.path} path={route.path} element={<Page/>} />
            )
          })}
          <Route path="/" element={<HomePage/>} />
        </Routes>
      </Router>
    </div>
  )
}

export default App