"use server";

export async function signupData(formData: FormData) {


    const rawFormData = {
        first_name: formData.get('first-name'),
        last_name: formData.get('last-name'),
        email: formData.get('email'),
        password: formData.get('password'),
    }
    console.log(rawFormData);
}