import GetData from "../components/dashboard/GetData"

const DashboardPage = () => {
  return (
    <div className='min-h-screen w-full'>
        <h2 className="text-6xl py-10 lg:py-20 text-center">Dashboard</h2>
        <GetData />
    </div>
  )
}

export default DashboardPage
