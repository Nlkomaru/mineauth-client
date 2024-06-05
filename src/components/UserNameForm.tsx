
import React from 'react';
import {atom, useAtom, useAtomValue} from 'jotai';
import {css} from "../../styled-system/css";

export const userNameAtom = atom("");
const imageAtom = atom((get) => `https://minotar.net/helm/${get(userNameAtom)}/32.png`);


function UserNameForm() {
    const [id, setId] = useAtom(userNameAtom);
    const imageUrl = useAtomValue(imageAtom);


    const handleInputChange = (event: { target: { value: React.SetStateAction<string>}}) => {
        setId(event.target.value);
    };

    return (
        <form>
            <div className={css({
                position: "relative",
                padding: "10px",
                borderRadius: "5px",
                width: "400px",
            })}>
                <img src={imageUrl} className={css({
                    position: "absolute",
                    width: "32px",
                    bottom: "1rem",
                    right: "20px",
                })} alt="Player head"/>
                <input
                    type="text"
                    id="playerName"
                    name="PlayerName"
                    placeholder="username"
                    className={css({
                        padding: "10px",
                        borderRadius: "5px",
                        border: "1px solid #ccc",
                        width: "100%",
                    })}
                    value={id}
                    onChange={handleInputChange}
                />
            </div>
        </form>
    );
}

export default UserNameForm;