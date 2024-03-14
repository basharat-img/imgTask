import React, { useEffect, useState } from 'react'
import { RxCross1 } from "react-icons/rx";
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { IoGameControllerSharp } from 'react-icons/io5';
import { seletedMaterialsReducer,superTotalAction } from "../src/redux/calculateSlice"

const MaterialCard = () => {


    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { seletedMaterials,superTotal } = useSelector((state) => state.calcualteReducer)
    const [selectedItem, setSelectedItem] = useState(seletedMaterials)
    const [allTotal, setAllTotal] = useState(0)
    const material = [
        {
            name: "Cement",
            quantity: 1
        },
        {
            name: "Steel",
            quantity: 1
        },
        {
            name: "Sand",
            quantity: 1
        },
    ]

    useEffect(() => {
        setAllTotal(superTotal)
    }, [superTotal])

    const checkboxHandler = (e) => {
        if (e.target.checked) {
            setSelectedItem((prev) => [...prev,
            { taxTotal: (5 * (e.target.value == "Cement" ? 330 : e.target.value == "Steel" ? 65.55 : 100)) / 100 + (e.target.value == "Cement" ? 330 : e.target.value == "Steel" ? 65.55 : 100), tax: 5, name: e.target.value, quantity: 1, price: e.target.value == "Cement" ? 330 : e.target.value == "Steel" ? 65.55 : 100, total: 1 * (e.target.value == "Cement" ? 330 : e.target.value == "Steel" ? 65.55 : 100) }
            ]);
            setAllTotal((prev) => prev + (5 * (e.target.value == "Cement" ? 330 : e.target.value == "Steel" ? 65.55 : 100)) / 100 + (e.target.value == "Cement" ? 330 : e.target.value == "Steel" ? 65.55 : 100))
        }
        else {
            const filterList = selectedItem.filter((item) => {
                return item.name !== e.target.value
            })
            setSelectedItem(filterList)
            const findItem = selectedItem.find((item) => {
                return item.name === e.target.value
            })
            setAllTotal((prev) => prev - findItem.taxTotal)

        }
    }

    const selectItemRemoveHandler = (matrial) => {
        const filterList = selectedItem.filter((item) => {
            return item.name !== matrial
        })
        setSelectedItem(filterList)
        const findItem = selectedItem.find((item) => {
            return item.name === matrial
        })
        setAllTotal(prev => prev - findItem.taxTotal)
    }

    const selectedMaterialHandler = () => {
        if (selectedItem.length == 0) return
        dispatch(seletedMaterialsReducer(selectedItem))
        dispatch(superTotalAction(allTotal))
        navigate("/cart")
    }

    return (
        <div className='MaterialCard-container' >

            <div className='material-card'>
                <div className="selected-item">
                    <p>selected({selectedItem.length}/{material.length})</p>
                    <div className='items' >
                        {
                            selectedItem.map((item) => {
                                return (
                                    <span key={item.name} className="item"><span>{item.name}</span> <span><RxCross1 onClick={() => selectItemRemoveHandler(item.name)} /></span></span>
                                )
                            })
                        }
                    </div>
                </div>
                {
                    material.map((item) => {
                        const find = selectedItem.find((check) => {
                            return item.name == check.name
                        })
                        return (
                            <div key={item.name} className='item-select' >
                                <span className='item-name'>{item.name}</span>
                                <input onChange={checkboxHandler} className='chekcbox' type="checkbox" value={item.name} checked={find ? true : false} />
                            </div>
                        )
                    })
                }
                <button onClick={selectedMaterialHandler} className='next-btn'>Next</button>
            </div>
        </div>
    )
}

export default MaterialCard