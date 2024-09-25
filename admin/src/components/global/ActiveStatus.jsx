const Status = ({ active, size }) => {
    return <div className={`rounded-full block ${active ?' bg-green-500': 'bg-red-500'} w-${size} h-${size} my-1`}/>
}

export default Status
