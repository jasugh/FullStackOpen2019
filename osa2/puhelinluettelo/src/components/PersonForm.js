import React from 'react'

const PersonForm = ({addPerson, newName, handlePersonChange, newNumber, handleNumberChange}) => {
    return (
        <form
            onSubmit={addPerson}
        >
            <div>
                <div>
                    name:
                    <input
                        value={newName}
                        onChange={handlePersonChange}
                    />
                </div>
                number:
                <input
                    value={newNumber}
                    onChange={handleNumberChange}
                />
            </div>
            <div>
                <button
                    type="submit"
                >
                    add
                </button>
            </div>
        </form>
    )
};
export default PersonForm