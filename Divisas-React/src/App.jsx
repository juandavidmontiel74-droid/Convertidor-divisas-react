import { useEffect, useState } from "react"

const App = () => {

  const [divisas, setDivisas] = useState([])
  const [seleccion, setSeleccion] = useState('')
  const [divisaDefinitiva, setDivisaDefinitiva] = useState(null)
  const [valorCOP, setValorCOP] = useState('')
  const [resultado, setResultado] = useState(null)
  const [error, setError] = useState('')

  useEffect(() => {
    consultar()
  }, [])

  const consultar = async () => {
    const url = "https://co.dolarapi.com/v1/cotizaciones"
    const res = await fetch(url)
    const data = await res.json()
    setDivisas(data)
  }

  const cambioDivisa = (idDivisa) => {
    setSeleccion(idDivisa)
    setDivisaDefinitiva(buscarDivisa(idDivisa))
    setError('')
  }

  const buscarDivisa = (idDivisa) => {
    return divisas.find(d => d.moneda === idDivisa)
  }

  const convertir = () => {

    if (!valorCOP) {
      setError("Ingresa un valor en COP")
      return
    }

    if (valorCOP <= 0) {
      setError("El valor debe ser mayor a 0")
      return
    }

    if (!divisaDefinitiva) {
      setError("Selecciona una divisa")
      return
    }

    setError('')
    const conversion = valorCOP / divisaDefinitiva.ultimoCierre
    setResultado(conversion.toFixed(2))
  }

  return (
    <div className="contenedor">
      <h1>Convertir desde COP</h1>

      <input
        type="number"
        placeholder="Cantidad en pesos (COP)"
        value={valorCOP}
        min="0"
        onKeyDown={(e) => {
          if (e.key === '-' || e.key === 'e') {


          
            e.preventDefault()
          }
        }}
        onChange={(e) => {
          setValorCOP(e.target.value)
          setError('')
        }}
      />

      <select onChange={(e) => cambioDivisa(e.target.value)}>
        <option value="">Selecciona la divisa</option>
        {divisas.map(divisa => (
          <option key={divisa.moneda} value={divisa.moneda}>
            {divisa.nombre}
          </option>
        ))}
      </select>

      <button onClick={convertir}>Convertir</button>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {resultado && !error && (
        <p>
          Resultado: {resultado} {seleccion}
        </p>
      )}
    </div>
  )
}

export default App