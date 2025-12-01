import './App.css'
import LogTable from './components/LogTable'
import { FilterForm } from './components/FilterForm'

function App() {

  return (
    <>
      {/* <div className='flex justify-center items-center' >
        <h1 className='m-10 text-6xl font-medium font-serif'>LOG ANALYZER</h1>
      </div> */}
     
      <FilterForm />
      <LogTable />
    </>
  )
}

export default App
