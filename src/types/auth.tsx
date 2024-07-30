interface Forgot {
    email: string
}

interface Verify extends Forgot {
    code:string;
}   

interface Signin extends Forgot {
    password: string | number;
}

interface Update {
    code: string;
    new_password:string;
    email?:string;
}

export interface Signup extends Signin{
    full_name: string;
    phone_number: string;
}



export interface Request{
    sign_in: (data: Signin) => unknown,
    sign_up: (data: Signup) => unknown,
    auth_verify: (data:Verify )=>unknown,
    forgot_password: (data:Forgot )=>unknown,
    update_password: (data:Update )=>unknown,
}