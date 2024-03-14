import React, { useEffect, useState } from 'react'
import { MdArrowDropDown } from "react-icons/md";
import { IoCaretBack } from "react-icons/io5";

const Card = () => {
    const [showCurrency, setShowCurrency] = useState(false)
    const [showCrypto, setShowCrypto] = useState(false)
    const [showOtherScreen, setShowOtherScreen] = useState(false)
    const [selectCurrency, setSelectCurrency] = useState("USD")
    const [selectCrypto, setSelectCrypto] = useState("USDT")
    const [numericInput, setNumericInput] = useState('');
    const [showAmmout, setShowAmmout] = useState(0)

    const handleInputChange = (event) => {


        let inputValue = event.target.value;

        inputValue = event.target.value.replace(/[^0-9]/g, '');

        // Ensure that there is only one decimal point

        setNumericInput(inputValue);
    };





    const currencyList = [
        {
            shortName: "USD",
            currencyName: "United States Dollar"
        },
        {
            shortName: "EUR",
            currencyName: "Euro"
        },
        {
            shortName: "JPY",
            currencyName: "Japanese Yen"
        },
    ];

    const cryptoList = [
        {
            shortName: "USDT",
            fullName: "United States Department of the Treasury"
        },
        {
            shortName: "BTC",
            fullName: "Bitcoin"
        },
        {
            shortName: "XRP",
            fullName: "Ripple"
        },
        {
            shortName: "ADA",
            fullName: "Cardano"
        },

    ];

    const showCurrencyHandler = () => {
        setShowCurrency(true)
        setShowCrypto(false)
        setShowOtherScreen(true)
    }

    const showCryptoHandler = () => {
        setShowCrypto(true)
        setShowCurrency(false)
        setShowOtherScreen(true)
    }
    const backHandler = () => {
        setShowCrypto(false)
        setShowCrypto(false)
        setShowOtherScreen(false)
    }
    const selectCurrencyHandler = (currency) => {
        setSelectCurrency(currency)
        setShowOtherScreen(false)
    }
    const seletCryptoHandler = (crypto) => {
        setSelectCrypto(crypto)
        setShowOtherScreen(false)

    }

    const calculation = () => {
        let total = 0

        switch (selectCurrency) {
            case "USD":
                if (selectCrypto === "USDT") {
                    total = Number(numericInput) * 1
                    setShowAmmout(total)
                    break;
                }
                if (selectCrypto === "XRP") {
                    total = Number(numericInput) * 1.44
                    setShowAmmout(total)
                    break;
                }
                if (selectCrypto === "ADA") {
                    total = Number(numericInput) * 0.74300
                    setShowAmmout(total)
                    break;
                }
                if (selectCrypto === "BTC") {
                    total = Number(numericInput) * 0.000014
                    setShowAmmout(total)
                    break;
                }

            case "EUR":
                if (selectCrypto === "USDT") {
                    total = Number(numericInput) * 1.09
                    setShowAmmout(total)
                    break;
                }
                if (selectCrypto === "XRP") {
                    total = Number(numericInput) * 1.58
                    setShowAmmout(total)
                    break;
                }
                if (selectCrypto === "ADA") {
                    total = Number(numericInput) * 1.47
                    setShowAmmout(total)
                    break;
                }
                if (selectCrypto === "BTC") {
                    total = Number(numericInput) * 0.000015
                    setShowAmmout(total)
                    break;
                }
                case "JPY":
                    if (selectCrypto === "USDT") {
                        total = Number(numericInput) * 0.0068
                        setShowAmmout(total)
                        break;
                    }
                    if (selectCrypto === "XRP") {
                        total = Number(numericInput) * 0.0099
                        setShowAmmout(total)
                        break;
                    }
                    if (selectCrypto === "ADA") {
                        total = Number(numericInput) * 0.0091
                        setShowAmmout(total)
                        break;
                    }
                    if (selectCrypto === "BTC") {
                        total = Number(numericInput) * 0.000000094608836
                        setShowAmmout(total)
                        break;
                    }

            default:
                break;
        }
    }

    useEffect(() => {
        calculation()
    }, [numericInput, selectCrypto, selectCurrency])

    return (
        <div className="card-container">
            <div className="card">

                {
                    showOtherScreen ?
                        <div className="currency-contaier">
                            <div className='currency-heading' >
                                <span className='back-icon-span' onClick={backHandler} ><IoCaretBack /></span>
                                <span >Currecy</span>
                            </div>
                            {
                                showCurrency ?

                                    currencyList.map((item) => {
                                        return (
                                            <div onClick={() => selectCurrencyHandler(item.shortName)} key={item.shortName} className="currency">
                                                <span className='short-currency-name' >{item.shortName}</span>
                                                <span className='currency-name' >{item.currencyName}</span>
                                            </div>
                                        )
                                    })
                                    :
                                    cryptoList.map((item) => {
                                        return (
                                            <div onClick={() => seletCryptoHandler(item.shortName)} key={item.shortName} className="currency">
                                                <span className='short-currency-name' >{item.shortName}</span>
                                                <span className='currency-name' >{item.fullName}</span>
                                            </div>
                                        )
                                    })
                            }
                        </div>
                        : <>
                            <div className="buttons">
                                <button className='buy'>Buy</button>
                                <button className='sell'>Sell</button>
                            </div>
                            <div className="pay-box">

                                <div className="input-box">
                                    <input value={numericInput} onChange={handleInputChange} className='pay-input' placeholder='Pay' type="text" />
                                </div>
                                <div onClick={showCurrencyHandler} className="select-btn">
                                    <p>{selectCurrency}</p>
                                    <MdArrowDropDown />
                                </div>
                            </div>
                            <div className="receive-box">
                                <div>
                                    <span className='receive'>Receive</span>
                                    <p className='receive-amount'>{showAmmout.toFixed(2)}</p>
                                </div>
                                <div onClick={showCryptoHandler} className="select-btn">
                                    <p>{selectCrypto}</p>
                                    <MdArrowDropDown />
                                </div>
                            </div>
                        </>
                }
            </div>
        </div>
    )
}

export default Card