import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Reel from '../../assets/VivaReel.mp4';
import CaRegistrationPage from './CARegistrationPage';

const stateValues = [
    'Andaman and Nicobar Islands',
    'Andhra Pradesh',
    'Arunachal Pradesh',
    'Assam',
    'Bihar',
    'Chandigarh',
    'Chhattisgarh',
    'Dadra and Nagar Haveli',
    'Daman and Diu',
    'Delhi',
    'Goa',
    'Gujarat',
    'Haryana',
    'Himachal Pradesh',
    'Jammu and Kashmir',
    'Jharkhand',
    'Karnataka',
    'Kerala',
    'Ladakh',
    'Lakshadweep',
    'Madhya Pradesh',
    'Maharashtra',
    'Manipur',
    'Meghalaya',
    'Mizoram',
    'Nagaland',
    'Odisha',
    'Puducherry',
    'Punjab',
    'Rajasthan',
    'Sikkim',
    'Tamil Nadu',
    'Telangana',
    'Tripura',
    'Uttar Pradesh',
    'Uttarakhand',
    'West Bengal',
];

const CaForm = () => {
    const navigate = useNavigate();
    //  VALUES FOR RESETTING THE FORM
    const InitialValues = {
        Name: '',
        Gender: '',
        CreatePass: '',
        Email: '',
        Phone: '',
        ConfirmPass: '',
    };
    const InitialCollegeValues = {
        State: '',
        District: '',
        CollegeName: '',
        Degree: '',
        Year: '',
        ClubName: '',
    };

    const [personalDetails, setPersonalDetails] = useState(InitialValues);
    const [collegeDetails, setCollegeDetails] = useState(InitialCollegeValues);
    const [collegeForm, showCollegeDetails] = useState(false);
    const [formDisplay, showForm] = useState(true);
    const [Warning, setWarning] = useState('');
    //   P E R S O N A L   D E T A I L S  S E C T I O N

    const personalDetailsChangeHandler = event => {
        event.preventDefault();
        const { name, value } = event.target;
        setPersonalDetails({
            ...personalDetails,
            [name]: value,
        });
    };
    const NextFormHandler = event => {
        event.preventDefault();
        // if (
        //     personalDetails.Name === '' ||
        //     personalDetails.Gender === '' ||
        //     personalDetails.ConfirmPass === '' ||
        //     personalDetails.CreatePass === '' ||
        //     personalDetails.Phone === ''
        // ) {
        //     setWarning('Enter All Fields');
        //     return;
        // }
        // if (personalDetails.Phone.length !== 10) {
        //     setWarning('Phone Number Digits Not equal to 10');
        //     return;
        // }
        // if (personalDetails.ConfirmPass != personalDetails.CreatePass) {
        //     setWarning('Passwords Do Not Match');
        //     return;
        // } else {
        //  Will Show the College Details Form
        setWarning('');
        showCollegeDetails(true);
        // }
    };

    const PersonalDetailsClearHandler = event => {
        event.preventDefault();
        setPersonalDetails(InitialValues);
    };

    //    C O L L E G E   D E T A I L S   S E C T I O N

    const CollegeDetailsClearHandler = event => {
        event.preventDefault();
        setCollegeDetails(InitialCollegeValues);
    };

    const collegeDetailsChangeHandler = event => {
        event.preventDefault();
        const { name, value } = event.target;
        setCollegeDetails({
            ...collegeDetails,
            [name]: value,
        });
    };
    const [clubHead, setclubHead] = useState(false);

    const collegeDetailsHeadHandler = () => {
        document.getElementById('checkboxClub').checked = !clubHead;
        console.log
        setclubHead(!clubHead);
    };

    const CollegeDetailsSubmitHandler = event => {
        event.preventDefault();
        if (
            collegeDetails.District === '' ||
            collegeDetails.Degree === '' ||
            collegeDetails.CollegeName === '' ||
            collegeDetails.State === '' ||
            collegeDetails.Year === ''
        ) {
            setWarning('Enter All Fields');
            return;
        }
        if (clubHead && collegeDetails.ClubName === '') {
            setWarning('Enter Club/Society Name');
            return;
        }
        //  Will Submit the Form
        navigate('/successful');
        SubmitHandler();
    };

    //    F O R M   S U B M I T   H A N D L E R
    const SubmitHandler = () => {
        //  All the values required for DataBase is stored in personalDetails and collegeDetails
        console.log('Personal Details are ', personalDetails);
        console.log('College Details are ', collegeDetails);
        showForm(false);
    };

    //       A P I       T O     F E T C H     C I T I E S

    async function getCitiesInState(country, state) {
        const url =
            'https://countriesnow.space/api/v0.1/countries/state/cities';
        const data = {
            country,
            state,
        };

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                throw new Error();
                // Request failed with status: ${response.status},
            }

            const result = await response.json();
            return result;
        } catch (error) {
            console.error('Error:', error);
        }
    }

    const [cities, setCities] = useState([]);

    const fetchCities = async (country, state) => {
        try {
            const response = await getCitiesInState(country, state);

            if (!response.error) {
                setCities(response.data);
                // console.log(response.data);
            } else {
                // console.log(response.data);
                console.error('Request failed with status:', response.status);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    useEffect(() => {
        if (collegeDetails.State) {
            fetchCities('India', collegeDetails.State);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [collegeDetails.State]);

    return (
        <div>
            <div>
                <CaRegistrationPage />
            </div>
            <div className="lg:flex lg:justify-center lg:flex-row flex-col ">
                <div className="justify-center lg:w-1/5 flex items-center">
                    <video
                        className="rounded-xl  "
                        width={360}
                        autoPlay
                        muted
                        loop
                    >
                        <source src={Reel}></source>
                    </video>
                </div>

                <div className=" justify-center px-8 lg:py-0  lg:w-1/2">
                    {/* P E R S O N A L   D E T A I L S   F O R M */}
                    {formDisplay && (
                        <form>
                            {!collegeForm && (
                                <div className="PersonalDetails lg:w-3/4 mx-auto p-4 rounded-xl">
                                    <div className="PersonalDetailsForm mt-4 space-y-2">
                                        <div className="PersonalDetailsForm mt-4 space-y-4 text-left">
                                            <div className="flex lg:flex-row flex-col w-full">
                                                <div className="text-left  w-full mr-2">
                                                    <label className="text-white ">
                                                        Name
                                                        <span className="text-red-500 m-2">
                                                            *
                                                        </span>
                                                    </label>
                                                    <input
                                                        className="w-full px-4 py-2 my-2  bg-gray-800 text-gray-100 border border-black rounded-lg"
                                                        placeholder="Dhruv Chandak"
                                                        type="text"
                                                        name="Name"
                                                        onChange={
                                                            personalDetailsChangeHandler
                                                        }
                                                        value={
                                                            personalDetails.Name
                                                        }
                                                    ></input>
                                                </div>
                                                <div className="text-left w-full">
                                                    <label className="text-white ">
                                                        Gender{' '}
                                                        <span className="text-red-500 m-2">
                                                            *
                                                        </span>
                                                    </label>
                                                    <select
                                                        className="w-full px-4 py-2 my-2 bg-gray-800 text-white border border-black rounded-lg"
                                                        name="Gender"
                                                        onChange={
                                                            personalDetailsChangeHandler
                                                        }
                                                        value={
                                                            personalDetails.Gender
                                                        }
                                                    >
                                                        <option value="">
                                                            Select Gender
                                                        </option>
                                                        <option value="Male">
                                                            Male
                                                        </option>
                                                        <option value="Female">
                                                            Female
                                                        </option>
                                                        <option value="Others">
                                                            Others
                                                        </option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div>
                                                <label className="text-white">
                                                    E-mail address
                                                    <span className="text-red-500 m-2">
                                                        *
                                                    </span>
                                                </label>
                                                <input
                                                    className="w-full px-4 py-2 my-2  bg-gray-800 text-gray-100 border border-black rounded-lg"
                                                    placeholder="Email ID *"
                                                    type="email"
                                                    name="Email"
                                                    onChange={
                                                        personalDetailsChangeHandler
                                                    }
                                                    value={
                                                        personalDetails.Email
                                                    }
                                                ></input>
                                            </div>
                                            <div>
                                                <label className="text-white">
                                                    Phone
                                                    <span className="text-red-500 m-2">
                                                        *
                                                    </span>
                                                </label>
                                                <input
                                                    className="w-full px-4 py-2 my-2  bg-gray-800 text-gray-100 border border-black rounded-lg"
                                                    placeholder="Phone Number *"
                                                    name="Phone"
                                                    onChange={
                                                        personalDetailsChangeHandler
                                                    }
                                                    value={
                                                        personalDetails.Phone
                                                    }
                                                ></input>
                                            </div>
                                            <div className="lg:flex-row flex-col">
                                                <div className="">
                                                    <label className="text-white">
                                                        Create Password
                                                        <span className="text-red-500 m-2">
                                                            *
                                                        </span>
                                                    </label>
                                                    <input
                                                        className="w-full px-4 py-2 my-2  bg-gray-800 text-gray-100 border border-black rounded-lg"
                                                        placeholder="Dhruv@05"
                                                        type="password"
                                                        name="CreatePass"
                                                        onChange={
                                                            personalDetailsChangeHandler
                                                        }
                                                        value={
                                                            personalDetails.CreatePass
                                                        }
                                                    ></input>
                                                </div>
                                                <div className="">
                                                    <label className="text-white">
                                                        Confirm Password
                                                        <span className="text-red-500 m-2">
                                                            *
                                                        </span>
                                                    </label>
                                                    <input
                                                        className="w-full px-4 py-2  my-2 bg-gray-800 text-gray-100 border border-black rounded-lg"
                                                        placeholder="Dhruv@05"
                                                        type="password"
                                                        name="ConfirmPass"
                                                        onChange={
                                                            personalDetailsChangeHandler
                                                        }
                                                        value={
                                                            personalDetails.ConfirmPass
                                                        }
                                                    ></input>
                                                </div>
                                            </div>
                                        </div>

                                        <p className="text-sky-700 text-center">
                                            {Warning}
                                        </p>
                                        <button
                                            className="bg-blue-500 text-white mx-4 px-8 py-2 rounded-lg hover:bg-blue-600"
                                            onClick={NextFormHandler}
                                        >
                                            Next
                                        </button>
                                        <button
                                            className="bg-gray-300 text-gray-700 mx-4 px-8 py-2 rounded-lg hover:bg-gray-400"
                                            onClick={
                                                PersonalDetailsClearHandler
                                            }
                                        >
                                            Clear
                                        </button>
                                    </div>
                                </div>
                            )}

                            {/* C O L L E G E   D E T A I L S   F O R M */}
                            {collegeForm && (
                                <div className="CollegeDetails lg:w-3/4 mx-auto lg:-mt-9 mt-8 lg:py-8  text-left   rounded-xl">
                                    <div className="CollegeDetailsForm   space-y-2">
                                        <div>
                                            <label className="text-white">
                                                State
                                                <span className="text-red-500 m-2">
                                                    *
                                                </span>
                                            </label>

                                            <select
                                                className="w-full px-4 py-2  bg-gray-800 text-gray-100 border border-black rounded-lg"
                                                id="country-state"
                                                name="State"
                                                onChange={
                                                    collegeDetailsChangeHandler
                                                }
                                            >
                                                <option
                                                    value=""
                                                    className="w-1/2"
                                                    disabled
                                                    selected
                                                >
                                                    Select State
                                                </option>
                                                {stateValues.map(
                                                    (name, index) => (
                                                        <option
                                                            className="w-1/2"
                                                            key={index}
                                                            value={name}
                                                        >
                                                            {name}
                                                        </option>
                                                    ),
                                                )}
                                            </select>
                                        </div>
                                        {collegeDetails.State && (
                                            <div className="space-y-0">
                                                <label className="text-white">
                                                    District
                                                    <span className="text-red-500 m-2">
                                                        *
                                                    </span>
                                                </label>
                                                <select
                                                    className="w-full px-4 py-2  bg-gray-800 text-gray-100 border border-black rounded-lg"
                                                    id="country-district"
                                                    name="District"
                                                    onChange={
                                                        collegeDetailsChangeHandler
                                                    }
                                                >
                                                    <option
                                                        value=""
                                                        className="w-1/2"
                                                        disabled
                                                        selected
                                                    >
                                                        Select District
                                                    </option>
                                                    {cities.map(
                                                        (name, index) => (
                                                            <option
                                                                className="w-1/2"
                                                                key={index}
                                                                value={name}
                                                            >
                                                                {name}
                                                            </option>
                                                        ),
                                                    )}
                                                </select>
                                            </div>
                                        )}

                                        <div className="">
                                            <label className="text-white space-y-0">
                                                College Name
                                                <span className="text-red-500 m-2">
                                                    *
                                                </span>
                                                <input
                                                    className="w-full px-4 py-2  bg-gray-800 text-gray-100 border border-black rounded-lg"
                                                    type="text"
                                                    name="CollegeName"
                                                    placeholder="NIT Delhi"
                                                    value={
                                                        collegeDetails.CollegeName
                                                    }
                                                    onChange={
                                                        collegeDetailsChangeHandler
                                                    }
                                                ></input>
                                            </label>
                                        </div>
                                        <div>
                                            <label className="text-white">
                                                Degree
                                                <span className="text-red-500 m-2">
                                                    *
                                                </span>
                                            </label>
                                            <input
                                                className="w-full px-4  py-2  bg-gray-800 text-gray-100 border border-black rounded-lg"
                                                type="text"
                                                name="Degree"
                                                placeholder="BTech in Computer Science"
                                                value={collegeDetails.Degree}
                                                onChange={
                                                    collegeDetailsChangeHandler
                                                }
                                            ></input>
                                        </div>
                                        <div className="flex flex-col">
                                            <div className="w-full ">
                                                <label className="text-white">
                                                    Year of Graduation
                                                    <span className="text-red-500 m-2">
                                                        *
                                                    </span>
                                                </label>
                                                <input
                                                    className="w-full px-4 py-2  bg-gray-800 text-white border border-black rounded-lg"
                                                    type="number"
                                                    name="Year"
                                                    placeholder="2026"
                                                    value={collegeDetails.Year}
                                                    onChange={
                                                        collegeDetailsChangeHandler
                                                    }
                                                ></input>
                                            </div>
                                            <div>
                                                <div className="py-2">
                                                    <label className="text-white">
                                                        Head of any Club/Society
                                                        ?
                                                    </label>
                                                    <input
                                                        id="checkboxClub"
                                                        className="w-4 h-4 "
                                                        type="checkbox"
                                                        name="Head"
                                                        onChange={
                                                            collegeDetailsHeadHandler
                                                        }
                                                    ></input>
                                                </div>

                                                {clubHead && (
                                                    <div className="my-2">
                                                        <label className="my-2 text-white">
                                                            Name of Club/Society
                                                            <span className="text-red-500 m-2">
                                                                *
                                                            </span>
                                                        </label>
                                                        <input
                                                            className="w-full px-4 py-2  bg-gray-800 text-white border border-black rounded-lg"
                                                            type="text"
                                                            name="ClubName"
                                                            placeholder="Robotics Club"
                                                            value={
                                                                collegeDetails.ClubName
                                                            }
                                                            onChange={
                                                                collegeDetailsChangeHandler
                                                            }
                                                        ></input>
                                                    </div>
                                                )}
                                            </div>
                                        </div>

                                        <div className="text-center  lg:py-0 py-4">
                                            <p className="text-sky-700 text-center">
                                                {Warning}
                                            </p>
                                            <button
                                                className="bg-blue-500 text-white px-8 mx-2 py-2 rounded-lg hover:bg-blue-600"
                                                onClick={
                                                    CollegeDetailsSubmitHandler
                                                }
                                            >
                                                Submit
                                            </button>
                                            <button
                                                className="bg-gray-300 text-gray-700 mx-4 px-8 py-2 rounded-lg hover:bg-gray-400"
                                                onClick={
                                                    CollegeDetailsClearHandler
                                                }
                                            >
                                                Clear
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
};
export default CaForm;
