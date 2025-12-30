import { useState, useRef, useEffect } from 'react'

interface Country {
  code: string
  name: string
  dial: string
  flag: string
  format: string
  maxLength: number
}

const countries: Country[] = [
  { code: 'BR', name: 'Brazil', dial: '+55', flag: '🇧🇷', format: '(##) #####-####', maxLength: 11 },
  { code: 'US', name: 'United States', dial: '+1', flag: '🇺🇸', format: '(###) ###-####', maxLength: 10 },
  { code: 'GB', name: 'United Kingdom', dial: '+44', flag: '🇬🇧', format: '#### ######', maxLength: 10 },
  { code: 'PT', name: 'Portugal', dial: '+351', flag: '🇵🇹', format: '### ### ###', maxLength: 9 },
  { code: 'ES', name: 'Spain', dial: '+34', flag: '🇪🇸', format: '### ## ## ##', maxLength: 9 },
  { code: 'FR', name: 'France', dial: '+33', flag: '🇫🇷', format: '# ## ## ## ##', maxLength: 9 },
  { code: 'IT', name: 'Italy', dial: '+39', flag: '🇮🇹', format: '### ### ####', maxLength: 10 },
  { code: 'DE', name: 'Germany', dial: '+49', flag: '🇩🇪', format: '### ########', maxLength: 11 },
  { code: 'AR', name: 'Argentina', dial: '+54', flag: '🇦🇷', format: '## ####-####', maxLength: 10 },
  { code: 'MX', name: 'Mexico', dial: '+52', flag: '🇲🇽', format: '## #### ####', maxLength: 10 },
]

interface PhoneInputProps {
  value: string
  onChange: (value: string) => void
  onKeyPress?: (e: React.KeyboardEvent) => void
  placeholder?: string
  autoFocus?: boolean
}

// Função para aplicar máscara
function applyMask(value: string, format: string): string {
  const digits = value.replace(/\D/g, '')
  let result = ''
  let digitIndex = 0

  for (let i = 0; i < format.length && digitIndex < digits.length; i++) {
    if (format[i] === '#') {
      result += digits[digitIndex]
      digitIndex++
    } else {
      result += format[i]
    }
  }

  return result
}

export function PhoneInput({ value, onChange, onKeyPress, placeholder, autoFocus }: PhoneInputProps) {
  const [selectedCountry, setSelectedCountry] = useState(countries[0]) // Brasil como padrão
  const [isOpen, setIsOpen] = useState(false)
  const [phoneNumber, setPhoneNumber] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const dropdownRef = useRef<HTMLDivElement>(null)
  const searchInputRef = useRef<HTMLInputElement>(null)
  const phoneInputRef = useRef<HTMLInputElement>(null)

  // Extrair número do valor completo
  useEffect(() => {
    if (value) {
      const parts = value.match(/^(\+\d+)\s(.*)$/)
      if (parts) {
        const countryCode = parts[1]
        const country = countries.find(c => c.dial === countryCode)
        if (country) {
          setSelectedCountry(country)
          setPhoneNumber(parts[2] || '')
        }
      }
    }
  }, [])

  // Atualizar valor completo quando mudar país ou número
  useEffect(() => {
    const fullNumber = phoneNumber ? `${selectedCountry.dial} ${phoneNumber}` : ''
    onChange(fullNumber)
  }, [selectedCountry, phoneNumber, onChange])

  // Fechar dropdown ao clicar fora
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
        setSearchTerm('')
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  // Focar na busca quando abrir
  useEffect(() => {
    if (isOpen && searchInputRef.current) {
      searchInputRef.current.focus()
    }
  }, [isOpen])

  const filteredCountries = countries.filter(country =>
    country.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    country.dial.includes(searchTerm)
  )

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value.replace(/\D/g, '')
    
    // Limitar ao número máximo de dígitos
    if (rawValue.length <= selectedCountry.maxLength) {
      const masked = applyMask(rawValue, selectedCountry.format)
      setPhoneNumber(masked)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // Permitir backspace, delete, tab, escape, enter
    if ([8, 9, 27, 13, 46].indexOf(e.keyCode) !== -1 ||
        // Permitir Ctrl+A, Ctrl+C, Ctrl+V, Ctrl+X
        (e.keyCode === 65 && e.ctrlKey === true) ||
        (e.keyCode === 67 && e.ctrlKey === true) ||
        (e.keyCode === 86 && e.ctrlKey === true) ||
        (e.keyCode === 88 && e.ctrlKey === true)) {
      return
    }
    // Bloquear se não for número
    if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
      e.preventDefault()
    }
  }

  return (
    <div className="w-full">
      <div className="flex gap-2">
        {/* Seletor de país */}
        <div className="relative" ref={dropdownRef}>
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center gap-2 px-3 py-3 bg-gray-50 border-b-2 border-gray-300 hover:border-[#FF6600] focus:border-[#FF6600] focus:outline-none transition-colors"
          >
            <span className="text-xl">{selectedCountry.flag}</span>
            <span className="text-gray-600">{selectedCountry.dial}</span>
            <svg 
              className={`w-4 h-4 text-gray-500 transition-transform ${isOpen ? 'rotate-180' : ''}`}
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {/* Dropdown */}
          {isOpen && (
            <div className="absolute z-10 mt-1 w-72 bg-white rounded-lg shadow-lg border border-gray-200 max-h-96 overflow-hidden">
              {/* Campo de busca */}
              <div className="p-3 border-b border-gray-100">
                <input
                  ref={searchInputRef}
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Buscar país..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-[#FF6600]"
                />
              </div>

              {/* Lista de países */}
              <div className="overflow-y-auto max-h-72">
                {filteredCountries.map((country) => (
                  <button
                    key={country.code}
                    type="button"
                    onClick={() => {
                      setSelectedCountry(country)
                      setIsOpen(false)
                      setSearchTerm('')
                      setPhoneNumber('') // Limpar número ao trocar país
                      // Focar no input de telefone
                      setTimeout(() => phoneInputRef.current?.focus(), 100)
                    }}
                    className={`w-full text-left px-4 py-3 hover:bg-gray-50 flex items-center gap-3 ${
                      selectedCountry.code === country.code ? 'bg-orange-50' : ''
                    }`}
                  >
                    <span className="text-2xl">{country.flag}</span>
                    <div>
                      <p className="font-medium text-gray-900">{country.name}</p>
                      <p className="text-sm text-gray-500">{country.dial}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Input de telefone */}
        <div className="flex-1">
          <input
            ref={phoneInputRef}
            type="tel"
            value={phoneNumber}
            onChange={handlePhoneChange}
            onKeyDown={handleKeyDown}
            onKeyPress={onKeyPress}
            placeholder={placeholder || selectedCountry.format.replace(/#/g, '0')}
            className="w-full px-4 py-3 text-lg border-b-2 border-gray-300 focus:border-[#FF6600] focus:outline-none transition-colors"
            autoFocus={autoFocus}
          />
        </div>
      </div>
    </div>
  )
}