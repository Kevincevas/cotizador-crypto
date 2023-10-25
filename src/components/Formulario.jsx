import React, { useEffect, useState } from 'react'
import styled from '@emotion/styled'
import { useSelectMonedas } from '../hooks/useSelectMonedas'
import { monedas } from '../data/monedas'
import { Error } from './Error'

//styled component
const InputSubmit = styled.input`
    background-color: #9497FF;
    border: none;
    width: 100%;
    padding: 10px;
    color: #fff;
    font-weight: 700;
    text-transform: uppercase;
    font-size: 20px;
    border-radius: 10px;
    transition: background-color .3s ease;
    margin-top: 30px;
    &:hover {
        background-color: #7A7DFE;
        cursor: pointer;
    }
`

export const Formulario = ({setMonedas}) => {

    const [ cryptos, setCryptos ] = useState([])
    const [ error, setError ] = useState(false)

    const [ moneda, SelectMonedas ] = useSelectMonedas('Elije tu Moneda', monedas)
    const [ monedaCrypto, SelectMonedasCryptos ] = useSelectMonedas('Elije tu Cryptomoneda', cryptos)
    
    useEffect(() => {
        const consultarAPI = async() => {
            const url = 'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD'
            const respuesta = await fetch(url)
            const resultado = await respuesta.json()

            const arrayCryptos = resultado.Data.map( crypto => {

                const objeto = {
                    id: crypto.CoinInfo.Name,
                    nombre: crypto.CoinInfo.FullName,
                }

                return objeto
            })
            setCryptos(arrayCryptos)
        }
        consultarAPI()
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault()
        
        if ([moneda, monedaCrypto].includes('')) {
            setError(true)
            return
        }

        setError(false)
        setMonedas({
            moneda,
            monedaCrypto
        })
    }

    return (
        <>
            {error && <Error>Todos lo campos son obligatorios</Error>}
            <form action="" onSubmit={handleSubmit}>
                <SelectMonedas />

                <SelectMonedasCryptos />

                <InputSubmit 
                    type="submit" 
                    value='Cotizar' 
                />

            </form>
        </>
    )
}
