import MyButton from "../ui/MyButton";
import {SubmitHandler, useForm} from "react-hook-form";
import {MyInput} from "../ui/MyInput";
import {UpdateCredentialsBody, useUpdateCredentials} from "../../api/updateCredentialsApi";
import {CircularProgress} from "@nextui-org/react";
import React from "react";
import {IUser} from "../../models/IUser";

type UpdateCredentialFormBody = {
    name: string;
    surname: string;
}

interface Props {
    userData: IUser
}

function UpdateCredentialsForm({userData}: Props) {
    const {handleSubmit, control, formState: {errors}} = useForm<UpdateCredentialFormBody>({
        mode: "onChange",
        reValidateMode: "onBlur",
        defaultValues: {
            name: userData.firstName,
            surname: userData.lastName,
        }
    });
    const {mutate: updateCredentials, isLoading: isLoadingCredentials} = useUpdateCredentials()

    const submitForm: SubmitHandler<UpdateCredentialFormBody> = (data) => {
        console.log(data)
        const credentials: UpdateCredentialsBody = {
            name: data.name,
            surname: data.surname,
        }
        updateCredentials(credentials)
    }

    return (
        <form className="w-full flex flex-col" onSubmit={handleSubmit(submitForm)}>
            <div className="w-full grid grid-cols-2 gap-7 ">
                <MyInput name={`name`}
                         label={`Name`}
                         control={control}
                         required={"Name is required"}
                />
                <MyInput name={`surname`}
                         label={`Surname`}
                         control={control}
                         required={"Surname is required"}
                />
            </div>
            <MyButton
                type={`submit`}
                color={`primary`}
                className={`px-5 py-2 mt-4 ml-auto`}
                disabled={isLoadingCredentials }
            >Change Info</MyButton>
            {(isLoadingCredentials)
                && <CircularProgress
					color={'primary'}
					size={"lg"}
					label="Updating..."
				/>}
        </form>
    )
}

export default UpdateCredentialsForm;
