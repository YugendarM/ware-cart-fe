import React, { useEffect, useState } from 'react'
import { Button, Modal } from 'antd'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const ProductDeleteModal = ({isDeleteModalOpen, handleDeleteCancel, product}) => {

    const [isModalOpen, setIsModalOpen] = useState(isDeleteModalOpen)

    const navigate = useNavigate()

    const handleDeleteConform = async() => {
        try{
            const response = await axios.delete(
              `product/delete/${product._id}`,
              {
                withCredentials: true
              }
            )
      
            if(response.status === 200){
              toast.success("Product deleted successfully")
              setIsModalOpen(false)
              navigate("/admin/products")
            }
            
          }
          catch (error) {
            if (error.response) {
              if (error.response.status === 404) {
                toast.error("Product does not exists");
              } else if (error.response.status === 500) {
                toast.error("An error occurred while deleting the product");
              } else {
                toast.error(`An error occurred: ${error.response.status}`);
              }
            } else if (error.request) {
              toast.error("No response from server. Please try again.");
            } else {
              toast.error("ccc An unexpected error occurred. Please try again.");
            }
          }
    }

    useEffect(() => {
        if(isDeleteModalOpen){
            setIsModalOpen(true)
        }
        else{
            setIsModalOpen(false)
        }
    }, [isDeleteModalOpen])

  return (
    <div>
      <Modal 
        title="Are you sure?" 
        open={isModalOpen} 
        onCancel={handleDeleteCancel}
        footer={[]}
        
      >
        <p>Do you really want to delete the {product.productName}?</p>
        <div className='flex justify-end gap-4 py-5'>
            <Button htmlType="button" onClick={handleDeleteCancel}>
              Cancel
            </Button>
            <Button color="danger" variant="solid" onClick={() => handleDeleteConform()}>
              Delete
            </Button>

        </div>
      </Modal>
    </div>
  )
}

export default ProductDeleteModal
