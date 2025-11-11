import { useState } from 'react';
import { FlexColStart } from '../UI';
import { useLoginUserMutation } from '../../redux/userApi';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setUser } from '../../redux/userSlice';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

const LoginForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    username: '',
    password: '123456',
  });

  const [login, { data: loginData, isLoading, isError, isSuccess, error }] = useLoginUserMutation();

  const submitHandler = (e) => {
    e.preventDefault();

    if (!formData.username || !formData.password) {
      toast.error('Please fill out all fields!');
    } else {
      login(formData);
    }
  };

  useEffect(() => {
    if (isSuccess) {
      console.log('LOGIN DATA: ', loginData);
      toast.success(`Logged in as ${loginData?.user.username}`);
      dispatch(setUser(loginData));
      navigate('/');
    }

    if (isError) {
      toast.error(`Error logging in: ${error?.data?.message}`);
    }
  }, [isSuccess, isError]);

  return (
    <div className="bg-gray-200 dark:bg-gray-700 p-4 rounded-md max-w-[800px]">
      <form onSubmit={submitHandler} className="flex flex-col w-full gap-2">
        <FlexColStart>
          <input
            className="w-full bg-white p-2 rounded-md text-black"
            placeholder="Username"
            value={formData.username}
            onChange={(e) => setFormData({ ...formData, username: e.target.value })}
          />
          <Tooltip>
            <TooltipTrigger asChild>
              <input
                className="w-full bg-white p-2 rounded-md  disabled:bg-gray-300 disabled:text-gray-500 italic cursor-not-allowed"
                placeholder="Password"
                disabled
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              />
            </TooltipTrigger>
            <TooltipContent side="bottom" style={{}}>
              <div className="w-full ">
                <p className="text-lg">Password was automatically set for security reasons.</p>
              </div>
            </TooltipContent>
          </Tooltip>
        </FlexColStart>

        <button
          type="submit"
          // style={{ backgroundColor: color }}
          className=" transition duration-300 w-full p-2 cursor-pointer font-bold rounded-md bg-sqlBlue hover:bg-sqlBlueHover text-white"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
