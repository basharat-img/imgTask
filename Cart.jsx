import React, { useEffect, useRef, useState } from 'react'
import { MdDelete } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";
import { FaEquals } from "react-icons/fa";
import { IoMdArrowDropdown } from "react-icons/io";
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { removeFromCart, quantityChange, taxChange } from "./src/redux/calculateSlice";
import Dropdown from 'react-bootstrap/Dropdown';

const Cart = () => {

    const taxList = [
        5, 12, 18
    ]
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { seletedMaterials,superTotal } = useSelector((state) => state.calcualteReducer)

    const handleInputChange = (e, name) => {
        let inputValue = e.target.value;
        inputValue = event.target.value.replace(/[^0-9]/g, '');
        dispatch(quantityChange({ name, inputValue }))

    };

    const removeFromCartHandler = (name) => {
        dispatch(removeFromCart(name))
    }

    const handleTaxChange = (name,tax) => {

        dispatch(taxChange({name,tax}))
    }
    useEffect(() => {
        seletedMaterials.length == 0 ? navigate("/") : null
    }, [seletedMaterials])
    
    return (
        <div className="cart-container">
            <div className="cart">
                <div onClick={() => navigate("/")} className='add-material' >
                    <button >
                        + Add Meterial
                    </button>
                </div>
                {
                    seletedMaterials.map((item) => {
                        return (
                            <div key={item.name} className="cart-item">
                                <div className="row-1">
                                    <span>{item.name}</span>
                                    <span className='delete-icon'><MdDelete onClick={() => removeFromCartHandler(item.name)} /></span>
                                </div>
                                <div className="row-2">
                                    <div className="input">
                                        <input value={item.quantity} onChange={(e) => handleInputChange(e, item.name)} type="text" placeholder='Quantity in bags' />
                                    </div>
                                    <span><RxCross2 /></span>
                                    <div className='unit-price'> {item.price} <span>₹</span></div>
                                    <span><FaEquals /></span>
                                    <div className='total-price' >{Number(item.total).toFixed(2)} <span>₹</span> </div>
                                </div>
                                <div className="row-3">
                                    <p>Add tax</p>
                                    <Dropdown>
                                        <Dropdown.Toggle className='select-tax' id="dropdown-basic">
                                            {item.tax ? `${item.tax}%` : "Select Tax"}
                                        </Dropdown.Toggle>

                                        <Dropdown.Menu>

                                            {
                                                taxList.map((tax) => {
                                                    return (
                                                        <Dropdown.Item onClick={() => handleTaxChange(item.name, tax)} key={tax} >{tax}%</Dropdown.Item>
                                                    )
                                                })
                                            }

                                        </Dropdown.Menu>
                                    </Dropdown>
                                    <div className="all-total">
                                        {Number(item.taxTotal).toFixed(2)} ₹
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
                <div className='cart-total'>
                    <span className='all-total' >Total</span>
                    <span className='all-total-amount' >{Number(superTotal).toFixed(2)} ₹ </span>
                </div>
            </div>

        </div>
    )
}

export default Cart