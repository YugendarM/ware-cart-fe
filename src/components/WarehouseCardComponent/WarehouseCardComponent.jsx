import React from 'react'
import { FaRegPlusSquare } from 'react-icons/fa'
import { FiEdit } from 'react-icons/fi'
import { MdDeleteOutline } from 'react-icons/md'
import { Link, useNavigate } from 'react-router-dom'
import { Tooltip } from 'antd';


const WarehouseCardComponent = ({warehouse, index}) => {

  const navigate = useNavigate()

  const handleEditWarehouse = (event) => {
    event.preventDefault()
    navigate(`/admin/warehouse/${warehouse._id}`, { state: { openEditModal: true } })
  }

  const handleDeleteWarehouse = (event) => {
    event.preventDefault()
    navigate(`/admin/warehouse/${warehouse._id}`, { state: { openDeleteModal: true } })
  }

  const handleAddProductsToWarehouse = (event) => {
    event.preventDefault()
    navigate(`/admin/warehouse/${warehouse._id}`, { state: { openAddModal: true } })
  }

  return (
    <React.Fragment>
      <Link to={`/admin/warehouse/${warehouse._id}`} className={`w-full flex items-center border-b border-b-gray-200 transition hover:shadow-custom-heavy hover:transform hover:-translate-y-1 ${index%2 === 0? "bg-gray-50" : "bg-white"}`}>
        <p className='text-ellipsis overflow-hidden w-1/5 px-4 py-4 text-sm text-gray-700'>{warehouse.warehouseName}</p>
        <p className='text-ellipsis overflow-hidden w-1/5 px-4 py-4 text-sm text-gray-700'>{warehouse.location.city + "," + warehouse.location.state + "," + warehouse.location.country}</p>
        <p className='text-ellipsis overflow-hidden w-1/5 px-4 py-4 text-sm text-gray-700 '>{warehouse.capacity} Products</p>
        <p className='text-ellipsis overflow-hidden w-1/5 px-4 py-4 text-sm text-gray-700'>{warehouse.inStock} Products</p>
        <div className='flex items-center gap-5'>
          <Tooltip title="Edit Warehouse">
            <button onClick={(event) => handleEditWarehouse(event)}>
              <FiEdit className='text-gray-500 hover:text-gray-800 transition bg-gray-100 rounded p-2 hover:shadow-custom-medium h-8 w-8'/>
            </button>
          </Tooltip>
          <Tooltip title="Delete Warehouse">
            <button onClick={(event) => handleDeleteWarehouse(event)}>
                <MdDeleteOutline className='text-gray-500 hover:text-gray-800 transition bg-gray-100 rounded p-2 hover:shadow-custom-medium h-8 w-8'/>
            </button>
          </Tooltip>
          <Tooltip title="Add products to warehouse">
            <button onClick={(event) => handleAddProductsToWarehouse(event)}>
                <FaRegPlusSquare className='text-gray-500 hover:text-gray-800 transition bg-gray-100 rounded p-2 hover:shadow-custom-medium h-8 w-8'/> 
            </button>
          </Tooltip> 
        </div>
      </Link>
    </React.Fragment>
    
  )
}

export default WarehouseCardComponent
