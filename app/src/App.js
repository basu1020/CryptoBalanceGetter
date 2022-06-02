import { useState } from 'react';
import { ethers } from 'ethers';
import LoadingBar from 'react-top-loading-bar'
import './App.css';
import contractAddresses from './data/data';

function App() {
  const [progress, setProgress] = useState(0)
  const [result, setResult] = useState("Hello, your balances will show here")
  const [contract, setContract] = useState(null)
  const [addresses, setAddresses] = useState(contractAddresses)
  const [tokenName, setTokenName] = useState("ETH")
  const [address, setAddress] = useState()

  const checkBalance = async () => {
    const addressinp = document.querySelector('#address').value
    const INFURA_ID = 'a46c4873075d48ec92fe67b184a6fbdb'
    const provider = new ethers.providers.JsonRpcProvider(`https://mainnet.infura.io/v3/${INFURA_ID}`)

    if (addressinp && tokenName !== "ETH") {
      setProgress(10)
      const ERC20_ABI = [
        "function balanceOf(address) view returns (uint)",
      ]
      const contract = new ethers.Contract(address, ERC20_ABI, provider)
      setContract(contract)
      setProgress(30)
      const res = await contract.balanceOf(addressinp)
      setProgress(100)
      setResult(`${ethers.utils.formatEther(res)} ${tokenName} Tokens`)
    }

    else if (addressinp && tokenName === "ETH") {
      setProgress(10)
      setProgress(40)
      const balance = await provider.getBalance(addressinp)
      setProgress(100)
      setResult(`${ethers.utils.formatEther(balance)} ETH`)
    }

    else {
      alert("Please give an address")
    }
  }

  function favTutorial() {
    const selectOption = document.getElementById('selectOption')
    const option = selectOption.options[selectOption.selectedIndex]
    if (option.text !== "ETH") {
      setTokenName(option.text)
      setAddress(option.value)
    }
  }

  const clearAddressInp = () => {
    const addressinp = document.querySelector('#address')
    addressinp.value = ""
    setResult("Hello, your balances will show here")
  }


  return (
    <>
      {
        <LoadingBar
          color='white'
          progress={progress}
          onLoaderFinished={() => setProgress(0)}
        />
      }

      <div className='container'>
        <h1>Crypto Balance Checker</h1>
        <div className='content'>
          <select name="" id="selectOption" onClick={favTutorial} >
            <option value="">ETH</option>
            <option value={addresses.LINK}>LINK</option>
            <option value={addresses.SHIB}>SHIB</option>
            <option value={addresses.DAI}>DAI</option>
            <option value={addresses.BNB}>BNB</option>
            <option value={addresses.MKR}>MKR</option>
            <option value={addresses.BAT}>BAT</option>
            <option value={addresses.ZIL}>ZIL</option>
            <option value={addresses.USDT}>USDT</option>
            <option value={addresses.LRC}>LRC</option>
          </select>
          <div className='center'>
            <p>{result}</p>
          </div>
          <p>Enter address below</p>
          <input form='text' id='address' />
          <button className='button' onClick={checkBalance}>Check Balance</button>
          <button className="button" onClick={clearAddressInp}>Clear</button>
        </div>
      </div>
    </>
  );
}

export default App;

