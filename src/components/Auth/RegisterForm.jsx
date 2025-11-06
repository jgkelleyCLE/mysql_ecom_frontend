import { useState, useEffect } from 'react';
import { FlexColStart, FlexRow } from '../UI';
import { toast } from 'sonner';
import { useRegisterUserMutation } from '../../redux/userApi';
import { useNavigate } from 'react-router-dom';
import ColorChooser from '../ColorPicker/ColorChooser';
import { states } from '../../utils/stateData';
import { useDispatch } from 'react-redux';
import { setUser } from '../../redux/userSlice';

const RegisterForm = () => {
  const getRandomColor = () => {
    const colors = [
      '#FF6B6B',
      '#4ECDC4',
      '#45B7D1',
      '#96CEB4',
      '#FFEAA7',
      '#DDA0DD',
      '#98D8C8',
      '#F7DC6F',
      '#BB8FCE',
      '#85C1E9',
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  const [color, setColor] = useState(getRandomColor());

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [fetching, setFetching] = useState(false);
  const [zipError, setZipError] = useState(false);
  const [lat, setLat] = useState('');
  const [long, setLong] = useState('');
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    city: '',
    state: '',
    zip: '',
    latitude: lat,
    longitude: long,
    bgColor: color,
  });

  const [registerUser, { data: registerData, isLoading, isSuccess, isError, error }] = useRegisterUserMutation();

  let data;

  const fetchZip = async () => {
    try {
      const res = await fetch(`https://api.zippopotam.us/us/${formData.state}/${formData.city}`);
      if (!res.ok) {
        setZipError(true);
        setFormData({ ...formData, zip: '' });
        throw new Error('No ZIP found');
      }
      data = await res.json();

      if (data.places?.length > 0) {
        setFormData((prev) => ({
          ...prev,
          zip: data.places[0]['post code'],
          latitude: data.places[0]['latitude'],
          longitude: data.places[0]['longitude'],
        }));
        setZipError(false);
      }
    } catch (err) {
      console.error(err);
      setFormData((prev) => ({
        ...prev,
        zip: '',
        latitude: '',
        longitude: '',
      }));
      setZipError(true);
    }
  };

  useEffect(() => {
    if (formData.state && formData.city.length > 3) {
      fetchZip();
    }
  }, [formData.state, formData.city]);

  const submitHandler = (e) => {
    e.preventDefault();

    if (!formData.username || !formData.password) {
      toast.error('Please fill out all fields!');
    } else if (!formData.zip) {
      toast.error('No zip code found! Please enter a valid city and state!');
    } else {
      console.log(formData);
      registerUser(formData);
    }
  };

  useEffect(() => {
    if (isError) {
      toast.error(`Error registering user: ${error?.data?.message}`);
    }

    if (isSuccess) {
      dispatch(setUser(registerData));
      toast.success('User succesfully created!');
      navigate('/');
    }
  }, [isSuccess, isError]);

  return (
    <div className="bg-gray-200 dark:bg-gray-700 p-4 rounded-md max-w-[800px]">
      <form onSubmit={submitHandler} className="flex flex-col w-full gap-2">
        <FlexRow>
          <FlexColStart>
            <input
              className="w-full bg-white p-2 rounded-md text-black"
              placeholder="Username"
              value={formData.username}
              onChange={(e) => setFormData({ ...formData, username: e.target.value })}
            />
            <input
              className="w-full bg-white p-2 rounded-md text-black"
              placeholder="Password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            />
          </FlexColStart>
          <ColorChooser formData={formData} color={color} setColor={setColor} />
        </FlexRow>

        <p className="text-xs italic text-gray-400">Note: fictitious location is used for order analytics. </p>
        <FlexRow className="w-full">
          <input
            className="w-full bg-white p-2 rounded-md text-black capitalize"
            placeholder="City"
            value={formData.city}
            onChange={(e) => setFormData({ ...formData, city: e.target.value })}
          />

          <select
            className="w-full bg-white p-2 rounded-md text-black"
            placeholder="State"
            value={formData.state}
            onChange={(e) => setFormData({ ...formData, state: e.target.value })}
          >
            <option value="">Select State</option>
            {states?.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
          <input
            className={`w-11/12 bg-white p-2 rounded-md text-black`}
            placeholder="Zip"
            disabled
            value={formData.zip}
            onChange={(e) => setFormData({ ...formData, zip: e.target.value })}
          />
        </FlexRow>
        <div>{zipError ? <p className="text-red-500 font-bold text-lg">No zip code found!</p> : null}</div>
        {formData.zip ? (
          <FlexRow className="italic">
            <p>Latitude: {formData.latitude}, </p>
            <p>Longitude: {formData.longitude}</p>
          </FlexRow>
        ) : null}
        <button
          type="submit"
          // style={{ backgroundColor: color }}
          className=" transition duration-300 w-full p-2 cursor-pointer font-bold rounded-md bg-sqlBlue hover:bg-sqlBlueHover text-white"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default RegisterForm;
