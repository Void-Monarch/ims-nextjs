"use server";

import { doesUserExist } from "@/lib/data_queries";

export async function signupData(formData: FormData) {

    interface rawFormData {
        first_name: string | null | FormDataEntryValue,
        last_name: string | null | FormDataEntryValue,
        email: string | null | FormDataEntryValue,
        password: string | null | FormDataEntryValue
    }

    const rawFormData: rawFormData = {
        first_name: formData.get('first-name'),
        last_name: formData.get('last-name'),
        email: formData.get('email'),
        password: formData.get('password'),
    }

    console.log(rawFormData);
    const userExists = await doesUserExist(rawFormData.email!.toString());
    if (!userExists) {
        // code here to create user
    }
}
    