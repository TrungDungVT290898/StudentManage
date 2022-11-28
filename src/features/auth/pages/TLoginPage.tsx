import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { FormProvider, FTextField } from '../../../components/form';
import useAuth from '../../../hooks/useAuth';
import useLogin from '../../../hooks/useLogin';
import { User } from '../../../models/index';

const TLoginPage = () => {
    const { user } = useAuth();
    const { loGin } = useLogin();

    const methods = useForm({
        defaultValues: user
    });
    const onSubmit: SubmitHandler<User> = async (data) => {
        await loGin(data);
    };
    const { handleSubmit } = methods;
    return (
        <div className=' bg-slate-900 grid place-content-center min-h-screen '>
            <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)} className=' grid grid-flow-row-dense grid-cols-2 grid-rows-3 place-content-center'>
                <>
                    <div className=' col-span-2 '>
                        <label className='cols-span-1 text-gray-100' htmlFor='username'>Username</label>
                        <FTextField name='name' placeholder='Fill Username' className="cols-span-1 border-solid border-2 border-sky-500 m-5 " />
                    </div>
                    <div className=' col-span-2 '>
                        <label className='cols-span-1 text-gray-100' htmlFor='username'>Password</label>
                        <FTextField name='password' type="password" className="cols-span-1 border-solid border-2 border-sky-500 m-5 " />
                    </div>
                    <div className='grid  col-span-2 row-span-1'>
                        <button className="text-gray-100 border-double border-4 border-sky-800 m-5 hover:bg-slate-600">
                            Sign up
                        </button>
                    </div>
                </>


            </FormProvider>
        </div>





    )
}

export default TLoginPage