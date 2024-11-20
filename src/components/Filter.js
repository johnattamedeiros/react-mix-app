import React, { useState, useRef } from 'react';
import './../styles/gc.css'
import './../styles/Filter.css'

const Filter = ({ options, selectedValue, onChange }) => {
    const [isOpen, setIsOpen] = useState(false); 
    const dropdownRef = useRef(null);

    // Fechar dropdown ao clicar fora
    const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setIsOpen(false);
        }
    };

    React.useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className="filter-container" ref={dropdownRef}>
            {/* Campo Selecionado */}
            <div
                className="filter-selected"
                onClick={() => setIsOpen((prev) => !prev)}
            >
                {selectedValue ? (
                    <>
                        <img src={`https://static.gamersclub.com.br/players/avatar/${selectedValue.id}/${selectedValue.id}_full.jpg`} alt={`${selectedValue.nick}'s photo`} className="filter-photo" />
                        <div className='filter-option'>
                            <span data-v-551cb209="" class={`gcf-new-badge-level gcf-new-badge-level-${selectedValue.level}`}>
                                <span data-v-551cb209="" class="gcf-badge-level-value">{selectedValue.level}
                                </span></span>

                        </div>
                        <div>
                            <span className="filter-name">{selectedValue.nick}</span>
                        </div>
                    </>
                ) : (
                    <span>Todos os Players</span>
                )}
                <span className="dropdown-arrow">▼</span>
            </div>

            {/* Dropdown com Opções */}
            {isOpen && (
                <div className="filter-dropdown">
                    <div
                        className="filter-option"
                        onClick={() => {
                            onChange('');
                            setIsOpen(false);
                        }}
                    >
                        Todos os Players
                    </div>
                    {options.map((option) => (
                        <div
                            key={option.name}
                            className="filter-option"
                            onClick={() => {
                                onChange(option);
                                setIsOpen(false);
                            }}
                        >
                            <img src={`https://static.gamersclub.com.br/players/avatar/${option.id}/${option.id}_full.jpg`} alt={`${option.nick}'s photo`} className="filter-photo" />
                            <div className='filter-option'>
                                <span data-v-551cb209="" class={`gcf-new-badge-level gcf-new-badge-level-${option.level}`}>
                                    <span data-v-551cb209="" class="gcf-badge-level-value">{option.level}
                                    </span></span>

                            </div>
                            <div>
                                <span className="filter-name">{option.nick}</span>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Filter;
