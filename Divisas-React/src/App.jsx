import { useEffect, useState } from "react"

const App = () => {

  const [divisas, setDivisas] = useState([])
  const [seleccion, setSeleccion] = useState('')
  const [divisaDefinitiva, setDivisaDefinitiva] = useState(null)
  const [valorCOP, setValorCOP] = useState('')
  const [resultado, setResultado] = useState(null)

  useEffect(() => {
    consultar()
  }, [])

  const consultar = async () => {
    let url = "https://co.dolarapi.com/v1/cotizaciones"
    const resultado = await fetch(url)
    const data = await resultado.json()
    setDivisas(data)
  }

  const cambioDivisa = (idDivisa) => {
    setSeleccion(idDivisa)
    setDivisaDefinitiva(buscarDivisa(idDivisa))
  }

  const buscarDivisa = (idDivisa) => {
    let divisaEncontrada = divisas.find(d => d.moneda === idDivisa)
    return divisaEncontrada
  }

  const convertir = () => {
    if (!divisaDefinitiva || !valorCOP) return
    const conversion = valorCOP / divisaDefinitiva.ultimoCierre
    setResultado(conversion.toFixed(2))
  }

  return (
    <>
      <div className="contenedor">
        <h1>Convertir desde COP</h1>

        <input
          type="number"
          id="valor"
          placeholder="Cantidad en pesos (COP)"
          onChange={(e) => setValorCOP(e.target.value)}
        />

        <select
          id="opcionesDivisas"
          onChange={(evento) => cambioDivisa(evento.target.value)}
        >
          <option value="">Selecciona la divisa</option>
          {divisas &&
            divisas.map(divisa => (
              <option key={divisa.moneda} value={divisa.moneda}>
                {divisa.nombre}
              </option>
            ))
          }
        </select>

        <button onClick={convertir}>Convertir</button>

        {resultado && (
          <p id="resultado">
            Resultado: {resultado} {seleccion}
          </p>
        )}
      </div>
    </>
  )
}

export default App