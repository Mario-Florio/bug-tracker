import "./Form.css";
import { useState } from 'react';
import { useForm } from "react-hook-form";
import uniqid from 'uniqid';

function Form(props) {

    const [isFormActive, setIsFormActive] = useState(false);

    const { 
        register, 
        handleSubmit, 
        reset,
        formState: { errors } 
    } = useForm({
        defaultValues: {
            name: "",
            dueDate: new Date().toISOString().split('T')[0],
            description: "",
            status: 1,
        }
    });

    const { bugs, setBugsList } = props;

    const submit = (data, e) => {
        e.preventDefault();
        let newBug = {
            id: uniqid(),
            name: data.name,
            dueDate: new Date(data.dueDate).toISOString().split('T')[0],
            description: data.description,
            status: Number(data.status)
        };
        bugs.add(newBug);
        setBugsList(bugs.getBugs());
        setIsFormActive(false);
        reset();
    }

    return(
        <div className="bugsList__formWrapper">
            {isFormActive ?         
            <form 
                className="bugsList__form"
                onSubmit={handleSubmit((data, e) => submit(data, e))}
            >
                <label htmlFor='name'>Name</label>
                <input 
                    type='text'
                    name='name'
                    id='name'
                    className={errors.name ? "bugsList__input--invalid" : null}
                    {...register("name", 
                        { 
                            required: "This is required.", 
                            maxLength: { value: 20, message: "Max length is 20." } 
                        }
                    )} 
                    placeholder='Name'
                />
                {errors.name ? <p className="bugs__errorMsg">{errors.name.message}</p> : null}
                <label htmlFor='dueDate'>Due Date</label>
                <input
                    type='date'
                    name='dueDate'
                    id='dueDate'
                    className={errors.dueDate ? "bugsList__input--invalid" : null}
                    {...register("dueDate",
                        {
                            required: "This is required.",
                        }
                    )} 
                />
                {errors.dueDate ? <p className="bugs__errorMsg">{errors.dueDate.message}</p> : null}
                <label htmlFor='description'>Description</label>
                <textarea
                    name='description'
                    id='description'
                    className={errors.description ? "bugsList__input--invalid" : null}
                    {...register("description", 
                        { 
                            required: "This is required.", 
                        }
                    )} 
                    placeholder='Description'
                />
                {errors.description ? <p className="bugs__errorMsg">{errors.description.message}</p> : null}
                <fieldset style={{border: "none", margin: "0", padding: "0"}}>
                    <legend style={{padding: "0"}}>Status:</legend>
                    <div style={{display: "flex", justifyContent: "space-between", width: "110px"}}>
                        <label htmlFor="notStarted">Not Started</label>
                        <input
                            type="radio"
                            name="status"
                            id="notStarted"
                            value={1}
                            {...register("status")}
                        />
                    </div>
                    <div style={{display: "flex", justifyContent: "space-between", width: "110px"}}>
                        <label htmlFor="inProgress">In Progress</label>
                        <input
                            type="radio"
                            name="status"
                            id="inProgress"
                            value={2}
                            {...register("status")}
                        />
                    </div>
                    <div style={{display: "flex", justifyContent: "space-between", width: "110px"}}>
                        <label htmlFor="status">Resolved</label>
                        <input
                            type="radio"
                            name="status"
                            id="resolved"
                            value={3}
                            {...register("status")}
                        />
                    </div>
                </fieldset>
                <div style={{marginTop: ".7em"}}>
                    <button className="bugsList__submitButton">Submit</button>
                    <button 
                        className="bugsList__cancelButton"
                        onClick={e => {
                            e.preventDefault();
                            isFormActive ? setIsFormActive(false) : setIsFormActive(true);
                            reset();
                        }}
                    >
                        Cancel
                    </button>
                </div>
            </form>
            :
            <button 
                className="bugsList__addButton" 
                onClick={() => isFormActive ? setIsFormActive(false) : setIsFormActive(true)}
            >
                +
            </button>
            }
        </div>
    );
}

export default Form;