import { FieldError } from "react-hook-form";

type InputFieldprops = {
    label:string;
    type?:string;
    register:any;
    name:string;
    defaultValue?:string;
    error?: FieldError | any;
    hidden?:boolean;
    inputProps?:React.InputHTMLAttributes<HTMLInputElement>

}
const InputFieldForm = ({
    label,
    type ="text",
    register,
    name,
    defaultValue,
    error,
    hidden,
    inputProps,
} : InputFieldprops ) => {
    return (
        <div className={hidden ? "hidden" : "flex flex-col gap-2 w-full md:w-1/4 " }>
            <label className="text-sm text-gray-600">{label}</label>
            <input 
                type={type} 
                {...register(name)} 
                className="rounded-md bg-white text-sm w-full p-2" 
                {...inputProps}
                defaultValue={defaultValue}
            />
            {error?.message && (
                <p className="text-red-400 text-xs">{error?.message.toString()}</p>
            )}
        </div>
    )
}

export default InputFieldForm;