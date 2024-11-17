import { RouterProvider } from 'react-router-dom'
import { Slide, ToastContainer } from 'react-toastify'
import route from './routes/Route'
import 'react-toastify/dist/ReactToastify.css'
import 'react-tooltip/dist/react-tooltip.css'
import 'react-quill-new/dist/quill.snow.css'
import 'react-loading-skeleton/dist/skeleton.css'
const App = () => {
  return (
    <div>
      <ToastContainer
        position='bottom-right'
        autoClose={1500}
        transition={Slide}
        closeOnClick
      />
      <RouterProvider router={route} />
    </div>
  )
}

export default App
