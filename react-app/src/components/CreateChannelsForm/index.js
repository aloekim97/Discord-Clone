import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import './index.css';
import { createChannel } from "../../store/channel";
import { NavLink } from "react-router-dom";


function CreateChannelModal({serverId}){
    const dispatch = useDispatch();
    const [name, setName] = useState("")
    const [errors, setErrors] = useState([]);
    const { closeModal } = useModal();
    useEffect(() => {
        let newErrors = []

        if (name.length < 1) newErrors.push('Name must be atleast 1 character')
        else if (name.length > 30) newErrors.push("Name must be less than 30 characters")

        setErrors(newErrors)
    }, [name])

    const handleSubmit = async (e) => {
        e.preventDefault();
        // setErrors([]);
        const payload = {
            name
        }
        let errors;
        await dispatch(createChannel(name, serverId))

        console.log('yay we submitted')
        closeModal()
    }

    return (
        <>
            <div className="create-form-header">
                <h1 id="create-channel-h1">
                    Create Channel
                </h1>
            </div>
            <form className="create-channel" onSubmit={handleSubmit}>
                <ul>
                    {errors.map((error, idx) => <li key={idx}>{error}</li>)}
                </ul>

                <label>
                    CHANNEL NAME
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        className="create-channel-input"
                        placeholder="new-channel"
                    />
                </label>
                <div className="form-footer">
                    <button className="cancelButton" type="button" onClick={closeModal}>cancel</button>
                    <button className="submitButton" type="submit">Create Channel</button>
                </div>
            </form>
        </>
    )
}

export default CreateChannelModal
