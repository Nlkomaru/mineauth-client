import React, { useState, useEffect } from 'react';

function UserNameForm() {
    let [id, setId] = useState(''); // state for input value
    const [imageUrl, setImageUrl] = useState(''); // state for image URL

    // Update image URL whenever 'id' changes
    useEffect(() => {
        if (!id) id = 'Notch'; // default to Steve if no username is provided
        setImageUrl(`https://minotar.net/helm/${id}/32.png`);
    }, [id]);

    const handleInputChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
        setId(event.target.value);
    };

    return (
        <form className="w-full max-w-xs space-y-6 rounded bg-white p-8 shadow-md">
            <input
                type="text"
                id="username"
                name="username"
                placeholder="username"
                className="w-full bg-gray-100 text-gray-900 rounded-lg px-4 py-2"
                value={id}
                onChange={handleInputChange}
            />
            <img src={imageUrl} alt="Player head" />
        </form>
    );
}

export default UserNameForm;